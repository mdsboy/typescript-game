import MoveEntity from './moveEntity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'

import { degreeToRadian } from 'lib/util'

export default class MoveBlock implements MoveEntity {
  public static size: number
  private rect: Rect
  private isCenter: boolean
  private centerPos: Vec2

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, MoveBlock.size, MoveBlock.size)
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(100, 100, 100))
    dm.strokeRect(this.rect, Color.blue, 3)
  }
  public update(): void {
  }

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public moveStart(center: Vec2): void {
  }

  public moveEnd(): void {
  }

  public getIsCenter(center: Vec2): boolean {
    this.isCenter = this.rect.inVec2(center)
    return this.isCenter
  }

  public getCenterPos(): Vec2 {
    return this.centerPos.add(this.rect.pos)
  }

  public collide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }
}
