
//api related variables to get state and city
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


api_url = "";
var arr = [];
api_url = "https://data.covid19india.org/state_district_wise.json"
var data;
var status = 0;
getapi(api_url);
async function getapi(url) {

    // Storing response
    const response = await fetch(url);
    // console.log(response);
    // Storing data in form of JSON
    data = await response.json();
    console.log(Object.keys(data));
    if (response) {
        hideloader();
    }

    showstate(data);


}
// feteching the states and displaying it in dropdown
function showstate(data) {

    console.log("show");
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
    // console.log(stateName);
    console.log(data[stateName].districtData);
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


//show cases


function showcases() {
    // document.getElementById("showRecords").innerHTML = "";
    var getstate = document.getElementById("state").value;
    console.log(data[getstate]);
    var getcity = document.getElementById("city").value;
    console.log(getcity);
    console.log(data[getstate].districtData[getcity]);

    stateRecords = data[getstate];
    cityRecords = data[getstate].districtData[getcity];
    console.log("----" + cityRecords.active)

    row1 = "<table class='table table-striped'><tbody>"
    // console.log(stateRecords[i].districtData[getCity]);       
    // console.log(stateRecords[i].districtData[getCity].active);
    console.log(cityRecords.deceased)
    row2 = "<tr><td><b>Confirmed</b></td><td>" + cityRecords.confirmed + "</td></tr>"
    row3 = "<tr><td><b>Active</b></td><td>" + cityRecords.active + "</td></tr>"
    row4 = "<tr><td><b>Deceased</b></td><td>" + cityRecords.deceased + "</td></tr>"
    row5 = "<tr><td><b>Recovered</b></td><td>" + cityRecords.recovered + "</td></tr>"
    rown = "</tbody></table>"
    document.getElementById("showRecords").innerHTML = row1 + row2 + row3 + row4 + row5 + rown;




}
