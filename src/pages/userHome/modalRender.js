"use strict";

// Takes all infos needed for do some modal for current to do
export function modal(tarefa, description, index){
    const td = document.createElement('td');

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'btn-form btn-modal');
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#task' + index);
    button.textContent = tarefa;

    const bigDiv = document.createElement('div');
    bigDiv.setAttribute('class','modal fade');
    bigDiv.setAttribute('id', 'task' + index);
    bigDiv.setAttribute('tabindex','-1');
    bigDiv.setAttribute('aria-labelledby', 'task' + index);
    bigDiv.setAttribute('aria-hidden','true');

    // Modal Dialog Div
    const dialogDiv = document.createElement('div');
    dialogDiv.setAttribute('class','modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable');

    // Modal Content Div
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('class', 'modal-content');

    // Modal Header Div
    const headerDiv = document.createElement('div');
    headerDiv.setAttribute('class', "modal-header");

    const h1 = document.createElement('h1');
    h1.setAttribute('class','modal-title fs-5');
    h1.setAttribute('id', index);
    h1.textContent = tarefa;

    const headerButton = document.createElement('button');
    headerButton.setAttribute("type", 'button');
    headerButton.setAttribute('class', 'btn-close');
    headerButton.setAttribute('data-bs-dismiss', 'modal');
    headerButton.setAttribute("aria-label", 'Close');

    headerDiv.appendChild(h1);
    headerDiv.appendChild(headerButton);
    // Modal Header End

    // Modal Body Div
    const bodyDiv = document.createElement('div');
    bodyDiv.setAttribute('class','modal-body')
    bodyDiv.textContent = description;
    // Modal Body End

    // Modal Footer Div
    const footerDiv = document.createElement('div');
    footerDiv.setAttribute('class','modal-footer');

    const footerButton  = document.createElement('button');
    footerButton.setAttribute('type', 'button');
    footerButton.setAttribute('class','btn btn-secondary');
    footerButton.setAttribute('data-bs-dismiss', 'modal');
    footerButton.textContent = 'Fechar';

    footerDiv.appendChild(footerButton);
    // Modal Footer End

    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(bodyDiv);
    contentDiv.appendChild(footerDiv);

    dialogDiv.appendChild(contentDiv);

    bigDiv.appendChild(dialogDiv);

    td.appendChild(button);
    td.appendChild(bigDiv);

    return td;
}