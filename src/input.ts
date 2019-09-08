export class InputKey {
  private static keyMap = new Map<KeyCode, Boolean>()

  public static keyDown(ev: KeyboardEvent) {
    this.keyMap.set(keyCode[ev.key], true)
  }

  public static keyUp(ev: KeyboardEvent) {
    this.keyMap.set(keyCode[ev.key], false)
  }

  public static isKeyDown(code: KeyCode): Boolean {
    const result = this.keyMap.get(code)
    return result == undefined ? false : result
  }
}

document.onkeydown = e => {
  InputKey.keyDown(e)
}
document.onkeyup = e => {
  InputKey.keyUp(e)
}

export enum KeyCode {
  A,
  D,
  S,
  W
}
const keyCode: { [id: string]: KeyCode } = {
  a: KeyCode.A,
  d: KeyCode.D,
  s: KeyCode.S,
  w: KeyCode.W
}
