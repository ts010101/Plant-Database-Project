import * as AJAX from "./AJAX.js";
import { getAllUsers } from "./API.js";
import { populateTableData } from "./DataTable.js"

//CREATE new User
// user is a object with {username, favoritePlants}
function createNewUser(user) {
    //Submit user data, then refresh page
    AJAX.post("/users/", user, () => location.reload())
}

//populate allUsersPlants table
function populateUserTable(data) {
    const tableName = "allUsersTable";
    const editFormName = "editUserForm";
    const headers = ["ID", "Users", "Favorite Plants"];
    const displayCols = ["userID", "username", "favoritePlants"];
    const editCols = {
        username: "text",
        favoritePlants: "text",
    }
    const deleteFn = (user) => AJAX.del(`/users/${user.userID}`, () => location.reload());
    const editFn = ({ userID }, { username, favoritePlants }) =>
        AJAX.put(`/users/${userID}`, { username, favoritePlants }, () => location.reload());

    populateTableData(tableName, editFormName, data,
        headers, displayCols, deleteFn,
        editCols, editFn);
}

document.addEventListener('DOMContentLoaded', () => {
    //bind createNewUser to form
    document.getElementById("newUserForm")
        .addEventListener("submit", AJAX.formSubmitAction((data) => {
            createNewUser(data);
        }));

    //bind userSearchForm
    document.getElementById("userSearchForm")
        .addEventListener("submit", AJAX.formSubmitAction(({ username }) => {
            getAllUsers((users) => {
                const result = users.filter((u) => u.username === username)[0];
                if (result !== undefined) {
                    const text = document.createTextNode(JSON.stringify(result));
                    const resultDiv = document.getElementById("searchResult");
                    //Clear any previous search results
                    resultDiv.innerHTML = "";
                    //Add this search result
                    resultDiv.appendChild(text);
                }
            })
        }));

    getAllUsers(populateUserTable);
});