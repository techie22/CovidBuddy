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
firebase.initializeApp(firebaseConfig);
//load variables*************************************************
function loadVariables() {

    mobile = document.querySelector("#mobile");
    state = document.querySelector('#state');
    city = document.querySelector('#city');
    pass1 = document.querySelector("#password");
    cpass1 = document.querySelector("#confirmpassword");


    console.log(mobile);
    console.log(city);
    console.log(name);
    console.log(state);
    console.log(pass1);
}
// end of loading vatiable of load of the document***********************
// load api
api_url = "";
var arr = [];
api_url = "https://data.covid19india.org/state_district_wise.json"
var data;
getapi(api_url);
async function getapi(url) {

    // Storing response
    const response = await fetch(url);
    // console.log(response);
    // Storing data in form of JSON
    data = await response.json();
    // console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}//end of calling api
// feteching the states and displaying it in dropdown
function show(data) {
    statewise = data;
    console.log(statewise);
    var key = Object.keys(statewise);
    var select = document.getElementById("state");
    for (var i = 1; i <= key.length; i++) {
        var opt = document.createElement('option');//creating dynamic dropdown 
        opt.value = key[i];
        opt.innerHTML = key[i];
        select.appendChild(opt);
    }
    console.log(key);
}
function hideloader() {
    console.log("hide")
}

//display city according to the state selected
function showCity(stateName) {
    console.log(stateName);
    console.log(data[stateName].districtData);
    var dis = document.getElementById("city");
    dis.selectedIndex = -1;  // everytime new city is selected it should show select city
    dis.options.length = 1;// set to one so that the -1 index i.r select city option should not be removed 
    var jsondistrict = data[stateName].districtData;
    var getdistrict = Object.keys(jsondistrict);
    console.log(getdistrict);
    for (var i = 0; i < getdistrict.length; i++) {
        var opt = document.createElement('option');
        opt.value = getdistrict[i];
        opt.innerHTML = getdistrict[i];
        dis.appendChild(opt);
    }
}

// ************************************************************
//check strength of password
function passwordPattern(pass) { //register form password strength
    var password = pass.value;
    console.log(cpass1.value);// Bug need to be fixed**********************************
    console.log(password)
    if (cpass1.value === password) {//cross check if  any changes made in the main password will relect the confirm pass box
        cpass1.classList.add("is-valid");
        cpass1.classList.remove("is-invalid");
        console.log("hh")
    }
    else
        if (cpass1.value.trim().length != 0) {
            cpass1.classList.add("is-invalid");
            cpass1.classList.remove("is-valid");
            console.log("enterted this i")
        }
    pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\%\^&\*])(?=.{8,})");
    if (password.match(pattern)) {
        pass1.classList.add("is-valid");
        pass1.classList.remove("is-invalid");
        console.log("jjj")
    }
    else {
        pass1.classList.remove("is-valid");
        pass1.classList.add("is-invalid");
    }

}

//Match both the password for confirmation 
function matchPassword(pass) {
    if (pass.value === pass1.value) {
        cpass1.classList.add("is-valid");
        cpass1.classList.remove("is-invalid");

    }
    else {
        cpass1.classList.remove("is-valid");
        cpass1.classList.add("is-invalid");
    }
}

// code to Hide or display password
function showHide() {
    var showHideicon = document.querySelector('.fas');
    console.log(showHideicon);
    if (pass1.type === "password") {
        pass1.type = "text";
        showHideicon.classList.remove('fa-eye-slash');
        showHideicon.classList.add('fa-eye');
    } else {
        pass1.type = "password";
        showHideicon.classList.add('fa-eye-slash');
        showHideicon.classList.remove('fa-eye');
    }
}





// Validate Mobile number
function checkPhone(evt) {
    mobile = document.querySelector("#mobile");
    var key = evt.keyCode || evt.charCode;


    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    if (key == 8 || key == 46) {//for detecting  backspace
        mobile.classList.remove('is-valid');
        mobile.classList.add('is-invalid');
        return true;
    }
    if (mobile.value.length > 9)
        return false;
    else {
        if (mobile.value.length == 9) {
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


function resetPassword() {
    var errorSuccessMsg = document.querySelector(".alert");
    var username = document.querySelector("#mobile").value;
    console.log(username);
    firebase.database().ref(username).on('value', function (snapshot) {
        if (snapshot.val() == null) {
            console.log("entered if");
            console.log(snapshot);
            errorSuccessMsg.classList.add("alert-danger")
            errorSuccessMsg.classList.remove("alert-success");
            errorSuccessMsg.innerHTML = "Username Does not Exist";

        }
        else {
            console.log("entered else");
            console.log(snapshot.val().Mobile);
            console.log(((snapshot.val().Mobile == username) && (snapshot.val().State == state.value) && (snapshot.val().City == city.value) && (pass1.value == cpass1.value)));
            if ((snapshot.val().Mobile == username) && (snapshot.val().State == state.value) && (snapshot.val().City == city.value) && (pass1.value == cpass1.value)) {
                console.log("all values are true")
                firebase.database().ref(username).update({
                    Password: cpass1.value
                })
                //code working properly
                setTimeout(function () {
                    window.location = "index.html";
                }, 2000);
                errorSuccessMsg.classList.add("alert-success")
                errorSuccessMsg.classList.remove("alert-danger")
                errorSuccessMsg.innerHTML = "Congratulations Your Password has been Reset!";
            }
            else {
                errorSuccessMsg.classList.add("alert-danger")
                errorSuccessMsg.classList.remove("alert-success");
                errorSuccessMsg.innerHTML = "Enter your Correct credentials to reset the password";
            }


        }

    });
    errorSuccessMsg.style.display = "block";
}