import Vec2 from './vec2'

export default class Circle {
  public pos: Vec2
  public radius: number

  constructor(pos: Vec2, radius: number) {
    this.pos = pos
    this.radius = radius
  }

  public inVec2(pos: Vec2): boolean {
    return this.pos.dist(pos) <= this.radius
  }
}
