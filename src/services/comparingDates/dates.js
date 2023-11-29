"use strict";

export function fixDay(date){
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    return newDate;
}

export function compareD(dateInit, timeInit, dateEnd, timeEnd){
    let temp = dateInit.split('-');
    let year = temp[0];
    let month = temp[1];
    let day = temp[2];
    let hour = timeInit.slice(0,2);
    let minute = timeInit.slice(3,5);

    const newDateInit = new Date(year, month-1, day, hour, minute, 0);

    temp = dateEnd.split('-');
    year = temp[0];
    month = temp[1];
    day = temp[2];
    hour = timeEnd.slice(0,2);
    minute = timeEnd.slice(3,5);

    const newDateEnd = new Date(year, month-1, day, hour, minute, 0);

    const dateNow = new Date();

    if(dateNow >= newDateInit && dateNow <= newDateEnd){
        return 1;
        // Em Andamento.
    }
    if(dateNow < newDateInit){
        return -1;
        // Pendente.
    }
    if(dateNow > newDateEnd){
        return 0;
        // Atrasado.
    }
}