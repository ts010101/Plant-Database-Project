//ajax helper
export function post(path, content, callback) {
    var xhttp = new XMLHttpRequest();
    if (callback !== undefined) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }
    xhttp.open("POST", path, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(content));
}

//PUT helper
export function put(path, content, callback) {
    var xhttp = new XMLHttpRequest();
    if (callback !== undefined) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }
    xhttp.open("PUT", path, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(content));
}

//GET Helper
export function get(path, callback) {
    var xhttp = new XMLHttpRequest();
    if (callback !== undefined) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }
    xhttp.open("GET", path, true);
    xhttp.send();
}

//DELETE helper
export function del(path, callback) {
    var xhttp = new XMLHttpRequest();
    if (callback !== undefined) {
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                callback(JSON.parse(this.responseText));
            }
        };
    }
    xhttp.open("DELETE", path, true);
    xhttp.send();
}

//Get form data as JSON object
function getDataFromForm(form) {
    let ret = {};
    const data = new FormData(form);
    for (const [key, val] of data.entries()) {
        ret[key] = val;
    }
    return ret;
}

export function formSubmitAction(callback){
    return (event) => {
        event.preventDefault();
        callback(getDataFromForm(event.currentTarget));
    };
}