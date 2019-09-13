import SceneBase from './sceneBase'

export default class SceneManager {
  current: SceneBase
  ctx: CanvasRenderingContext2D

  constructor(scene: SceneBase, ctx: CanvasRenderingContext2D) {
    this.current = scene
    this.ctx = ctx
  }

  public run(): void {
    this.current.draw(this.ctx)
    this.current = this.current.update()
  }
}
