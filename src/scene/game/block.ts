import Entity from './entity'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'
import dm from 'lib/drawManager'

export default class Block implements Entity {
  public rect: Rect
  public static size: number

  constructor(pos: Vec2) {
    this.rect = new Rect(pos, Block.size, Block.size)
  }

  public draw(): void {
    dm.rect(this.rect, '#000', true)
    dm.rect(this.rect, '#0000ff', false)
  }
  public update(): void {}

  public move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }
}
