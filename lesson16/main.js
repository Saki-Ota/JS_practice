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


const renderContents = (newsGenres) => {
  const fragment = new DocumentFragment();
  const tabContentBox = document.createElement("div");
  tabContentBox.classList.add("tab-content-box");
  for (const newsGenre of newsGenres) {
    // outer frame
    const tabContent = document.createElement("div");
    const flex = document.createElement("div");
    const articlesContainer = document.createElement("div");
    const articlesList = document.createElement("ul");

    tabContent.classList.add("tab-content");
    flex.classList.add("flex");
    articlesContainer.classList.add("articles-container");

    // article titles and comments (icon)
    const articles = newsGenre.articles;
    for (const article of articles) {
      const articleTitle = document.createElement("li");
      const comment = document.createElement("p");
      comment.classList.add("comment");
      comment.textContent = `  comment ${article.comments.length}`; // adjust padding with css later
      articleTitle.textContent = article.title;

      //   new icon
      const date = new Date(article.date);
      const today = new Date();
      const newIcon = document.createElement("i");
      newIcon.className = "fa-regular fa-bell";
      if ((today - date) / (1000 * 60 * 60 * 24) < 4) {
        newIcon.classList.add("new");
        console.log(newIcon);
      }
      articlesList.appendChild(articleTitle).appendChild(comment).appendChild(newIcon)
    }

    // append article 
    tabContent.setAttribute("data-content", "tab-content");
    fragment
      .appendChild(tabContent)
      .appendChild(flex)
      .appendChild(articlesContainer)
      .appendChild(articlesList);

    // image
    const pictureContainer = document.createElement("div");
    pictureContainer.classList.add("picture-container");
    const image = document.createElement("img");
    pictureContainer.appendChild(image);
    image.src = newsGenre.img;
    articlesContainer.insertAdjacentElement("afterend", pictureContainer);
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
