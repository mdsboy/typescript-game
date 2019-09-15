export default interface SceneBase {
  draw(): void
  update(): SceneBase
}