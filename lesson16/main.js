// json = https://mocki.io/v1/d3176c84-479a-47a3-a8b6-7d597b55d8b4
const ul = document.getElementById("js-ul");
const li = document.createElement("li");
const contetns = document.getElementsByClassName("tab-content");
const tabs = document.getElementsByClassName("tab-item");

const displayInfo = (info) => {
  if (typeof info === "string") {
    li.textContent = info;
    ul.appendChild(li);
    return console.log(info);
  }
  throw new Error("Please pass a string value");
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

const displayItems = async (callBackFunction) => {
  let res = await getData(
    "https://mocki.io/v1/40cbd0f7-2a64-4b95-a991-57ff982901a8"
  );
  if (res.data) {
    callBackFunction(res.data);
  } else {
    displayInfo("no data");
  }
};

const renderTabs = (items) => {
  ul.classList = "tab-menu";
  const fragment = new DocumentFragment();
  for (let item of items) {
    const li = document.createElement("li");
    li.textContent = item.category;
    li.classList = "tab-item";
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
  activateFirstTab();
};

const activateFirstTab = () => {
  tabs[0].classList.add("active");
};

// this function will be modified to render articles, comments, an image and icons.
const renderArticles = (items) => {
  const fragment = new DocumentFragment();
  const articleContainerDiv = document.createElement("div");
  articleContainerDiv.classList.add("tab-box");
  for (let item of items) {
    const article = document.createElement("div");
    article.classList.add("tab-content");
    article.textContent = item.category;
    fragment.appendChild(article);
  }
  articleContainerDiv.appendChild(fragment);
  ul.insertAdjacentElement("afterend", articleContainerDiv);
  activateFirstArticleContent();
};

const activateFirstArticleContent = () => {
  contetns[0].classList.add("show");
};

const removeClassList = (className, index) => {
  document.getElementsByClassName(className)[index].classList.remove(className);
};

const displayTabsAndContents = async () => {
  await displayItems(renderTabs);
  await displayItems(renderArticles);

  const listOfTabs = Array.from(tabs);
  const listOfContetns = Array.from(contetns);

  listOfTabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      removeClassList("active", 0);
      tab.classList.add("active");

      const indexNumber = listOfTabs.findIndex((tabContent) =>
        tabContent.classList.contains("active")
      );

      removeClassList("show", 0);
      listOfContetns[indexNumber].classList.add("show");
    });
  });
};

displayTabsAndContents();
