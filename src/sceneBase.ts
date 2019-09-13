export default interface SceneBase {
  draw(ctx: CanvasRenderingContext2D): void
  update(): SceneBase
}
