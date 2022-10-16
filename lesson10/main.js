const ul = document.getElementById("js-ul");

const addLoading = () =>{
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img";
  loading.appendChild(loadingImg);
};

const removeLoading = () =>{
  document.getElementById('loading-img').remove();
};

const renderLists = (features) =>{
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

const getFeaturesData = new Promise((resolve) =>{
  setTimeout(() => resolve( [
    { to: "bookmark.html", img: "1.png", alt: "画像1", text: "ブックマーク" },
    { to: "message.html", img: "2.png", alt: "画像2", text: "メッセージ" }
  ]), 3000)
});

const asyncGetFeatures = async () => {
  addLoading();
  try {
    return await getFeaturesData;
  } catch(error) {
    console.error(error);
  } finally {
    removeLoading();
  }
};


const init = async () =>{
  const result = await asyncGetFeatures();
  renderLists(result);
};

init();
