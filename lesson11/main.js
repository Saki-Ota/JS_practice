//コメントは自分の理解のために残しているので無視してください。

const ul = document.getElementById("js-ul");

const renderLoading = () => {
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement("img");
  loadingImg.src = "loading.gif";
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

//Define the function to show information (not only error handling).
//In this lesson, this function is used to display the passed message to handle unexpected errors(not include fetch error)
const displayInfo = (info) => {
  const li = document.createElement('li');
  if (typeof info === 'string') {
    li.texteContent = info;
    ul.appendChild(li);
  }
  throw new Error('Please pass a string value'); //if the passed argument is not string, such as turthy, it throws an error message in console.
};

const displayErrorInfo = (error) => {
  const li = document.createElement('li');
  li.textContent = `error: ${JSON.stringify(error)}`; //convert error status/text into string format
  ul.appendChild(li);
};

//Define a reusable function to fetch api and check response status
//Do not pass an API in this function, so that the function can be used more flexibly.
const getData = async (api) => {
  let res = null;
  try {
    res = await fetch(api);
    //fetch() returns with response, use 'await' otherwise if statement would be executed before fetch() returns and it will throw an error.
  } catch (e) {
    displayErrorInfo(e); //fetch() failed
  }
  if (res.ok) {
    return res.json(); //if response status is ok, then convert response to json format
  } else {
    displayErrorInfo(res); // if response status is not ok, then display error
  }
};
//if fetch() was successful getData() returns a json object.

const displayList = async () => {
  let res = await getData( // await should be used to wait for the getData() returns before executing if statement.
    "https://mocki.io/v1/ee8a871e-2b46-4a91-b565-4d6f9216f300"
  );// if getData() succssfully fetches data then it returns a json object. 
  if (res.data) { //check if response data exists.
    renderLists(res.data);
  } else {
    displayInfo("no data"); //as this if statement checks if data exists in returned json obeject or not, passed string explains the reason of the error/unexpected behaviour.
  }
};

const init = () => {
  renderLoading();
  displayList();
  removeLoading();
};

init();
