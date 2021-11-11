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

username = localStorage.getItem("username");
console.log(username);
none="";
function check() {
    var sPoints = 0;
var mcqPoints = 0;
var totalPoints = 0;
var travelPoints = 0;
    alert = document.querySelector('.alert');
    fever = document.querySelector('input[name="fever"]:checked').value;
    cold = document.querySelector('input[name="cold"]:checked').value;
    cough = document.querySelector('input[name="cough"]:checked').value;
    ts = document.querySelector('input[name="tastesmell"]:checked').value;
    st = document.querySelector('input[name="soarThroat"]:checked').value;
    t15 = document.querySelector('input[name="travel15"]:checked').value;
    t30 = document.querySelector('input[name="travel30"]:checked').value;
    t2m = document.querySelector('input[name="travel2m"]:checked').value;
    // none=document.querySelector('input[name="none"]:checked').value;
    var checkedValue = [];
    if (fever == null || cold == null || cold == null || ts == null || st == null || t15 == null || t30 == null || t2m == null) {
        alert.style.display = "block";
        alert.classList.remove("alert-success");
    alert.classList.add("alert-danger");
        alert.innerHTML = "Kindly check the form again.You left Some important Information";

    }
    console.log("none=" +none);
    var inputElements = document.getElementsByName("disease[]");

    for (var i = 0; i < inputElements.length; ++i) {
        if (inputElements[i].checked == true) {
            checkedValue[i] = inputElements[i].value;
        }
        else
            checkedValue[i] = "NA";


    }
    console.log(checkedValue)

    if (fever == "yes")
        sPoints += 1;
    if (cough == "yes")
        sPoints += 1;
    if (cold == "yes")
        sPoints += 1;
    if (st == "yes")
        sPoints += 1;
    if (ts == "no")
        sPoints += 5;
    if (t15 == "yes" || t30 == "yes" || t2m == "yes")
        travelPoints = 10;
    console.log(checkedValue.length);
    console.log(sPoints);
    if(none=="none"){
        mcqPoints=0;
    }
    else{
        for (var i = 0; checkedValue.length; ++i) {

            if (checkedValue[i] == "Asthma" || checkedValue[i] == "chestC" || checkedValue[i] == "diabetes" || checkedValue[i] == "KidneyD" || checkedValue[i] == "LungD") {
                mcqPoints = 10;console.log("check for")
                break;
            }
                       
    
        }// for ends
    }
   

    console.log(sPoints + " **" + travelPoints + " **" + mcqPoints);

    if ((sPoints <=4 && ((travelPoints <9 && mcqPoints<9 )|| none=="none")) ||(sPoints<=3 && travelPoints >9 && mcqPoints>9)||(sPoints<=3 && travelPoints <9 && mcqPoints>9 ))
        report = 1;
    if (sPoints ==4  && travelPoints >9 && mcqPoints >9)
        report = 2;
     if (sPoints>4)
        report = 3;
     if (sPoints<3 &&((travelPoints<9 && mcqPoints<9)|| none=="none"))
        report = 0;
   
    // updating the values of health report 
    var healthParameters = {
        "Fever": fever, "Cold": cold, "Travel15": t15, "Travel30": t30, "Travel2m": t2m,
        "Cough": cough, "Soar Throat": st, "Chest Congestion": checkedValue[1], "Smell & Taste Sesnse": ts,
        "Points": totalPoints, "Lung Disease": checkedValue[4], "Diabetes": checkedValue[2],
        "Asthma": checkedValue[0], "Kidney Disorder": checkedValue[3]
    };
    console.log(" report= " + report)
    console.log(healthParameters);
    firebase.database().ref(username).update({
        Report: report,//reportStatus  0 well,1 not well,2 require medical help
        Status: 1,//status 1 means, self test filled
        HealthReport: healthParameters
    })
    localStorage.setItem("status", 1);
    localStorage.setItem("report", report);
    alert.style.display = "block";
    alert.classList.add("alert-success");
    alert.classList.remove("alert-danger");
    alert.innerHTML = "Kindly check the form again.You left Some important Information";

    setTimeout(function () {
        window.location = "main.html";
    }, 2000);

}
function skip() {
    console.log("skp");
    window.location = "main.html";
}


function uncheckall() {
    checks=document.getElementsByName("disease[]");
    
 for(var i =0;i<checks.length;i++){
    checks[i].checked = false;
   console.log("uncheck");
   none="none";
 }
    


}