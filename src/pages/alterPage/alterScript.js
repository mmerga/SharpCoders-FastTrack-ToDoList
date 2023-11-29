"use strict";

import {getAlterToDo, getListToDoUsers, setListToDoUsers, deleteAlterToDo} from '../../services/localStorage/localStorage.js';
import {findUser} from '../../services/user/user.js'

const USERS = getListToDoUsers();
let aux = getAlterToDo();
const TODO_INDEX = aux[0];
const TODO_STATUS = aux[1];
aux = findUser();
const user = aux[0];
const userIndex = aux[1];

function redirectToUserHome(){
    window.location = '../userHome/userHome.html';
    deleteAlterToDo();
}

function updateListToDo(){
    USERS[userIndex] = user;
    setListToDoUsers(USERS);
}

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
        status: false
    }
    user.todoList[TODO_INDEX] = newTodo;
    updateListToDo();

    redirectToUserHome();
}

function handleDelete(e){
    user.todoList.splice(TODO_INDEX, 1)
    updateListToDo();
    redirectToUserHome();
}

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
        status: TODO_STATUS == 'false' ? 'true' : 'false'
    }
    user.todoList[TODO_INDEX] = newTodo;
    updateListToDo();

    redirectToUserHome();
}

function handleCancel(e){
    redirectToUserHome();
}

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

    if(TODO_STATUS == 'true'){
        const statusButton = document.getElementById('done');
        statusButton.textContent = 'Marcar como NÃO realizada';
        statusButton.classList.remove('btn-success');
        statusButton.classList.add('btn-warning');

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

document.addEventListener('DOMContentLoaded', function () {

    alter();
});