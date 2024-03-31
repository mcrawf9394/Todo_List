class taskButtons {
    constructor () {
        let taskButton = document.createElement('button')
        taskButton.textContent = "Add Task"
        taskButton.addEventListener('click', (userImput) => {
            userImput.preventDefault()
        })
    }
}
const projectStorage = {
    projectArray: [],
    addingProject () {
        
    }
}