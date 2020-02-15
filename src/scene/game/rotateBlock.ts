import RotateEntity from './rotateEntity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'

export default class RotateBlock implements RotateEntity {
  public static size: number
  private rect: Rect
  private circle: Circle
  private isCenter: boolean
  private centerPos: Vec2
  private dir: boolean
  private trans: boolean
  private angle1 = 120
  private angle2 = 60
  private readonly angleSpeed = 0.5

  constructor(pos: Vec2, dir: boolean, trans: boolean) {
    this.rect = new Rect(pos, RotateBlock.size, RotateBlock.size)
    this.circle = new Circle(pos, RotateBlock.size / 3)
    this.dir = dir
    this.trans = trans
  }

  public draw(): void {
    if (this.trans) {
      dm.fillRect(this.rect, new Color(200, 200, 200))
      dm.strokeRect(this.rect, Color.blue, 3)
    } else {
      dm.fillRect(this.rect, new Color(100, 100, 100))
      dm.strokeRect(this.rect, Color.blue, 3)
    }

    if (this.isCenter) {
      dm.fillRect(this.rect, new Color(100, 0, 0, 0.8))
    }

    this.circle.pos = this.rect.pos.add(
      new Vec2(RotateBlock.size / 2, RotateBlock.size / 2)
    )

    if (this.dir) {
      dm.strokeArc(this.circle, this.angle1, this.angle2, Color.white, 2)

      const startPos = this.circle.pos.add(
        Vec2.cosSin(this.angle2).scalarMul(this.circle.radius)
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
      dm.strokeArc(this.circle, this.angle1, this.angle2, Color.white, 2)

      const startPos = this.circle.pos.add(
        Vec2.cosSin(this.angle1).scalarMul(this.circle.radius)
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

  public rotateStart(center: Vec2): void {
    this.centerPos = center.sub(this.rect.pos)
  }

  public rotateEnd(): void {
    this.isCenter = false
  }

  public getIsCenter(center: Vec2): boolean {
    this.isCenter = this.rect.inVec2(center)
    return this.rect.inVec2(center)
  }

  public getCenterPos(): Vec2 {
    return this.centerPos.add(this.rect.pos)
  }

  public rotateDir(): boolean {
    return this.dir
  }

  public collide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }

  public transparent(): boolean {
    return this.trans
  }
}
