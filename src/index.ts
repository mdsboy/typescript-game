import Title from './title'
import SceneManager from './lib/sceneManager'

onload = () => {
  let sceneManager = new SceneManager(new Title())
  sceneManager.run()
}
