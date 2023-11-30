"use strict";

// Render a popUp to shows some message
// flag = 0 account created
// flag = 1 to do created
// flag = 2 to do updated
// flag = 3 to do deleted
// flag = 4 user log in
export function popUpRender(flag){
    let text = '';
    if(flag === '0'){
        text = 'Conta criada com sucesso!'
    }else if(flag === '1'){
        text = 'Tarefa criada com sucesso!'
    }else if(flag === '2'){
        text = 'Tarefa atualizada.'
    }else if(flag === '3'){
        text = 'Tarefa Excluida.'
    }else if(flag === '4'){
        text = 'Bem vindo de volta.'
    }

    const div = document.createElement('div');
    div.classList.add('popup');
    div.textContent = text;

    document.querySelector('body').appendChild(div);

    setTimeout(()=>{
        div.classList.add('fade-out')
        setTimeout(() => {
            div.remove();
        }, 2000);
    }, 2000)
}