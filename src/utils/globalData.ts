import { defineStore } from "pinia";
import { reactive, ref } from "vue";
interface IndexInf {
  chapter: number; // 章节
  section: number; // 小结
  sentence: number; // 句子
}

interface Choice {}

interface SentenceContext {
  text: string; // 内容
  speaker?: string; // 说话者
  expression?: string; // 表情
  background?: string; // 背景
  music?: string; // 音乐
  sfx?: string; // 音效
  choices?: Choice[]; // 分支
  effect?: string; // 特效
}

export const globalData = defineStore("global", () => {
  let indexInf = reactive<IndexInf>({
    chapter: 0,
    section: 0,
    sentence: 0,
  });
  let gaming = ref(false);
  let paused = ref(false);

  function reload() {
    gaming.value = true;
    paused.value = false;
  }

  function warn(text: string) {
    const warn = document.createElement("div");
    warn.classList.add("warn");
    const warnp = document.createElement("i");
    warnp.innerText = text;
    warn.appendChild(warnp);
    document.body.appendChild(warn);
    warn.classList.add("fadeIn");
    warn.onanimationend = () => {
      if (!warn.classList.contains("fadeOut")) {
        warn.classList.remove("fadeIn");
        setTimeout(() => {
          warn.classList.add("fadeOut");
        }, 2000);
      } else {
        warn.remove();
      }
    };
  }
  return { indexInf, gaming, paused, warn, reload };
});
