<template>
    <div :style="{
        backgroundColor: color,
        color: (color === 'yellow') ? 'black' : 'white'
        }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
var props = defineProps(["color"]);

</script>

<style scoped>
div{
    background-color: gray;
    text-align: center;
    padding: 5px;
    margin: 0;
    color: white;
    border-radius: 8px;
    width: 70px;
}
</style>