import SceneBase from './lib/sceneBase'

import dm from './lib/drawManager'

import Player from './player'
import Rect from './lib/rect'
import Point from './lib/point'

export default class Game implements SceneBase {
  private player: Player

  private rect: Rect

  constructor() {
    this.player = new Player()
    this.rect = new Rect(Point.zero, 200, 200)
  }

  public draw() {
    this.player.draw()

    dm.rect(this.rect, '#def', true)
    dm.line(new Point(50, 100), new Point(200, 300), 3, '#000')
    dm.string(new Point(300, 300), 'abcdef', 300, '000')
  }

  public update(): SceneBase {
    this.player.update()

    return this
  }
}
