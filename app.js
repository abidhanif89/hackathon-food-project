// console.log(firebase)

function register(){
    let name = document.getElementById("name")
    let resname = document.getElementById("resname")
    let city = document.getElementById("city")
    let email = document.getElementById("useremail")
    let password = document.getElementById("userpassword")
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
    .then((res) => { 
        var user = res.user;
        firebase.database().ref(`customer/${res.user.uid}`).set({
            userName : name.value,
            userEmail : email.value,
            userPassword : password.value,
            // role:"customer"
        })
        .then(()=>{
            swal("Successfully!", "User created", "success");
        // window.location.href = "login.html"
            console.log (user)
        })
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        swal(`"Error",/${errorMessage}`);
      });
    
    }

    function reg(){
        let name = document.getElementById("name")
        let resname = document.getElementById("resname")
        let city = document.getElementById("city")
        let email = document.getElementById("adminemail")
        let password = document.getElementById("adminpassword")
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => { 
            var user = res.user;
            firebase.database().ref(`rest/${res.user.uid}`).set({
                ownerName : name.value,
                businessName: resname.value,
                ownerEmail : email.value,
                ownerPassword : password.value,
                role:"owner"
                // profile:image
            })
            .then(()=>{
                swal("Successfully!", "User created", "success");
            window.location.href = "login.html"
        
                console.log (user)
            })
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            swal(`"Error",/${errorMessage}`);
          });
        
        }

function login(){
    let email = document.getElementById("adminemail")
    let password = document.getElementById("adminLoginpass")
    console.log (email.value)
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    var user = userCredential.user;
    swal("Successfully!", "User Login", "success");
    window.location.href = "index.html"
    let resturantName = document.getElementById("resturantName")
    resturantName.innerHTML = resname

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    swal(`"Error",${errorMessage}`);
  });
}

