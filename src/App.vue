<script setup name="App">
import { globalData } from './utils/globalData';
import Welcome from './views/Welcome/Welcome.vue';
const global = globalData();
import { gameListener } from './utils/emiter';
import { onMounted, ref } from 'vue';
import _import from './assets/welcome/import';

let preload = ref(false);

onMounted(() => {
  document.title = 'wait...'
  _import().preload().then(() => {
    document.title = 'abc I love you'
    gameListener();
    preload.value = true;
  });
});
</script>

<template>
  <main>
    <router-view v-if="global.gaming && preloaded"></router-view>
    <Welcome v-if="!global.gaming && preloaded"></Welcome>
  </main>
</template>

<style scoped></style>
