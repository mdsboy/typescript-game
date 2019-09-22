import { InputKey, KeyCode } from 'lib/inputKey'
import { InputMouse } from 'lib/inputMouse'

import dm from 'lib/drawManager'

import { radianToDegree, degreeToRadian } from 'lib/util'

import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'
import Block from './block'
import Color from 'lib/color'

export default class Player {
  private readonly speed: number
  private circle: Circle
  private angle: number
  private rotateCircle: Circle | null
  private rotateDir: boolean
  private len: number
  private ay: number
  private collide: boolean
  private start_angle: number
  private start_circle: Circle
  private readonly radius = 25

  constructor() {
    this.speed = 10
    this.circle = new Circle(new Vec2(500, 500), this.radius)
    this.rotateCircle = null
    this.ay = 0
  }

  public draw() {
    if (this.rotateCircle) {
      dm.strokeCircle(this.rotateCircle, Color.black_color(0.3), 3)
      dm.strokeCircle(
        new Circle(
          this.rotateCircle.pos,
          this.rotateCircle.radius - this.radius
        ),
        Color.black_color(0.2),
        3
      )
      dm.strokeCircle(
        new Circle(
          this.rotateCircle.pos,
          this.rotateCircle.radius + this.radius
        ),
        Color.black_color(0.2),
        3
      )
      if (this.rotateDir) {
        dm.strokeArc(
          new Circle(
            this.rotateCircle.pos,
            this.rotateCircle.radius - this.radius
          ),
          degreeToRadian(this.start_angle),
          degreeToRadian(this.angle),
          Color.black_color(0.8),
          3
        )
        dm.strokeArc(
          new Circle(
            this.rotateCircle.pos,
            this.rotateCircle.radius + this.radius
          ),
          degreeToRadian(this.start_angle),
          degreeToRadian(this.angle),
          Color.black_color(0.8),
          3
        )
      } else {
        dm.strokeArc(
          new Circle(
            this.rotateCircle.pos,
            this.rotateCircle.radius - this.radius
          ),
          degreeToRadian(this.angle),
          degreeToRadian(this.start_angle),
          Color.black_color(0.8),
          3
        )
        dm.strokeArc(
          new Circle(
            this.rotateCircle.pos,
            this.rotateCircle.radius + this.radius
          ),
          degreeToRadian(this.angle),
          degreeToRadian(this.start_angle),
          Color.black_color(0.8),
          3
        )
      }

      dm.line(this.circle.pos, this.rotateCircle.pos, Color.black_color(0.5), 2)
      dm.line(
        this.start_circle.pos,
        this.rotateCircle.pos,
        Color.black_color(0.5),
        2
      )

      dm.fillCircle(this.start_circle, Color.black_color(0.3))
      dm.strokeCircle(this.start_circle, Color.black, 3)

      dm.fillCircle(this.circle, Color.red_color(200, 0.3))
      dm.strokeCircle(this.circle, Color.red, 3)
    } else {
      dm.fillCircle(this.circle, Color.red_color(200, 0.7))
      dm.strokeCircle(this.circle, Color.red_color(200, 1), 3)
    }
/*
    if (this.collide) {
      dm.strokeCircle(this.circle, Color.red, 3)
    }*/
  }

  public update(blocks: Array<Block>): void {
    if (InputMouse.isMouseLeftDown()) {
      if (this.rotateCircle == null) {
        this.rotateStart()
      }
      this.rotate()
    } else {
      if (this.rotateCircle) {
        this.rotateEnd(blocks)
      }
      this.notRotate(blocks)
    }
  }

  private rotateStart(): void {
    const center = InputMouse.getMousepos()

    this.len = center.dist(this.circle.pos)
    this.rotateCircle = new Circle(center, this.len)

    const sub = this.circle.pos.sub(center)

    this.start_angle = radianToDegree(Math.atan2(sub.y, sub.x))
    this.angle = this.start_angle
    console.log(this.angle)

    this.rotateDir = center.x >= this.circle.pos.x
    this.start_circle = new Circle(this.circle.pos, this.radius)

    this.ay = 0
  }

  private rotate(): void {
    if (this.rotateCircle == null) {
      return
    }

    if (this.rotateDir) {
      this.angle += 1
    } else {
      this.angle -= 1
    }

    this.circle.pos = this.rotateCircle.pos.add(
      Vec2.cosSin(degreeToRadian(this.angle)).scalarMul(this.len)
    )
    console.log(this.circle.pos)
  }

  private rotateEnd(blocks: Array<Block>): void {
    this.rotateCircle = null
    this.angle = 0

    for (let block of blocks) {
      if (this.circle.collideRect(block.rect)) {
        this.circle.pos = this.start_circle.pos
        return
      }
    }
  }

  private notRotate(blocks: Array<Block>): void {
    let vec = new Vec2(0, 0)

    if (InputKey.isKeyDown(KeyCode.A)) {
      vec.x -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      vec.x += this.speed
    }

    vec.y += this.ay
    this.ay += 1

    console.log(this.circle.pos)
    this.circle.pos.addAssign(new Vec2(0, vec.y))
    for (let block of blocks) {
      block.move(new Vec2(-vec.x, 0))
    }

    this.collide = false
    for (let block of blocks) {
      if (this.circle.collideRect(block.rect)) {
        this.collide = true
        this.circle.pos.subAssign(new Vec2(0, vec.y))
        if (vec.y > 0) {
          this.ay = 0
        }
        break
      }
    }
    if (this.collide) {
      for (let block of blocks) {
        block.move(new Vec2(vec.x, 0))
      }
    }
  }
}
