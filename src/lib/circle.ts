import Point from './point'

export default class Circle {
  public pos: Point
  public radius: number

  constructor(pos: Point, radius: number) {
    this.pos = pos
    this.radius = radius
  }

  public inPoint(pos: Point): boolean {
    return this.pos.dist(pos) <= this.radius
  }
}
