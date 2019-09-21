import { InputKey, KeyCode } from 'lib/inputKey'
import { InputMouse } from 'lib/inputMouse'

import dm from 'lib/drawManager'

import { radianToDegree, degreeToRadian } from 'lib/util'

import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'
import Block from './block';

export default class Player {
  private readonly speed: number
  private circle: Circle
  private angle: number
  private rotateCircle: Circle | null
  private len: number
  private ay: number
  private collide: boolean

  constructor() {
    this.speed = 5
    this.circle = new Circle(new Vec2(100, 100), 30)
    this.rotateCircle = null
    this.ay = 0
  }

  public draw() {
    dm.circle(this.circle, '#000', true)

    if (this.rotateCircle) {
      dm.circle(this.rotateCircle, '#000', false)
    }

    if (this.collide) {
      dm.circle(this.circle, '#ff0000', false)
    }
  }

  public update(blocks: Array<Block>): void {
    if (InputMouse.isMouseLeftDown()) {
      if (this.rotateCircle == null) {
        this.rotateStart()
      }
      this.rotate()
    } else {
      this.rotateEnd()
      this.notRotate(blocks)
    }
  }

  private rotateStart(): void {
    const center = InputMouse.getMousepos()

    this.len = center.dist(this.circle.pos)
    this.rotateCircle = new Circle(center, this.len)

    const sub = this.circle.pos.sub(center)
    this.angle = radianToDegree(Math.atan2(sub.y, sub.x))
    console.log(this.angle)

    this.ay = 0
  }

  private rotate(): void {
    if (this.rotateCircle == null) {
      return
    }

    this.angle += 1

    this.circle.pos = this.rotateCircle.pos.add(
      Vec2.cosSin(degreeToRadian(this.angle)).scalarMul(this.len)
    )
    console.log(this.circle.pos)
  }

  private rotateEnd(): void {
    this.rotateCircle = null
    this.angle = 0
  }

  private notRotate(blocks: Array<Block>): void {
    let vec = Vec2.zero()

    if (InputKey.isKeyDown(KeyCode.A)) {
      vec.x -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      vec.x += this.speed
    }

    vec.y += this.ay
    this.ay += 1
    /*
    if (this.circle.pos.y >= dm.height) {
      this.circle.pos.y = dm.height
      this.ay = 0
    }*/
    console.log(this.circle.pos)
    this.circle.pos.addAssign(vec)

    this.collide = false
    for (let block of blocks) {
      if (this.circle.collideRect(block.rect)) {
        this.collide = true
        this.circle.pos.subAssign(vec)
        
        if (vec.y > 0) {
          this.ay = 0
        }
        break
      }
    }
  }
}
