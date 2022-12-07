export default class Slide {
  constructor(slide, warpper) {
    this.slide = document.querySelector(slide);
    this.warpper = document.querySelector(warpper);
    this.distancia = {
      finalPosition: 0,
      startX: 0,
      movement: 0
    }
  }

  moveSlide(distanciaX){
    this.distancia.movePosition = distanciaX
    this.slide.style.transform = `translate3d(${distanciaX}px,0,0)`
  }

  upDatePosition(clientX){
    this.distancia.movement = (this.distancia.startX - clientX) * 1.6
    return this.distancia.finalPosition - this.distancia.movement
  }

  onStart(event) {
    event.preventDefault();
    this.distancia.startX = event.clientX
    this.warpper.addEventListener("mousemove", this.onMove);
  }

  onMove(event){
    const finalPosition = this.upDatePosition(event.clientX)
    this.moveSlide(finalPosition)
  }

  onEnd(event){
    this.warpper.removeEventListener("mousemove", this.onMove);
    this.distancia.finalPosition = this.distancia.movePosition
  }

  addSlideEvent() {
    this.warpper.addEventListener("mousedown", this.onStart);
    this.warpper.addEventListener("mouseup", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this)
    this.onMove = this.onMove.bind(this)
    this.onEnd = this.onEnd.bind(this)
  }

  init() {
    this.bindEvents()
    this.addSlideEvent();
    return this;
  }
}
