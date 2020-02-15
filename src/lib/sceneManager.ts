import SceneBase from './sceneBase'
import DrawManager from './drawManager'
import Camera from './camera'
import Rect from './rect'
import Vec2 from './vec2'

export default class SceneManager {
  private static current: SceneBase
  private static screen: Rect

  public static init(scene: SceneBase, width: number, height: number) {
    DrawManager.init(width, height)
    Camera.init(width, height)
    this.current = scene
    this.screen = new Rect(new Vec2(0, 0), width, height)
  }

  public static run(): void {
    this.current.draw()
    this.current = this.current.update()

    requestAnimationFrame(() => this.run())
  }

  public static getScreen(): Rect {
    return this.screen
  }
}
