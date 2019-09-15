import DrawManager from './lib/drawManager'
import { InputKey, KeyCode } from './lib/input'

import SceneBase from './lib/sceneBase'
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
