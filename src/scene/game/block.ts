import Entity from './entity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color';
import { InputMouse } from 'lib/inputMouse';
import Circle from 'lib/circle';

export default class Block implements Entity {
  public rect: Rect
  public static size: number
  private isCenter: boolean

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, Block.size, Block.size)
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(100, 100, 100))
    dm.strokeRect(this.rect, Color.blue, 3)
    
    if (this.isCenter) {
      dm.fillRect(this.rect, new Color(100, 0, 0, 0.8))
    }
  }
  public update(): void {}

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
