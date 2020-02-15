import Vec2 from './vec2'
import SceneManager from './sceneManager'

export class InputMouse {
  private static mouseInput: Array<boolean> = Array(2)
  private static mousePos: Vec2

  public static getMousepos(): Vec2 {
    return this.mousePos
  }

  public static isMouseLeftDown(): boolean {
    return this.mouseInput[0]
  }

  public static setMousePos(pos: Vec2) {
    this.mousePos = pos
  }

  public static mouseDown(): void {
    this.mouseInput[0] = true
  }

  public static mouseUp(): void {
    this.mouseInput[0] = false
  }
}

document.onmousemove = e => {
  InputMouse.setMousePos(new Vec2(e.offsetX, e.offsetY))
}

document.onmousedown = () => {
  console.log(SceneManager.getScreen())
  if (SceneManager.getScreen().inVec2(InputMouse.getMousepos())) {
    InputMouse.mouseDown()
  }
}

document.onmouseup = () => {
  InputMouse.mouseUp()
}
