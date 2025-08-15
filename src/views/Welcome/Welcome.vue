<template>
    <main>
        <div class="welcome-options fadeIn" v-if="loadOptions">
            <li @click="mitter.emit('continue')">
                <i @mouseenter="continueGameShow" @mouseout="continueGameRemove" @mousemove="continueGameMove"
                    class="continue">CONTINUE
                    <br>- </i>
            </li>
            <li @click="mitter.emit('newGame')"><i class="newgame">NEWGAME <br>- </i></li>
            <li><i class="memories">MEMORIES <br>- </i></li>
            <li><i class="about">ABOUT <br>- </i></li>
        </div>
        <div v-if="loadRolesAbc" class="welcomeRoles welcome-abc fadeIn">
            <img :src="rolesFn.abc" alt=" 这是abc, 变白板了" class="img">
        </div>
        <div v-if="loadRolesPystary" class="welcomeRoles welcome-pystary fadeIn">
            <img :src="rolesFn.pystary" alt="这是pystary, 变白板了" class="img">
        </div>
        <div v-if="loadRolesCiciyou" class="welcomeRoles welcome-ciciyou fadeIn">
            <img :src="rolesFn.ciciyou" alt="这是ciciyou, 变白板了" class="img">
        </div>
        <div v-if="loadRolesVE1GR" class="welcomeRoles welcome-VE1GR fadeIn">
            <img :src="rolesFn.VE1GR" alt="这是VE1GR, 变白板了" class="img">
        </div>
        <div v-if="loadBg" class="bg fadeIn">
            <img :src="rolesFn.bg" alt="这是背景, 变白板了" class="img">
        </div>
    </main>
</template>

<script setup name='Welcome'>
import { onMounted, ref } from 'vue';
import importWelcomeRoles from '@/assets/welcome/import';
import mitter from '@/utils/emiter';
import { globalData } from '@/utils/globalData';

const global = globalData();
const rolesFn = importWelcomeRoles();
let loadOptions = ref(false);
let loadRolesAbc = ref(false);
let loadRolesPystary = ref(false);
let loadRolesCiciyou = ref(false);
let loadRolesVE1GR = ref(false);
let loadBg = ref(false);
let welcome = new Audio(importWelcomeRoles().welcome)


function continueGameShow() {
    const continueGameShowing = document.createElement('div');
    continueGameShowing.classList.add('continueGameShowing');
    const chapterInf = `Chapter - ${global.indexInf.chapter} - ${global.indexInf.section} - ${global.indexInf.sentence}`

    const continueGameShowingChapter = document.createElement('div');
    continueGameShowingChapter.classList.add('continueGameShowingChapter');
    continueGameShowingChapter.innerText = chapterInf;

    continueGameShowing.appendChild(continueGameShowingChapter);
    document.body.appendChild(continueGameShowing);
}
function continueGameMove(e) {
    const target = document.querySelector('.continueGameShowing');
    if (target) {
        const mouseX = e.pageX;
        const mouseY = e.pageY;
        target.style.left = `${mouseX}px`;
        target.style.top = `${mouseY + 40}px`;
    }
}
function continueGameRemove() {
    const target = document.querySelector('.continueGameShowing');
    if (target) target.remove();
}


function Bg() {
    const main = document.querySelector('main');
    let nowBg = 100;
    const FadeInBg = setInterval(() => {
        nowBg -= 0.1;
        main.style.background = `linear-gradient(to top, hsl(280, 100%, ${nowBg}%), transparent 20%)`;
        if (nowBg <= 90) {
            clearInterval(FadeInBg);
        }
    }, 5)
}
onMounted(() => {
    window.onclick = () => {
        setTimeout(Bg, 1400)
        setTimeout(() => loadBg.value = true, 1400)
        setTimeout(() => loadOptions.value = true, 1400)
        setTimeout(() => welcome.play(), 0)
        setTimeout(() => loadRolesAbc.value = true, 100)
        setTimeout(() => loadRolesCiciyou.value = true, 800)
        setTimeout(() => loadRolesPystary.value = true, 700)
        setTimeout(() => loadRolesVE1GR.value = true, 900)
        window.onclick = null;
    }
})
</script>

<style scoped>
.bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    animation: scaleIn 0.1s ease-out forwards;
    z-index: -1;
    user-select: none;
}

@keyframes scaleIn {
    0% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}

.continue:hover::after {
    content: '继续';
}

.newgame:hover::after {
    content: '新的开始';
}

.memories:hover::after {
    content: '记忆';
}

.about:hover::after {
    content: '关于';
}

.welcome-options {
    z-index: 100;
}

.img {
    width: 100%;
}

.welcomeRoles {
    position: absolute;
    border: 3px solid pink;
    margin: 0;
    pointer-events: none;
    user-select: none;
}

.welcome-VE1GR {
    display: block;
    width: 100px;
    z-index: 7;
    right: 50%;
    top: 5%;
    display: block;
    width: 350px;
}

.welcome-pystary {
    display: block;
    right: 25%;
    top: 10%;
    display: block;
    width: 450px;
    z-index: 8;
    transform: skewX(-10deg);
}



.welcome-ciciyou {
    right: 40%;
    bottom: 25%;
    display: block;
    width: 400px;
    z-index: 9;
}

.welcome-abc {
    right: 15%;
    bottom: 10%;
    display: block;
    width: 400px;
    z-index: 10;
    transform: skewX(-20deg);
}

main {
    height: 100vh;
    width: 100vw;
}
</style>