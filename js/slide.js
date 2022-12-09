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

  transition(active){
    this.slide.style.transition = active ? 'transform .3s' : ''
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
    this.transition(false)
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
    this.transition(true)
    this.changeSlideOnEnd()
  }

  changeSlideOnEnd(){
    if (this.distancia.movement > 120 && this.index.next !== undefined) {
      this.activeNextSlide()
    }else if (this.distancia.movement < -120 && this.index.prev !== undefined) {
      this.activePrevSlide()
    }else {
      this.changeSlide(this.index.active)
    }
    console.log(this.distancia.movement);
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

  // slides config

  slidePsition(slide) {
    const margin = (this.warpper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slidesconfig() {
    this.slideArray = [...this.slide.children].map((elemnet) => {
      const position = this.slidePsition(elemnet);
      return { position, elemnet };
    });
  }

  slideIndexNav(index) {
    const last = this.slideArray.length - 1
    this.index = {
      prev: (index)? index - 1 : undefined,
      active: index,
      next: (index === last)? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const activeSlide = this.slideArray[index]
    this.moveSlide(activeSlide.position);
    this.slideIndexNav(index);
    console.log(this.index );
    this.distancia.finalPosition = activeSlide.position
  }

  activePrevSlide(){
    if (this.index.prev !== undefined) this.changeSlide(this.index.prev)
  }

  activeNextSlide(){
    if (this.index.next !== undefined) this.changeSlide(this.index.next)
  }

  init() {
    this.bindEvents();
    this.transition(true)
    this.addSlideEvent();
    this.slidesconfig();
    return this;
  }
}
