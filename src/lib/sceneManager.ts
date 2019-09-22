import SceneBase from './sceneBase'
import DrawManager from './drawManager'

import Rect from './rect'
import Vec2 from './vec2'
import Color from './color';

export default class SceneManager {
  private current: SceneBase
  private screen: Rect

  constructor(readonly scene: SceneBase, width: number, height: number) {
    DrawManager.init(width, height)
    this.current = scene
    this.screen = new Rect(Vec2.zero, width, height)
  }

  public run(): void {
    this.clear()
    this.current.draw()
    this.current = this.current.update()

    requestAnimationFrame(() => this.run())
  }

  private clear(): void {
    DrawManager.fillRect(this.screen, Color.white)
    DrawManager.strokeRect(this.screen, Color.black, 3)
  }
}
