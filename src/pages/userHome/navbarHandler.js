"use strict";

import {deleteCurrentUser} from '../../services/localStorage/localStorage.js'

function redirectToHome(){
    window.location = '../home/home.html';
}

function handleLogOut(e){
    deleteCurrentUser();
    redirectToHome();
}

export function handleNavBar(nome){
    const nav = document.getElementById('navbar');

    const navLeft = document.createElement('div');
    navLeft.setAttribute('class', 'nav-left');
    const pLeft = document.createElement('p');
    pLeft.textContent = 'Bem vindo, ' + nome[0].toUpperCase() + nome.slice(1) + '!';
    navLeft.appendChild(pLeft);

    const navRight = document.createElement('div');
    navRight.setAttribute('class', 'nav-rigth');

    const buttonRight = document.createElement('button');
    buttonRight.setAttribute('class', 'btn-logout');
    buttonRight.textContent = 'Sair';
    buttonRight.addEventListener('click', handleLogOut);

    navRight.appendChild(buttonRight);

    nav.appendChild(navLeft);
    nav.appendChild(navRight);
}