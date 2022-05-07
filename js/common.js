// 햄버거 버튼 --------------------------------------------------------------
const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');
const gnb = document.querySelector('.gnb');
const menuClose = menuMo.querySelector('.menuClose button');

btnCall.onclick = function (e) {
	e.preventDefault();

	btnCall.classList.toggle('on');
	gnb.classList.toggle('on');
	menuMo.classList.toggle('on');
	menuClose.addEventListener('click', () => {
		menuMo.classList.remove('on');
		btnCall.classList.remove('on');
	});
};
