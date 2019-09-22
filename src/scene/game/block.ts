import Entity from './entity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'
import Color from 'lib/color';

export default class Block implements Entity {
  public rect: Rect
  public static size: number

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, Block.size, Block.size)
  }

  public draw(): void {
    dm.fillRect(this.rect, new Color(100, 100, 100))
    dm.strokeRect(this.rect, Color.blue, 3)
  }
  public update(): void {}

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }
}
