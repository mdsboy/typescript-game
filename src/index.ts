import game from './game'

const canvas = document.createElement('canvas')
canvas.width = 800
canvas.height = 600
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

onload = () => {
  if (ctx) {
    const g: game = new game(ctx)
    g.draw()
  } else {
    console.error('Canvas is null')
  }
}
