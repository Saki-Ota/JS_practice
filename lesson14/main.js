const openButton = document.getElementById("js-open-modal-button");
const modal = document.getElementById("js-modal");
const closeButton = document.getElementById("js-close-button");
const overlay = document.getElementById("js-overlay");
const openListButton = document.getElementById("js-open-list-button")
const ul = document.getElementById("js-ul");
const input =document.getElementById("js-number-input")

const renderLoading = () => {
  const loading = document.getElementById("js-loading");
  const loadingImage = document.createElement("img");
  loadingImage.src = "img/loading.gif";
  loadingImage.id = "loading-image";
  loading.appendChild(loadingImage);
};

const removeLoading = () => document.getElementById("loading-image").remove();

const renderLists = (items) => {
  const fragment = new DocumentFragment();

  for (let item of items) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");
    a.href = item.to;
    a.textContent = item.text;
    img.src = item.img;
    img.alt = item.alt;

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
  renderLoading();
  let res = await getData("https://mocki.io/v1/ee8a871e-2b46-4a91-b565-4d6f9216f300");
  removeLoading();

  if (res.data) {
    renderLists(res.data);
  } else {
    displayInfo("no data");
  }
};

const displayModal= () => {
  modal.style.display= "block";
  overlay.style.display= "block";
};

const closeModal = () => {
  resetInput()
  modal.style.display="none";
  overlay.style.display="none";
};

const removeModal = () =>  document.getElementById("js-modal-wrapper").remove();

const resetInput = () => {
  input.value = '';
  document.getElementById('js-validation-empty').style.display="none";
  document.getElementById("js-validation-number").style.display="none";
};

openListButton.addEventListener("click", (e) => {
  const userInput = input.value
  if(userInput === ''){
   document.getElementById('js-validation-empty').style.display="block";
   return e.preventDefault()
  } else if (!userInput.match(/^\d+$/)){
    document.getElementById("js-validation-number").style.display="block";
    return e.preventDefault()
  } else {
    console.log(userInput)
  }
  removeModal();
  displayList();
});

input.addEventListener("click", (e)=>{
  resetInput();
  e.preventDefault()
})
openButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
