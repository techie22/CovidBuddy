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
statecodes = {
    "AN": "Andaman and Nicobar Islands",
    "AP": "Andhra Pradesh",
    "AR": "Arunachal Pradesh",
    "AS": "Assam",
    "BR": "Bihar",
    "CH": "Chandigarh",
    "CT": "Chhattisgarh",
    "DN": "Dadra and Nagar Haveli",
    "DD": "Daman and Diu",
    "DL": "Delhi",
    "GA": "Goa",
    "GJ": "Gujarat",
    "HR": "Haryana",
    "HP": "Himachal Pradesh",
    "JK": "Jammu and Kashmir",
    "JH": "Jharkhand",
    "KA": "Karnataka",
    "KL": "Kerala",
    "LA": "Ladakh",
    "LD": "Lakshadweep",
    "MP": "Madhya Pradesh",
    "MH": "Maharashtra",
    "MN": "Manipur",
    "ML": "Meghalaya",
    "MZ": "Mizoram",
    "NL": "Nagaland",
    "OR": "Odisha",
    "PY": "Puducherry",
    "PB": "Punjab",
    "RJ": "Rajasthan",
    "SK": "Sikkim",
    "TN": "Tamil Nadu",
    "TG": "Telangana",
    "TR": "Tripura",
    "UP": "Uttar Pradesh",
    "UT": "Uttarakhand",
    "WB": "West Bengal"
}

api_url = "";
var arr = [];
api_url = "https://data.covid19india.org/v4/min/data.min.json"
var data;
var status = 0;
getapi(api_url);
async function getapi(url) {

    // Storing response
    const response = await fetch(url);
    // console.log(response);
    // Storing data in form of JSON
    data = await response.json();
    //  console.log(Object.keys(data));
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
    state = Object.keys(data);
console.log(state)
    for (var i = 0; i < state.length; i++) {
        table1 = ""
        // console.log(data[state[i]].districts);
        str = state[i].replace(/ +/g, "");//remove the spaces between the words
        table = '<tr style="background-color:#280645;color:yellow" data-bs-toggle="collapse" data-bs-target="#' + str + '" class="accordion-button rowColor">' +
            '<td colspan="5">' + statecodes[state[i]] + '</td><td>' + data[state[i]].total["tested"] + '</td><td>' + data[state[i]].total["vaccinated1"] + '</td><td>' + data[state[i]].total["vaccinated2"] + '</td></tr>' +
            '<tr><td colspan="12" class="hiddenRow">' +
            '<div class="accordion-body accordion-collapse collapse hide container-fluid" id="' + str + '">' +
            ' <table class="table table-striped table-bordered">' +
            '<thead style="background-color: rgba(187, 130, 236, 0.61);"><tr><th>City</th><th>Tested</th><th>Vaccination 1</th><th>Vaccination 2</th>' +
            '</tr></thead><tbody>';

        city = data[state[i]].districts ? Object.keys(data[state[i]].districts) : [];
        // console.log(city);
        for (var j = 0; j < city.length; j++) {

            singleCity = data[state[i]].districts[city[j]];
            // tested = data[state[i]].districts[city[j]].total["tested"];
            // console.log(singleCity)
            // vaccinated1 = data[state[i]].districts[city[j]].total["vaccinated1"];
            // vaccinated2 = data[state[i]].districts[city[j]].total["vaccinated2"];
            
            var {vaccinated1 = '-NA-', vaccinated2 = '-NA-', tested = '-NA-'} = singleCity.total ? singleCity.total : {};
            if (tested == undefined)
                tested = "-NA-";
            if (vaccinated1 == undefined)
                vaccinated1 = "-NA-";
            if (vaccinated2 == undefined)
                vaccinated2 = "-NA-";

            table1 += '<tr><td style="background-color:rgb(255 193 7 / 30%);font-weight:500" >' + city[j] + '</td><td>' + tested + ' </td><td>' + vaccinated1 + '</td><td>' + vaccinated2 + '</td></tr>';
            // console.log(table); 

        }
        endTable = '</tbody></table></div></td></tr>';
        records.innerHTML += table + table1 + endTable;
    }


}

