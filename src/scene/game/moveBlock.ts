import Entity from './entity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'

export default class moveBlock implements Entity {
  public static size: number
  private rect: Rect
  private isCenter: boolean
  private centerPos: Vec2
  private vec: Vec2

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, moveBlock.size, moveBlock.size)
    this.vec = new Vec2(3, 0)
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(200, 200, 200))
    dm.strokeRect(this.rect, Color.blue, 3)

    if (this.isCenter) {
      dm.fillRect(this.rect, new Color(100, 0, 0, 0.8))
    }
  }
  public update(entities: Array<Entity>): void {
    if (this.isCenter) {
      for (let entity of entities) {
        if (entity != this) {
          entity.move(this.vec.scalarMul(-1))
        }
      }
    } else {
      this.rect.pos.addAssign(this.vec)
    }
  }

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public rotateStart(center: Vec2): void {
    this.isCenter = this.rect.inVec2(center)
    this.centerPos = center.sub(this.rect.pos)
  }

  public rotateEnd(): void {
    this.isCenter = false
  }

  public getIsCenter(): boolean {
    return this.isCenter
  }

  public getCenterPos(): Vec2 {
    return this.centerPos.add(this.rect.pos)
  }

  public collide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }
}
