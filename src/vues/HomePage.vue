<template>
    <div id="baseHome">
        <div class="barMap">
            <Dropdown 
                v-model="selectedCityDropdown" 
                :options="citys" 
                loading-icon="pi pi-spin pi-spinner" 
                :loading="citysIsBusy" 
                filter 
                option-label="nom" 
                style="width: 12em;"
                placeholder="Choisir ville ..."/>
            
            <p v-if="selectedCity">Nombre de capteur : {{ nbCapteur }}</p>

            <Button v-if="selectedCity" @click="loadVille(selectedCity?.id ?? 1)" icon="pi pi-refresh" label="Rafraichir"/>
        </div>
        
        <div id="mapContainer" :class="{loading_map: isBusy}">
            <i class="pi pi-spin pi-spinner centerMap" style="font-size: 2rem; color: black" v-show="isBusy"></i>
            <p class="centerMap" v-if="!selectedCity">Veuillez selectionner une ville.</p>
            <div id="map"></div>
        </div>

        <Dialog 
            v-model:visible="dialogParcOpen" 
            maximizable 
            modal 
            :header="`${selectedParc?.nom} (Historique des mesures)`" 
            :style="{ width: '60vw' }"
        >
            <ParcDialog :parc="selectedParc!" @refresh="loadParc(selectedParc?.id ?? 1)"/>
        </Dialog>
    </div>
</template>

<script setup lang="ts"> 
import L, { LatLngExpression, Layer } from "leaflet";
import 'leaflet/dist/leaflet.css';
import { Ref, computed, onMounted, ref, watch } from "vue";
import { Ville } from "../models/Ville";
import Dialog from 'primevue/dialog';
import Dropdown from "primevue/dropdown";
import { Parc } from "../models/Parc";
import ParcDialog from "../components/ParcDialog.vue";
import { getAllVille, getVilleById } from "../services/VilleRequest";
import { getParcById } from "../services/ParcRaquest";
import { aqiToColor } from "../helpers/aqicolor";
import Button from "primevue/button";

// Propriétées ville
var citysIsBusy: Ref<boolean> = ref(false);
var citys: Ref<Ville[]> = ref([]);
var selectedCityDropdown: Ref<Ville | null> = ref(null);
var selectedCity: Ref<Ville | null> = ref(null);

// Propriétées parc
var selectedParc: Ref<Parc | null> = ref(null);
var dialogParcOpen = ref(false);

var map: L.Map | null = null;
var layersMap: Layer[] = [];
var isBusy: Ref<Boolean> = ref(false);

var nbCapteur = computed(() => selectedCity.value?.parks?.length);

function initialiseMap() {
    map = L.map('map', {
        scrollWheelZoom: false,
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}

onMounted(() => {
    initialiseMap();
    loadVilles();
})

function loadParcMap() {
    if(map === null || selectedCity.value === null) return;

    // Supprime tout les parcs affichés sur la carte
    layersMap.forEach((layer) => {
        map?.removeLayer(layer);
    })

    var c = selectedCity.value;
    console.log(c);
    map.setView([c.latitude, c.longitude] as LatLngExpression, 13);

    c.parks?.forEach(e => {
        var circle = L.circle([e.latitude, e.longitude] as LatLngExpression, {
            color: aqiToColor((e.mesure) ? e.mesure?.aqi! : 0),
            fillColor: aqiToColor((e.mesure) ? e.mesure?.aqi! : 0),
            fillOpacity: 0.5,
            radius: 100, 
        }).addTo(map!);

        circle.on("click", () => openParcDialog(e.id!));
        layersMap.push(circle);
    });
}

async function loadVilles() {
    citysIsBusy.value = true;
    var villesData = await getAllVille();
    citys.value = villesData;
    citysIsBusy.value = false;
}

async function loadVille(id: number) {
    isBusy.value = true;
    var villeData = await getVilleById(id.toString());
    selectedCity.value = villeData;
    loadParcMap();
    isBusy.value = false;
}

async function loadParc(id: number) {
    isBusy.value = true;
    var parcData = await getParcById(id.toString());
    selectedParc.value = parcData;
    isBusy.value = false;
}

async function openParcDialog(idParc: number) {
    await loadParc(idParc);
    dialogParcOpen.value = true;
}

watch(selectedCityDropdown, async(newQ, oldQ) => {
    if(newQ === oldQ || !newQ) return;
    console.log(selectedCity);
    loadVille(newQ.id ?? 1);
})

</script>

<style scoped>
#mapContainer{
    width: 100% -1px; 
    height: 100%;
    margin: 8px;
    animation: 0.7s;
}

#mapContainer .centerMap{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 401;
}

#mapContainer #map{
    width: 100%; 
    height: 100%;
    border-radius: 5px;
}

.loading_map{
    filter: brightness(0.4);
}

#baseHome{
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
}

.barMap{
    margin: 5px;
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    gap: 1em;
}

.barMap p {
    margin: 0;
}
</style>