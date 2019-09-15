import SceneBase from './sceneBase'
import DrawManager from './drawManager'

import Rect from './rect'
import Point from './point'

export default class SceneManager {
  private current: SceneBase
  private dm: DrawManager
  private screen: Rect

  constructor(readonly scene: SceneBase, width: number, height: 600) {
    this.current = scene
    this.dm = new DrawManager(width, height)
    this.screen = new Rect(Point.zero, width, height)
  }

  public run(): void {
    this.clear()
    this.current.draw(this.dm)
    this.current = this.current.update()

    requestAnimationFrame(() => this.run())
  }

  public clear(): void {
    this.dm.rect(this.screen, '#ffffff', true)
  }
}
