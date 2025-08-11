import { add, compareAsc, formatDistanceToNow, formatISO } from "date-fns";

import imgAlert from "./img/alert-rhombus.svg";

function formatDateToISO(dateString){
    const newDate = formatISO(dateString, {representation: "date"});

    return newDate;
};

function isDateLessOrEqualThanToday(dateToCompare){
    /*
    Comparing to today's date:
    1 - date is future
    0 - date is today
    -1 - date is in the past
    */
    const currentDate = formatDateToISO(new Date());
    return compareAsc(dateToCompare, currentDate);
};

function generateRandomFutureDate(){
    /*This function is temporary to generate some random dates for due items*/
    const newDate = add(new Date(), {
        years: 0,
        months: 0,
        weeks: 0,
        days: randomIntFromInterval(-99,99),
        hours: 0,
        minutes: 0,
        seconds: 0,

    })
    return newDate;
};

function randomIntFromInterval(min,max){
    //Temporary int generator for generateRandomFutureDate function
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function returnDueDateMessage(dateString){
    const datePositionFromCurrent = isDateLessOrEqualThanToday(dateString, new Date());

    const iconAlert = new Image();
    iconAlert.src = imgAlert;

    const dueDateMessageElement = document.createElement("p")
    dueDateMessageElement.setAttribute("id", "todo-duedate");

    if(datePositionFromCurrent == 1){
        const newDistance = formatDistanceToNow(dateString,{
            addSuffix: true,
        });

        dueDateMessageElement.textContent = dateString + " (due " + newDistance + ")";
    };

    if(datePositionFromCurrent == -1){
        const newDistance = formatDistanceToNow(dateString,{
            addSuffix: false,
        });

        dueDateMessageElement.textContent = dateString + " (overdue " + newDistance + " ago)";
        iconAlert.setAttribute("class", "highlight-overdue")
        dueDateMessageElement.appendChild(iconAlert);
    } else{
        dueDateMessageElement.textContent = dateString + " (due today)";
        iconAlert.setAttribute("class", "highlight-duetoday")
        dueDateMessageElement.appendChild(iconAlert);
    };

    return dueDateMessageElement;
};

export { formatDateToISO, generateRandomFutureDate, returnDueDateMessage };
