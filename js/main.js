const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');
const gnb = document.querySelector('.gnb');
const list = gnb.querySelectorAll('li');
const btnStart = document.querySelector(".btnStart");
const btnStop = document.querySelector(".btnStop");
const slide = document.querySelector('.wrap');
const panel = slide.querySelector('.slide');
const visualPrev = document.querySelector('.visualPrev');
const visualNext = document.querySelector('.visualNext');
const des = document.querySelectorAll('.description')
const speed = 700;



//visual Slider ---------------------------------------------------------

const lastEl = panel.lastElementChild;
let enableClicks = true;

panel.prepend(lastEl);

visualPrev.addEventListener('click', e => {
  e.preventDefault();
  prevSlide()
})

visualNext.addEventListener('click', e => {
  e.preventDefault();
  nextSlide();
})
function nextSlide() {
  const firstEl = panel.firstElementChild;
    if(enableClicks) {
      enableClicks = false;
      new Anim(panel, {
        prop: 'margin-left',
        value: '-200%',
        duration: speed,
        callback : () => {
          panel.append(firstEl);
          panel.style.marginLeft = '-100%';
          enableClicks = true
        }
      })
    }
}


function prevSlide() {
  const lastEl = panel.lastElementChild;

  if(enableClicks) {
    enableClicks = false;
    new Anim(panel, {
      prop: 'margin-left',
      value: '0%',
      duration: speed,
      callback: () => {
        panel.prepend(lastEl);
        panel.style.marginLeft = '-100%';
        enableClicks = true
      }
    })
  }
}


// 햄버거 버튼 --------------------------------------------------------------
btnCall.onclick = function (e) {
  e.preventDefault();


  btnCall.classList.toggle('on');
  gnb.classList.toggle('on');
  menuMo.classList.toggle('on');
}


// header slider -----------------------------------------------------------
let swiper1 = new Swiper(".mySwiper", {
  spaceBetween: 0,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});


//model slider ------------------------------------------------------------

let swiper = new Swiper(".slider", {
  effect: "coverflow",
  coverflowEffect: {
    rotate: 0,
    stretch: -200,
    depth: 500,
    modifier: 1,
    slideShadows: false,
  },
  direction: "horizontal",
  slidesPerView: "4",
  centeredSlides: true,
  spaceBetween: 20,
  grabCursor: true,
  loop: true,
  speed: 800,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
  },
  autoplay: {
    delay: 2000,
    disableOnInteraction: true
  },
});

//페이지 로딩시 자동롤링  정지된 상태  
swiper.autoplay.stop();


// motorcylce 서브페이지 slider ----------------------------------------------
let swiper2 = new Swiper(".mySwiper1", {
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  spaceBetween: 30,
  effect: "fade",
});


// news&event 서브페이지 slider ----------------------------------------------
let swiper3 = new Swiper(".mySwiper2", {
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  spaceBetween: 30,
  effect: "fade",
});


// scroll 이벤트 ---------------------------------------------------------
const sections = document.querySelectorAll("section");
const len = sections.length;
const scrollBtn = document.querySelector("#scrollBtn");
const lis = scrollBtn.querySelectorAll("li");
const lis_arr = Array.from(lis);
let posArr = null; 
let enableClick = true;
let base = -300;

setPos();

window.addEventListener("resize", () => {
  setPos();
});

//버튼 클릭이벤트 
lis.forEach((li, index) => {
  li.addEventListener("click", e => {

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;

    if (enableClick) {
      enableClick = false;
      moveScroll(index);
    }
  });
})

window.addEventListener("scroll", activation);



function setPos() {
  posArr = [];
  for (let section of sections) posArr.push(section.offsetTop);

  const active = scrollBtn.querySelector("li.on");
  const activeIndex = lis_arr.indexOf(active);
  window.scroll(0, posArr[activeIndex]);
}

function moveScroll(index) {

  new Anim(window, {
    prop: "scroll",
    value: posArr[index],
    duration: speed,
    callback: () => {
      enableClick = true;
    }
  });

}


function activation() {
  let scroll = window.scrollY || window.pageYOffset;
  sections.forEach((section, index) => {
    if (scroll >= posArr[index] + base) {
      for (const li of lis) li.classList.remove("on");
      lis[index].classList.add("on");
      for (const section of sections) {
        section.classList.remove('on');
      }
      sections[index].classList.add('on');
    }
  });
}

// popup---------------------------------------------------------


const popup = document.querySelector('#popup');
const btnClose = popup.querySelector('.closeBtn');
const isCookie = document.cookie.indexOf('today=done');
let isOn;


(isCookie == -1) ? isOn = 'block' : isOn = 'none';
popup.style.display = isOn;

btnClose.addEventListener('click', e => {
  e.preventDefault();
  popup.style.display = 'none';
  
  let isChecked = popup.querySelector('input[type=checkbox]').checked;
  if(isChecked)  setCookie("today","done",1);
})



function setCookie(name, val, due) {
  const today = new Date();
  const day = today.getDate();
  today.setDate(day + due);
  const duedate = today.toGMTString();
  document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}
