import Vec2 from './vec2'
import { between } from './util'
import Circle from './circle'

export default class Rect {
  public pos: Vec2
  public width: number
  public height: number

  constructor(pos: Vec2, width: number, height: number) {
    this.pos = pos
    this.width = width
    this.height = height
  }

  public inVec2(pos: Vec2): boolean {
    return (
      between(this.pos.x, pos.x, this.pos.x + this.width) &&
      between(this.pos.y, pos.y, this.pos.y + this.height)
    )
  }
}
