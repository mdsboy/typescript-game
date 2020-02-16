import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'

export default interface Entity {
  draw(): void
  update(): void

  move(v: Vec2): void

  moveStart(circle: Circle, center: Vec2): void
  moveEnd(): void

  getStartPos(): Vec2 | null

  isClicked(clickPos: Vec2): boolean

  getVec2(circlePos: Vec2): Vec2

  isCollide(circle: Circle): boolean
  isTransparent(): boolean
}
