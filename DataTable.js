import * as AJAX from "./AJAX.js";

//Generic function for creating data tables
export function populateTableData(tableName, editFormName, data, headers, displayCols, deleteFn, editCols, editFn) {
    //Blank current table data
    const table = document.getElementById(tableName);
    table.innerHTML = "";

    //Create header row
    const header = document.createElement("thead");
    table.appendChild(header);
    headers.forEach(name => {
        const headerCell = document.createElement("th");
        header.appendChild(headerCell);
        const headerText = document.createTextNode(name);
        headerCell.appendChild(headerText);
    });

    //Create body
    const body = document.createElement("tbody");
    table.appendChild(body);

    const controlCells = [];

    //Fill body with rows
    data.forEach(rowData => {
        //Create row
        const row = document.createElement("tr");
        body.appendChild(row);

        //Keep track fo cells we create
        const colCells = {};

        //Fill row with data
        displayCols.forEach(col => {
            const cell = document.createElement("td");
            const cellText = document.createTextNode(rowData[col]);
            row.appendChild(cell);
            cell.appendChild(cellText);
            colCells[col] = cell;
        });

        //Add cell for controls
        const controlCell = document.createElement("td");
        row.appendChild(controlCell);
        controlCells.push(controlCell);

        //Add edit button
        const editButton = document.createElement("button");
        controlCell.appendChild(editButton)
        const editButtonText = document.createTextNode("Edit");
        editButton.appendChild(editButtonText);
        editButton.addEventListener("click", () => {
            //Remove all edit and delete buttons
            controlCells.forEach(cell => cell.innerHTML = "");

            //Replace needed rows with forms
            Object.entries(editCols).forEach(([ecol, type]) => {
                const cell = colCells[ecol];
                //Blank cell
                cell.innerHTML = "";

                if (typeof type === "string") {
                    //Add form inputs
                    const input = document.createElement("input");
                    cell.appendChild(input);
                    input.setAttribute("type", type);
                    input.setAttribute("name", ecol);
                    input.setAttribute("value", rowData[ecol]);
                    input.setAttribute("form", editFormName);
                } else if (typeof type === "object") {
                    //Add dropdown menu
                    const select = document.createElement("select");
                    select.setAttribute("name", ecol);
                    select.setAttribute("form", editFormName);
                    cell.appendChild(select);
                    //User can supply method for checking default value
                    const checkDefault =
                        type.checkDefault !== undefined ? type.checkDefault
                            : (row, b) => row[ecol].toString() === b.toString()
                    Object.entries(type).forEach(([value, display]) => {
                        if (value !== "checkDefault") {
                            const option = document.createElement("option");
                            select.appendChild(option);
                            const optionText = document.createTextNode(display);
                            option.appendChild(optionText);
                            option.setAttribute("value", value);
                            if (checkDefault(rowData, value)) {
                                option.setAttribute("selected", "selected");
                            }
                        }
                    });
                }
            });

            //Add save button
            const saveButton = document.createElement("button");
            controlCell.appendChild(saveButton);
            saveButton.setAttribute("type", "submit");
            saveButton.setAttribute("form", editFormName);
            const saveButtonText = document.createTextNode("Save");
            saveButton.appendChild(saveButtonText);

            //Add cancel button
            const cancelButton = document.createElement("button");
            controlCell.appendChild(cancelButton)
            const cancelButtonText = document.createTextNode("Cancel");
            cancelButton.appendChild(cancelButtonText);
            cancelButton.addEventListener("click", () => location.reload());

            //Bind edit form
            document.getElementById(editFormName)
                .addEventListener("submit", AJAX.formSubmitAction((newData) => editFn(rowData, newData)))
        });

        //Add delete button
        const deleteButton = document.createElement("button");
        controlCell.appendChild(deleteButton)
        const deleteButtonText = document.createTextNode("Delete");
        deleteButton.appendChild(deleteButtonText);
        deleteButton.addEventListener("click", () => deleteFn(rowData));
    });
}