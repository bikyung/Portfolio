const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');
const gnb = document.querySelector('.gnb');
const btnStart = document.querySelector(".btnStart");
const btnStop = document.querySelector(".btnStop");


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
  //좌우버튼 옵션 
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  //페이징버튼 옵션
  pagination: {
    el: ".swiper-pagination1",
    clickable: true,
  },
  //자동롤링 
  autoplay: {
    delay: 2000,
    disableOnInteraction: true
  },
});



//페이지 로딩시 자동롤링  정지된 상태  
swiper.autoplay.stop();

//롤링시작 버튼 클릭시 자동롤링 
btnStart.addEventListener("click", () => {
  swiper.autoplay.start();
});
//롤링정지 버튼 클릭시 자동롤링 정지 
btnStop.addEventListener("click", () => {
  swiper.autoplay.stop();
})

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
let base = -300; //섹션과 버튼 활성화 위치값 수정

//로딩시 세로위치값 구하기 
setPos();

sections.forEach((section, idx) => {
  section.addEventListener("mousewheel", e => {
    e.preventDefault();

    //현재 활성화되어있는 버튼 li를 변수로 저장해서 
    let activeSec = document.querySelector("section.on");
    let arrSec = Array.from(sections);
    //몇번째 li인지 순번을 찾아서 저장 
    let activeIndex = arrSec.indexOf(activeSec); //0,1,2,3    

    if (e.deltaY < 0) {
      if (activeIndex === 0) return;
      moveScroll(activeIndex - 1);
      console.log("up!!")
    } else {
      if (activeIndex === len - 1) return;
      moveScroll(activeIndex + 1);
      console.log("down!!");
    }
  }, {
    passive: false
  });

})



//resize되었을 때 setPos함수 호출 
window.addEventListener("resize", () => {
  setPos();
});

//버튼 클릭이벤트 
lis.forEach((li, index) => {
  //li를 클릭했을 때 
  li.addEventListener("click", e => {

    let isOn = e.currentTarget.classList.contains("on");
    if (isOn) return;

    if (enableClick) {
      enableClick = false;
      moveScroll(index);

    }

  });
})

//스크롤 이벤트  
window.addEventListener("scroll", activation);



//각 섹션의 세로위치값을 구해서 배열에 넣는 함수 정의 
function setPos() {
  posArr = [];
  //각 섹션의 세로 위치값 구해서 배열에 넣기 
  for (let section of sections) posArr.push(section.offsetTop);
  console.log(posArr); 

  //resize시 버튼과 섹션이 매칭되지 않는 문제 해결 
  //현재 활성화버튼의 순번을 구해서 
  //브라우저를 활성화섹션위치 고정이동 
  const active = scrollBtn.querySelector("li.on");
  const activeIndex = lis_arr.indexOf(active);
  window.scroll(0, posArr[activeIndex]);
}

//브라우저를 각 섹션의 세로 위치값으로 이동 함수 정의 
function moveScroll(index) {

  new Anime(window, {
    prop: "scroll",
    value: posArr[index],
    duration: 500,
    callback: () => {
      enableClick = true;
    }
  });

}


function activation() {
  let scroll = window.scrollY || window.pageYOffset;
  //섹션의 갯수만큼 반복을 돌면서 
  sections.forEach((section, index) => {
    //스크롤값이 각 섹션의 세로위치값보다 크거나 같다면 
    if (scroll >= posArr[index] + base) {
      //모든 버튼을 비활성화하고 
      for (const li of lis) li.classList.remove("on");
      //해당순번의 li만 활성화 
      lis[index].classList.add("on");
      //반복을 돌면서 모든 섹션의 on을 제거하고
      for (const section of sections) {
        section.classList.remove('on');
      }
      //해당 순번의 섹션만 on추가하여 활성화
      sections[index].classList.add('on');
    }
  });
}