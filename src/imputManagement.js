import display from "./index.js"
import populateStorage from "./localStorage.js"
const taskButtons = {
    taskPopUp: document.getElementById('taskAddition'),
    taskButton (projectName) {
        let taskButton = document.createElement('button')
        taskButton.textContent = "Add Task"
        taskButton.className = "taskButton"
        taskButton.id = projectName
        taskButton.addEventListener('click', (userImput) => {
            userImput.preventDefault()
            this.taskPopUp.showModal()
        })
        return taskButton
    }
}
class projects {
    constructor () {
        const project = {
            name: document.getElementById('projectName').value,
            tasks: [],
            completedTasks: [],
        }
        return project
    }
}
class tasks {
    checkPriority () {
        if (document.getElementById('highPriority').checked == true) {
            return document.getElementById('highPriority').value
        }
        else if (document.getElementById('moderatePriority').checked == true) {
            return document.getElementById('moderatePriority').value
        }
        else {
            return document.getElementById('lowPriority').value
        }
    }
    constructor () {
        const task = {
            taskName: document.getElementById('taskName').value,
            description: document.getElementById('description').value,
            date: document.getElementById('date').value,
            priority: this.checkPriority(),
            completed: false
        }
        return task
    }
}
const projectStorage = {
    cancel: document.getElementById('cancelTaskAddition'),
    add: document.getElementById('addTaskButton'),
    taskPopUp: document.getElementById('taskAddition'),
    cancelTaskEdit: document.getElementById('cancelTaskEdit'),
    editTask: document.getElementById('editTaskButton'),
    editTaskPopUp: document.getElementById('editTask'),
    projectArray: [],
    currentTask: "",
    editPriority () {
        if (document.getElementById('editHighPriority').checked == true) {
            return document.getElementById('editHighPriority').value
        }
        else if (document.getElementById('editModeratePriority').checked == true) {
            return document.getElementById('editModeratePriority').value
        }
        else {
            return document.getElementById('editLowPriority').value
        }
    },
    recallProjects () {
      let test = JSON.parse(localStorage.getItem.projects)
      this.projectArray = test  
    },
    projectDeletion () {
        let currentProject = this.projectArray.find(this.findingProject)
        let index = this.projectArray.indexOf(currentProject)
        this.projectArray.splice(index, 1)
        this.projectArray.onchange = populateStorage()
    },
    buttonEvents () {
        this.cancel.addEventListener('click', (click) =>{
            this.taskPopUp.close()
            click.preventDefault()
        })
        this.add.addEventListener('click', (click) => {
            click.preventDefault()
            while (document.getElementById('taskContainer')) {
            let container = document.getElementById('taskContainer')
            container.remove()
            }
            let task = new tasks ()
            let currentProject = this.projectArray.find(this.findingProject)
            currentProject.tasks.push(task)
            currentProject.tasks.onchange = populateStorage()
            currentProject.tasks.forEach(taskDisplay.display)
            currentProject.completedTasks.forEach(taskDisplay.display)
            this.taskPopUp.close()
        })
        this.cancelTaskEdit.addEventListener('click', (click) => {
            this.editTaskPopUp.close()
            click.preventDefault()
        }),
        this.editTask.addEventListener('click', (click) => {
            click.preventDefault()
            let currentProject = this.projectArray.find(this.findingProject)
            console.log(currentProject)
            if (currentProject.tasks.find(this.findingTask)) {
                let item = currentProject.tasks.find(this.findingTask)
                item.taskName = document.getElementById("editTaskName").value
                item.description = document.getElementById("editDescription").value
                item.date = document.getElementById("editDate").value
                item.priority = projectStorage.editPriority()
            }
            else {
                let item = currentProject.completedTasks.find(this.findingTask)
                item.taskName = document.getElementById("editTaskName").value
                item.description = document.getElementById("editDescription").value
                item.date = document.getElementById("editDate").value
                item.priority = projectStorage.editPriority()
            }
            while (document.getElementById('taskContainer')) {
                let container = document.getElementById('taskContainer')
                container.remove()
            }
            currentProject.onchange = populateStorage()
            currentProject.tasks.forEach(taskDisplay.display)
            currentProject.completedTasks.forEach(taskDisplay.display)
            projectStorage.editTaskPopUp.close()
        })
    },
    findingTask (task) {
        return task.taskName == projectStorage.currentTask
    },
    findingProject (project){
        return project.name == display.currentProject
    },
    addingProject () {
        let project = new projects ()
        this.projectArray.push(project)
        this.projectArray.onchange = populateStorage()
        taskButtons.taskButton()
        while (document.getElementById('projectContainer').firstChild) {
            document.getElementById('projectContainer').removeChild(document.getElementById('projectContainer').firstChild)
        }
        this.projectArray.forEach(display.addProject)
        return
    },
    trueTask (task) {
        return task.completed == true
    },
    falseTask (task) {
        return task.completed == false
    },
    switch (item) {
        let currentProject = this.projectArray.find(this.findingProject)
        let currentTask
        if (item.completed == true) {
            currentTask = currentProject.tasks.find(this.trueTask)
            let index = currentProject.tasks.indexOf(currentTask)
            currentProject.tasks.splice(index, 1)
            currentProject.completedTasks.push(currentTask)
            while (document.getElementById('taskContainer')) {
                let container = document.getElementById('taskContainer')
                container.remove()
                }
            currentProject.tasks.forEach(taskDisplay.display)
            currentProject.completedTasks.forEach(taskDisplay.display)
            currentProject.tasks.onchange = populateStorage()
            return
        }
        else {
            currentTask = currentProject.completedTasks.find(this.falseTask)
            let index = currentProject.completedTasks.indexOf(currentTask)
            currentProject.completedTasks.splice(index, 1)
            currentProject.tasks.push(currentTask)
            while (document.getElementById('taskContainer')) {
                let container = document.getElementById('taskContainer')
                container.remove()
                }
            currentProject.tasks.forEach(taskDisplay.display)
            currentProject.completedTasks.forEach(taskDisplay.display)
            currentProject.completedTasks.onchange = populateStorage()
            return
        }
    }
}
projectStorage.buttonEvents()
const taskDisplay = {
    display (item) {
        let taskName = document.createElement('h2')
        taskName.textContent = "Task Name: " + item.taskName
        let taskDescription = document.createElement('h2')
        taskDescription.textContent = "Description: " + item.description
        let taskDate = document.createElement('h2')
        taskDate.textContent = "Date: " + item.date
        let taskPriority = document.createElement('h2')
        taskPriority.textContent = "Priority: " + item.priority
        let container = document.getElementById('taskArea')
        let taskContainer = document.createElement('div')
        taskContainer.id = "taskContainer"
        let checkBoxCompletionLabel = document.createElement('label')
        checkBoxCompletionLabel.textContent = "Completed?"
        let checkBoxCompletion = document.createElement('input')
        checkBoxCompletion.type = "checkbox"
        if (item.completed == true){
            checkBoxCompletion.checked = true
        }
        else {
            checkBoxCompletion.checked = false
        }
        checkBoxCompletion.addEventListener('click', () => {
            if (checkBoxCompletion.checked == true) {
                item.completed = true
                projectStorage.switch(item)
            }
            else {
                item.completed = false
                projectStorage.switch(item)
            }
        })
        let editButton = document.createElement('button')
        editButton.textContent = "Edit Task"
        editButton.value = item.taskName
        editButton.addEventListener('click', () => { 
            projectStorage.currentTask = editButton.value
            const editTask = document.getElementById('editTask')
            const nameForm = document.getElementById("editTaskName")
            nameForm.value = item.taskName
            const description = document.getElementById("editDescription")
            description.value = item.description
            const date = document.getElementById("editDate")
            date.value = item.date
            if (item.priority ==  "High Priority") {
                document.getElementById('editHighPriority').checked = true
            }
            else if (item.priority == "Moderate Priority") {
                document.getElementById('editModeratePriority').checked = true
            }
            else {
                document.getElementById('editLowPriority').checked = true
            }
            editTask.showModal()
        })
        let deleteButton = document.createElement('button')
        deleteButton.textContent = "Delete"
        deleteButton.type = "submit"
        deleteButton.addEventListener('click', () => {
        let currentProject = projectStorage.projectArray.find(projectStorage.findingProject)
        if (currentProject.tasks.indexOf(item)) {
            let index = currentProject.completedTasks.indexOf(item)
            currentProject.completedTasks.splice(index, 1)
        }
        else {
            let index = currentProject.tasks.indexOf(item)
            currentProject.tasks.splice(index, 1)
        }
        while (document.getElementById('taskContainer')) {
            let container = document.getElementById('taskContainer')
            container.remove()
            }
        currentProject.tasks.forEach(taskDisplay.display)
        currentProject.completedTasks.forEach(taskDisplay.display)
        currentProject.tasks.onchange = populateStorage()
        currentProject.completedTasks.onchange = populateStorage()
    })
        taskContainer.append(taskName, taskDescription, taskDate,taskPriority, checkBoxCompletionLabel, checkBoxCompletion, editButton, deleteButton)
        container.appendChild(taskContainer)
    }
}
export default projectStorage;
export  {taskDisplay};
export {taskButtons};