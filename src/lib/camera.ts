import Vec2 from './vec2'
import { InputMouse } from './inputMouse'

export default class Camera {
  private static pos: Vec2
  private static width: number
  private static height: number

  public static init(width: number, height: number) {
    this.pos = new Vec2(0, 0)
    this.width = width
    this.height = height
  }

  public static getCameraPos(): Vec2 {
    return this.pos
  }

  public static move(v: Vec2): void {
    this.pos.addAssign(v)
  }

  public static getPosInCamera(v: Vec2): Vec2 {
    return v.sub(this.pos)
  }

  public static getMousePosInCamera(): Vec2 {
    return InputMouse.getMousepos().add(this.pos)
  }
}
