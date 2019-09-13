import Title from './title'
import SceneManager from './sceneManager'

onload = () => {
  let sceneManager = new SceneManager(new Title())
  sceneManager.run()
}
