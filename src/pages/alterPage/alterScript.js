"use strict";

import {getAlterToDo, getListToDoUsers, setListToDoUsers, deleteAlterToDo, setFlag} from '../../services/localStorage/localStorage.js';
import {findUser} from '../../services/user/user.js'

const USERS = getListToDoUsers();
let aux = getAlterToDo();
const TODO_INDEX = aux[0];
const TODO_STATUS = aux[1];
const TODO_NEW_STATUS = aux[2];
aux = findUser();
const user = aux[0];
const userIndex = aux[1];

// Go to user home page
function redirectToUserHome(){
    window.location = '../userHome/userHome.html';
    deleteAlterToDo();
}

// Update user to do list on bd
function updateListToDo(){
    USERS[userIndex] = user;
    setListToDoUsers(USERS);
}

// Get elements on DOM
// if flag TRUE, return html element
// if flag FALSE, return his value
function getElements(flag = true){
    const tarefa = document.getElementById("todo-form-tarefa");
    const dateInit = document.getElementById("todo-form-date-init");
    const timeInit = document.getElementById("todo-form-time-init");
    const dateEnd = document.getElementById("todo-form-date-end");
    const timeEnd = document.getElementById("todo-form-time-end");
    const description = document.getElementById("todo-form-description");
    if(flag){
        return {
            tarefa: tarefa.value,
            dateInit: dateInit.value,
            timeInit: timeInit.value,
            dateEnd: dateEnd.value,
            timeEnd: timeEnd.value,
            description: description.value
        }
    }else{
        return {
            tarefa,
            dateInit,
            timeInit,
            dateEnd,
            timeEnd,
            description
        }
    }
}

// Deal with when user updates his to do
function handleSubmit(e){
    e.preventDefault();
    const {
        tarefa,
        dateInit,
        timeInit,
        dateEnd,
        timeEnd,
        description
    } =  getElements(); 

    const newTodo = {
        tarefa, 
        dateInit, 
        timeInit, 
        dateEnd, 
        timeEnd, 
        description,
        status: TODO_STATUS
    }
    user.todoList[TODO_INDEX] = newTodo;
    updateListToDo();

    setFlag('2');
    redirectToUserHome();
}

// Deal with when user wants to delete his to do
function handleDelete(e){
    isSureRender()
}

// Render a 'alert' to ask user if he wants for sure delete the task
function isSureRender(){
    const div = document.createElement('div');
    div.innerHTML = `
        <p>Deseja realmente excluir a tarefa?</p>
        <div class='is-sure-buttons'>
            <button type="button" class="btn btn-danger" id='is-sure'>Sim</button>
            <button type="button" class="btn btn-secondary" id='is-not-sure'>Não</button>
        </div>
    `;
    div.classList.add('is-sure');
    div.classList.add('alert');
    div.classList.add('alert-danger');
    div.setAttribute('id', 'div-is-sure');
    document.querySelector('html').appendChild(div);

    document.getElementById('is-sure').addEventListener('click', isSure);
    document.getElementById('is-not-sure').addEventListener('click', isNotSure);
}

// User realy wants delete the task
function isSure(){
    user.todoList.splice(TODO_INDEX, 1)
    updateListToDo();
    setFlag('3');
    redirectToUserHome();
}

// User do not want delete the task
function isNotSure(){
    document.getElementById('div-is-sure').remove();
}

// Deal with when user wants change state of his to do
// From done to not done
// From not done to done
function handleDone(e){
    const {
        tarefa,
        dateInit,
        timeInit,
        dateEnd,
        timeEnd,
        description
    } =  getElements(); 

    const newTodo = {
        tarefa, 
        dateInit, 
        timeInit, 
        dateEnd, 
        timeEnd, 
        description,
        status: TODO_STATUS === 'false' ? 'true' : 'false'
    }
    user.todoList[TODO_INDEX] = newTodo;
    updateListToDo();

    setFlag('2');
    redirectToUserHome();
}

// Deal when user wants to cancel update on to do
function handleCancel(e){
    setFlag('4');
    redirectToUserHome();
}

// Put to do infos on form, so user can see, and add events on buttons, so user can do what he wants
function alter(){    
    const currentToDo = user?.todoList[TODO_INDEX];

    const {
        tarefa,
        dateInit,
        timeInit,
        dateEnd,
        timeEnd,
        description
    } =  getElements(false);

    tarefa.value = currentToDo.tarefa;
    dateInit.value = currentToDo.dateInit;
    timeInit.value = currentToDo.timeInit;
    dateEnd.value = currentToDo.dateEnd;
    timeEnd.value = currentToDo.timeEnd;
    description.value = currentToDo.description;

    const p = document.getElementById('todo-status');

    const statusMessage = document.getElementById('todo-status-message');

    if(TODO_STATUS === 'true'){
        const statusButton = document.getElementById('done');
        statusButton.textContent = 'Marcar como NÃO realizada';
        statusButton.classList.remove('btn-success');
        statusButton.classList.add('btn-warning');
        p.textContent = ' Tarefa realizada';
        p.classList.add('todo-done');
        statusMessage.classList.add('alert-primary');
    }
    else{
        p.textContent = ' Tarefa '+ TODO_NEW_STATUS.toLowerCase();
        if(TODO_NEW_STATUS === 'Em andamento'){
            p.classList.add('todo-doing');
            statusMessage.classList.add('alert-light');
        }else if(TODO_NEW_STATUS === 'Atrasada'){
            p.classList.add('todo-late');
            statusMessage.classList.add('alert-danger');
        }else if(TODO_NEW_STATUS === 'Pendente'){
            p.classList.add('todo-pending');
            statusMessage.classList.add('alert-success');
        }
    }

    const submitButton = document.getElementById('update');
    const deleteButton = document.getElementById('delete');
    const doneButton = document.getElementById('done');
    const cancelButtom = document.getElementById('cancel');

    submitButton.addEventListener('click', handleSubmit);
    deleteButton.addEventListener('click', handleDelete);
    doneButton.addEventListener('click', handleDone);
    cancelButtom.addEventListener('click', handleCancel);
}

// Wait  until pages full loads, when do somethin
document.addEventListener('DOMContentLoaded', function () {
    alter();
});