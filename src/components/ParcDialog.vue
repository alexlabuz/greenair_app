<template>
    <Button @click="clickRefresh" icon="pi pi-refresh" label="Rafraichir"/>
    <DataTable :value="parc?.mesures" size="large">
        <Column header="AQI">
            <template #body="slotProps">
                <Badge :color="aqiToColor(slotProps.data.aqi)">{{ slotProps.data.aqi}}</Badge>
            </template>
        </Column>
        <Column header="Température">
            <template #body="slotProps">
                {{ slotProps.data.temperature }} °C
            </template>
        </Column>
        <Column field="humidite" header="Humidité">
            <template #body="slotProps">
                {{ slotProps.data.humidite}} %
            </template>
        </Column>
        <Column field="date" header="Date">
            <template #body="slotProps">
                {{ formatDate(slotProps.data.dateHeure) }}
            </template>
        </Column>
    </DataTable>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Parc } from '../models/Parc';
import formatDate  from "../helpers/dateFormater";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Badge from '../components/Badge.vue';
import { aqiToColor } from '../helpers/aqicolor';
import Button from 'primevue/button';

var props = defineProps({
    parc: Object as () => Parc
});

const emit = defineEmits(['refresh']);

function clickRefresh() {
    emit('refresh');
}

onMounted(() => {
    console.log(props.parc);
})
</script>