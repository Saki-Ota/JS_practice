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
}


const getResponse = new Promise((resolve, reject) => {
  return fetch('http://myjson.dit.upm.es/api/bins/dg7g').then(response => {
    if(response.status !== 200){
      resolve(response.json())
    } else {
      reject('Failed to get data from server!')
    }
  })
})



const checkResponsedData = async () => {
  addLoading();

  try{
    return await getResponse;
  } catch(error) {
    console.log(error)
    displayError(error);
  } finally {
    removeLoading();
  }
}


const init = async () =>{
  const result = await checkResponsedData();
  renderLists(result.data);
}

init();
