<script setup name="App">
import { globalData } from './utils/globalData';
import Welcome from './views/Welcome/Welcome.vue';
const global = globalData();
import { gameListener } from './utils/emiter';
import { onMounted } from 'vue';
import _import from './assets/welcome/import';

onMounted(() => {
  _import().preload();
  gameListener();
});
</script>

<template>
  <main>
    <router-view v-if="global.gaming"></router-view>
    <Welcome v-if="!global.gaming"></Welcome>
  </main>
</template>

<style scoped></style>
