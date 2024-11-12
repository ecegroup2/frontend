// document.addEventListener("DOMContentLoaded",(e)=>{
//     let circle = document.querySelectorAll('.circle') ;
//     circle.forEach(function(progress){
//         let degree = 0 ;
//         var targetDegree = parseInt(progress.getAttribute('data-degree')) ;
//         let color = progress.getAttribute('data-color') ;
//         let number = progress.querySelector('.number') ;

//         var interval = setInterval(()=>{
//             degree += 1 ;
//             if(degree > targetDegree){
//                 clearInterval(interval) ;
//                 return ;
//             }
//             progress.style.background = `conic-gradient(${color} ${degree}%, #222 0%)` ;
//             number.innerHTML = degree + '<span>%</span>' ;
//             number.style.color =color ;
//         },50)
//     })
// })

const currentDate = new Date();
// Format the date as dd-mm-yy
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
// Months are zero-based
const year = String(currentDate.getFullYear());
// Get the last two digits of the year
const formattedDate = `${year}-${month}-${day}`;
// Set the formatted date to the element with id 'date'
document.getElementById("date").value = formattedDate;

// for input height and weight for BMI in UI
document.getElementById("height").addEventListener("input", calculateBMI);
document.getElementById("weight").addEventListener("input", calculateBMI);
function calculateBMI() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  if (height > 0 || weight > 0) {
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    document.getElementById("bmiresult").innerText = `${bmi}`;
  } else if (height > 0 && weight > 0) {
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);
    document.getElementById("bmiresult").innerText = `${bmi}`;
  }
}

fetchheart();
async function fetchheart() {
  try {
    let heartrate = document.querySelector("#heart");
    let heartratePercentage = document.querySelector("#heartrate_percentage");

    let spo2rate = document.querySelector("#spo2");
    let spo2Percentage = document.querySelector("#spo2_percentage");

    // fetch('http://localhost:9080/api/data/getall').then(val=>val.json()).then(val=>//console.log(val))

    let response = await fetch(
      `http://localhost:9080/api/data/getByDate?date=${formattedDate}`
    );
    let val = await response.json();
    //console.log("val", val);

    const length = Object.keys(val).length;
    // Subtract 1 from the length
    const recentId = length - 1;

    // for rendering heart rate
    heartrate.innerText = `${val[recentId]?.heartrate}`;
    let heartratevaluePercentage = Math.round(heartrate.innerText);
    heartratePercentage.innerText = `${heartratevaluePercentage}%`;

    // for rendering spo2 rate
    spo2rate.innerText = `${val[recentId]?.spo2}`;
    let spo2valuePercentage = Math.round(spo2rate.innerText);
    spo2Percentage.innerText = `${spo2valuePercentage}%`;
  } catch (err) {
    //console.log("error found", err);
  }
}

// for rendering data in table in UI
dateReportList();
async function dateReportList() {
  // Clear the table body before adding new rows
  try {
    const tableBody = document
      .getElementById("data-table")
      .querySelector("tbody");
    tableBody.innerHTML = "";

    const datechanger = document.getElementById("date");
    response = await fetch(
      `http://localhost:9080/api/data/getByDate?date=${datechanger.value}`
    );
    //console.log('date kya hai',formattedDate)
    data = await response.json();
    dataList = [];
    dataList.push(...data);
    for (let i = 1; i <= dataList.length; i++) {
      //console.log(dataList[dataList.length - i]);

      const dataString = dataList[dataList.length - i];
      //console.log("data", dataString);

      // rendering date in UI
      const selectedDate = datechanger.value;
      //console.log(selectedDate);

      // Create a new table row and cell
      const newRow = document.createElement("tr");
      const newCell = document.createElement("td");
      newCell.innerHTML = selectedDate;
      newRow.appendChild(newCell);

      // Append the new row to the table body
      document
        .getElementById("data-table")
        .querySelector("tbody")
        .appendChild(newRow);

      // rendering time in UI
      let id = dataString?.userId;
      //console.log("id", id);
      hms = id % 1000000;
      dis = "";
      while (hms > 0) {
        dis = `${hms % 100}` + dis;
        hms = Math.floor(hms / 100);
        dis = ":" + dis;
      }
      dis = dis.substr(1, dis.length);
      //console.log(dis);

      const newdata = document.createElement("td");
      newdata.innerHTML = dis;
      newRow.appendChild(newdata);
      document
        .getElementById("data-table")
        .querySelector("tbody")
        .appendChild(newRow);

      //for showing details section
      const newdetails = document.createElement("td");
      newdetails.className = "primary";
      newdetails.idName = "details";
      newdetails.innerHTML = "Details";
      newRow.appendChild(newdetails);

      //for onclick evnt on Details section to show the previous test result in UI
      newdetails.setAttribute("onclick", `testResult(${id})`);
    }
  } catch (err) {
    alert("server error");
  }
}

document.getElementById("date").onchange = dateReportList;

async function testResult(id) {
  try {
    //console.log("id mil gya", id);

    let heartrate = document.querySelector("#heart");
    let heartratePercentage = document.querySelector("#heartrate_percentage");

    let spo2rate = document.querySelector("#spo2");
    let spo2Percentage = document.querySelector("#spo2_percentage");

    let response = await fetch(`http://localhost:9080/api/data/get/${id}`);
    let val = await response.json();
    // console.log("val", val);
    // console.log("isit", val?.userId);
    // for rendering heart rate
    heartrate.innerText = `${val?.heartrate}`;
    let heartratevaluePercentage = Math.round(heartrate.innerText);
    heartratePercentage.innerText = `${heartratevaluePercentage}%`;

    // for rendering spo2 rate
    spo2rate.innerText = `${val?.spo2}`;
    //console.log("spo2:", spo2.innerText);
    let spo2valuePercentage = Math.round(spo2rate.innerText);
    spo2Percentage.innerText = `${spo2valuePercentage}%`;
  } catch (err) {
    alert("Server error: fetching data");
  }
}
