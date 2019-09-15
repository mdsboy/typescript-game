import Title from './title'
import SceneManager from './lib/sceneManager'

onload = () => {
  let sceneManager = new SceneManager(new Title(), 800, 600)
  sceneManager.run()
}
