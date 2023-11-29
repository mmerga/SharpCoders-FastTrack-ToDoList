"use strict";

/* 
e
e@e.com
123
*/

import {getListToDoUsers, setListToDoUsers, setCurrentUser} from '../../services/localStorage/localStorage.js'
import {hasUser, loginUser, newUser} from '../../services/user/user.js'

function login(e){
    e.preventDefault();
    console.log(e);
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const USERS = getListToDoUsers();
    const isUser = loginUser(USERS, {email, password});
    if(isUser){
        console.log('login')
        setCurrentUser(email);
        redirectToUserHome();
    }else{
        window.alert("Email ou senha incorreta.")
    }
}

function signin(e){
    e.preventDefault();
    const name = document.getElementById("signin-name").value;
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    const USERS = getListToDoUsers();
    const isUser = newUser(USERS, {name, email, password});
    if(isUser){
        console.log('criado');
        setListToDoUsers(USERS);
        setCurrentUser(email);
        redirectToUserHome();
    }
}

function redirectToUserHome(){
    window.location = '../userHome/userHome.html'
 }


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("login").addEventListener("submit", login);
    document.getElementById("signin").addEventListener("submit", signin);
});