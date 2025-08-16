<script setup name="topNav">
import { onMounted, ref } from "vue";
import { easeOut } from "@/utils/animation";
const target = ref(null);
import { globalData } from "@/utils/globalData";
const p = globalData();
onMounted(() => {
  if (!target.value) return;
  console.log(p.paused);
  target.value.style.opacity = 0;
  let t = 0;
  const fadeIn = setInterval(() => {
    t += 50 / 500;
    target.value.style.opacity = easeOut(t);
    if (t >= 1) {
      clearInterval(fadeIn);
    }
  }, 50);
});
</script>

<template>
  <div class="topNav" ref="target">
    <div class="options button"><i>OPTIONS 选项</i></div>
    <div class="memories button"><i>MEMORIES 记忆</i></div>
  </div>
</template>

<style scoped></style>
