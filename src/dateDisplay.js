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

function generateCustomDateFromNow(direction, days){
    /*This function is to generate custom date based on supplied parameters:
    direction (-1 or 1) - generate date before current (-1) or after current (1) date.
    days - number of days to add or subtract to/from current date.
    */
    const newDate = add(new Date(), {
        years: 0,
        months: 0,
        weeks: 0,
        days: direction == -1 ? -1 * days : days,
        hours: 0,
        minutes: 0,
        seconds: 0,

    })
    return newDate;
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
    } else if(datePositionFromCurrent == -1){
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

export { formatDateToISO, generateCustomDateFromNow, returnDueDateMessage };
