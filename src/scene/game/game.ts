import SceneBase from 'lib/sceneBase'

import dm from 'lib/drawManager'

import Player from './player'
import Vec2 from 'lib/vec2'
import Block from './block';

export default class Game implements SceneBase {
  private player: Player
  private block: Array<Block> = []

  constructor() {
    this.player = new Player()

    Block.size = 100
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 10; j++) {
        if (j >= 6 || i == 8) {
          this.block.push(new Block(new Vec2(i * 100, j * 100)))
        }
      }
    }
  }

  public draw() {
    for(let block of this.block){
      block.draw()
    }

    this.player.draw()
  }

  public update(): SceneBase {
    for(let block of this.block){
      block.update()
    }
    this.player.update(this.block)

    return this
  }
}
