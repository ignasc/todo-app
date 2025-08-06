import { formatISO } from "date-fns";

function formatDateToISO(dateString){
    console.log("format date executed")
    const newDate = formatISO(dateString, {representation: "date"});

    console.log("Formatted from " + dateString + " to " + formatISO(dateString, {representation: "date"}));
    //console.log(new Date("2025-01-01"));

    return newDate;
};

export {formatDateToISO};
