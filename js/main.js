
//Firebase 
const firebaseConfig = {
    apiKey: "AIzaSyAEd36bP9BrCUCvSEojwyKR1NiPnHd8HwM",
    authDomain: "covid-2beca.firebaseapp.com",
    databaseURL: "https://covid-2beca-default-rtdb.firebaseio.com",
    projectId: "covid-2beca",
    storageBucket: "covid-2beca.appspot.com",
    messagingSenderId: "764885681457",
    appId: "1:764885681457:web:4d1cfac2d35be4e5d89c10",
    measurementId: "G-CNHXE33KVH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// firebase ends 




//login function starts 
function login() {
    var username = document.querySelector("#mobile").value;
    var password = document.querySelector("#password").value;
    var errorSuccessMsg = document.querySelector(".alert");
    console.log(username);
    
    //searching

    firebase.database().ref(username).on('value', function (snapshot) {
        if (snapshot.val() == null) {
            console.log(snapshot);
            errorSuccessMsg.classList.add("alert-danger")
            errorSuccessMsg.classList.remove("alert-success");
            errorSuccessMsg.innerHTML= "Username Does not Exist";

        }
        else {
            if ((snapshot.val().Mobile == username) && (snapshot.val().Password == password)) {
                state = snapshot.val().State;
                uname = snapshot.val().Name;
                statuss = snapshot.val().Status;
                city=snapshot.val().City;
                mobile=snapshot.val().Mobile;
                report=snapshot.val().Report;
                localStorage.setItem("state", state);
                localStorage.setItem("city", city);
                localStorage.setItem("name", uname);
                localStorage.setItem("status", statuss);
                localStorage.setItem("username",mobile);
                localStorage.setItem("active","0");
                localStorage.setItem("report",report);
                //code working properly
                setTimeout(function () {
                    if(statuss==1){
                        window.location = "main.html";
                    }
                    else
                    window.location = "selfTest.html";
                }, 2000);
                errorSuccessMsg.classList.add("alert-success")
                errorSuccessMsg.classList.remove("alert-danger")
                errorSuccessMsg.innerHTML= "Congratulations";
            }
            else {
                errorSuccessMsg.classList.add("alert-danger")
                errorSuccessMsg.classList.remove("alert-success")
                errorSuccessMsg.innerHTML= "Invalid Credentials!!";
            }
           
        }

    });
    errorSuccessMsg.style.display = "block";
}
//login functions


// Validation for entering mobile
function checknumber(evt) {
    mobile = document.querySelector("#mobile");
    var key = evt.keyCode || evt.charCode;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        console.log("charcode false");
        return false;
       
    }
    
    if (key == 8 || key == 46) {//for detecting  backspace
        mobile.classList.remove('is-valid');
        mobile.classList.add('is-invalid');
        return true;
    }
        
    if (mobile.value.length > 9){
      
        console.log("line 88 error");
        return false;
        
    }
        
    else {
        if (mobile.value.length == 9) {
            console.log("line 95")
            mobile.classList.add('is-valid');
            mobile.classList.remove('is-invalid');
            return true;
        }
        else {
            console.log("invalid--" + mobile.value.length)
            mobile.classList.remove('is-valid');
            mobile.classList.add('is-invalid');
            return true;
        }

    }
}