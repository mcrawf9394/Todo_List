import _ from 'lodash';
import './style.css';
import projectStorage, { taskButtons } from './imputManagement.js';
import {taskDisplay} from './imputManagement.js';
import populateStorage from './localStorage.js';
import { getStorage } from './localStorage.js';
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
    intial () {
        if (getStorage()) {
        let projects = getStorage()
        projectStorage.projectArray = getStorage ()
        projects.forEach(this.addProject)
        }
    },
    addProject (project) {
        while (elements.taskArea.firstChild) {
            elements.taskArea.removeChild(elements.taskArea.firstChild)
        }
        const container = document.getElementById('projectContainer')
        projectName = project.name
        const projectTab = document.createElement('button')
        projectTab.className = "projectTabs"
        projectTab.textContent = projectName
        projectTab.id = projectName
        projectTab.addEventListener('mouseover', () => {
            projectTab.className = "projectTabsHover"
        })
        projectTab.addEventListener('mouseout', () => {
            projectTab.className = "projectTabs"
        })
        const addTask = taskButtons.taskButton()
        container.appendChild(projectTab)
        const title = document.createElement('h2')
        title.textContent = projectName
        title.id = "projectTitle"
        const projectDeletion = document.createElement('button')
        projectDeletion.textContent = "Delete Project"
        projectDeletion.id = "projectDeletion"
        projectDeletion.addEventListener('click', () => {
            projectStorage.projectDeletion()
            while (elements.taskArea.firstChild) {
                elements.taskArea.removeChild(elements.taskArea.firstChild)
            }
            projectTab.remove()
        })
        const taskHeader = document.createElement('div')
        taskHeader.id = "taskHeader"
        taskHeader.append(projectDeletion, addTask)
        projectTab.addEventListener('click', () => {
            if (display.currentProject != projectTab.textContent){
                while (elements.taskArea.firstChild) {
                elements.taskArea.removeChild(elements.taskArea.firstChild)
            }
                elements.taskArea.appendChild(title)
                elements.taskArea.appendChild (taskHeader)
            }
            display.currentProject = projectTab.textContent
            let currentProject = projectStorage.projectArray.find(projectStorage.findingProject)
            currentProject.tasks.forEach(taskDisplay.display)
            currentProject.completedTasks.forEach(taskDisplay.display)
        })
        elements.taskArea.appendChild(title)
        elements.taskArea.appendChild (taskHeader)
        display.currentProject = projectName
        let currentProject = projectStorage.projectArray.find(projectStorage.findingProject)
        currentProject.tasks.forEach(taskDisplay.display)
        currentProject.completedTasks.forEach(taskDisplay.display)
        display.currentProject = projectName
        document.querySelector('dialog').close()
    }
}
export default display; 
const reponsivebuttons = {
    clickResponses () {
        elements.addProjectButton.addEventListener('click',(userEntry) => {
            userEntry.preventDefault() 
            display.addProjectButtonHandling()
        })
        elements.addProjectButton.addEventListener('mouseover', () => {
            elements.addProjectButton.id = "addProjectHover"
        })
        elements.addProjectButton.addEventListener('mouseleave', () => {
            elements.addProjectButton.id = "addProject"
        })
        elements.createProject.addEventListener('click', (userEntry) => {
            userEntry.preventDefault()
            projectStorage.addingProject()
        })
        elements.cancel.addEventListener('click', (userEntry) => {
            userEntry.preventDefault()
            display.cancel()
        })
    }
}
reponsivebuttons.clickResponses()
display.intial()