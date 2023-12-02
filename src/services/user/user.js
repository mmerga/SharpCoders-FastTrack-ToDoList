"use strict";

import {getCurrentUser, getListToDoUsers, setListToDoUsers} from '../localStorage/localStorage.js'

// checks if user already exists
// return true
// or return false
export function hasUser(users, email){
    const isUser = users.some(user => {
        return user.email === email
    });
    return isUser;
}

// Find user which is tring to login 
// if existe: return User
// if NOT: return false
export function loginUser(users, userLogin){
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

// Create a new user if email not equal
// return true
// or return false
export function newUser(users, newU){
    const {name, email, password} = newU;
    try{
        if(hasUser(users, email)){
            // Existe email on bd
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

// Find user which is login on system
// return user, userIndex, user.name
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

// Save new To Do on current user
export function saveNewToDo(todo){
    const aux = findUser();
    const user = aux[0];
    const userIndex = aux[1];
    user?.todoList.push(todo);
    const USERS = getListToDoUsers();
    USERS[userIndex] = user;
    setListToDoUsers(USERS);
}