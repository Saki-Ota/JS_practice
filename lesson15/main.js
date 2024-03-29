const openButton = document.getElementById("js-open-modal-button");
const modal = document.getElementById("js-modal");
const closeButton = document.getElementById("js-close-button");
const overlay = document.getElementById("js-overlay");
const ul = document.getElementById("js-ul");
const form = document.getElementById("js-form");

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

const displayList = async (name, number) => {
  renderLoading();
  let res = await getData("https://mocki.io/v1/ee8a871e-2b46-4a91-b565-4d6f9216f300");
  removeLoading();

  if (res.data) {
    renderLists(res.data);
    console.log(`${name} ${number}`)
  } else {
    displayInfo("no data");
  }
};

const displayModal= () => {
  modal.style.display= "block";
  overlay.style.display= "block";
};

const resetInput = () => {
  const inputFields = document.getElementsByClassName("js-input");
  const errorMessages = document.getElementsByClassName("js-error-message");

  for (const errorMessage of errorMessages) {
    errorMessage.textContent ="";
  };
  for(const inputField of inputFields) {
    inputField.value = "";
    inputField.classList.remove("error-border");
  };
}

const closeModal = () => {
  modal.style.display="none";
  overlay.style.display="none";
  resetInput();
};

const removeModal = () =>  document.getElementById("js-modal-wrapper").remove();

const checkValidation = (inputArea, error, message) => {
  if(inputArea.value.trim() === "") {
    error.textContent = message;
    inputArea.classList.add("error-border");
  } else {
    error.textContent = "";
    inputArea.classList.remove("error-border")
  }
};

openButton.addEventListener("click", displayModal);
closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

form.addEventListener("submit", (e) => { 
  const userNumberInput = document.getElementById("js-number-input");
  const userNameInput = document.getElementById("js-name-input");
  const nameError = document.getElementById("js-name-error");
  const numberError = document.getElementById("js-number-error");

  if(userNameInput.value.trim() !== "" && userNumberInput.value.trim() !== ""){
    removeModal();
    displayList(userNameInput.value, userNumberInput.value);
  };
  e.preventDefault();
  checkValidation(userNameInput, nameError, "Name cannot be blank");
  checkValidation(userNumberInput, numberError, "Number cannot be blank");
});
