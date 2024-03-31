import _ from 'lodash';
import './style.css';
const elements = {
    projectList: document.getElementById('projectContainer'),
    taskArea: document.getElementById('taskArea'),
    addProjectButton: document.getElementById('addProject'),
    createProject: document.getElementById('createProject'),
    cancel: document.getElementById('cancelCreation')
}
const display = {
    projectForm: document.querySelector('dialog'),
    addProjectButtonHandling () {
        this.projectForm.showModal()
    },
    cancel () {
        this.projectForm.close()
    },
    addProject () {
        container = document.getElementById('projectContainer')
        projectName = document.getElementById('projectName').value
        this.projectForm.close()
    }
}
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