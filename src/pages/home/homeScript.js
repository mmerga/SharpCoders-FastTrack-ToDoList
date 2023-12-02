"use strict";

import {getListToDoUsers, setListToDoUsers, setCurrentUser, setFlag} from '../../services/localStorage/localStorage.js'
import {loginUser, newUser} from '../../services/user/user.js'

// Deal with log in form
function login(e){
    e.preventDefault();

    let email = document.getElementById("login-email").value;
    let password = document.getElementById("login-password").value;
    
    const USERS = getListToDoUsers();
    const isUser = loginUser(USERS, {email, password});

    if(isUser){
        setCurrentUser(email);
        setFlag('4');
        redirectToUserHome();
    }else{
        const invalidLogin = document.getElementById('invalid-login');
        invalidLogin.classList.remove('hidden');
        
        email = document.getElementById("login-email");
        password = document.getElementById("login-password");
        
        email.classList.add('invalid');
        email.addEventListener('keypress', () => { 
            email.classList.remove('invalid');
            invalidLogin.classList.add('hidden');
        })
        
        password.classList.add("invalid");
        password.addEventListener('keypress', () => { 
            password.classList.remove('invalid');
            invalidLogin.classList.add('hidden');
        })
        
        e.target.reset();
    }
}

// Deal with sign in form
function signin(e){
    e.preventDefault();

    const name = document.getElementById("signin-name").value;
    let email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;
    
    const USERS = getListToDoUsers();
    const isUser = newUser(USERS, {name, email, password});
    
    if(isUser){
        setListToDoUsers(USERS);
        setCurrentUser(email);
        setFlag('0');
        redirectToUserHome();
    }else{   
        const invalidSignin = document.getElementById('invalid-signin');
        invalidSignin.classList.remove('hidden');
                
        email = document.getElementById("signin-email");

        email.classList.add('invalid');
        email.addEventListener('keypress', () => { 
            email.classList.remove('invalid');
            invalidSignin.classList.add('hidden');
        })
        
        e.target.reset();
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