const ul = document.getElementById("js-ul");
const loading = document.getElementById("js-loading")
const features = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
{to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}];

const addLoading = () =>{
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img"
  loading.appendChild(loadingImg)
}

const removeLoading = () =>{
  const removeImg = document.getElementById('loading-img')
  removeImg.remove();
}

const createLists = (array) =>{
  const fragment = new DocumentFragment();

  for (let feature of array ){
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');
      a.href = feature.to;
      a.textContent = feature.text;
      img.src = feature.img;
      img.alt = feature.alt

      fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin', img);
    }

    ul.appendChild(fragment);
}


const checkFeatures = new Promise((resolve) => {
  addLoading();
  setTimeout(() => {
    resolve(features);
  }, 3000);
});

checkFeatures.then((value)　=> {
  removeLoading();
  createLists(value)
});
