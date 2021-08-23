let uploadFiles = (file) => {
  return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(`myfolder/todayImages/${file.name}`);
      // let progress1 = document.getElementById("progress");
      // let bar = document.getElementById("bar");
      // progress1.style.display = "block"
      let uploading = storageRef.put(file)
      uploading.on('state_changed',
          (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // bar.style.width = Math.round(progress.toFixed()) + "%";
              // bar.innerHTML = Math.round(progress.toFixed()) + "%";
              switch (snapshot.state) {
                  case firebase.storage.TaskState.PAUSED:
                      console.log('Upload is paused');
                      break;
                  case firebase.storage.TaskState.RUNNING:
                      console.log('Upload is running');
                      break;
              }
          },
          (error) => {
              reject(error)
          },
          () => {
              uploading.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  resolve(downloadURL)
              });
          }
      );
  })
}

firebase.auth().onAuthStateChanged((user)=>{
  if (user){
      var uid = user.uid;
      firebase.database().ref(`rest/${uid}`).once("value",function (data){
        //   let userName = document.getElementById("username")
        //   let userEmail = document.getElementById("useremail") 
        //   let userImage = document.getElementById("userprofile")
        //   userImage.setAttribute('src',data.val().profile) 
        // //  userName.innerHTML = data.val().userName
        // //  userEmail.innerHTML = data.val().userEmail 
      })
  }
  else {
      window.location.href = "getstart.html"
  }
})

function logOut(){
  firebase.auth().signOut()
  .then(() =>{
    window.location.href="getstart.html"
  })
}
function addItems() {
  firebase.auth().onAuthStateChanged ( async(user)=>{
  let productName = document.getElementById("productname")
  let productCatoegory = document.getElementById("Catoegory")
  let productDescription = document.getElementById("ProductDescription")
  let productPrice = document.getElementById("Price")
  let proimage = document.getElementById("file")
  let image = await uploadFiles(proimage.files[0])
  let productDelivery = document.getElementById("dlivery")
    
        
        firebase.database().ref(`rest/${user.uid}/products`).push({
          product : productName.value,
          catoegory : productCatoegory.value,
          description : productDescription.value,
          price : productPrice.value,
          delivery : productDelivery.value,
          profile : image,
        })
        .then(()=>{
          alert ("product add Succsessfully")
          productName.value = " "
          productCatoegory.value = " "
          productDescription.value = " "
          productPrice.value = " "
          productDelivery.value = " "
          
        })
    
})}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid)
    firebase.database().ref(`rest/${uid}/products`).once("child_added", (data) => {
      let cards = document.getElementById("cards");
      cards.innerHTML += `<div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${data.val().profile}" alt="Card image cap">
        <div class="card-body">
          <h5>${data.val().product}</h5>
          <p class="card-text">Price ${data.val().price}</p>
          <p class="card-text">Catoegry ${data.val().catoegory}</p>
          <p class="card-text">Delivery ${data.val().delivery}</p>
        </div>
      </div>`
    })

  }

})