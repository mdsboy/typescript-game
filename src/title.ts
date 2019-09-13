import DrawManager from './drawManager'
import { InputKey, KeyCode } from './input'

import SceneBase from './sceneBase'
import Game from './game'

export default class Title implements SceneBase {
  constructor() {
  }

  public draw(_dm: DrawManager) {
  }

  public update(): SceneBase {
    if (InputKey.isKeyDown(KeyCode.A)) {
        return new Game()
    }
    return this
  }
}
