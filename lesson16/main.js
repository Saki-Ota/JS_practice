const ul = document.getElementById("js-ul");
const li = document.createElement("li");

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
    "https://mocki.io/v1/e8fda7fd-1994-44ea-8d5f-a2624a8f22cb"
  );
  if (!response.data) {
    displayInfo("no data available");
  }
  return response.data;
};

const renderTabs = (newsGenres) => {
  ul.classList = "tab-menu";
  const fragment = new DocumentFragment();
  for (const newsGenre of newsGenres) {
    const li = document.createElement("li");
    li.textContent = newsGenre.category;
    li.classList = "tab-item";
    li.setAttribute("data-item", "tab-item");
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
  const tabs = document.querySelectorAll('[data-item="tab-item"]');
  if (tabs.length === 0) {
    console.error('Failed to get [data-item="tab-item"]');
  }
  tabs[0].classList.add("active");
};

const createNewIcon = ({ date }) => {
  const articleDate = new Date(date);
  const today = new Date();
  const newIcon = document.createElement("i");
  const secondsADay = 1000 * 60 * 60 * 24;
  const fourDays = 4
  newIcon.className = "fa-regular fa-bell";
  if ((today - articleDate) / secondsADay < fourDays) {
    newIcon.classList.add("new");
    console.log(newIcon);
  }
  return newIcon;
};

const createComment = ({ comments }) => {
  const comment = document.createElement("p");
  comment.classList.add("comment");
  comment.textContent = `comment ${comments.length}`;
  return comment;
};

const createArticles = (articles) => {
  const articlesList = document.createElement("ul");
  for (const article of articles) {
    const listItem = document.createElement("li");
    const articleTitle = document.createElement("p");
    articleTitle.className = "article-title";
    articleTitle.textContent = article.title;
    articlesList
      .appendChild(listItem)
      .appendChild(articleTitle)
      .insertAdjacentElement("afterend", createComment(article))
      .appendChild(createNewIcon(article));
  }
  return articlesList;
};

const createAndAppendImage = ({ img }) => {
  const pictureContainer = document.createElement("div");
  pictureContainer.classList.add("picture-container");
  const newsImage = document.createElement("img");
  newsImage.src = img;
  pictureContainer.appendChild(newsImage);
  return pictureContainer;
};

const renderContents = (newsGenres) => {
  const fragment = new DocumentFragment();
  const tabContentBox = document.createElement("div");
  tabContentBox.classList.add("tab-content-box");
  for (const newsGenre of newsGenres) {
    // outer frame
    const tabContent = document.createElement("div");
    const articleAndPicureBox = document.createElement("div");
    const articlesContainer = document.createElement("div");

    tabContent.classList.add("tab-content");
    articleAndPicureBox.classList.add("article-and-picture-box");
    articlesContainer.classList.add("articles-container");

    // create articles content and append them to outer outer layer
    const articles = newsGenre.articles;
    tabContent.setAttribute("data-content", "tab-content");
    fragment
      .appendChild(tabContent)
      .appendChild(articleAndPicureBox)
      .appendChild(articlesContainer)
      .appendChild(createArticles(articles));

    articlesContainer.insertAdjacentElement("afterend", createAndAppendImage(newsGenre));
  }

  tabContentBox.appendChild(fragment);
  ul.insertAdjacentElement("afterend", tabContentBox);
  const contents = document.querySelectorAll('[data-content="tab-content"]');
  if (contents.length === 0) {
    console.error('Failed to get [data-content="tab-content"]');
  }
  contents[0].classList.add("show");
};

const displayTabsAndContents = () => {
  const contents = document.querySelectorAll('[data-content="tab-content"]');
  const tabs = document.querySelectorAll('[data-item="tab-item"]');
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
    displayInfo(
      "Something went wrong during fetching data. We are fixing the problem, please come back again"
    );
  }
  renderTabs(newsGenres);
  renderContents(newsGenres);
  displayTabsAndContents();
};

init();
