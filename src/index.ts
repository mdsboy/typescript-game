import Game from './game'

const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

let g: Game;
if (ctx) {
  g = new Game(ctx)
} else {
  console.error('Canvas is null')
}

onload = () => {
  setInterval(() => {
    g.update()
    g.draw()
  } , 1000 / 60);

}
