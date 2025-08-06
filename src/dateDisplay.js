import { add, formatDistanceToNow, formatISO } from "date-fns";

function formatDateToISO(dateString){
    const newDate = formatISO(dateString, {representation: "date"});

    return newDate;
};

function generateRandomFutureDate(){
    const newDate = add(new Date(), {
        years: 0,
        months: 0,
        weeks: 0,
        days: randomIntFromInterval(1,99),
        hours: 0,
        minutes: 0,
        seconds: 0,

    })
    return newDate;
};

function randomIntFromInterval(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
};

function calculateDaysRemainingFromNow(dateString){
    const newDistance = formatDistanceToNow(dateString,{
        addSuffix: true,
    });
    console.log(newDistance);
    return newDistance;
};

export {formatDateToISO, generateRandomFutureDate, calculateDaysRemainingFromNow};
