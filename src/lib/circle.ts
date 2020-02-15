import Vec2 from './vec2'
import Rect from './rect'

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

  public collideRect(rect: Rect): boolean {
    const rect1 = new Rect(rect.pos.sub(new Vec2(0, this.radius)), rect.width, rect.height + 2 * this.radius)
    //DrawManager.rect(rect1, '#00ff00', false)

    const rect2 = new Rect(rect.pos.sub(new Vec2(this.radius, 0)), rect.width + 2 * this.radius, rect.height)
    //DrawManager.rect(rect2, '#00ff00', false)

    if (rect1.inVec2(this.pos)) {
      return true
    }

    if (rect2.inVec2(this.pos)) {
      return true
    }

    if (rect.pos.dist(this.pos) <= this.radius) {
      return true
    }

    if (rect.pos.add(new Vec2(0, rect.height)).dist(this.pos) <= this.radius) {
      return true
    }

    if (rect.pos.add(new Vec2(rect.width, 0)).dist(this.pos) <= this.radius) {
      return true
    }

    if (rect.pos.add(new Vec2(rect.width, rect.height)).dist(this.pos) <= this.radius) {
      return true
    }

    return false
  }
}
