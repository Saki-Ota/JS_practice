const ul = document.getElementById("js-ul");

const addLoading = () =>{
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img";
  loading.appendChild(loadingImg);
};

const removeLoading = () =>{
  document.getElementById('loading-img').remove();
};

const renderLists = (features) =>{
  const fragment = new DocumentFragment();

  for (let feature of features ){
      const li = document.createElement('li');
      const a = document.createElement('a');
      const img = document.createElement('img');
      a.href = feature.to;
      a.textContent = feature.text;
      img.src = feature.img;
      img.alt = feature.alt;

      fragment.appendChild(li).appendChild(a).insertAdjacentElement('afterbegin', img);
    };

    ul.appendChild(fragment);
};

const displayError = (error) =>{
  const li = document.createElement('li');
  li.textContent = error;
  ul.appendChild(li);
};



const checkResponseStatus = async () => {
  const fetchedData = await fetch('https://mocki.io/v1/ee8a871e-2b46-4a91-b565-4d6f9216f300');
  if(fetchedData.status === 200){
    return fetchedData.json();
  } else {
    return Promise.reject(new Error('Failed to fetch data from server!'));
  }
};


const displayListOrError= async () =>{
 await checkResponseStatus()
 .then(json => {
     renderLists(json.data);
    })
 .catch(error => {
    displayError(error);
  })
};

const init = () =>{
  addLoading();
  setTimeout(() => {
    displayListOrError();
    removeLoading();
  }, 3000);
};

init();
