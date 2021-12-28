import * as AJAX from "./AJAX.js";

//READ all users
export function getAllPlants(callback) {
    AJAX.get("/plants/", callback);
}

//READ all users
export function getAllUsers(callback) {
    AJAX.get("/users/", callback);
}
//READ all Enviroments
export function getAllEnvironments(callback) {
    AJAX.get("/environs/", callback);
}

//READ all regions
export function getAllRegions(callback) {
    AJAX.get("/regions/", callback);
}

export function getAllMonths(callback) {
    AJAX.get("/months/", callback);
}
