import projectStorage from "./imputManagement";
function populateStorage() {
    let projects = localStorage.setItem("projects", JSON.stringify(projectStorage.projectArray))
    return projects
}
function getStorage() {
    if (localStorage.getItem("projects")) {
    let projects = JSON.parse(localStorage.getItem("projects"))
    return projects
    }
    else {
        return []
    }
}
export {getStorage};
export default populateStorage