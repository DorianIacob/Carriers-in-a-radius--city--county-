// "request" array will store the zones (city + county)
let request = [];

document.getElementById("add-to-search-button").onclick = function () {
    const addCity = document.getElementById("add-city");
    const addCounty = document.getElementById("add-county");
    const addRadius = document.getElementById("add-radius");

    if (addCity.value !== "" && addCounty.value !== "") {
        let radius = 0;
        if (addRadius.value !== "") {
            radius = addRadius.value;
        }
        console.log(radius);
        (async () => {
            const citiesUs = await fetch("../cities.json").then(data => data.json());
            const searchZone = document.getElementById("search-zone");
            console.log(citiesUs);
            console.log(addCity.value.toUpperCase());
            console.log(citiesUs[0].city.toUpperCase());
            for (let i = 0; i < citiesUs.length; ++i) {
                if (i === citiesUs.length - 1 && addCity.value.toUpperCase() !== citiesUs[i].city.toUpperCase()) {
                    const para = document.createElement("p");
                    para.textContent = "Enter the correct city name, please";
                    searchZone.appendChild(para);
                } else if (addCity.value.toUpperCase() === citiesUs[i].city.toUpperCase()) {
                    while (searchZone.firstChild.textContent === "Enter the correct city name, please") {
                        searchZone.removeChild(searchZone.firstChild);
                    }
                    // request.push(addCity.value);
                    for (let j = 0; j < citiesUs.length; ++j) {
                        /* function calculateDistanceByCoordinates (lat1, lon1, lat2, lon2) {
                            const R = 6371e3; // metres
                            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
                            const φ2 = lat2 * Math.PI/180;
                            const Δφ = (lat2-lat1) * Math.PI/180;
                            const Δλ = (lon2-lon1) * Math.PI/180;
                        
                            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                            Math.cos(φ1) * Math.cos(φ2) *
                            Math.sin(Δλ/2) * Math.sin(Δλ/2);
                            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                        
                            const d = R * c; // in metres
                            return d/1000;
                        }*/
                        let citiesDistance = calculateDistanceByCoordinates (citiesUs[i].latitude, citiesUs[i].longitude, citiesUs[j].latitude, citiesUs[j].longitude);
                        if (citiesDistance <= radius) {
                            request.push(citiesUs[j].city);
                        }
                    }
                }
            }
            console.log(request);
        })();
        let cityCounty = addCity.value + ", " + addCounty.value;
        //request.push(cityCounty);
        const para = document.createElement("p");
        para.textContent = cityCounty;
        document.getElementById("search-zone").appendChild(para);
//        addCity.value = "";
//        addCounty.value = "";
//        addRadius.value = "";
    }
}

document.getElementById("search-button").onclick = function () {
    if (request.length !== 0) {
        let finalRequest = '{ "Addresses": [';
        for (let i = 0; i < request.length; ++i) {
            finalRequest += '"' + request[i] + '", ';
        }
        finalRequest += "] }";
        (async () => {
            const response = await fetch('https://devapi.alvys.io/api/carriers/QueryCarriersByAddress', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic amRldjpUbU5zTFRBeFl6Y3lOREkwTFRsak1HSXROR1EwWmkxaVpqYzFMV1JrT1RjM09XWXdZakJqTWkwdGJYSks='
            },
            body: finalRequest
            });
            const carriers = await response.json();
            document.getElementById("refresh").style.display = "block";
            document.getElementById("output").style.display = "block";
            for (let i = 0; i < carriers.length; ++i) {
                const trElement = document.createElement("tr");
                document.getElementById("table-body").appendChild(trElement);
                const thElement = document.createElement("th");
                thElement.scope = "row";
                thElement.textContent = i + 1;
                trElement.appendChild(thElement);
                const tdName = document.createElement("td");
                tdName.textContent = carriers[i].Name;
                trElement.appendChild(tdName);
                const tdEmail = document.createElement("td");
                tdEmail.textContent = carriers[i].Address.Email;
                trElement.appendChild(tdEmail);
                const tdPhone = document.createElement("td");
                tdPhone.textContent = carriers[i].Address.Phone;
                trElement.appendChild(tdPhone);
            }
            console.log(carriers);
        })();
    }
}

document.getElementById("start-new-search-button").onclick = function () {
    request = [];
    location.reload();
}

function calculateDistanceByCoordinates (lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d/1000;
}

/*
let myInit = { method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                cache: 'default'};

let myRequest = new Request("../cities.json", myInit);
*/

/*
async function fetchText() {
    let response = await fetch('../cities.json');
    let result =  response.json();
    console.log(result);
}

var citiesUS = fetchText();

// console.log(citiesUS);
*/

/*
  fetch("../cities.json")
                .then(response => 
                   { citiesUS = response.body;
                    console.log(citiesUS);}
                    )
//                    .then(data => data)
  console.log(citiesUS);
*/
/*
import * as data from '../cities.json';
const {name} = data;
console.log(name);
*/
/*
 import json from '../cities.json';


console.log(json);
*/