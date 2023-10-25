<template>
  <Menubar :model="items" style="background-color: var(--primary-color); color: var(--primary-color-text)">
    <template #start>
      <h1>GreenAir</h1>
    </template>
  </Menubar>
  <HomePage style="background-color: ;"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HomePage from './vues/HomePage.vue';
import Menubar from 'primevue/menubar';

var items = ref([
  {  
    label: 'Ville',
    items: [
      {
        label: 'Arras'
      }
    ]
  }
]);
</script>

<style scoped>
h1{
  margin: 0;
  padding: 0;
  overflow: hidden;
  font-size: 22px;
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
