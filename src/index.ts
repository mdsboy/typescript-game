import Title from './title'
import SceneManager from './lib/sceneManager'

onload = () => {
  let sceneManager = new SceneManager(new Title(), 1080, 720)
  sceneManager.run()
}
