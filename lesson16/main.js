// json = https://mocki.io/v1/d3176c84-479a-47a3-a8b6-7d597b55d8b4
const ul = document.getElementById("js-ul");
const li = document.createElement("li");
const contents = document.getElementsByClassName("js-tab-content");
const tabs = document.getElementsByClassName("js-tab-item");

const displayInfo = (info) => {
  const li = document.createElement("li");
  if (typeof info !== "string") {
    throw new Error("Please pass a string value");
  }
   li.textContent = info;
   ul.appendChild(li);
   return console.log(info);
};

const displayErrorInfo = (error) => {
  console.log(error);
  li.textContent = `Failed to get data from server`;
  ul.appendChild(li);
};

const getData = async (api) => {
  let response = null;
  try {
    response = await fetch(api);
  } catch (error) {
    displayErrorInfo(error);
  }
  if (response.ok) {
    return response.json();
  } else {
    displayErrorInfo(response);
  }
};

const checkResponse = async () => {
  let response = await getData(
    "https://mocki.io/v1/40cbd0f7-2a64-4b95-a991-57ff982901a8"
  );
  if (!response.data) {
    displayInfo("no data available");
  } 
  return response.data
};

const renderTabs = (newsGenres) => {
  ul.classList = "js-tab-menu";
  const fragment = new DocumentFragment();
  for (const newsGenre of newsGenres) {
    const li = document.createElement("li");
    li.textContent = newsGenre.category;
    li.classList = "js-tab-item";
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
  if(tabs){
    tabs[0].classList.add("active");
  }
};



// this function will be modified to render articles, comments, an image and icons.
const renderArticles = (newsGenres) => {
  const fragment = new DocumentFragment();
  const articleContainer = document.createElement("div");
  articleContainer.classList.add("js-tab-content-box");
  for (const newsGenre of newsGenres) {
    const article = document.createElement("div");
    article.classList.add("js-tab-content");
    article.textContent = newsGenre.category;
    fragment.appendChild(article);
  }
  articleContainer.appendChild(fragment);
  ul.insertAdjacentElement("afterend", articleContainer);

  if (contents) {
    contents[0].classList.add("show");
  }
};

const displayTabsAndContents = () => {
  const listOfTabs = [...tabs];
  const listOfContents = [...contents];

  listOfTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.getElementsByClassName("active")[0].classList.remove("active");
      tab.classList.add("active");

      const indexNumber = listOfTabs.findIndex((tabContent) =>
        tabContent.classList.contains("active")
      );

      document.getElementsByClassName("show")[0].classList.remove("show");
      listOfContents[indexNumber].classList.add("show");
    });
  });
};

const init = async () => {
  const newsGenres = await checkResponse();
  if (!newsGenres) {
    displayInfo('Something went wrong during fetching data. We are fixing the problem, please come back again')
  }
  renderTabs(newsGenres);
  renderArticles(newsGenres);
  displayTabsAndContents();
}

init();
