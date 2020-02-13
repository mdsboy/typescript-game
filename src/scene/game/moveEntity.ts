import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'

export default interface MoveEntity {
  draw(): void
  update(): void

  move(v: Vec2): void

  moveStart(center: Vec2): void
  moveEnd(): void

  getIsCenter(center: Vec2): boolean
  getCenterPos(): Vec2

  collide(circle: Circle): boolean
}
