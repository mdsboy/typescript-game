import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'

export default interface RotateEntity {
  draw(): void
  update(): void

  move(v: Vec2): void

  rotateStart(center: Vec2): void
  rotateEnd(): void

  getIsCenter(center: Vec2): boolean
  getCenterPos(): Vec2

  rotateDir(): boolean

  collide(circle: Circle): boolean
  transparent(): boolean
}