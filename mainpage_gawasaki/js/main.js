window.addEventListener('DOMContentLoaded', function() {

  const btnCall = document.querySelector('.btnCall');
  const menuMo = document.querySelector('.menuMo');
  const indicator = document.querySelectorAll(".indicator li");
  let pageNum = indicator.langth;
  console.log(pageNum)
  
  
  btnCall.onclick = function(e) {
    e.preventDefault();
  
    btnCall.classList.toggle('on');
    menuMo.classList.toggle('on');
  } 
  
  indicator.forEach(item,index => {
    pageNum = index;
    item.addEventListener('click', function(){
      pageNum.classList.toggle('on');
    })
  })
})