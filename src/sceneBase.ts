import DrawManager from './drawManager'

export default interface SceneBase {
  draw(dm: DrawManager): void
  update(): SceneBase
}
