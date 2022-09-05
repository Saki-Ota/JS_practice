const ul= document.getElementById("js-ul");
const li = document.createElement('li');

const a = document.createElement('a');
a.setAttribute("href", "1.html");
const text = document.createTextNode("これです");

const img = document.createElement('img');
img.setAttribute("src", "bookmark.png");
img.setAttribute("alt", "ブックマーク");

a.appendChild(img);
a.appendChild(text);
li.appendChild(a);
ul.appendChild(li);
