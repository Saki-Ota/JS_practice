const ul= document.getElementById("js-ul");
const li = document.createElement('li');

const a = document.createElement('a');
a.href = "1.html";

const text = document.createTextNode("これです");

const img = document.createElement('img');
img.src = "bookmark.png";
img.alt = "ブックマーク";

ul.appendChild(li).appendChild(a).appendChild(img).appendChild(text);
