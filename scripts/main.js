// "request" array will store the zones (city + county)
let request = [];


document.getElementById("add-to-search-button").onclick = function () {
    const addCity = document.getElementById("add-city");
    const addCounty = document.getElementById("add-county");
    if (addCity.value !== "" && addCounty.value !== "") {
        let cityCounty = addCity.value + ", " + addCounty.value;
        request.push(cityCounty);
        const para = document.createElement("p");
        para.textContent = cityCounty;
        document.getElementById("search-zone").appendChild(para);
        addCity.value = "";
        addCounty.value = "";
    }
}

document.getElementById("search-button").onclick = function () {
    if (request.length !== 0) {
        finalRequest = '{ "Addresses": [';
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