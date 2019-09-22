import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'

export default interface Entity {
  draw(): void
  update(): void

  move(v: Vec2): void

  rotateStart(center: Vec2): void
  rotateEnd(): void

  collide(circle: Circle): boolean
}
