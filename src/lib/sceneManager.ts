import SceneBase from './sceneBase'
import DrawManager from './drawManager';

export default class SceneManager {
  private current: SceneBase
  private dm: DrawManager

  constructor(readonly scene: SceneBase) {
    this.current = scene
    this.dm = new DrawManager(800, 600)
  }

  public run(): void {
    this.current.draw(this.dm)
    this.current = this.current.update()
    requestAnimationFrame(() => this.run())
  }
}
