"use strict";

import {findUser, saveNewToDo} from '../../services/user/user.js';
import {getFlag, deleteFlag} from '../../services/localStorage/localStorage.js'
import {todoRender} from './todoRender.js';
import {handleNavBar} from './navbarHandler.js';
import {popUpRender} from './popUpRender.js';


let userIndex = 0;
let todoIndex = 0;

// Make the vp goto top
function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// Create a new to do and saves on user db
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

    todoRender(todo, todoIndex++);

    saveNewToDo(todo);

    document.getElementById('todo-form').reset();

    scrollToTop();

    popUpRender('1');
}

// When pages loads, get current user and render his to do list
function onLoad(){
    const aux = findUser();
    const user = aux[0];
    userIndex = aux[1];
    user?.todoList.forEach((item, index) => {
        todoRender(item, index);
        todoIndex = index;
    });

    popUpRender(getFlag());
    deleteFlag();

    handleNavBar(aux[2]);
}

// wait until pages full loads, when do something
document.addEventListener('DOMContentLoaded', function () {
    onLoad();
    document.getElementById("todo-form").addEventListener("submit", newToDo);
});