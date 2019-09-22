import Entity from './entity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color'
import Circle from 'lib/circle'

export default class Box implements Entity {
  public static size: number
  private rect: Rect
  private isCenter: boolean
  private ay: number

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, Box.size, Box.size)
    this.ay = 0
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(200, 200, 200))
    dm.strokeRect(this.rect, Color.blue, 3)

    if (this.isCenter) {
      dm.fillRect(this.rect, new Color(100, 0, 0, 0.8))
    }
  }
  public update(): void {
    this.ay += 1
    this.rect.pos.y += this.ay
  }

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public rotateStart(center: Vec2): void {
    this.isCenter = this.rect.inVec2(center)
  }

  public rotateEnd(): void {
    this.isCenter = false
  }

  public collide(circle: Circle): boolean {
    return circle.collideRect(this.rect)
  }
}
