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
// test--------------------------------------------



// test ends-----------------------------

//api related variables to get state and city
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
}
// feteching the states and displaying it in dropdown
function show(data) {
    statewise = data;
    // console.log(statewise);
    var key = Object.keys(statewise);
    var select = document.getElementById("state");
    // select.onchange="showCity(this.value,"+data+")"; -----showing error
    for (var i = 1; i <= key.length; i++) {
        var opt = document.createElement('option');//creating dynamic dropdown 
        opt.value = key[i];
        opt.innerHTML = key[i];
        select.appendChild(opt);
    }
    // console.log(key);
}
function hideloader() {
    console.log("hide")
}

//display city according to the state selected
function showCity(stateName) {
    // console.log(stateName);
    // console.log(data[stateName].districtData);
    var dis = document.getElementById("city");
    dis.selectedIndex = -1;  // everytime new city is selected it should show select city
    dis.options.length = 1;// set to one so that the -1 index i.r select city option should not be removed 
    var jsondistrict = data[stateName].districtData;
    var getdistrict = Object.keys(jsondistrict);
    // console.log(getdistrict);
    for (var i = 0; i < getdistrict.length; i++) {
        var opt = document.createElement('option');
        opt.value = getdistrict[i];
        opt.innerHTML = getdistrict[i];
        dis.appendChild(opt);
    }
}


// validation start
//get all the element through there class or id
// On the load of the body load the variable as it was earlier giving error
var fname, mobile, city, state, pass1, cpass1, successmsg;
function loadVariables() {
    fname = document.querySelector('#name');
    mobile = document.querySelector("#mobile");
    state = document.querySelector('#state');
    city = document.querySelector('#city');
    pass1 = document.querySelector("#password");
    cpass1 = document.querySelector("#confirmpassword");
    successmsg = document.querySelector("#success-msg");
    // console.log(fname);
    // console.log(mobile);
    // console.log(city);
    // console.log(fname);
    // console.log(state);
    // console.log(pass1);
}

// End of fetching the element
//check Enter value is a number or not.Will not allow any value except number
// mobile.setAttribute('maxLength', 10);

function isNumberKey(evt) {
    //  mobile = document.querySelector("#mobile");
    // console.log(mobile)
    var key = evt.keyCode || evt.charCode;

    if (key == 8 || key == 46) {//for detecting  backspace
        mobile.classList.remove('is-valid');
        mobile.classList.add('is-invalid');
        return true;
    }
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    if (mobile.value.length > 9)
        return false;
    else {
        if (mobile.value.length == 9) {
            mobile.classList.add('is-valid');
            mobile.classList.remove('is-invalid');
            return true;
        }
        else {
            // console.log("invalid--" + mobile.value.length)
            mobile.classList.remove('is-valid');
            mobile.classList.add('is-invalid');
            return true;
        }

    }
    // numberPattern = new RegExp("[1-9]{1}[0-9]{9}");




}
//phone validation ends here
// -------------------------------------------------------------------------------
//check strength of password
function passwordPattern(pass) { //register form password strength
    var password = pass.value;
    // console.log(cpass1.value);// Bug fixed**********************************
    // console.log(password)
    if (cpass1.value === password) {//cross check if  any changes made in the main password will relect the confirm pass box
        cpass1.classList.add("is-valid");
        cpass1.classList.remove("is-invalid");
        // console.log("hh")
    }
    else
        if (cpass1.value.trim().length != 0) {
            cpass1.classList.add("is-invalid");
            cpass1.classList.remove("is-valid");
            // console.log("enterted this i")
        }
    pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@_#\%\^&\*])(?=.{8,})");
    if (password.match(pattern)) {
        pass1.classList.add("is-valid");
        pass1.classList.remove("is-invalid");
        // console.log("jjj")
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
    // console.log(showHideicon);
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

var c = 0;
// Check the validation and submit form
function register() {
    if (fname.value == "" || fname.value == null)
        fname.style.border = "1px solid red";
    else if (mobile.value == "" || mobile.value == null)
        mobile.style.border = "1px solid red";
    else if (state.value == "-1")
        state.style.border = "1px solid red";
    else if (city.value == "")
        city.style.border = "1px solid red";
    else if (pass1.value == "" || pass1.value == null)
        pass1.style.border = "1px solid red";
    else if (cpass1.value == "" || cpass1.value == null)
        cpass1.style.border = "1px solid red";
    else if (pass1.value != cpass1.value)
        return false;
    else if (c == 0)
        return false;
    else {

        folder = mobile.value;//with the name of mobile number saving the data of user just to be unique
        var healthParameters = {
            "Fever": 0, "Cold": 0, "Travel15": 0, "Travel30": 0, "Travel2m": 0,
            "Cough": "0", "Soar Throat": 0, "Chest Congestion": 0, "Smell & Taste Sesnse": 0,
            "Body Ache": 0,  "Lung Disease": 0, "Diabetes": 0,
            "Asthma": 0, "Kidney Disorder": 0
        };

        firebase.database().ref(folder).set({// have to code 
            Name: fname.value,
            Mobile: mobile.value,
            State: state.value,
            City: city.value,
            Password: pass1.value,
            Status: 0,//it will be 0 for no security checkup and 1 for secuirty checkup
            Report: 0,
            HealthReport: healthParameters

        });
        c = 0;// to fix the error 
        successmsg.classList.remove("alert-danger")
        successmsg.classList.add("alert-success");
        successmsg.style.display = "block";
        successmsg.innerHTML = "Congratulations you have Registered Successfully";
        setTimeout(function () {
            window.location = "index.html";
        }, 2000);

    }
}
//on change check the user already exist or not
function validUser() {
    // console.log("validuser function working");
    firebase.database().ref(mobile.value).on('value', function (snapshot) {
        // console.log(snapshot.val());
        if (snapshot.val() != null) {
            successmsg.style.display = "block";
            // console.log("User already available");
            // console.log("c1=" + c);
            successmsg.classList.add("alert-danger")
            successmsg.classList.remove("alert-success");
            successmsg.innerHTML = "Mobile Number already exist!";
            c = 0;

        }
        else {
            c = 1;
            successmsg.style.display = "block";
            successmsg.classList.remove("alert-danger")
            successmsg.classList.add("alert-success");
            successmsg.innerHTML = "Username Available";
        }

    });
}