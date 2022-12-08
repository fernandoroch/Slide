import Slide from './slide.js'

const slide = new Slide('.slide', '.warpper')

slide.init()
slide.changeSlide(5)

console.log(slide);