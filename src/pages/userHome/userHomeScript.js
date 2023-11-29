"use strict";

import {findUser, saveNewToDo} from '../../services/user/user.js';
import todoRender from './todoRender.js';
import {handleNavBar} from './navbarHandler.js'

let userIndex = 0;
let todoIndex = 0;

function newToDo(e){
    e.preventDefault()
    
    const tarefa = document.getElementById("todo-form-tarefa").value;
    const dateInit = document.getElementById("todo-form-date-init").value;
    const timeInit = document.getElementById("todo-form-time-init").value;
    const dateEnd = document.getElementById("todo-form-date-end").value;
    const timeEnd = document.getElementById("todo-form-time-end").value;
    const description = document.getElementById("todo-form-description").value;

    const todo = {
        tarefa, 
        dateInit, 
        timeInit, 
        dateEnd, 
        timeEnd, 
        description,
        status: 'false'
    }

    todoRender(todo, ++todoIndex);

    saveNewToDo(todo);

    document.getElementById('todo-form').reset();
}

function onLoad(){
    const aux = findUser();
    const user = aux[0];
    userIndex = aux[1];
    user?.todoList.forEach((item, index) => {
        todoRender(item, index);
        todoIndex = index;
    });

    handleNavBar(aux[2]);
}

document.addEventListener('DOMContentLoaded', function () {
    onLoad();
    document.getElementById("todo-form").addEventListener("submit", newToDo);
});