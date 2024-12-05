export function secondsToDate(seconds: number):string {
    const date = new Date(0);
    date.setSeconds(seconds);
    var datestring = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
    date.getHours() + ":" + date.getMinutes();
    return datestring
}