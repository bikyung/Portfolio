window.addEventListener('DOMContentLoaded', function() {

  const btnCall = document.querySelector('.btnCall');
  const menuMo = document.querySelector('.menuMo');
  const indicator = document.querySelectorAll(".indicator li");
  let pageNum = indicator.langth;
  
  
  btnCall.onclick = function(e) {
    e.preventDefault();
  
    btnCall.classList.toggle('on');
    menuMo.classList.toggle('on');
  } 
  
})