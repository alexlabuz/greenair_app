<template>
    <h1>GreenAir</h1>
    <div style="width: 800px; height: 600px;" id="map"></div>
    <Button>Load map</Button>
    <Dialog v-model:visible="dialogParcOpen" maximizable modal :header="openedParc?.nom ?? '' + ' (Historique des mesures)'" :style="{ width: '50vw' }">
        <ParcDialog/>
    </Dialog>
</template>

<script setup lang="ts"> 
import L, { LatLngExpression } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Ref, onMounted, ref } from "vue";
import { Ville } from "../models/Ville";
import { data } from "../data";
import { plainToClass } from "class-transformer";
import { aqiToColor } from "../helpers/aqicolor";
import Button from "primevue/button";
import Dialog from 'primevue/dialog';
import { Parc } from "../models/Parc";
import ParcDialog from "../components/ParcDialog.vue";

var city: Ville = plainToClass(Ville, data);
var dialogParcOpen = ref(false);
var openedParc: Ref<Parc | null> = ref(null);

function launchMap() {
    console.log(city);
    var map = L.map('map', {
        scrollWheelZoom: false,
    }).setView([city.latitude, city.longitude] as LatLngExpression, 13);
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    city.parcs?.forEach(e => {
        var circle = L.circle([e.latitude, e.longitude] as LatLngExpression, {
            color: aqiToColor(e.mesures![0].aqi ?? 0),
            fillColor: aqiToColor(e.mesures![0].aqi ?? 0),
            fillOpacity: 0.5,
            radius: 200,
            
        }).addTo(map);

        circle.on("click", () => clickParc(e));
    });

}

function clickParc(parc: Parc) {
    openedParc.value = parc;
    dialogParcOpen.value = true;
}

onMounted(() => {
    launchMap();
})

</script>

<style scoped>
</style>