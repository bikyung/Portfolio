const body = document.querySelector('body');
const main = document.querySelector('main');
const key = "AIzaSyBA0vVAYlhuCiLDSkDUi_LswCkyeB6NAoI";
const playListId = "PL92HST3Zi7rbsat9oT6ZUtyan4CUs8Tas";
const num = 8;
const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playListId}&maxResults=${num}`;

fetch(url)
.then(data => {
  return data.json();
})
.then(json => {
  let items = json.items;
  console.log(items)

  let result = '';
  items.forEach(item => {
    let tit = item.snippet.title;
    let desc = item.snippet.description;
    
    if(tit.length > 40) tit = tit.substr(0,40) + "...";
    if(desc.length > 100) desc = desc.substr(0,100) + "...";

    let date = item.snippet.publishedAt.split("T")[0];
    result += `
      <article>
        <a class="pic" href="#" data-vid="${item.snippet.resourceId.videoId}">
          <img src="${item.snippet.thumbnails.high.url}">
        </a>
        <div class="con">
          <h2 data-vid="${item.snippet.resourceId.videoId}">${tit}</h2>
          <p>${desc}</p>
          <span>${date}</span>
        </div>
      </article>
    `;
  })

  main.innerHTML = result;
})


// 썸네일 클릭 이벤트-----------------------------------------------------
main.addEventListener('click', e => {
  createPop(e)
})

//popup close 버튼 클릭 이벤트-------------------------------------------------------
body.addEventListener('click', e => {
  removePop(e);
})



//popup 생성 함수 ---------------------------------------------------------------------
function createPop(e) {
  e.preventDefault();

  if(!e.target.closest('a')) return;

  const vidId = e.target.closest('a').getAttribute('data-vid');

  let pop = document.createElement('aside');
  pop.innerHTML = `
    <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width="100%" height="100%" allowfullscreen></iframe>
    <span class="btnClose">close</span>
  `;

  body.append(pop);
}

//popup remove 함수 --------------------------------------------------------------------
function removePop(e) {
  const pop = document.querySelector('aside');

  if(pop == null) return;
  const close = pop.querySelector('span');

  if(e.target == close) e.target.closest('aside').remove();
}