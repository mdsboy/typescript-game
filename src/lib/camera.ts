import Vec2 from './vec2'
import { InputMouse } from './inputMouse'
import Rect from './rect'
import DrawManager from './drawManager'

export default class Camera {
  private static rect: Rect

  public static init(width: number, height: number) {
    this.rect = new Rect(Vec2.zero(), width, height)
  }

  public static getCameraPos(): Vec2 {
    return this.rect.pos
  }

  public static move(v: Vec2): void {
    this.rect.pos.addAssign(v)
  }

  public static getPosInCamera(v: Vec2): Vec2 {
    return v.sub(this.rect.pos)
  }

  public static getMousePosInCamera(): Vec2 {
    if (InputMouse.getMousepos()) {
      return InputMouse.getMousepos().add(this.rect.pos)
    } else {
      return Vec2.zero()
    }
  }

  public static getDistFromCetnerX(v: Vec2): number {
    return this.getPosInCamera(v).x - this.rect.width / 2
  }

  public static getCameraRect(): Rect {
    return this.rect
  }
}
