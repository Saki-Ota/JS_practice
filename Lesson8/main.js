const addLoading = () =>{
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img"
  loading.appendChild(loadingImg)
}

const promiseChecker = new Promise((resolve, reject) => {
  addLoading();
  setTimeout(() => {
    reject("The promise was rejected!");
  }, 3000);
});

promiseChecker.then((value)　=> {
  (value) => {
    console.log('OK', value)
  }
})
.catch((error) =>{
  console.error(error)
});
