export function aqiToColor(aqi:number) {
    if(aqi == 0){
        return "white";
    }else if(aqi <= 50){
        return "green";
    }else if(aqi <= 100){
        return "yellow";
    }else if(aqi <= 150){
        return "orange";
    }else{
        return "red";
    }
}