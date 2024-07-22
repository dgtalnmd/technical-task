import {format, formatDistanceToNow, isToday} from "date-fns";

export function subtractHours(date: Date, numOfHours: number) {
    const dateCopy = new Date(date.getTime());

    dateCopy.setHours(dateCopy.getHours() - numOfHours);

    return dateCopy;
}

export const formatDate = (date: string | number | Date) => {
    if (isToday(date)) {
        return formatDistanceToNow(date, {addSuffix: true});
    } else {
        return format(date, "dd.MM.yyyy, HH:mm:ss");
    }
};
