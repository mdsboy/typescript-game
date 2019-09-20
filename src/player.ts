import { InputKey, KeyCode } from './lib/inputKey'
import { InputMouse } from './lib/inputMouse'

import dm from './lib/drawManager'

import { radianToDegree, degreeToRadian } from './lib/util'

import Point from './lib/point'
import Circle from './lib/circle'

export default class Player {
  private speed: number
  private circle: Circle
  private angle: number
  private rotate: boolean
  private center: Point
  private rotate_circle: Circle | null
  private len: number
  private ay: number

  constructor() {
    this.speed = 5
    this.circle = new Circle(new Point(100, 100), 30)
    this.rotate_circle = null
    this.ay = 0
  }

  public draw() {
    dm.circle(this.circle, '#000', true)

    if (this.rotate_circle) {
      dm.circle(this.rotate_circle, '#000', false)
    }
  }

  public update(): void {
    let pos = this.circle.pos

    if (InputKey.isKeyDown(KeyCode.A)) {
      pos.x -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      pos.x += this.speed
    }

    if (InputMouse.isMouseLeftDown()) {
      if (!this.rotate) {
        this.rotate = true
        this.center = InputMouse.getMousepos()

        this.len = this.center.dist(pos)
        this.rotate_circle = new Circle(this.center, this.len)

        const x = pos.x - this.center.x
        const y = pos.y - this.center.y
        this.angle = radianToDegree(Math.atan2(y, x))
        console.log(this.angle)

        this.ay = 0
      }
    } else {
      this.rotate = false
      this.angle = 0
    }

    if (this.rotate) {
      this.angle += 1
      pos.x =
        this.center.x + this.len * Math.cos(degreeToRadian(this.angle))
      pos.y =
        this.center.y + this.len * Math.sin(degreeToRadian(this.angle))
    } else {
      pos.y += this.ay
      this.ay += 1
    }

    if (pos.y >= dm.height) {
      pos.y = dm.height
      this.ay = 0
    }
  }
}
