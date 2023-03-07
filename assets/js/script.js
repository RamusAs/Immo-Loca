// Dark Mode
const toggle = document.getElementById('checkbox-toggle')
const switchTheme = () => {
  document.documentElement.classList.toggle('dark')
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  toggle.checked = true
  document.documentElement.classList.add('dark')
}


// Nav bar
const nav = document.getElementsByClassName('c-nav')
const cta = document.getElementsByClassName('c-cta')
const hero = document.getElementsByClassName('c-header')
window.onscroll = () => {
  if (window.scrollY > (hero[0].scrollHeight - nav[0].scrollHeight)){
   nav[0].classList.add('c-nav--scrolled') 
   cta[0].classList.remove('c-cta--light')
   cta[0].classList.add('c-cta--dark')
  }else {
    nav[0].classList.remove('c-nav--scrolled') 
    cta[0].classList.remove('c-cta--dark')
    cta[0].classList.add('c-cta--light')
  }
}

//Slider
const slider = document.getElementsByClassName('c-card')
const sliderContainer = document.getElementsByClassName('c-cards')
let translateX = 475 //initial value of sliderContainer translateX

const slideToLeft = () => {
  const activeCard = [...slider].filter(card => card.classList.contains('c-card--active'))
  const activeID = (activeCard[0].id.split('_')[1])
  if(activeID-2 >= 0 ){
    activeCard[0].classList.remove('c-card--active')
    slider[activeID-2].classList.add('c-card--active')
    translateX += (slider[activeID-1].clientWidth)
    sliderContainer[0].style.transform = `translateX(${translateX}px)`
  }
}

const slideToRight = () => {
  const activeCard = [...slider].filter(card => card.classList.contains('c-card--active'))
  const activeID =  (activeCard[0].id.split('_')[1])
  if (activeID < slider.length){
    activeCard[0].classList.remove('c-card--active')
    slider[activeID].classList.add('c-card--active') 
    translateX -= (slider[activeID-1].clientWidth)
    sliderContainer[0].style.transform = `translateX(${translateX}px)`
  }
}

// Slider drag and drop

let isDown = false
let startX
let scrollLeft

const drag = (e) => {
  isDown = true
  startX = e.pageX 
  sliderContainer[0].classList.add('c-cards--active')
}

const drop = (e) => {
  startX = 0
  isDown = false
  sliderContainer[0].classList.remove('c-cards--active')
}

const move = (e) => {
  if(!isDown) return
  e.preventDefault()
  const x = e.pageX || e.touches[0].pageX - sliderContainer[0].offsetLeft
  const dist = (startX - x)
  dist > 0 ? slideToRight() : null
  dist < 0 ? slideToLeft() : null
}

(() => {
  toggle.addEventListener('change', switchTheme)
	sliderContainer[0].addEventListener('mousedown', drag, false)
	sliderContainer[0].addEventListener('touchstart', drag, false)

  sliderContainer[0].addEventListener('mouseup', move, false)
	sliderContainer[0].addEventListener('touchend', move)

	sliderContainer[0].addEventListener('mouseup', drop)
	sliderContainer[0].addEventListener('touchend', drop)
})()