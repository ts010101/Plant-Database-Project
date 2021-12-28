import * as AJAX from "./AJAX.js";
import { getAllRegions } from "./API.js";

//CREATE new Region
function createNewRegion(region) {
    //Submit region data, then refresh page
    AJAX.post("/regions/", region, () => location.reload())
}

//UPDATE Region
function editregion({ regionID, regionName, state }) {
    //Submit region data, then refresh page
    AJAX.put(`/regions/${regionID}`, { regionName, state }, () => location.reload())
}

//populate region table
function populateRegionTable(regions) {
    const body = document.getElementById("regionsTable");
    const editOptions = document.getElementById("editRegionID");
    //Clear previous table data
    body.innerHTML = "";
    editOptions.innerHTML = "";
    //Fill new table data
    for (const region of regions) {
        //Populate region table
        {
            const row = document.createElement("tr");

            const idCell = document.createElement("td");
            const idText = document.createTextNode(region.regionID);

            const nameCell = document.createElement("td");
            const nameText = document.createTextNode(region.regionName);

            const stateCell = document.createElement("td");
            const stateText = document.createTextNode(region.state);
                
            const deleteCell = document.createElement("td");
            const deleteButton = document.createElement("button");
            const deleteButtonText = document.createTextNode("Delete");

            // delete button 
            deleteButton.addEventListener("click", () => {
                AJAX.del(`/regions/${region.regionID}`, () => location.reload());
            });

            body.appendChild(row);

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(stateCell);
            row.appendChild(deleteCell);

            idCell.appendChild(idText);

            nameCell.appendChild(nameText);

            stateCell.appendChild(stateText);

            deleteCell.appendChild(deleteButton);
            deleteButton.appendChild(deleteButtonText);
        }
        //Populate edit form
        {
            const option = document.createElement("option");
            const optionText = document.createTextNode(`${region.regionID}: ${region.regionName}`);

            editOptions.appendChild(option);
            option.appendChild(optionText);
            option.setAttribute("value", region.regionID);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //bind createNewRegion to form
    document.getElementById("newRegionForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewRegion(data);
        }));

    // bind editNewRegion to form
    document.getElementById("editRegionForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            editregion(data);
        }));

    getAllRegions(populateRegionTable);
});