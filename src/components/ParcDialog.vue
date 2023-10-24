<template>
    <ListBox></ListBox>
</template>

<script setup lang="ts">
import { Parc } from '../models/Parc';
import ListBox from "primevue/listbox";


defineProps({
    partyPlayer: Object as () => Parc
});


</script>