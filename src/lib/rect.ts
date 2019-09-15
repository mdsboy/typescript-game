import Point from './point'
import { between } from './util'

export default class Rect {
  public pos: Point
  public width: number
  public height: number

  constructor(pos: Point, width: number, height: number) {
    this.pos = pos
    this.width = width
    this.height = height
  }

  public inPoint(pos: Point): boolean {
    return (
      between(this.pos.x, pos.x, this.pos.x + this.width) &&
      between(this.pos.y, pos.y, this.pos.y + this.height)
    )
  }
}
