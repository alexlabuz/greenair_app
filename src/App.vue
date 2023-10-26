<template>
  <div id="base">

    <Menubar style="margin: 6px;">
      <template #start>
        <div style="display: flex;gap: 1em;align-items: center;">
          <img src="./assets/favicon-32x32.png"/>
          <h1>GreenAir</h1>
        </div>
      </template>
    </Menubar>

    <HomePage/>

  </div>
</template>

<script setup lang="ts">
import HomePage from './vues/HomePage.vue';
import Menubar from 'primevue/menubar';
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

#base{
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>