export default class Slide {
  constructor(slide, warpper) {
    this.slide = document.querySelector(slide);
    this.warpper = document.querySelector(warpper);
  }

  onStart(event) {
    event.preventDefault();

    this.warpper.addEventListener("mousemove", this.onMove);
  }

  onMove(){

  }

  onEnd(){
    this.warpper.removeEventListener("mousemove", this.onMove);
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
