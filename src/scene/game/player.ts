import { InputKey, KeyCode } from 'lib/inputKey'
import { InputMouse } from 'lib/inputMouse'

import dm from 'lib/drawManager'

import { radianToDegree, degreeToRadian } from 'lib/util'

import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'
import Color from 'lib/color'
import Entity from './entity'
import Camera from 'lib/camera'

export default class Player {
  private readonly speed = 10
  private circle: Circle
  private angle: number
  private rotateCircle: Circle | null = null
  private len: number
  private ay = 0
  private start_angle: number
  private start_circle: Circle
  private readonly radius = 25
  private angleSpeed = 1.0
  private centerEntity: Entity | null = null

  constructor() {
    this.circle = new Circle(Vec2.zero, this.radius)
  }

  public setPos(pos: Vec2) {
    this.circle.pos = pos.add(new Vec2(this.radius, this.radius))
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
  }

  public update(entities: Array<Entity>): void {
    if (InputMouse.isMouseLeftDown()) {
      if (this.rotateCircle == null) {
        this.rotateStart(entities)
      }
      this.rotate(entities)
    } else {
      if (this.rotateCircle) {
        this.rotateEnd(entities)
      }
      this.notRotate(entities)
    }
  }

  private rotateStart(entities: Array<Entity>): void {
    const center = Camera.getMousePosInCamera()

    if (this.circle.inVec2(center)) {
      return
    }
    for (let entity of entities) {
      if (entity.getIsCenter(center)) {
        this.centerEntity = entity
      }
    }

    if (this.centerEntity) {
      this.centerEntity.rotateStart(center)
    } else {
      return
    }

    this.len = center.dist(this.circle.pos)
    this.rotateCircle = new Circle(center, this.len)

    const sub = this.circle.pos.sub(center)

    this.start_angle = radianToDegree(Math.atan2(sub.y, sub.x))
    this.angle = this.start_angle

    this.start_circle = new Circle(this.circle.pos, this.radius)

    this.ay = 0

    this.angleSpeed = 1.0
  }

  private rotate(entities: Array<Entity>): void {
    if (this.rotateCircle == null) {
      return
    }

    if (this.centerEntity) {
      this.rotateCircle.pos = this.centerEntity.getCenterPos()
    }

    this.angle += this.angleSpeed
    this.angleSpeed += 0.02

    const prevPos = this.circle.pos

    this.circle.pos = this.rotateCircle.pos.add(
      Vec2.cosSin(degreeToRadian(this.angle)).scalarMul(this.len)
    )

    for (let entity of entities) {
      if (entity.collide(this.circle)) {
        this.circle.pos = prevPos
        this.rotateEnd(entities)
        return
      }
    }

    Camera.move(
      new Vec2(Camera.getDistFromCetnerX(this.rotateCircle.pos) / 20, 0)
    )

    this.start_circle.pos = this.rotateCircle.pos.add(
      Vec2.cosSin(degreeToRadian(this.start_angle)).scalarMul(this.len)
    )
  }

  private rotateEnd(entities: Array<Entity>): void {
    this.rotateCircle = null
    this.angle = 0

    for (let entity of entities) {
      entity.rotateEnd()
    }
  }

  private notRotate(entities: Array<Entity>): void {

    Camera.move(new Vec2(Camera.getDistFromCetnerX(this.circle.pos) / 100.0, 0))

    for (let entity of entities) {
      entity.getIsCenter(Camera.getMousePosInCamera())
    }

    let vec = new Vec2(0, 0)

    if (InputKey.isKeyDown(KeyCode.A)) {
      vec.x -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      vec.x += this.speed
    }

    vec.y += this.ay
    this.ay += 1

    this.circle.pos.addAssign(vec)

    Camera.move(new Vec2(vec.x, 0))

    for (let entity of entities) {
      if (entity.collide(this.circle)) {
        this.circle.pos.subAssign(vec)
        Camera.move(new Vec2(-vec.x, 0))
        if (vec.y > 0) {
          this.ay = 0
        }
        break
      }
    }
  }
}
