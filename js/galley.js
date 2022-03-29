const body = document.querySelector('body');
const main = document.querySelector('main');
const frame = document.querySelector('section');
const btns = document.querySelectorAll('.menu li');
console.log(btns);
const loading = document.querySelector('.loading');

const base = "https://www.flickr.com/services/rest/?";
const key = "86007043f7007d67ce5b5f460ff91ac7";
const gallery = "72157720540419458";
const username = "195311166@N04";
const per_page = "100";
const method_people = "flickr.people.getPhotos";
const url_people = `${base}method=${method_people}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${username}`;


callData(url_people);

frame.addEventListener('click', e => {
  e.preventDefault();

  let target = e.target.closest('.item').querySelector('.pic img');

  if(e.target == target) {
    let imgSrc = e.target.parentElement.getAttribute("href");
  
    let pop = document.createElement('aside');
    pop.classList.add('pop');
    let pops = `
                  <div class="con">
                    <img src="${imgSrc}">
                  </div>
                  <span class="close">Close</span>
    `;
    pop.innerHTML = pops;
    body.append(pop);
  }
})

body.addEventListener('click', e => {
  let pop = body.querySelector('.pop');

  if (pop) {
    let close = pop.querySelector('.close');

    if (e.target == close) {
      pop.remove();
      body.style.overflow = 'auto';
    }
  }
})

btns.forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    
    for (const el of btns) {
      el.classList.remove('on');
      e.currentTarget.classList.add('on');
    }
  })
})


// data 생성
function callData(url_people) {

  frame.classList.remove('on');
  loading.classList.remove('off');

  fetch(url_people)
.then(data => {
  return data.json();
})
.then(json => {
  const items = json.photos.photo;
  createList(items);
  imgLoaded();
})

}


function createList(items) {
  let htmls = '';

  items.forEach(data => {
    htmls += `
                <article class="item">
                    <div>
                        <a class="pic" href="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg">
                            <img src="https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg">
                        </a>
                        <h2>Kawasaki motorCycle</h2>
                        <p>Model : ${data.title}</p>
                    </div>
                </article>
        `;
  })
  frame.innerHTML = htmls;
  
}

function imgLoaded() {
  const thumbs = document.querySelectorAll('.pic img');
  const len = thumbs.length;
  let count = 0;

  thumbs.forEach(thumb => {
    thumb.onload =() =>{
      count++;
      if(count === len) {
        new Isotope(frame,{
          itemSelector: ".item",
          columnWidth : ".item",
          transitionDuration: "0.8s",
        })
        frame.classList.add('on');
        loading.classList.add('off');
      }
    }
  })
  
}