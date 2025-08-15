<template>
    <topNav v-if="global.paused"></topNav>
    <div class="gaming-block-black"></div>
    <div class="gaming-block-white"></div>

    <div class="gaming-chapter"></div>
    <div class="gaming-dialog fadeIn" @click="dialogSkip">
        <p class="text" ref="text"></p>
    </div>
    <div class="gaming-roleLeft fadeIn"></div>
    <div class="gaming-roleCenter fadeIn"></div>
    <div class="gaming-roleRight fadeIn"></div>
    <div class="gaming-bg fadeIn"></div>
</template>

<script setup name='Gaming'>
import topNav from '@/components/UI/topNav.vue';
import { globalData } from '@/utils/globalData';
import { sentenceContext, roles } from './context';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const global = globalData();
const { indexInf } = storeToRefs(global); // 进度信息如 chapter - 0 - 0 - 0
const text = ref(null);
let sentenceIndex = ref(0); // 句子索引
let textFinished = ref(false);
let printMachine = null;
let printMachineIndex = 0;
let textNode = '';
let isDialogSkip = false;
let printMachineFrequency = 50;

const sentenceText = computed(() => sentenceContext[indexInf.value.chapter][indexInf.value.section].sentences[sentenceIndex.value]?.text) // 当前Text


function dialogSkip() {
    if (!isDialogSkip) {
        isDialogSkip = true;
    }
    if (textFinished.value) {
        sentenceIndex.value += 1;
    }

}

watch(() => [indexInf.value, sentenceIndex.value], () => {
    console.log('进度变化！');
    console.log(indexInf.value);

    textFinished.value = false;
    textNode = '';
    printMachineIndex = 0;
    printMachine = null;
    isDialogSkip = false;
    printMachineFrequency = 50;

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
                clearInterval(printMachine);
            }
        }, printMachineFrequency);
    }
}, { deep: true })


</script>
<style scoped></style>