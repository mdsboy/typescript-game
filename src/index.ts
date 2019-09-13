import Title from './title'
import SceneManager from './sceneManager'

onload = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 600
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    console.error('Canvas is null')
    return
  }

  let sceneManager = new SceneManager(new Title(), ctx)
  setInterval(() => {
    sceneManager.run()
  }, 1000 / 60)
}
