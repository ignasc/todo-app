import {formatISO} from "date-fns";

function getDate(dateString){
    const newDate = formatISO(new Date(), {representation: "date"});

    console.log(newDate);

    return newDate  ;
};

export {getDate};
