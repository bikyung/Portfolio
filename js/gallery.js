const body = document.querySelector('body');
const main = document.querySelector('main');
const frame = document.querySelector('section .inner .description');
const btns = document.querySelectorAll('.menu li');
const loading = document.querySelector('.loading');
const input = document.querySelector('#search');
const btnSearch = document.querySelector('.btnSearch');
const base = 'https://www.flickr.com/services/rest/?';
const key = '86007043f7007d67ce5b5f460ff91ac7';
const gallery = '72157720540419458';
const username = '195311166@N04';
const per_page = '20';
const method = 'flickr.interestingness.getList';
const method_people = 'flickr.people.getPhotos';
const method_search = 'flickr.photos.search';
const method_favorite = 'flickr.favorites.getList';
const method_album = 'flickr.galleries.getPhotos';
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;

const url_kawasaki = `${base}method=${method_people}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`;

const url_favorite = `${base}method=${method_favorite}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`;

callData(url);

btnSearch.addEventListener('click', (e) => {
	e.preventDefault();
	let tag = input.value;

	const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

	callData(url);
});

input.addEventListener('keyup', (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		let tag = input.value;

		const url = `${base}method=${method_search}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&privacy_filter=1&tags=${tag}`;

		callData(url);
	}
});

frame.addEventListener('click', (e) => {
	e.preventDefault();

	let target = e.target.closest('.item').querySelector('.pic img');

	if (e.target == target) {
		let imgSrc = target.parentElement.getAttribute('href');

		let pop = document.createElement('aside');
		pop.classList.add('pop');

		let pops = `
                <div class="con">
                  <img src="${imgSrc}">
                  <span class="close">Close<span>
                </div>
    `;
		pop.innerHTML = pops;
		body.append(pop);
		body.style.overflow = 'hidden';
	}
});

body.addEventListener('click', (e) => {
	let pop = body.querySelector('.pop');

	if (pop) {
		let close = pop.querySelector('.close');
		if (e.target == close) {
			pop.remove();
			body.style.overflow = 'auto';
		}
	}
});

const galleryBtn = document.querySelectorAll('.side .menu li');
galleryBtn.forEach((btn) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();
		const menuName = e.target.innerText;

		if (menuName === 'KAWASAKI') callData(url_kawasaki);
		if (menuName === 'INTEREST') callData(url);
		if (menuName === 'FAVORITE') callData(url_favorite);
	});
});

function callData(url) {
	frame.classList.remove('on');
	loading.classList.remove('off');
	fetch(url)
		.then((data) => {
			return data.json();
		})
		.then((json) => {
			console.log(json);
			const items = json.photos.photo;
			createList(items);
			imgLoaded();
		});
}
function imgLoaded() {
	const thumbs = document.querySelectorAll('.pic img');
	const len = thumbs.length;
	let count = 0;
	thumbs.forEach((thumb) => {
		thumb.onerror = () => {
			thumb.setAttribute('src', 'img/k1.jpg');
		};
		thumb.onload = () => {
			count++;
			if (count === len) {
				new Isotope(frame, {
					itemSelector: '.item',
					columnWidth: '.item',
					transitionDuration: '0.7s',
				});
			}
			frame.classList.add('on');
			loading.classList.add('off');
		};
	});

	const buddies = document.querySelectorAll('.profile img');
	buddies.forEach((buddy) => {
		buddies.onerror = () => {
			buddy.setAttribute('src', 'img/k1.jpg');
		};
	});
}
function createList(items) {
	let htmls = '';

	items.forEach((data) => {
		htmls += `
                  <article class="item">
                    <div>
                      <h2>${data.title}</h2>
                      <a class="pic" href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">
                      <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">
                      </a>
  
                      <div class="profile">
                      <img src="http://farm${data.farm}.staticflickr.com/${data.server}/buddyicons/${data.owner}.jpg">
                        <span>${data.owner}</span>
                      </div>
                    </div>
                  </article>
      `;
	});
	frame.innerHTML = htmls;
}
