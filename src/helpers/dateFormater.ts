export default function formatDate(d:Date) {
    return `${d.getDate()}/${d.getMonth()}/${d.getFullYear()} ${d.getHours()}:${addZero(d.getMinutes())}`
}

function addZero(value:number) {
    if(value < 10){
        return "0"+value;
    }
    return value;
}