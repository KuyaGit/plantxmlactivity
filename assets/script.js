var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
    var xmlDoc = this.responseXML;
    
    // You can access and manipulate the XML document (xmlDoc) here
    console.log(xmlDoc);
    displayPlantCatalog(xmlDoc);
    }
};
xhttp.open("GET", "assets/plant_catalog.xml", true);
xhttp.send();

var selectedPlant = null;

function displayPlantCatalog(xmlDoc) {
        var plants = xmlDoc.getElementsByTagName("PLANT");
        var tableBody = document.getElementById("plantTableBody");

        for (var i = 0; i < plants.length; i++) {
            var plant = plants[i];
            var commonName = plant.getElementsByTagName("COMMON")[0].textContent;
            var botanicalName = plant.getElementsByTagName("BOTANICAL")[0].textContent;
            var zones = plant.getElementsByTagName("ZONE")[0].textContent;
            var light = plant.getElementsByTagName("LIGHT")[0].textContent;
            var price = plant.getElementsByTagName("PRICE")[0].textContent;
            var availability = plant.getElementsByTagName("AVAILABILITY")[0].textContent;

            var newRow = tableBody.insertRow();
            var commonNameCell = newRow.insertCell();
            commonNameCell.textContent = commonName;
            var botanicalNameCell = newRow.insertCell();
            botanicalNameCell.textContent = botanicalName;
            var zonesCell = newRow.insertCell();
            zonesCell.textContent = zones;
            var lightCell = newRow.insertCell();
            lightCell.textContent = light;
            var priceCell = newRow.insertCell();
            priceCell.textContent = price;
            var availabilityCell = newRow.insertCell();
            availabilityCell.textContent = availability;

        // Add click event listener to each row
        newRow.addEventListener("click", function(event) {
            var clickedPlant = event.target.parentNode;
            selectedPlant = plants[clickedPlant.rowIndex - 1];
            displayPlantDetails(selectedPlant);
            });
        }``
    }
function displayPlantDetails(plant) {
    var commonNameInput = document.getElementById("commonName");
    var botanicalNameInput = document.getElementById("botanicalName");
    var zonesInput = document.getElementById("zones");
    var lightInput = document.getElementById("light");
    var priceInput = document.getElementById("price");
    var availabilityInput = document.getElementById("availability");
    commonNameInput.value = plant.getElementsByTagName("COMMON")[0].textContent;
    botanicalNameInput.value = plant.getElementsByTagName("BOTANICAL")[0].textContent;
    zonesInput.value = plant.getElementsByTagName("ZONE")[0].textContent;
    lightInput.value = plant.getElementsByTagName("LIGHT")[0].textContent;
    priceInput.value = plant.getElementsByTagName("PRICE")[0].textContent;
    availabilityInput.value = plant.getElementsByTagName("AVAILABILITY")[0].textContent;
    }
    
    function savePlantData(event) {
        console.log("Button is good")
        // Update the XML node with the new values
        selectedPlant.getElementsByTagName("COMMON")[0].textContent = commonNameInput.value;
        selectedPlant.getElementsByTagName("BOTANICAL")[0].textContent = botanicalNameInput.value;
        selectedPlant.getElementsByTagName("ZONE")[0].textContent = zonesInput.value;
        selectedPlant.getElementsByTagName("LIGHT")[0].textContent = lightInput.value;
        selectedPlant.getElementsByTagName("PRICE")[0].textContent = priceInput.value;
        selectedPlant.getElementsByTagName("AVAILABILITY")[0].textContent = availabilityInput.value;

        // Serialize the updated XML document
        var serializer = new XMLSerializer();
        var updatedXmlString = serializer.serializeToString(xmlDoc);

        // Perform the necessary action with the updated XML (e.g., save to a file or send to a server)
        // ...

        console.log("XML node updated successfully!");

        // Update the corresponding table cell values
        var row = document.getElementById("plantTable").rows[selectedPlant.rowIndex];
        row.cells[0].textContent = commonNameInput.value;
        row.cells[1].textContent = botanicalNameInput.value;
        row.cells[2].textContent = zonesInput.value;
        row.cells[3].textContent = lightInput.value;
        row.cells[4].textContent = priceInput.value;
        row.cells[5].textContent = availabilityInput.value;

        // Clear the form inputs
        commonNameInput.value = "";
        botanicalNameInput.value = "";
        zonesInput.value = "";
        lightInput.value = "";
        priceInput.value = "";
        availabilityInput.value = "";

        selectedPlant = null;
        }

document.getElementById("plantForm").addEventListener("submit", savePlantData);

