import { formatISO } from "date-fns";

function formatDateToISO(dateString){
    const newDate = formatISO(dateString, {representation: "date"});

    return newDate;
};

export {formatDateToISO};
