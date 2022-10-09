const ul = document.getElementById("js-ul");
const loading = document.getElementById("js-loading")

const addLoading = () =>{
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img";
  loading.appendChild(loadingImg);
};

const removeLoading = () =>{
  document.getElementById('loading-img').remove();
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

const receiveData = new Promise((resolve) =>{
  addLoading();
  const features = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
                    {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}];
  setTimeout(() => resolve(features), 3000)
});

const asyncFeatures = async() => {
  const result = await receiveData;
  removeLoading();
  createLists(result);
}

asyncFeatures();
