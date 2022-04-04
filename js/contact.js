var container = document.getElementById('map');
const branch_btns = document.querySelectorAll('.branch li');
var drag = true;

let swiper3 = new Swiper(".mySwiper2", {
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  spaceBetween: 30,
  effect: "fade",
});

var options = {
  center: new kakao.maps.LatLng(37.580730918499754,127.02210456849461),
  level: 3
};

var map = new kakao.maps.Map(container, options);

var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);




var markerOptions = [{
    title: "서울지점",
    latlng: new kakao.maps.LatLng(37.580730918499754,127.02210456849461),
    imgSrc: "img/marker.png",
    imgSize: new kakao.maps.Size(50, 50),
    imgPos: {
      offset: new kakao.maps.Point(25, 25)
    },
    button: branch_btns[0]
  },
  {
    title: "대전지점",
    latlng: new kakao.maps.LatLng( 36.304590089162524,127.45000346864543),
    imgSrc: "img/marker.png",
    imgSize: new kakao.maps.Size(50, 50),
    imgPos: {
      offset: new kakao.maps.Point(116, 99)
    },
    button: branch_btns[1]
  },
  {
    title: "광주지점",
    latlng: new kakao.maps.LatLng(35.1748019321974,126.91626746156524),
    imgSrc: "img/marker.png",
    imgSize: new kakao.maps.Size(50, 50),
    imgPos: {
      offset: new kakao.maps.Point(116, 99)
    },
    button: branch_btns[2]
  }
]

for (let i = 0; i < markerOptions.length; i++) {
  new kakao.maps.Marker({
    map: map,
    position: markerOptions[i].latlng,
    title: markerOptions[i].title,
    image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
  });

  markerOptions[i].button.addEventListener("click", e => {
    e.preventDefault();

    for (let btn of branch_btns) {
      btn.classList.remove("on");
    }
    branch_btns[i].classList.add("on");

    moveTo(markerOptions[i].latlng);
  });
}

window.addEventListener("resize", () => {
  let active_btn = document.querySelector('.branch li.on');
  let active_index = active_btn.getAttribute('data-index');
  map.setCenter(markerOptions[active_index].latlng);
})

setDraggable(true);

function setDraggable(draggable) {
  map.setDraggable(draggable);
}


function moveTo(target) {
  var moveLatLon = target;
  map.setCenter(moveLatLon);
}