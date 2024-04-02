import display from "./index.js"
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
    constructor (projectName) {
        const project = {
            name: projectName,
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
            priority: this.checkPriority()
        }
        return task
    }
}
const projectStorage = {
    cancel: document.getElementById('cancelTaskAddition'),
    add: document.getElementById('addTaskButton'),
    taskPopUp: document.getElementById('taskAddition'),
    projectArray: [],
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
            console.log(currentProject.tasks)
            currentProject.tasks.forEach(taskDisplay.display)
            this.taskPopUp.close()
        })
    },
    findingProject (project){
        return project.name == display.currentProject
    },
    addingProject (projectName) {
        let project = new projects (projectName)
        this.projectArray.push(project)
        const taskButton = taskButtons.taskButton()
        return taskButton
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
        taskContainer.append(taskName, taskDescription, taskDate,taskPriority)
        container.appendChild(taskContainer)
    }
}
export default projectStorage;
export  {taskDisplay};