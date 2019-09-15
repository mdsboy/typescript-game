import Point from './point'

export default class Rect {
  public pos: Point
  public width: number
  public height: number

  constructor(pos: Point, width: number, height: number) {
    this.pos = pos
    this.width = width
    this.height = height
  }
}
