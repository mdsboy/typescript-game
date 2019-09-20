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
  private isRotating: boolean
  private center: Point
  private rotateCircle: Circle | null
  private len: number
  private ay: number

  constructor() {
    this.speed = 5
    this.circle = new Circle(new Point(100, 100), 30)
    this.rotateCircle = null
    this.ay = 0
  }

  public draw() {
    dm.circle(this.circle, '#000', true)

    if (this.rotateCircle) {
      dm.circle(this.rotateCircle, '#000', false)
    }
  }

  public update(): void {
    if (InputMouse.isMouseLeftDown()) {
      if (!this.isRotating) {
        this.rotateStart()
      }
      this.rotate()
    } else {
      this.rotateEnd()
      this.notRotate()
    }
  }

  private rotateStart(): void {
    this.isRotating = true
    this.center = InputMouse.getMousepos()

    this.len = this.center.dist(this.circle.pos)
    this.rotateCircle = new Circle(this.center, this.len)

    const x = this.circle.pos.x - this.center.x
    const y = this.circle.pos.y - this.center.y
    this.angle = radianToDegree(Math.atan2(y, x))
    console.log(this.angle)

    this.ay = 0
  }

  private rotate(): void {
    this.angle += 1
    const x = this.center.x + this.len * Math.cos(degreeToRadian(this.angle))
    const y = this.center.y + this.len * Math.sin(degreeToRadian(this.angle))
    this.circle.pos = new Point(x, y)
  }

  private rotateEnd(): void {
    this.rotateCircle = null
    this.isRotating = false
    this.angle = 0
  }

  private notRotate(): void {
    let pos = this.circle.pos

    if (InputKey.isKeyDown(KeyCode.A)) {
      pos.x -= this.speed
    }
    if (InputKey.isKeyDown(KeyCode.D)) {
      pos.x += this.speed
    }

    pos.y += this.ay
    this.ay += 1
    if (pos.y >= dm.height) {
      pos.y = dm.height
      this.ay = 0
    }
  }
}
