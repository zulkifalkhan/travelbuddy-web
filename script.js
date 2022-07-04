'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const  tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



//page navigation
btnScrollTo.addEventListener('click',function(e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)
  console.log(window.pageXOffset,window.pageYOffset)
  console.log(document.documentElement.clientHeight,document.documentElement.clientWidth)

  // window.scrollTo({
  //   left:s1coords.left + window.pageXOffset,
  //   top:s1coords.top + window.pageYOffset,
  //   behavior:'smooth'
  // })

  //modern way
  section1.scrollIntoView({
    behavior:'smooth'
  })

});

// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click',function(e){
//     e.preventDefault();
//     //smooth scrolling

//     const id = this.getAttribute('href');
//     console.log(id);

//     document.querySelector(id).scrollIntoView({
//       behavior:'smooth'             //use event delegation beacuse here there are 3 copies of same function for different hrefs
//     })

//   })
// })

//add event listner to cmmon parent element for event delegation
//then  determone which element generated the event
//nav__links is parent and it contatins navlink
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){ //matching strategy
       e.preventDefault();
    //smooth scrolling

    const id = e.target.getAttribute('href');
    console.log(id);

    document.querySelector(id).scrollIntoView({
      behavior:'smooth'              
  })
}
});

//dom traversing
const h1 = document.querySelector('h1');
//  h1.firstElementChild.style.color = 'red';


//going upwards
//h1.parentNode.style.backgroundColor = 'red';

//h1.closet  opposite to query selector
//query selector finds the nearest children while closet finds parents

//going sideways 
//siblings and in js only can have previos and next siblings
//which are basiicaly childrens


//apply foreach on every children which is not h1 and chang its color

// [...h1.parentElement.children].forEach(function(el){
//   if(el != h1) el.style.color = 'red'
// })


//tabbed comopnent


//event delegation is used here which is parent element
tabsContainer.addEventListener('click',function(e){
  const clicked = e.target.closest('.operations__tab');

  console.log('1111')
  if(!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');

});

const handleHover = function(e,opacity) {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelectorAll('.img')

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });

    logo.style.opacity = this;

  }
};


nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));

const initalCoord = section1.getBoundingClientRect();

window.addEventListener('scroll',function(){
  // console.log(window.scrollY);
  if(window.scrollY > initalCoord.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
});

//intersetion observer method used for sticky navigation

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav,{
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
})

headerObserver.observe(header)


const allSections = document.querySelectorAll('.section');

const revelSection = function(entries,observer) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectObserver = new IntersectionObserver(revelSection,{
  root:null,
  threshold:0.15,
});

allSections.forEach(function(sec){
  sectObserver.observe(sec);
  //sec.classList.add('section--hidden');
});

//loading lazy images
const imgTargets = document.querySelectorAll('img[data-src]');  //select img having data-src attribute

const loading = function(entries , observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  //replace src with data-src by using dataset.src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function(){
      entry.target.classList.remove('lazy-img');
  });

  observe.unobserve(entry.target)

}

const imgObserver = new IntersectionObserver(loading,{
  root:null,
  threshold:0,
  rootMargin:'200px'
});



imgTargets.forEach(img => imgObserver.observe(img));


//slider 

const btnLeft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
const dotsContainer = document.querySelector('.dots')


const slides = document.querySelectorAll('.slide')
const slider = document.querySelector('.slider')
// slider.style.transform = 'scale(0.4)';
// slider.style.overflow = 'visible';

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function() {
  slides.forEach(i =>{
    dotsContainer.insertAdjacentElement('beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const goToSlide = function(slide) {
  slides.forEach((s,i)=> (s.style.transform = 
    `translateX(${100*(i-slide)}%)`));
};

goToSlide(0); 

const nextSlide= function() {
  if(curSlide === maxSlide -1){
    curSlide = 0
  } else {
    curSlide++;
  }
  
  goToSlide(curSlide);
}

const prevSlide= function() {
  if( curSlide === 0) {
    curSlide=maxSlide-1;
  } else {
  curSlide--;
}
  goToSlide(curSlide);
}

btnright.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowLeft') prevSlide();
  else if(e.key === 'ArrowRight') nextSlide();
})






//document element
/*
console.log(document.body)
const header = document.querySelector('.header');
const sections = document.querySelectorAll('.section');
console.log(sections)
const allButtons = document.getElementsByTagName('button');   //html collection
console.log(allButtons);

//creating and inserting elements
//.insertadjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');

message.innerHTML = 'We are going to show you a message.<button class="okk">OK</button>';

//header.prepend(message)
//header.prepend(message.cloneNode(true))
header.append(message)

//before and after 
/*document.querySelector('.okk').addEventListener('click',function() {
  message.remove();
})*/

//changing styles
/*
message.style.backgroundColor = 'grey';
message.style.width = '120%'
//message.style.height = '120%'
//get computed style is basically the style elemented in our website 
console.group(getComputedStyle(message).height);

//message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 20 +'px';

//change an atrribute value stored in css root for use in divs and change it and it will 
//be changed everywhere its used

//  document.documentElement.style.setProperty('--color-primary','orange')

//attributes
*/
//const logo = document.querySelector('.nav__logo')
//console.log(logo.src)
//cant access atributes which are made by ourselves
//set attribute and get attribute





//events
//mdn events js
//for multiple events
/*
const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter',function(e){
alert("Heyyyyyyy");

//to remove alert and using just for once


})

setTimeout(() => {
  h1.removeEventListener('mouseenter');
}, 3000); */


//another way
// h1.onmouseleave = function(e){
//   alert("Byeeeeeeee");
//   h1.removeEventListener('mouseenter');
//   } 
  /*
//event buubling and propogation
const randomInt = (min,max) => 
Math.floor(Math.random()* (max-min +1) +min);
const randomColor = () =>
`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

console.log(randomColor())

document.querySelector('.nav__link').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
  //its heps to stop applying the same effect called by other events of same type while bubbling up
},true)

document.querySelector('.nav__links').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
})

document.querySelector('.nav').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor();
  e.stopPropagation();
})


//target is same but when it bubbles up it find these event listeners too and apply change
*/
