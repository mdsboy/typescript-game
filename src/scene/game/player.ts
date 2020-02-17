import { InputKey, KeyCode } from 'lib/inputKey'
import { InputMouse } from 'lib/inputMouse'

import dm from 'lib/drawManager'
import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'
import Color from 'lib/color'
import Entity from './entity'
import Camera from 'lib/camera'
import Entities from './entities'

export default class Player {
  private readonly speed = 10
  private circle: Circle
  private readonly radius = 25
  private ay = 0
  private targetEntity: Entity | null = null
  private checkPoints: Array<Vec2> = []
  private respawnPos: Vec2
  private tracing: Array<[Vec2, Color]> = []
  private readonly traceLength = 300
  private readonly normalColor = new Color(150, 150, 150)
  private color = this.normalColor

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
        this.tracing[i][0], this.radius),
        this.tracing[i][1].getAlphaColor((0.1 / this.tracing.length) * i))
    }

    if (this.targetEntity && this.targetEntity.isTransparent()) {
      dm.fillCircle(this.circle, Color.red_color(200, 0.1))
      dm.strokeCircle(this.circle, Color.red, 3)
    } else {
      dm.fillCircle(this.circle, this.color.getAlphaColor(0.1))
      dm.strokeCircle(this.circle, this.color.getAlphaColor(0.7), 3)
    }
  }

  public update(entities: Entities): void {
    this.trace()

    if (InputMouse.isMouseLeftDown()) {
      if (this.targetEntity == null) {
        this.clickStart(entities)
      }
      this.targetMove(entities)
    } else {
      if (this.targetEntity) {
        this.clickEnd(entities)
      }
    }
    if (this.targetEntity == null) {
      this.notRotate(entities)
    }
  }

  private trace(): void {
    while (this.tracing.length >= this.traceLength) {
      this.tracing.shift()
    }
    if (this.tracing.length == 0) {
      this.tracing.push([this.circle.pos.deepCopy(), this.color.deepCopy()])
    } else {
      const last = this.tracing[this.tracing.length - 1]
      const vec = this.circle.pos.sub(last[0])
      const norm = vec.normalize()
      for (let i = 1; i < vec.dist(Vec2.zero()); i += 5) {
        this.tracing.push([last[0].add(norm.scalarMul(i)), this.color.deepCopy()])
      }
      this.tracing.shift()
    }
  }

  private clickStart(entities: Entities): void {
    const center = Camera.getMousePosInCamera()

    if (this.circle.inVec2(center)) {
      return
    }

    this.targetEntity = entities.getClicked(center)

    if (this.targetEntity) {
      this.targetEntity.moveStart(this.circle, center)
      this.ay = 0
    }
  }

  private targetMove(entities: Entities): void {
    if (this.targetEntity == null) {
      return
    }

    this.color = this.targetEntity.getColor()

    const prevPos = this.circle.pos

    this.circle.pos = this.targetEntity.getNextPos(this.circle.pos)

    if (this.targetEntity && !this.targetEntity.isTransparent()) {
      if (entities.isCollide(this.circle)) {
        this.circle.pos = prevPos
        this.clickEnd(entities)
      }
    }
  }

  private clickEnd(entities: Entities): void {
    if (this.targetEntity && this.targetEntity.isTransparent() && entities.isCollide(this.circle)) {
      const startPos = this.targetEntity.getStartPos()
      if (startPos) {
        this.circle.pos = startPos
      }
    }

    if (this.targetEntity) {
      this.targetEntity.moveEnd()
    }
    this.targetEntity = null
  }

  private notRotate(entities: Entities): void {
    Camera.move(new Vec2(
      Camera.getDistFromCetnerX(this.circle.pos.add(new Vec2(300, 0))) / 50.0, 0))

    entities.getClicked(Camera.getMousePosInCamera())

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
