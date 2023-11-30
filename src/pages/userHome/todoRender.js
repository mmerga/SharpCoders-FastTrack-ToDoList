"use strict";

import {fixDay, compareD} from '../../services/comparingDates/dates.js'
import {setAlterToDo} from '../../services/localStorage/localStorage.js';
import {modal} from './modalRender.js';

// when user clicks on "Alterar" button, he is allowed to update his to do
function handleAlter(e){
    setAlterToDo([e.target.dataset.todoIndex, e.target.dataset.todoStatus, e.target.dataset.todoNewstatus]);
    redirectToAlterPage();
}

// Go To Alter Page, where user can update his to do
function redirectToAlterPage(){
    window.location = '../alterPage/alter.html'
}

// Just a to do render, take all infos of this to do, and render as line in a table.
export function todoRender(todo, index){
    const {tarefa, dateInit, timeInit, dateEnd, timeEnd, description, status} = todo;

    const tr = document.createElement('tr');

    const tarefaTd = modal(tarefa, description, index);

    const dateInitTd = document.createElement('td');
    const newDateInit = fixDay(dateInit);
    dateInitTd.textContent = newDateInit.toLocaleDateString() +' '+ timeInit;

    const dateEndTd = document.createElement('td');
    const newDateEnd = fixDay(dateEnd);
    dateEndTd.textContent = newDateEnd.toLocaleDateString() +' '+ timeEnd;

    let newStatus ;
    const statusTd = document.createElement('td');;
    if(status === 'true'){
        newStatus = 'Realizada'
        statusTd.textContent = 'Realizada';
        statusTd.setAttribute('class', 'todo-done');
    }else{
        let compare = compareD(dateInit, timeInit, dateEnd, timeEnd);

        if(compare === 1){
            // Em Andamento
            newStatus = 'Em andamento';
            statusTd.textContent = 'Em andamento';
            statusTd.setAttribute('class', 'todo-doing');
        }else if(compare === 0){
            // Atrasado
            newStatus = 'Atrasada';
            statusTd.textContent = 'Atrasada';
            statusTd.setAttribute('class', 'todo-late');
        }else if(compare === -1){
            // Pendente
            newStatus = 'Pendente';
            statusTd.textContent = 'Pendente';
            statusTd.setAttribute('class', 'todo-pending');
        }
    }

    const alterTd = document.createElement('td');
    const alterTdButton = document.createElement('button');
    alterTdButton.textContent = 'Alterar';
    alterTdButton.setAttribute('class', 'btn btn-info');
    alterTdButton.setAttribute('data-todo-index', index);
    alterTdButton.setAttribute('data-todo-status', status);
    alterTdButton.setAttribute('data-todo-newStatus', newStatus);
    alterTdButton.addEventListener('click', handleAlter)
    alterTd.appendChild(alterTdButton);

    tr.appendChild(tarefaTd);
    tr.appendChild(dateInitTd);
    tr.appendChild(dateEndTd);
    tr.appendChild(statusTd);
    tr.appendChild(alterTd);

    const table = document.getElementById('table-tbody-todo');
    table.appendChild(tr);
}