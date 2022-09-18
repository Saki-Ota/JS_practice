const ul = document.getElementById("js-ul");
const fragment = new DocumentFragment();
const imgSrcs = ['./img/bookmark.png', './img/message.png'];

for(i = 0; i < imgSrcs.length; i++){
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = imgSrcs[i];

  const a = document.createElement('a');
  a.href = `a${i+1}.html`;
  a.textContent = `a${i + 1}`;

  fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin', img);
}

ul.appendChild(fragment)
