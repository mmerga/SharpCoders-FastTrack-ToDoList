"use strict";

// Render a popUp to shows some message
// flag = 0 account created
// flag = 1 to do created
// flag = 2 to do updated
// flag = 3 to do deleted
// flag = 4 user log in
export function popUpRender(flag){
    const div = document.createElement('div');

    let text = '';
    if(flag === '0'){
        text = 'Conta criada com sucesso!'
        div.classList.add('alert-success');
    }else if(flag === '1'){
        text = 'Tarefa criada com sucesso!'
        div.classList.add('alert-success');
    }else if(flag === '2'){
        text = 'Tarefa atualizada!'
        div.classList.add('alert-warning');
    }else if(flag === '3'){
        text = 'Tarefa Excluida!'
        div.classList.add('alert-danger');
    }else if(flag === '4'){
        text = 'Bem vindo de volta!'
        div.classList.add('alert-info');
    }else{
        return;
    }

    div.classList.add('popup');
    div.classList.add('alert');
    div.classList.add('fade-in-fwd');
    div.setAttribute('role', 'alert')
    div.textContent = text;

    document.querySelector('body').appendChild(div);

    setTimeout(()=>{
        div.classList.add('fade-out')
        setTimeout(() => {
            div.remove();
        }, 2000);
    }, 2000)
}