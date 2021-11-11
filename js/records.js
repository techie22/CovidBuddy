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
    // console.log(Object.keys(data));
    if (response) {
        hideloader();
    }
    showTable(data);
    console.log(data);


}

function hideloader() {
    console.log("hi");
}
function showTable(data) {
    records = document.getElementById("records");
    console.log(records);
  
    //   console.log("check");
    //   console.log(Object.keys(data));
    state = Object.keys(data);
    for (var i = 0; i < state.length; i++) {
        table1 = ""

        str = state[i].replace(/ +/g, "");//remove the spaces between the words
        table = '<tr style="background-color:#280645;color:yellow" data-bs-toggle="collapse" data-bs-target="#' + str + '" class="accordion-button rowColor">' +
            '<td colspan="5">'+state[i]+'</td><td>Click to view details</td></tr>' +
            '<tr><td colspan="12" class="hiddenRow">' +
            '<div class="accordion-body accordion-collapse collapse hide container-fluid" id="' + str + '">' +
            ' <table class="table table-striped table-bordered">' +
            '<thead style="background-color: rgba(187, 130, 236, 0.61);"><tr><th>City</th> <th>Confirmed</th><th>Active</th><th>Recovered</th><th>Deceased</th><th>Delta Confirmed</th>' +
            '</tr></thead><tbody>';
      
        city = Object.keys(data[state[i]].districtData)
        for (var j = 0; j < city.length; j++) {
            // console.log(data[state[i]].districtData[city[j]].active);
            singleCity = data[state[i]].districtData[city[j]];
            active = singleCity.active;
            recovered = singleCity.recovered;
            confirmed = singleCity.confirmed;
            deceased = singleCity.deceased
            deltaConfirmed = singleCity.delta.confirmed;
            // console.log("---"+ singleCity);
          
            table1 += '<tr><td style="background-color:rgb(255 193 7 / 30%);font-weight:500" >' + city[j] + '</td><td>' + confirmed + '</td><td>' + active + '</td><td>' + recovered + '</td><td>' + deceased + '</td><td>' + deltaConfirmed + '</td></tr>';
            // console.log(table); 

        }
        endTable = '</tbody></table></div></td></tr>';
        records.innerHTML += table + table1 + endTable;
    }


}

