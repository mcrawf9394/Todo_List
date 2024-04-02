import _ from 'lodash';
import './style.css';
import projectStorage from './imputManagement.js';
import {taskDisplay} from './imputManagement.js';
const elements = {
    projectList: document.getElementById('projectContainer'),
    taskArea: document.getElementById('taskArea'),
    addProjectButton: document.getElementById('addProject'),
    createProject: document.getElementById('createProject'),
    cancel: document.getElementById('cancelCreation')
}
const display = {
    currentProject: "",
    projectForm: document.querySelector('dialog'),
    addProjectButtonHandling () {
        this.projectForm.showModal()
    },
    cancel () {
        this.projectForm.close()
    },
    addProject () {
        const container = document.getElementById('projectContainer')
        projectName = document.getElementById('projectName').value
        const projectTab = document.createElement('button')
        projectTab.className = "projectTabs"
        projectTab.textContent = projectName
        container.appendChild(projectTab)
        const addTask = projectStorage.addingProject(projectName)
        const title = document.createElement('h2')
        title.textContent = projectName
        projectTab.addEventListener('click', () => {
            if (this.currentProject != projectTab.textContent){
                while (elements.taskArea.firstChild) {
                elements.taskArea.removeChild(elements.taskArea.firstChild)
            }
                elements.taskArea.appendChild(title)
                elements.taskArea.appendChild (addTask)
            }
            this.currentProject = projectTab.textContent
            let currentProject = projectStorage.projectArray.find(projectStorage.findingProject)
            currentProject.tasks.forEach(taskDisplay.display)
            currentProject.completedTasks.forEach(taskDisplay.display)
        })
        this.projectForm.close()
    }
}
export default display; 
const reponsivebuttons = {
    clickResponses () {
        elements.addProjectButton.addEventListener('click',(userEntry) => {
            userEntry.preventDefault() 
            display.addProjectButtonHandling()
        })
        elements.createProject.addEventListener('click', (userEntry) => {
            userEntry.preventDefault() 
            display.addProject ()
        })
        elements.cancel.addEventListener('click', (userEntry) => {
            userEntry.preventDefault()
            display.cancel()
        })
    }
}
reponsivebuttons.clickResponses()