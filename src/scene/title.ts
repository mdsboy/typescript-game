import Vec2 from 'lib/vec2'

import DrawManager from 'lib/drawManager'
import { InputKey, KeyCode } from 'lib/inputKey'

import SceneBase from 'lib/sceneBase'
import Game from './game/game'
import Color from 'lib/color'

export default class Title implements SceneBase {
  constructor() {
  }

  public draw() {
    DrawManager.string(new Vec2(300, 300), "title", 300, Color.black)
  }

  public update(): SceneBase {
    if (InputKey.isKeyDown(KeyCode.A)) {
      return new Game()
    }
    return this
  }
}
