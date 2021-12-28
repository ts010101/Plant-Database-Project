import * as AJAX from "./AJAX.js";
import { getAllMonths, getAllPlants} from "./API.js";
import { populateTableData } from "./DataTable.js";

//READ savedUserPlants
function getAllMonthPlants(callback) {
    AJAX.get("/plantmonthly/", callback);
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
function populateMonthField(months) {
    const editOptions = document.getElementById("newRegPlantMonthField");
    editOptions.innerHTML = "";
    months.forEach(month => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(month.monthName);
        option.appendChild(optionText);
        option.setAttribute("value", month.monthID);
    });
}

function populateMonthPlantsTable(months, plants, regplants) {
    const tableName ="monthPlantTable";
    const editFormName = "editMonthPlantForm";
    const headers = ["Month", "Plant", "Harvest Ready" ]
    const displayCols = ["monthName", "plantName", "harvestReady"];
    const regEntries = { checkDefault: ({ monthID }, b) => monthID.toString() === b.toString() };
    months.forEach(({ monthID, monthName}) => {
        regEntries[monthID] = monthName;
    });
    const plantEntries = { checkDefault: ({ plantID }, b) => plantID.toString() === b.toString() };
    plants.forEach(({ plantID, plantName }) => {
        plantEntries[plantID] = plantName;
    });
    //'true', 'false', 'true, but subprime'
    const editCols = {
        "monthName": regEntries,
        "plantName": plantEntries,
        "harvestReady": {
            "true": "true",
            "false": "false",
            "true, but subprime": "true, but subprime"
        }
    }
    const deleteFn = ({plantID, monthID}) => AJAX.del(`/plantmonthly/${plantID}/${monthID}`, () => location.reload());
    const editFn = ({plantID, monthID}, { plantName, monthName, ...data }) =>
        AJAX.put(`/plantmonthly/${plantID}/${monthID}`, { plantID: plantName, monthID: monthName, ...data }, () => location.reload());

    populateTableData(tableName, editFormName, regplants,
        headers, displayCols, deleteFn,
        editCols, editFn);
}


document.addEventListener('DOMContentLoaded', () => {
    getAllPlants((plants) => {
        populatePlantField(plants);
        getAllMonths((months) => {
            populateMonthField(months);
            getAllMonthPlants((monthPlants) => {
                populateMonthPlantsTable(months, plants, monthPlants);
            });
        });
    });

    //Bind new userplants
    document.getElementById("newMonthPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            AJAX.post("/plantmonthly/", data, () => location.reload());
        }))

});