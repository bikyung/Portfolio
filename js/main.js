//visual Slider ---------------------------------------------------------

const visualPrev = document.querySelector('.visualPrev');
const visualNext = document.querySelector('.visualNext');
const slider = document.querySelector('.slider');
const panel_li = slider.querySelectorAll('.panel>li');
const panel_li_arr = Array.from(panel_li);
const navi_li = slider.querySelectorAll('.navigation> ul > li');
const speed = 700;
const leng = panel_li.length;
let enableClicks = true;

visualPrev.addEventListener('click', (e) => {
	e.preventDefault();
	const currentEl = slider.querySelector('.panel > li.on');
	const current_index = panel_li_arr.indexOf(currentEl);
	let prev_index;
	current_index !== leng - 1
		? (prev_index = current_index - 1)
		: (prev_index = leng - 1);
	if (enableClicks) showSlide(currentEl, prev_index, -1);
});

visualNext.addEventListener('click', (e) => {
	e.preventDefault();
	const currentEl = slider.querySelector('.panel > li.on');
	const current_index = panel_li_arr.indexOf(currentEl);
	let next_index;
	current_index !== leng - 1
		? (next_index = current_index + 1)
		: (next_index = 0);
	if (enableClicks) showSlide(currentEl, next_index, 1);
});

navi_li.forEach((el, idx) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		const currentEl = slider.querySelector('.panel>li.on');
		const current_index = panel_li_arr.indexOf(currentEl);
		const target_index = idx;
		if (enableClicks) {
			if (target_index > current_index)
				showSlide(currentEl, target_index, 1);
			if (target_index < current_index)
				showSlide(currentEl, target_index, -1);
		}
	});
});
function showSlide(el, index, num) {
	enableClicks = false;
	new Anim(el, {
		prop: 'left',
		value: -num * 100 + '%',
		duration: speed,
		callback: () => {
			el.classList.remove('on');
			el.style.display = 'none';
		},
	});

	panel_li[index].style.display = 'block';
	panel_li[index].style.left = num * 100 + '%';

	new Anim(panel_li[index], {
		prop: 'left',
		value: '0%',
		duration: speed,
		callback: () => {
			panel_li[index].classList.add('on');
			enableClicks = true;
		},
	});
	activation1(index);
}

function activation1(index) {
	for (const el of navi_li) {
		el.classList.remove('on');
		navi_li[index].classList.add('on');
	}
}

//model slider ------------------------------------------------------------

const model = document.querySelector('#model');
const modelList = model.querySelector('.wrap .model_list');
const prevBtn = model.querySelector('.prevBtn');
const nextBtn = model.querySelector('.nextBtn');
let num = 0;
let wid = 0;
let timer = null;
let modelEnable = true;

createList('data.json');

timer = setInterval(move, 50);

modelList.addEventListener('mouseenter', () => {
	clearInterval(timer);
});

modelList.addEventListener('mouseleave', () => {
	timer = setInterval(move, 50);
});

prevBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (modelEnable) {
		prevEl();
		modelEnable = false;
	}
});

nextBtn.addEventListener('click', (e) => {
	e.preventDefault();
	if (modelEnable) {
		nextEl();
		modelEnable = false;
	}
});

function createList(url) {
	fetch(url)
		.then((data) => {
			return data.json();
		})
		.catch((err) => {
			console.log('데이터 호출에 실패했습니다');
		})
		.then((item) => {
			let imgSrc = item.imgSrc;

			let tags = '';

			imgSrc.forEach((item) => {
				tags += `
                    <li>
                      <h2>${item.title}</h2>
                      <a href="${item.detail} ">
                        <img src="${item.pic}">
                      </a>
                      <div>
                        <a href="${item.detail}">View Detail</a>
                      </div>
                    </li>
            `;
			});

			modelList.innerHTML = tags;
			initList();
		});
}

function initList() {
	const list_li = model.querySelectorAll('li');
	const len = list_li.length;
	wid = parseInt(getComputedStyle(list_li[0]).width);

	modelList.style.width = len * wid + 'px';
	modelList.style.marginLeft = -wid + 'px';
	modelList.prepend(modelList.lastElementChild);
}

function move() {
	if (num < -wid * 2) {
		modelList.append(modelList.firstElementChild);

		num = -wid;
	} else {
		num -= 5;
	}

	modelList.style.marginLeft = num + 'px';
}

function prevEl() {
	new Anim(modelList, {
		prop: 'margin-left',
		value: 0,
		duration: speed,
		callback: () => {
			modelList.prepend(modelList.lastElementChild);
			modelList.style.marginLeft = -wid + 'px';
			num = -wid;
			modelEnable = true;
		},
	});
}

function nextEl() {
	new Anim(modelList, {
		prop: 'margin-left',
		value: -wid * 2,
		duration: speed,
		callback: () => {
			modelList.append(modelList.firstElementChild);
			modelList.style.marginLeft = -wid + 'px';
			num = -wid;
			modelEnable = true;
		},
	});
}

// scroll 이벤트 ---------------------------------------------------------
const sections = document.querySelectorAll('section');
const len = sections.length;
const scrollBtn = document.querySelector('#scrollBtn');
const lis = scrollBtn.querySelectorAll('li');
const lis_arr = Array.from(lis);
let posArr = null;
let enableClick = true;
let base = -400;

setPos();

window.addEventListener('resize', () => {
	setPos();
});

//버튼 클릭이벤트
lis.forEach((li, index) => {
	li.addEventListener('click', (e) => {
		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;

		if (enableClick) {
			enableClick = false;
			moveScroll(index);
		}
	});
});

window.addEventListener('scroll', activation);

function setPos() {
	posArr = [];
	for (let section of sections) posArr.push(section.offsetTop);

	const active = scrollBtn.querySelector('li.on');
	const activeIndex = lis_arr.indexOf(active);
	window.scroll(0, posArr[activeIndex]);
}

function moveScroll(index) {
	new Anim(window, {
		prop: 'scroll',
		value: posArr[index],
		duration: speed,
		callback: () => {
			enableClick = true;
		},
	});
}

function activation() {
	let scroll = window.scrollY || window.pageYOffset;
	sections.forEach((section, index) => {
		if (scroll >= posArr[index] + base) {
			for (const li of lis) li.classList.remove('on');
			lis[index].classList.add('on');
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

isCookie == -1 ? (isOn = 'block') : (isOn = 'none');
popup.style.display = isOn;

btnClose.addEventListener('click', (e) => {
	e.preventDefault();
	popup.style.display = 'none';

	let isChecked = popup.querySelector('input[type=checkbox]').checked;
	if (isChecked) setCookie('today', 'done', 1);
});

function setCookie(name, val, due) {
	const today = new Date();
	const day = today.getDate();
	today.setDate(day + due);
	const duedate = today.toGMTString();
	document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}
