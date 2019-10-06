import Entity from './entity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'

import { degreeToRadian } from 'lib/util'

export default class RevBlock implements Entity {
  public static size: number
  private rect: Rect
  private circle: Circle
  private isCenter: boolean
  private centerPos: Vec2

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, RevBlock.size, RevBlock.size)
    this.circle = new Circle(pos, RevBlock.size / 3)
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(100, 100, 100))
    dm.strokeRect(this.rect, Color.blue, 3)

    if (this.isCenter) {
      dm.fillRect(this.rect, new Color(100, 0, 0, 0.8))
    }

    this.circle.pos = this.rect.pos.add(
      new Vec2(RevBlock.size / 2, RevBlock.size / 2)
    )

    dm.strokeArc(
      this.circle,
      degreeToRadian(120),
      degreeToRadian(60),
      Color.white,
      2
    )

    const startPos = this.circle.pos.add(
      new Vec2(
        Math.cos(degreeToRadian(120)),
        Math.sin(degreeToRadian(120))
      ).scalarMul(this.circle.radius)
    )
    dm.line(startPos, startPos.add(new Vec2(-10, 0)), Color.white, 2)
    dm.line(startPos, startPos.add(new Vec2(5, -10)), Color.white, 2)
  }
  public update(_entities: Array<Entity>): void {}

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
    return false
  }

  public collide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }
}
