import { InputKey, KeyCode } from 'lib/inputKey'
import { InputMouse } from 'lib/inputMouse'

import dm from 'lib/drawManager'

import { radianToDegree, degreeToRadian } from 'lib/util'

import Vec2 from 'lib/vec2'
import Circle from 'lib/circle'

export default class Player {
  private readonly speed: number
  private circle: Circle
  private angle: number
  private rotateCircle: Circle | null
  private len: number
  private ay: number

  constructor() {
    this.speed = 5
    this.circle = new Circle(new Vec2(100, 100), 30)
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
      if (this.rotateCircle == null) {
        this.rotateStart()
      }
      this.rotate()
    } else {
      this.rotateEnd()
      this.notRotate()
    }
  }

  private rotateStart(): void {
    const center = InputMouse.getMousepos()

    this.len = center.dist(this.circle.pos)
    this.rotateCircle = new Circle(center, this.len)

    const sub = this.circle.pos.sub(center)
    this.angle = radianToDegree(Math.atan2(sub.y, sub.x))
    console.log(this.angle)

    this.ay = 0
  }

  private rotate(): void {
    if (this.rotateCircle == null) {
      return
    }

    this.angle += 1

    this.circle.pos = this.rotateCircle.pos.add(
      Vec2.cosSin(degreeToRadian(this.angle)).scalarMul(this.len)
    )
    console.log(this.circle.pos)
  }

  private rotateEnd(): void {
    this.rotateCircle = null
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
