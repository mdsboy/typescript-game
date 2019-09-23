import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'

export default interface Entity {
  draw(): void
  update(entities: Array<Entity>): void

  move(v: Vec2): void

  rotateStart(center: Vec2): void
  rotateEnd(): void

  getIsCenter(): boolean
  getCenterPos(): Vec2

  collide(circle: Circle): boolean
}
