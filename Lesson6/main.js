const ul = document.getElementById("js-ul");
const fragment = new DocumentFragment();
const features = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"},
{to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}];

new Promise((resolve) => {
  setTimeout(() => {
    resolve(features);
  }, 3000);
}).then((value)　=> {
    for (let feature of value ){
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');
      a.href = feature.to;
      a.textContent = feature.text;
      img.src = feature.img;
      img.alt = feature.alt

      fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin', img);
    }

    ul.appendChild(fragment);
  }
);
