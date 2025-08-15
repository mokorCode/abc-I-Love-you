import mitt from "mitt";
import { globalData } from "./globalData";
import { storeToRefs } from "pinia";

const mitter = mitt();

export function gameListener() {
  const global = globalData();
  const { indexInf } = storeToRefs(global);

  mitter.on("newGame", newGame);
  mitter.on("continue", continueGame);

  function newGame() {
    global.reload();
    setTimeout(() => {
      global.indexInf.sentence = 1;
      global.indexInf.chapter = 0;
      global.indexInf.section = 0;
      global.warn("左键对话框继续");
    }, 1000);
  }

  function continueGame() {
    if (
      indexInf.value.chapter == 0 &&
      indexInf.value.section == 0 &&
      indexInf.value.sentence == 0
    ) {
      global.warn("没有可用的进度！");
    }
  }
}

export default mitter;
