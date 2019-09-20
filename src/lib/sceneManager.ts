import SceneBase from './sceneBase'
import DrawManager from './drawManager'

import Rect from './rect'
import Point from './point'

export default class SceneManager {
  private current: SceneBase
  private screen: Rect

  constructor(readonly scene: SceneBase, width: number, height: number) {
    DrawManager.init(width, height)
    this.current = scene
    this.screen = new Rect(Point.zero, width, height)
  }

  public run(): void {
    this.clear()
    this.current.draw()
    this.current = this.current.update()

    requestAnimationFrame(() => this.run())
  }

  private clear(): void {
    DrawManager.rect(this.screen, '#ffffff', true)
    DrawManager.rect(this.screen, '#000000', false)
  }
}
