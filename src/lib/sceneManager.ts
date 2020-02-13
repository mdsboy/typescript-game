import SceneBase from './sceneBase'
import DrawManager from './drawManager'

import Rect from './rect'
import Vec2 from './vec2'
import Color from './color'
import Camera from './camera'

export default class SceneManager {
  private static current: SceneBase
  private static screen: Rect

  public static init(scene: SceneBase, width: number, height: number) {
    DrawManager.init(width, height)
    Camera.init(width, height)
    this.current = scene
    this.screen = new Rect(Vec2.zero, width, height)
  }

  public static run(): void {
    this.clear()
    this.current.draw()
    this.current = this.current.update()

    requestAnimationFrame(() => this.run())
  }

  public static getScreen(): Rect {
    return this.screen
  }

  private static clear(): void {
    DrawManager.fillRect(this.screen, Color.white)
    DrawManager.strokeRect(this.screen, Color.black, 3)
  }
}
