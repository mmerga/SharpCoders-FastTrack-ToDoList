"use strict";

import {getListToDoUsers, setListToDoUsers, setCurrentUser, setFlag} from '../../services/localStorage/localStorage.js'
import {loginUser, newUser} from '../../services/user/user.js'

// Deal with log in form
function login(e){
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const USERS = getListToDoUsers();
    const isUser = loginUser(USERS, {email, password});
    if(isUser){
        setCurrentUser(email);
        setFlag('4');
        redirectToUserHome();
    }else{
        window.alert("Email ou senha incorreta.")
    }
}

// Deal with sign in form
function signin(e){
    e.preventDefault();

    const name = document.getElementById("signin-name").value;
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    const USERS = getListToDoUsers();
    const isUser = newUser(USERS, {name, email, password});
    if(isUser){
        setListToDoUsers(USERS);
        setCurrentUser(email);
        setFlag('0');
        redirectToUserHome();
    }
}

// Go to user home page
function redirectToUserHome(){
    window.location = '../userHome/userHome.html'
 }

// Wait until pages full loads, then do something
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("login").addEventListener("submit", login);
    document.getElementById("signin").addEventListener("submit", signin);
});