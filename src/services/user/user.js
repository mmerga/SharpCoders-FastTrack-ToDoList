"use strict";

import {getCurrentUser, getListToDoUsers, setListToDoUsers} from '../localStorage/localStorage.js'

// Existe usuario na lista -> true or false
export function hasUser(users, email){
    const isUser = users.some(user => {
        return user.email === email
    });
    return isUser;
}

// Acha o usuario que esta tentando logar se existe -> currentUser or false
export function loginUser(users, userLogin){
    console.log(users)
    const user = users.find(currentUser => {
        if(currentUser.email === userLogin.email && currentUser.password === userLogin.password){
            return currentUser;
        }
    });
    if(user){
        return user;
    }else{
        return false;
    }
}

// Cria um novo usuario se email diferente -> true or false
export function newUser(users, newU){
    const {name, email, password} = newU;
    try{
        if(hasUser(users, email)){
            //  Existe usuario com esse email
            window.alert("Email ja registrado, por favor tente outro.")
            return false;
        }else{
            users.push({
                name, 
                email, 
                password,
                todoList: []
            });
            return true;
        }
    }catch(e){
        window.alert("Fail to create user, something went wrong");
        console.log({e: e.message});
    }
}

export function findUser(){
    let userIndex = 0;
    const USERS = getListToDoUsers();
    const CURRENT_USER = getCurrentUser()
    const user = USERS.filter((item, index) => {
        if(item.email === CURRENT_USER){
            userIndex = index;
            return item;
        }
    });
    return [user[0], userIndex, user[0].name];
}

export function saveNewToDo(todo){
    const aux = findUser();
    const user = aux[0];
    const userIndex = aux[1];
    user?.todoList.push(todo);
    const USERS = getListToDoUsers();
    USERS[userIndex] = user;
    setListToDoUsers(USERS);
}


export function changeToDo(){
    //  TO DO
}