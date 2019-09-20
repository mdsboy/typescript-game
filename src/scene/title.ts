import Vec2 from 'lib/vec2';

import DrawManager from 'lib/drawManager'
import { InputKey, KeyCode } from 'lib/inputKey'

import SceneBase from 'lib/sceneBase'
import Game from './game/game'

export default class Title implements SceneBase {
  constructor() {
  }

  public draw() {
    DrawManager.string(new Vec2(300, 300), "title", 300, '#000')
  }

  public update(): SceneBase {
    if (InputKey.isKeyDown(KeyCode.A)) {
        return new Game()
    }
    return this
  }
}
