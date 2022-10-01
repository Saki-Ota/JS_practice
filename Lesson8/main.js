const addLoading = () =>{
  const loading = document.getElementById("js-loading");
  const loadingImg = document.createElement('img');
  loadingImg.src = 'loading.gif';
  loadingImg.id = "loading-img"
  loading.appendChild(loadingImg)
}

const promiseReject = new Promise((resolve, reject) => {
  addLoading();
  setTimeout(() => {
    reject("The promise was rejected!");
  }, 3000);
});

promiseReject.then((value)　=> {
})
.catch((value) =>{
  console.log(value)
})
