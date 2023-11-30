"use strict";

const local =  window.localStorage;

/* 
==================================
LIST OF USERS
==================================
*/

export function getListToDoUsers(){
    try{
        const users = JSON.parse(local.getItem('todo-users'));
        if (users){
            return  users;
        }else{
            return [];
        }
    }catch(e){
        window.alert("Fail to get users, something went wrong");
        console.log({e: e.message});
        return [];
    }
}

export function setListToDoUsers(users){
    try{
        deleteListToDoUsers()
        local.setItem('todo-users', JSON.stringify(users));
    }catch(e){
        window.alert('Fail to save user, something went wrong.')
        console.log({e: e.message});
    }
}

export function deleteListToDoUsers(){
    local.removeItem('todo-users');
}

/* 
==================================
CURRENT USER
==================================
*/

export function getCurrentUser(){
    try{
        const email = JSON.parse(local.getItem('todo-current-user'));
        if (email){
            return  email;
        }else{
            return false;
        }
    }catch(e){
        window.alert("Fail to get email, something went wrong");
        console.log({e: e.message});
        return false;
    }
}

export function setCurrentUser(email){
    try{
        deleteCurrentUser();
        local.setItem('todo-current-user', JSON.stringify(email));
    }catch(e){
        window.alert('Fail to save email, something went wrong.')
        console.log({e: e.message});
    }
}

export function deleteCurrentUser(){
    local.removeItem('todo-current-user');
}

/* 
==================================
ALTER TO DO
==================================
*/

export function getAlterToDo(){
    try{
        const info = JSON.parse(local.getItem('todo-alter-todo'));
        if (info){
            return  info;
        }else{
            return false;
        }
    }catch(e){
        window.alert("Fail to get info, something went wrong");
        console.log({e: e.message});
        return false;
    }
}

export function setAlterToDo(info){
    try{
        deleteAlterToDo();
        local.setItem('todo-alter-todo', JSON.stringify(info));
    }catch(e){
        window.alert('Fail to save info, something went wrong.')
        console.log({e: e.message});
    }
}

export function deleteAlterToDo(){
    local.removeItem('todo-alter-todo');
}

/* 
==================================
FLAG STATUS
==================================
*/

export function getFlag(){
    try{
        const flag = JSON.parse(local.getItem('todo-flag'));
        if (flag){
            return  flag;
        }else{
            return false;
        }
    }catch(e){
        window.alert("Fail to get flag, something went wrong");
        console.log({e: e.message});
        return false;
    }
}

export function setFlag(flag){
    try{
        deleteAlterToDo();
        local.setItem('todo-flag', JSON.stringify(flag));
    }catch(e){
        window.alert('Fail to save flag, something went wrong.')
        console.log({e: e.message});
    }
}

export function deleteFlag(){
    local.removeItem('todo-flag');
}

/* 
==================================
DELETE ALL
==================================
*/

export function deleteAll(areYourSure = false){
    if(areYourSure){
        deleteAlterToDo();
        deleteCurrentUser();
        deleteListToDoUsers();
        deleteFlag();
    }
}