// check the active status so that user wont be able to directly open any page
function logout() {    
    localStorage.removeItem("status");
    localStorage.removeItem("report");
    localStorage.removeItem("name");
    localStorage.removeItem("city");
    localStorage.removeItem("state");
    localStorage.removeItem("username");
    localStorage.setItem("active", "-1");
    window.location = "index.html";
}
if (localStorage.getItem("active") == null || localStorage.getItem("active") == "-1") {    
    window.location = "index.html";
}

//end of the active
// Firebase 
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
// firebase ends *******************************************

//api related variables to get state and city
api_url = "";
var arr = [];
api_url = "https://data.covid19india.org/state_district_wise.json"
var data;
var statuss = 0;
var state=  localStorage.getItem("state");
var city=  localStorage.getItem("city");
console.log(state,city)
getapi(api_url);
async function getapi(url) {

    // Storing response
    const response = await fetch(url);
    // console.log(response);
    // Storing data in form of JSON
    data = await response.json();
    console.log(data);
    // console.log(Object.keys(data));
    if (response) {
        hideloader();
    }

    showDetails(data);


}

// feteching the states and displaying it in dropdown
report=localStorage.getItem("report");
statuss=localStorage.getItem("status");
console.log(report,statuss);
msg=document.querySelector(".alert");
if(statuss==0){
    msg.classList.add("alert-danger");
    msg.classList.remove("alert-warning");
    msg.classList.remove("alert-success");
    msg.innerHTML="Kindly do your Self Test.Its for your own safety"
}

else if(statuss==1 && report==0){
    msg.innerHTML="Your are safe";
    msg.classList.remove("alert-danger");
    msg.classList.remove("alert-warning");
    msg.classList.remove("alert-info");
    msg.classList.add("alert-success");
}
else if(statuss==1 && report==1){
    msg.innerHTML="You have have a flu,but You need to take precautions.";
    msg.classList.remove("alert-danger");
    msg.classList.remove("alert-success");
    msg.classList.remove("alert-warning");
    msg.classList.add("alert-info");
}
else if(statuss==1 && report==2){
    msg.innerHTML="As you have Travelled.These might be covid symptoms.Quarantine and Monitor your health for 4-5 days.Visit doctor if there is no change in your health";
    msg.classList.add("alert-warning");
    msg.classList.remove("alert-success");
    msg.classList.remove("alert-danger");
    msg.classList.remove("alert-info");
}
else if(statuss==1 && report==3){
    msg.classList.add("alert-danger");
    msg.classList.remove("alert-success");
    msg.classList.remove("alert-info");
    msg.classList.remove("alert-warning");
    msg.innerHTML="Go for RTPCR Test.you need Medical Assistance";
}


function showDetails() {

    console.log(data[state].districtData);
    cityRecords=data[state].districtData[city];

   document.getElementById("confirmed").innerHTML=cityRecords.confirmed ;
   document.getElementById("active").innerHTML=cityRecords.active
   document.getElementById("deceased").innerHTML=cityRecords.deceased;
   document.getElementById("recovered").innerHTML=cityRecords.recovered;
  

}
function hideloader() {
    console.log("hide")
}
