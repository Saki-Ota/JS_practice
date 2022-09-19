const ul = document.getElementById("js-ul");
const fragment = new DocumentFragment();
const items = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}];

for (let item of items ){
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.href = item.to;
  a.textContent = item.text;

  const img = document.createElement('img');
  img.src = item.img;
  img.alt = item.alt

  fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin', img);
}

ul.appendChild(fragment);
