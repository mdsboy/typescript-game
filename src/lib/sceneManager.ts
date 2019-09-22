import SceneBase from './sceneBase'
import DrawManager from './drawManager'

import Rect from './rect'
import Vec2 from './vec2'

export default class SceneManager {
  private current: SceneBase
  private screen: Rect

  constructor(readonly scene: SceneBase, width: number, height: number) {
    DrawManager.init(width, height)
    this.current = scene
    this.screen = new Rect(Vec2.zero(), width, height)
  }

  public run(): void {
    this.clear()
    this.current.draw()
    this.current = this.current.update()

    requestAnimationFrame(() => this.run())
  }

  private clear(): void {
    DrawManager.fillRect(this.screen, '#ffffff')
    DrawManager.strokeRect(this.screen, '#000000', 3)
  }
}
