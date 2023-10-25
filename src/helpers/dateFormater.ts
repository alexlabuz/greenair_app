export default function formatDate(d:Date) {
    d = new Date(d);
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${addZero(d.getMinutes())}`
}

function addZero(value:number) {
    if(value < 10){
        return "0"+value;
    }
    return value;
}