export function aqiToColor(aqi:number) {
    if(aqi == 0){
        return "black";
    }else if(aqi <= 50){
        return "green";
    }else if(aqi <= 100){
        return "#FEFF00";
    }else if(aqi <= 150){
        return "orange";
    }else{
        return "red";
    }
}