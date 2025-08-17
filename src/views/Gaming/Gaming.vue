<template>
  <topNav v-if="global.paused"></topNav>
  <div class="gaming-block-black" ref="gamingBlockBlack"></div>
  <div class="gaming-block-white" ref="gamingBlockWhite"></div>

  <div class="gaming-chapter"></div>
  <div class="gaming-dialog fadeIn" @click="dialogSkip">
    <p class="text" ref="text"></p>
  </div>
  <div class="gaming-roleLeft fadeIn"></div>
  <div class="gaming-roleCenter fadeIn"></div>
  <div class="gaming-roleRight fadeIn"></div>
  <div class="gaming-bg fadeIn"></div>
</template>

<script setup name="Gaming">
import topNav from "@/components/UI/topNav.vue";
import { globalData } from "@/utils/globalData";
import { sentenceContext, roles } from "./context";
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { easeOut, linear, easeIn } from "@/utils/animation";

const global = globalData();
const { indexInf } = storeToRefs(global); // 进度信息如 chapter - 0 - 0 - 0
const text = ref(null);
let textFinished = ref(false);
let printMachine = null;
let printMachineIndex = 0;
let textNode = "";
let isDialogSkip = false;
let printMachineFrequency = 50;
const gamingBlockWhite = ref(null);
const gamingBlockBlack = ref(null);

const currentChapter = computed(() => indexInf.value.chapter);
const currentSection = computed(() => indexInf.value.section);
const currentSentence = computed(() => indexInf.value.sentence);
const currentChapterId = computed(() => indexInf.value.chapterId);
const currentSectionId = computed(() => indexInf.value.sectionId);
const currentSentenceId = computed(() => indexInf.value.sentenceId);
const next = computed(
  () =>
    sentenceContext[currentChapterId.value][currentSectionId.value].sentences[
      currentSentenceId.value
    ]?.next,
);

const sentenceText = computed(
  () =>
    sentenceContext[currentChapterId.value][currentSectionId.value].sentences[
      currentSentenceId.value
    ]?.text,
); // 当前Text

function dialogSkip() {
  if (!isDialogSkip) {
    isDialogSkip = true;
  }
  if (textFinished.value && !next.value) {
    indexInf.value.sentenceId += 1;
    indexInf.value.sentence += 1;
  } else if (textFinished.value && next.value) {
    jumpTo(next.value);
  }
}

function textPrinter() {
  return new Promise((resolve) => {
    if (sentenceText.value) {
      printMachine = setInterval(() => {
        textNode += sentenceText.value[printMachineIndex];
        text.value.innerHTML = textNode;
        printMachineIndex += 1;
        if (isDialogSkip) {
          printMachineIndex = sentenceText.value.length;
          text.value.innerHTML = sentenceText.value;
        }
        if (printMachineIndex >= sentenceText.value.length) {
          textFinished.value = true;
          resolve();
          clearInterval(printMachine);
        }
      }, printMachineFrequency);
    }
  });
}

function blockApply(color, animation, duration, reserve) {
  return new Promise((resolve) => {
    let t = 0;
    let progress = 0;
    const target = {
      white: gamingBlockWhite.value,
      black: gamingBlockBlack.value,
    }[color];
    const easingFunction = { easeOut, easeIn, linear }[animation];
    const effectApplier = setInterval(() => {
      progress = t / duration;
      if (progress >= 1) {
        target.style.opacity = reserve
          ? 1 - easingFunction(1)
          : easingFunction(1);
        clearInterval(effectApplier);
        resolve();
      }
      target.style.opacity = reserve
        ? 1 - easingFunction(progress)
        : easingFunction(progress);
      t += 16;
    }, 16);
  });
}
async function dealEffects() {
  const currentEffects =
    sentenceContext[currentChapterId.value][currentSectionId.value].sentences[
      currentSentenceId.value
    ]?.effects;
  if (!currentEffects) return; // currentEffects 不存在, 终止
  for (let i = 0; i < currentEffects.length; i++) {
    const effect = currentEffects[i];
    console.log(effect); // debug
    if ("blackBlock" in effect) {
      await blockApply(
        "black",
        effect.blackBlock,
        effect.duration,
        effect.reserve,
      );
    } else if ("whiteBlock" in effect) {
      await blockApply(
        "white",
        effect.whiteBlock,
        effect.duration,
        effect.reserve,
      );
    }
  }
}
function jumpTo(progress) {
  const nextProgress = progress.split("-");
  indexInf.value.chapterId = Number(nextProgress[0]);
  indexInf.value.sectionId = Number(nextProgress[1]);
  indexInf.value.sentenceId = Number(nextProgress[2]);
  if (Number(nextProgress[0]) != indexInf.value.chaperId) {
    indexInf.value.chapter += 1;
  }
  if (Number(nextProgress[1]) != indexInf.value.sectionId) {
    indexInf.value.section += 1;
  }
  if (Number(nextProgress[2]) != indexInf.value.sentenceId) {
    indexInf.value.sentence += 1;
  }
}

function init() {
  textFinished.value = false;
  textNode = "";
  printMachineIndex = 0;
  printMachine = null;
  isDialogSkip = false;
  printMachineFrequency = 50;
}
watch(
  () => [currentChapter, currentSection, currentSentence],
  async () => {
    console.log("进度变化！");
    console.log(indexInf.value);

    gamingBlockBlack.value.style.color = "white";
    gamingBlockBlack.value.innerText = `${JSON.stringify(sentenceContext[currentChapterId.value][currentSectionId.value].sentences[currentSentenceId.value])}`; // debug
    init();
    await dealEffects();
    await textPrinter();
  },
  { deep: true },
);
</script>
<style scoped></style>
