import * as AJAX from "./AJAX.js";
import { getAllEnvironments, getAllPlants} from "./API.js";
import { populateTableData } from "./DataTable.js";

//READ savedUserPlants
function getAllEnvironPlants(callback) {
    AJAX.get("/plantenv/", callback);
}

function populatePlantField(plants) {
    const editOptions = document.getElementById("newEnvPlantPlantField");
    editOptions.innerHTML = "";
    plants.forEach(plant => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(plant.plantName);
        option.appendChild(optionText);
        option.setAttribute("value", plant.plantID);
    });
}
function populateEnvironField(environs) {
    const editOptions = document.getElementById("newEnvPlantEnvironField");
    editOptions.innerHTML = "";
    environs.forEach(environ => {
        const option = document.createElement("option");
        editOptions.appendChild(option);
        const optionText = document.createTextNode(environ.environName);
        option.appendChild(optionText);
        option.setAttribute("value", environ.environID);
    });
}

function populateEnvironPlantsTable(environs, plants, regplants) {
    const tableName ="envPlantTable";
    const editFormName = "editEnvironPlantForm";
    const headers = ["Environ", "Plant", "Impact" ]
    const displayCols = ["environName", "plantName", "environImpact"];
    const envEntries = { checkDefault: ({ environID }, b) => environID.toString() === b.toString() };
    environs.forEach(({ environID, environName}) => {
        envEntries[environID] = environName;
    });
    const plantEntries = { checkDefault: ({ plantID }, b) => plantID.toString() === b.toString() };
    plants.forEach(({ plantID, plantName }) => {
        plantEntries[plantID] = plantName;
    });
    const editCols = {
        "environName": envEntries,
        "plantName": plantEntries,
        "environImpact": "text"
    }
    const deleteFn = ({plantID, environID}) => AJAX.del(`/plantenv/${plantID}/${environID}`, () => location.reload());
    const editFn = ({plantID, environID}, { plantName, environName, ...data}) =>
        AJAX.put(`/plantenv/${plantID}/${environID}`, { plantID: plantName, environID: environName, ...data}, () => location.reload());

    populateTableData(tableName, editFormName, regplants,
        headers, displayCols, deleteFn,
        editCols, editFn);
}


document.addEventListener('DOMContentLoaded', () => {
    getAllPlants((plants) => {
        populatePlantField(plants);
        getAllEnvironments((environs) => {
            populateEnvironField(environs);
            getAllEnvironPlants((environPlants) => {
                populateEnvironPlantsTable(environs, plants, environPlants);
            });
        });
    });

    //Bind new userplants
    document.getElementById("newEnvironPlantForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            AJAX.post("/plantenv/", data, () => location.reload());
        }))

});