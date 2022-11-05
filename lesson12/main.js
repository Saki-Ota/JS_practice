const ul = document.getElementById("js-ul");
const btn = document.getElementById("js-button")

const renderLoading = () => {
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement("img");
  loadingImg.src = "img/loading.gif";
  loadingImg.id = "loading-img";
  loading.appendChild(loadingImg);
};

const removeLoading = () => {
  document.getElementById("loading-img").remove();
};

const renderLists = (features) => {
  const fragment = new DocumentFragment();

  for (let feature of features) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.href = feature.to;
    a.textContent = feature.text;
    img.src = feature.img;
    img.alt = feature.alt;

    fragment
      .appendChild(li)
      .appendChild(a)
      .insertAdjacentElement("afterbegin", img);
  }

  ul.appendChild(fragment);
};

const displayInfo = (info) => {
  const li = document.createElement('li');
  if (typeof info === 'string') {
    li.textContent = info;
    ul.appendChild(li);
    return console.log(info);
  }
  throw new Error('Please pass a string value');
};

const displayErrorInfo = (error) => {
  const li = document.createElement('li');
  li.textContent = `error: ${JSON.stringify(error)}`;
  ul.appendChild(li);
};

const getData = async (api) => {
  let res = null;
  try {
    res = await fetch(api);
  } catch (e) {
    displayErrorInfo(e);
  }
  if (res.ok) {
    return res.json();
  } else {
    displayErrorInfo(res);
  }
};

const displayList = async () => {
  let res = await getData("https://mocki.io/v1/ee8a871e-2b46-4a91-b565-4d6f9216f300");
  removeLoading();

  if (res.data) {
    renderLists(res.data);
  } else {
    displayInfo("no data");
  }
};

const init = () => {
  btn.remove();
  renderLoading();
  displayList();
};

btn.addEventListener("click", init);
