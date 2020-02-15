import { InputKey, KeyCode } from 'lib/inputKey'
import { InputMouse } from 'lib/inputMouse'

import dm from 'lib/drawManager'

import { radianToDegree } from 'lib/util'

import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'
import Color from 'lib/color'
import Entity from './moveEntity'
import Camera from 'lib/camera'
import RotateCircle from './rotateCircle'
import RotateEntity from './rotateEntity'
import Entities from './entities'

export default class Player {
  private readonly speed = 10
  private circle: Circle
  private angle: number
  private len: number
  private ay = 0
  private readonly radius = 25
  private angleSpeed = 1.0
  private centerEntity: RotateEntity | null = null
  private rotateCircle: RotateCircle | null = null
  private checkPoints: Array<Vec2> = []
  private respawnPos: Vec2
  private tracing: Array<Vec2> = []
  private readonly traceLength = 300

  constructor() {
    this.circle = new Circle(Vec2.zero(), this.radius)
  }

  public setPos(pos: Vec2) {
    this.circle.pos = pos.add(new Vec2(this.radius, this.radius))
    this.respawnPos = pos
  }

  public addCheckPoint(pos: Vec2): void {
    this.checkPoints.push(pos)
  }

  public draw() {
    for (let i = 0; i < this.tracing.length; i++) {
      dm.fillCircle(new Circle(
        this.tracing[i], this.radius),
        Color.red_color(255, (0.1 / this.tracing.length) * i))
    }
    if (this.rotateCircle) {
      this.rotateCircle.draw(this.angle)
    }

    if (
      this.rotateCircle &&
      this.centerEntity &&
      this.centerEntity.transparent()
    ) {
      dm.fillCircle(this.circle, Color.red_color(200, 0.1))
      dm.strokeCircle(this.circle, Color.red, 3)
    } else {
      dm.fillCircle(this.circle, Color.red_color(200, 0.7))
      dm.strokeCircle(this.circle, Color.red, 3)
    }
  }

  public update(entities: Entities): void {
    this.trace()

    if (InputMouse.isMouseLeftDown()) {
      if (this.rotateCircle == null) {
        this.rotateStart(entities)
      }
      this.rotate(entities)
    } else {
      if (this.rotateCircle) {
        this.rotateEnd(entities)
      }
    }
    if (this.centerEntity == null) {
      this.notRotate(entities)
    }
  }

  private trace(): void {
    while (this.tracing.length >= this.traceLength) {
      this.tracing.shift()
    }
    if (this.tracing.length == 0) {
      this.tracing.push(this.circle.pos.deepCopy())
    } else {
      const last = this.tracing[this.tracing.length - 1]
      const vec = this.circle.pos.sub(last)
      const norm = vec.normalize()
      for (let i = 1; i < vec.dist(Vec2.zero()); i += 5) {
        this.tracing.push(last.add(norm.scalarMul(i)))
      }
      this.tracing.shift()
    }
  }

  private rotateStart(entities: Entities): void {
    const center = Camera.getMousePosInCamera()

    if (this.circle.inVec2(center)) {
      return
    }

    this.centerEntity = entities.getCenter(center)

    if (this.centerEntity) {
      this.centerEntity.rotateStart(center)
    } else {
      return
    }

    this.len = center.dist(this.circle.pos)

    const sub = this.circle.pos.sub(center)

    const start_angle = radianToDegree(Math.atan2(sub.y, sub.x))
    this.angle = start_angle

    this.rotateCircle = new RotateCircle(
      new Circle(center, this.len),
      new Circle(this.circle.pos, this.radius),
      start_angle,
      this.centerEntity.rotateDir()
    )

    this.ay = 0

    this.angleSpeed = 1.0
  }

  private rotate(entities: Entities): void {
    if (this.rotateCircle == null) {
      return
    }

    if (this.centerEntity) {
      this.rotateCircle.setPos(this.centerEntity.getCenterPos())
    }

    if (this.centerEntity) {
      if (this.centerEntity.rotateDir()) {
        this.angle += this.angleSpeed
      } else {
        this.angle -= this.angleSpeed
      }
    }
    this.angleSpeed += 0.02

    const prevPos = this.circle.pos

    this.circle.pos = this.rotateCircle
      .getPos()
      .add(Vec2.cosSin(this.angle).scalarMul(this.len))

    if (this.centerEntity && !this.centerEntity.transparent()) {
      if (entities.isCollide(this.circle)) {
        this.circle.pos = prevPos
        this.rotateEnd(entities)
      }
    }
    /*
    Camera.move(
      new Vec2(Camera.getDistFromCetnerX(this.rotateCircle.pos) / 20, 0)
    )*/
  }

  private rotateEnd(entities: Entities): void {
    this.angle = 0

    if (this.centerEntity && this.centerEntity.transparent()) {
      if (this.rotateCircle && entities.isCollide(this.circle)) {
        this.circle.pos = this.rotateCircle.getStartPos()
      }
    }
    this.rotateCircle = null

    if (this.centerEntity) {
      this.centerEntity.rotateEnd()
    }
    this.centerEntity = null
  }

  private notRotate(entities: Entities): void {
    Camera.move(new Vec2(Camera.getDistFromCetnerX(this.circle.pos) / 50.0, 0))

    entities.getIsCenter(Camera.getMousePosInCamera())

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

    if (entities.isCollide(this.circle)) {
      this.circle.pos.subAssign(vec)
      Camera.move(new Vec2(-vec.x, 0))
      if (vec.y > 0) {
        this.ay = 0
      }
    }

    for (let checkPoint of this.checkPoints) {
      if (this.circle.pos.x > checkPoint.x && checkPoint.x > this.respawnPos.x) {
        this.respawnPos = checkPoint
      }
    }

    if (this.circle.pos.y > 1200 || this.circle.pos.y < -300) {
      this.circle.pos = this.respawnPos
      Camera.move(new Vec2(Camera.getDistFromCetnerX(this.circle.pos), 0))
    }
  }
}
