console.log("JavaScript Multi Level Dropdown");

var state_dropdown = document.getElementById("state");
var district_dropdown = document.getElementById("district");
var address_dropdown = document.getElementById("city");
var district_div = document.getElementById("district_div");
var city_div = document.getElementById("city_div");

district_div.style.display = "none";
city_div.style.display = "none";

async function getStates() {

  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('Origin','*');

  var response = await fetch("https://electoralsearch.in/Home/GetStateList",{
    mode: 'cors',
    method: 'GET',
    headers: headers
  });

  var json_data = await response.json();

  console.log(json_data);

  state_dropdown.innerHTML = "";
  json_data.forEach((item, index) => {
    var option = document.createElement("option");
    option.text = item.state_name;
    option.value = item.state_code;

    state_dropdown.appendChild(option);
  });
}

async function getDistrict(state_id) {
  district_div.style.display = "none";
  var response = await fetch(
    "https://electoralsearch.in/Home/GetDistList?st_code=" + state_id
  );

  var json_data = await response.json();

  console.log(json_data);

  district_dropdown.innerHTML = "";
  json_data.forEach((item, index) => {
    var option = document.createElement("option");
    option.value = item.dist_no;
    option.text = item.dist_name;

    district_dropdown.appendChild(option);
  });
  district_div.style.display = "block";
}

async function getAddress(district_id) {
  city_div.style.display = "none";
  var response = await fetch(
    `https://electoralsearch.in/Home/GetAcList?dist_no=${district_id}&st_code=S13`
  );

  var json_data = await response.json();

  console.log(json_data);

  address_dropdown.innerHTML = "";
  json_data.forEach((item, index) => {
    var option = document.createElement("option");
    option.value = item.ac_no;
    option.text = item.ac_name;

    address_dropdown.appendChild(option);
  });
  city_div.style.display = "block";
}

async function getCaptcha(){
  var res = await fetch("https://electoralsearch.in/Home/GetCaptcha?image=true");
  var json_data = await res.json();

  document.write(json_data);
}
getCaptcha();

getStates();

state_dropdown.onchange = function () {
  getDistrict(state_dropdown.value);
};

district_dropdown.onchange = function () {
  getAddress(district_dropdown.value);
};


async function getVoterName(){
  var fname = document.querySelector("#fname").value;
  var fathername = document.querySelector("#fathername").value;
  var age = document.querySelector("#age").value;
  var gender = document.querySelector("#gender").value;
  var captcha = document.querySelector("#captcha").value;
  var statevalue = document.querySelector("#state").value;
  var districtvalue = document.querySelector("#district").value;
  var city_divvalue = document.querySelector("#city").value;

  try {
    const response = await axios.post(`https://electoralsearch.in/Home/searchVoter?age=${age}&gender=${gender}&location=S13,${districtvalue},${city_divvalue}&location_range=20&name=${fname}&page_no=1&results_per_page=10&reureureired=ca3ac2c8-4676-48eb-9129-4cdce3adf6ea&rln_name=${fathername}&search_type=details&txtCaptcha=${captcha}  `,)
    console.log("Request successful!")
    console.log(response);
  } catch (error) {
    if (error.response) {
      console.log(error.reponse.status)
    } else {
      console.log(error.message)
    }
  }


}

