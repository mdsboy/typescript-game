import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'
import Entity from './entity'
import RotateCircle from './rotateCircle'
import { radianToDegree } from 'lib/util'

export default class RotateBlock implements Entity {
  public static size: number
  private rect: Rect
  private arkCircle: Circle
  private isTarget: boolean
  private centerPos: Vec2
  private dir: boolean
  private trans: boolean
  private angle1 = 120
  private angle2 = 60
  private readonly angleFirstSpeed = 0.5
  private color: Color

  private angle: number
  private angleSpeed = 1.0
  private len: number
  private rotateCircle: RotateCircle | null = null

  constructor(pos: Vec2, dir: boolean, trans: boolean) {
    this.rect = new Rect(pos, RotateBlock.size, RotateBlock.size)
    this.arkCircle = new Circle(pos, RotateBlock.size / 3)
    this.dir = dir
    this.trans = trans
  }

  public draw(): void {
    if (this.dir) {
      this.color = new Color(150, 200, 0);
    } else {
      this.color = new Color(0, 200, 150);
    }
    if (this.trans) {
      dm.fillRect(this.rect, new Color(200, 200, 200))
      dm.strokeRect(this.rect, this.color, 3)
    } else {
      dm.fillRect(this.rect, this.color.getAlphaColor(0.5))
      dm.strokeRect(this.rect, this.color, 3)
    }

    if (this.isTarget) {
      dm.fillRect(this.rect, new Color(50, 50, 50, 0.8))
    }

    this.arkCircle.pos = this.rect.pos.add(
      new Vec2(RotateBlock.size / 2, RotateBlock.size / 2)
    )

    if (this.dir) {
      dm.strokeArc(this.arkCircle, this.angle1, this.angle2, Color.white, 2)

      const startPos = this.arkCircle.pos.add(
        Vec2.cosSin(this.angle2).scalarMul(this.arkCircle.radius)
      )
      dm.line(
        startPos,
        startPos.add(Vec2.cosSin(this.angle2 - 60).scalarMul(10)),
        Color.white,
        2
      )
      dm.line(
        startPos,
        startPos.add(Vec2.cosSin(this.angle2 - 150).scalarMul(10)),
        Color.white,
        2
      )
    } else {
      dm.strokeArc(this.arkCircle, this.angle1, this.angle2, Color.white, 2)

      const startPos = this.arkCircle.pos.add(
        Vec2.cosSin(this.angle1).scalarMul(this.arkCircle.radius)
      )

      dm.line(
        startPos,
        startPos.add(Vec2.cosSin(this.angle1 + 60).scalarMul(10)),
        Color.white,
        2
      )
      dm.line(
        startPos,
        startPos.add(Vec2.cosSin(this.angle1 + 150).scalarMul(10)),
        Color.white,
        2
      )
    }
    if (this.rotateCircle) {
      this.rotateCircle.draw(this.angle)
    }
  }

  public update(): void {
    if (this.dir) {
      this.angle1 += this.angleSpeed
      this.angle2 += this.angleSpeed
    } else {
      this.angle1 -= this.angleSpeed
      this.angle2 -= this.angleSpeed
    }
  }

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public moveStart(circle: Circle, center: Vec2): void {
    this.centerPos = center.sub(this.rect.pos)
    this.angleSpeed = this.angleFirstSpeed

    this.len = center.dist(circle.pos)

    const sub = circle.pos.sub(center)

    const start_angle = radianToDegree(Math.atan2(sub.y, sub.x))
    this.angle = start_angle

    this.rotateCircle = new RotateCircle(
      new Circle(center, this.len),
      new Circle(circle.pos, circle.radius),
      start_angle,
      this.dir
    )
    console.log(this.rotateCircle)

    this.angleSpeed = 1.0
  }

  public moveEnd(): void {
    this.isTarget = false

    this.angle = 0

    this.rotateCircle = null
  }

  public getStartPos(): Vec2 | null {
    if (this.rotateCircle) {
      return this.rotateCircle.getStartPos()
    } else {
      return null
    }
  }

  public isClicked(center: Vec2): boolean {
    this.isTarget = this.rect.inVec2(center)
    return this.rect.inVec2(center)
  }

  private getCenterPos(): Vec2 {
    return this.centerPos.add(this.rect.pos)
  }

  public getNextPos(circlePos: Vec2): Vec2 {
    if (!this.rotateCircle) {
      return circlePos
    }
    this.rotateCircle.setPos(this.getCenterPos())

    if (this.dir) {
      this.angle += this.angleSpeed
    } else {
      this.angle -= this.angleSpeed
    }
    this.angleSpeed += 0.02

    return this.rotateCircle
      .getPos()
      .add(Vec2.cosSin(this.angle).scalarMul(this.len))
  }

  public isCollide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }

  public isTransparent(): boolean {
    return this.trans
  }

  public getColor(): Color {
    return this.color
  }
}
