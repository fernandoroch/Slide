export default class Slide {
  constructor(slide, warpper) {
    this.slide = document.querySelector(slide);
    this.warpper = document.querySelector(warpper);
    this.distancia = {
      finalPosition: 0,
      startX: 0,
      movement: 0,
    };
  }

  moveSlide(distanciaX) {
    this.distancia.movePosition = distanciaX;
    this.slide.style.transform = `translate3d(${distanciaX}px,0,0)`;
  }

  upDatePosition(clientX) {
    this.distancia.movement = (this.distancia.startX - clientX) * 1.6;
    return this.distancia.finalPosition - this.distancia.movement;
  }

  onStart(event) {
    let movetype;
    if (event.type === "mousedown") {
      event.preventDefault();
      this.distancia.startX = event.clientX;
      movetype = "mousemove";
    } else {
      this.distancia.startX = event.changedTouches[0].clientX;
      movetype = "touchmove";
    }
    this.warpper.addEventListener(movetype, this.onMove);
  }

  onMove(event) {
    const poiterPosition =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const finalPosition = this.upDatePosition(poiterPosition);
    this.moveSlide(finalPosition);
  }

  onEnd(event) {
    const movetype = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.warpper.removeEventListener(movetype, this.onMove);
    this.distancia.finalPosition = this.distancia.movePosition;
  }

  addSlideEvent() {
    this.warpper.addEventListener("mousedown", this.onStart);
    this.warpper.addEventListener("touchstart", this.onStart);
    this.warpper.addEventListener("mouseup", this.onEnd);
    this.warpper.addEventListener("touchend", this.onEnd);
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  init() {
    this.bindEvents();
    this.addSlideEvent();
    return this;
  }
}
