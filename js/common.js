// 햄버거 버튼 --------------------------------------------------------------
const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');
const gnb = document.querySelector('.gnb');

btnCall.onclick = function (e) {
	e.preventDefault();

	btnCall.classList.toggle('on');
	gnb.classList.toggle('on');
	menuMo.classList.toggle('on');
};
