const addLoading = () =>{
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img";
  loading.appendChild(loadingImg);
}

const promiseFeatures = new Promise((resolve, reject) => {
  addLoading();
  setTimeout(() => {
    reject("The promise was rejected!");
  }, 3000);
});

promiseFeatures.then(
  (value) => {
    console.log('OK', value);
})
.catch((error) =>{
  console.error(error);
});
