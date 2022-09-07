const ul = document.getElementById("js-ul");

const a1 = document.createElement("a");
a1.href = "a1.html";

const a2 = document.createElement("a");
a2.href = "a2.html";

const img1 = document.createElement("img");
img1.src = "/img/bookmark.png";

const img2 = document.createElement("img");
img2.src = "/img/message.png";

const array = [{a: a1, img: img1, text: "a1"}, {a: a2, img: img2, text: "a2"}];

array.forEach(e =>{
  let li = document.createElement('li');
  e.a.textContent= e.text;
  li.appendChild(e.a).insertAdjacentElement('afterbegin', e.img);
  ul.appendChild(li);
});
