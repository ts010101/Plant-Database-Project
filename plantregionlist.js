import * as AJAX from "./AJAX.js";
import { getAllRegions, getAllPlants} from "./API.js";
import { populateTableData } from "./DataTable.js";

//READ savedUserPlants
function getAllRegionPlants(callback) {
    AJAX.get("/plantregion/", callback);
}

function populatePlantField(plants) {
    const editOptions = document.getElementById("newRegPlantPlantField");
    editOptions.innerHTML = "";
    plants.forEach(plant => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(plant.plantName);
        option.appendChild(optionText);
        option.setAttribute("value", plant.plantID);
    });
}
function populateRegionField(regions) {
    const editOptions = document.getElementById("newRegPlantRegionField");
    editOptions.innerHTML = "";
    regions.forEach(region => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(region.regionName);
        option.appendChild(optionText);
        option.setAttribute("value", region.regionID);
    });
}

function populateRegionPlantsTable(regions, plants, regplants) {
    const tableName ="regionPlantTable";
    const editFormName = "editRegionPlantForm";
    const headers = ["Region", "Plant" ]
    const displayCols = ["regionName", "plantName"];
    const regEntries = { checkDefault: ({ regionID }, b) => regionID.toString() === b.toString() };
    regions.forEach(({ regionID, regionName}) => {
        regEntries[regionID] = regionName;
    });
    const plantEntries = { checkDefault: ({ plantID }, b) => plantID.toString() === b.toString() };
    plants.forEach(({ plantID, plantName }) => {
        plantEntries[plantID] = plantName;
    });
    const editCols = {
        "regionName": regEntries,
        "plantName": plantEntries,
    }
    const deleteFn = ({plantID, regionID}) => AJAX.del(`/plantregion/${plantID}/${regionID}`, () => location.reload());
    const editFn = ({plantID, regionID}, { plantName, regionName }) =>
        AJAX.put(`/plantregion/${plantID}/${regionID}`, { plantID: plantName, regionID: regionName }, () => location.reload());

    populateTableData(tableName, editFormName, regplants,
        headers, displayCols, deleteFn,
        editCols, editFn);
}


document.addEventListener('DOMContentLoaded', () => {
    getAllPlants((plants) => {
        populatePlantField(plants);
        getAllRegions((regions) => {
            populateRegionField(regions);
            getAllRegionPlants((regionPlants) => {
                populateRegionPlantsTable(regions, plants, regionPlants);
            });
        });
    });

    //Bind new userplants
    document.getElementById("newRegionPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            AJAX.post("/plantregion/", data, () => location.reload());
        }))

});