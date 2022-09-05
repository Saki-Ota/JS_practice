const ul= document.getElementById("js-ul");
const li = document.createElement('li');

const a = document.createElement('a');
a.setAttribute("href", "1.html");

const img = document.createElement('img');
img.setAttribute("src", "bookmark.png");
img.setAttribute("alt", "ブックマーク");
img.textContent = "これです";

li.appendChild(a);
a.appendChild(img);
ul.appendChild(li);
