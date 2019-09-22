import Title from 'scene/title'
import SceneManager from 'lib/sceneManager'

onload = () => {
  SceneManager.init(new Title(), 1080, 720)
  SceneManager.run()
}
