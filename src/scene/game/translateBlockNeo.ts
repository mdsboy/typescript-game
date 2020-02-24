import TranslateBlock from './translateBlock'

export default class TranslateBlockNeo extends TranslateBlock {
  private count = 0

  public update(): void {
    //this.speedUp()

    this.count++
    //if (this.count > 10) {
      this.count = 0
      this.angleRotate(1)
    //}
  }

  public moveStart(): void {
    this.speedReset(5)
    this.count = 0
  }
}
