const ul = document.getElementById("js-ul");
const loading = document.getElementById("js-loading")
const features = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
{to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}];

const addLoading = () =>{
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img";
  loading.appendChild(loadingImg);
};

const removeLoading = () =>{
  const removeImg = document.getElementById('loading-img')
  removeImg.remove();
};

const createLists = (features) =>{
  const fragment = new DocumentFragment();

  for (let feature of features ){
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');
      a.href = feature.to;
      a.textContent = feature.text;
      img.src = feature.img;
      img.alt = feature.alt;

      fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin', img);
    };

    ul.appendChild(fragment);
};

async function asyncFeatures(){
  addLoading();
  let loadingTimeout = new Promise((resolve) =>{
    setTimeout(() => resolve(features), 3000)
  });

  let result = await loadingTimeout;
  removeLoading();
  createLists(result);
}

asyncFeatures();
