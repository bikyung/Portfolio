const container = document.getElementById('map');
const branch_btns = document.querySelectorAll('.branch li');

let swiper3 = new Swiper('.mySwiper2', {
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	spaceBetween: 30,
	effect: 'fade',
});

const options = {
	center: new kakao.maps.LatLng(37.580730918499754, 127.02210456849461),
	level: 3,
};

const map = new kakao.maps.Map(container, options);

const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

const markerOptions = [
	{
		title: 'SEOUL',
		latlng: new kakao.maps.LatLng(37.580730918499754, 127.02210456849461),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(40, 40),
		imgPos: {
			offset: new kakao.maps.Point(20, 0),
		},
		content: `
              <h2>SEOUL</h2>
              <p>357-2, Hangang-daero, Yongsan-gu, Seoul</p>
              <span>(02)716-9978</span>
    `,
		button: branch_btns[0],
	},
	{
		title: 'DAEJEON',
		latlng: new kakao.maps.LatLng(36.304590089162524, 127.45000346864543),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(40, 40),
		imgPos: {
			offset: new kakao.maps.Point(20, 0),
		},
		content: `
              <h2>DAEJEON</h2>
              <p>8-6, Ho-dong, Jung-gu, Jeollanam-do</p>
              <span>(042)273-4466</span>
`,
		button: branch_btns[1],
	},
	{
		title: 'KWANGJU',
		latlng: new kakao.maps.LatLng(35.1748019321974, 126.91626746156524),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(40, 40),
		imgPos: {
			offset: new kakao.maps.Point(20, 0),
		},
		content: `
    <h2>KWANGJU</h2>
    <p>32-2, Hodong-ro, Buk-gu, Gwangju</p>
    <span>(062)710-5600</span>
`,
		button: branch_btns[2],
	},
	{
		title: 'PUSAN',
		latlng: new kakao.maps.LatLng(35.155942120480255, 129.0415475764219),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(40, 40),
		imgPos: {
			offset: new kakao.maps.Point(20, 0),
		},
		content: `
    <h2>PUSAN</h2>
    <p>1st floor, 673, Gaya-daero, Busanjin-gu, Busan</p>
    <span>1899-5323</span>
`,

		button: branch_btns[3],
	},
	{
		title: 'INCHEON',
		latlng: new kakao.maps.LatLng(37.46391496742191, 126.67260517371592),
		imgSrc: 'img/marker.png',
		imgSize: new kakao.maps.Size(40, 40),
		imgPos: {
			offset: new kakao.maps.Point(20, 0),
		},
		content: `
    <h2>INCHEON</h2>
    <p>28, Juan-ro, Michuhol-gu, Incheon</p>
    <span>1899-5813</span>
`,
		button: branch_btns[4],
	},
];

for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		),
	});

	markerOptions[i].button.addEventListener('click', (e) => {
		e.preventDefault();

		for (let btn of branch_btns) {
			btn.classList.remove('on');
		}
		branch_btns[i].classList.add('on');

		moveTo(markerOptions[i].latlng);
	});

	var content = `  
      <div class="overlay">
        ${markerOptions[i].content}
      </div>
  `;

	var position = markerOptions[i].latlng;

	var customOverlay = new kakao.maps.CustomOverlay({
		position: position,
		content: content,
	});

	customOverlay.setMap(map);
}

window.addEventListener('resize', () => {
	let active_btn = document.querySelector('.branch li.on');
	let active_index = active_btn.getAttribute('data-index');
	map.setCenter(markerOptions[active_index].latlng);
});

setDraggable(true);

function setDraggable(draggable) {
	map.setDraggable(draggable);
}

function moveTo(target) {
	const moveLatLon = target;
	map.setCenter(moveLatLon);
}
