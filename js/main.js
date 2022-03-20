
  const btnCall = document.querySelector('.btnCall');
  const menuMo = document.querySelector('.menuMo');
  const indicator = document.querySelectorAll(".indicator li");
  let pageNum = indicator.langth;
  
  
  btnCall.onclick = function(e) {
    e.preventDefault();
  
    btnCall.classList.toggle('on');
    menuMo.classList.toggle('on');
  } 

  new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  new Swiper(".mySwiper1", {
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    spaceBetween: 30,
    effect: "fade",
  });

  new Swiper(".mySwiper2", {
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false
    },
    spaceBetween: 30,
    effect: "fade",
  });

  

