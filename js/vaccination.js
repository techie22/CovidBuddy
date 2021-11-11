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
api_url="";
var arr=[];
var status=-1;
function collectdata(){// seraching records for the vaccination avaiable on selected date
    status=0;
    caldate=document.getElementById("dov").value;
    var arr=caldate.split("-");
    console.log(arr);
    pin=document.getElementById("pincode").value;
    console.log(pin);
    formdate=Number(arr[2])+"-"+Number(arr[1])+"-"+Number(arr[0]);
    api_url="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+pin+"&date="+formdate+"";
    getapi(api_url);
}


async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    // console.log(data);
    if (response) {
        hideloader();
    }
    show(data);
}
// Calling that async function

  
// Function to hide the loader
function show(data){
    document.getElementById("show_records").innerHTML="";
    
          console.log(data.sessions);
        var vaccine_center=data.sessions;
        row4="";
        for(var i =0 ;i<vaccine_center.length;i++){
            row4="";
            row0="<table class='vaccinationTable table table-striped'><tbody>";
            row1="<tr><td><b>Center Name </b></td><td>"+vaccine_center[i].address+","+vaccine_center[i].block_name+"</td></tr>";
            row2="<tr><td><b> Center Id</b></td><td> "+vaccine_center[i].center_id+"</td></tr><tr><td><b>Min Age Limit</b><td>"+vaccine_center[i].min_age_limit+"</td></tr>";
            row3="<tr><td colspan='2' style='text-align:center'><i><b>Slots Available</b></i></td></tr>" ;
            for(var j=0;j<vaccine_center[i].slots.length;j++){
                row4+="<tr><td colspan='2' style='text-align:center'>"+vaccine_center[i].slots[j]+"<br></td></tr>";
            }
            row5="<tr><td><b> Vaccine </b></td><td>"+vaccine_center[i].vaccine+"</td></tr>";
            row6="<tr><td><b> Dose 1 slots</td><td>"+vaccine_center[i].available_capacity_dose1+"<td></tr>";
            row7="<tr><td><b> Dose 2 slots</td><td> "+vaccine_center[i].available_capacity_dose2+"<td></tr></tbody></table><hr>"
            document.getElementById("show_records").innerHTML+=row0+row1+row2+row3+row4+row5+row6+row7;

        }
    } 
    function hideloader(){
        console.log("hide")
    }
    