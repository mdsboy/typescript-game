import RotateEntity from './rotateEntity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'
import Camera from 'lib/camera'

export default class RotateMoveBlock implements RotateEntity {
  public static size: number
  private rect: Rect
  private isCenter: boolean
  private centerPos: Vec2
  private vec: Vec2

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, RotateMoveBlock.size, RotateMoveBlock.size)
    this.vec = new Vec2(3, 0)
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(200, 200, 200))
    dm.strokeRect(this.rect, Color.blue, 3)

    if (this.isCenter) {
      dm.fillRect(this.rect, new Color(100, 0, 0, 0.8))
    }
  }
  public update(): void {
    if (this.isCenter) {
      Camera.move(this.vec)
    }
    this.move(this.vec)
  }

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public rotateStart(center: Vec2): void {
    this.isCenter = true
    this.centerPos = center.sub(this.rect.pos)
  }

  public rotateEnd(): void {
    this.isCenter = false
  }

  public getIsCenter(center: Vec2): boolean {
    return this.rect.inVec2(center)
  }

  public getCenterPos(): Vec2 {
    return this.centerPos.add(this.rect.pos)
  }

  public rotateDir(): boolean {
    return true
  }

  public collide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }

  public transparent(): boolean {
    return false
  }
}
