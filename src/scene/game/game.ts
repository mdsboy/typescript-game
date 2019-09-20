import SceneBase from 'lib/sceneBase'

import dm from 'lib/drawManager'

import Player from './player'
import Rect from 'lib/rect'
import Vec2 from 'lib/vec2'

export default class Game implements SceneBase {
  private player: Player

  private rect: Rect

  constructor() {
    this.player = new Player()
    this.rect = new Rect(Vec2.zero, 200, 200)
  }

  public draw() {
    this.player.draw()

    dm.rect(this.rect, '#def', true)
    dm.line(new Vec2(50, 100), new Vec2(200, 300), 3, '#000')
    dm.string(new Vec2(300, 300), 'abcdef', 300, '000')
  }

  public update(): SceneBase {
    this.player.update()

    return this
  }
}
