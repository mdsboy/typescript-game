import game from './game'

const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

let g: game;
if (ctx) {
  g = new game(ctx)
} else {
  console.error('Canvas is null')
}

onload = () => {
  setInterval(() => {
    g.update()
    g.draw()
  } , 1000 / 60);

}
