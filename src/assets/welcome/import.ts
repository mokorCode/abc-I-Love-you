import abc from "../welcome/abc_normal.jpg";
import ciciyou from "../welcome/ciciyou.jpg";
import pystary from "../welcome/pystary.jpg";
import VE1GR from "../welcome/VE1GR.jpg";
import welcome from "../welcome/welcome.wav";
import bg from "../welcome/bg.jpg";

// 预加载
function preload() {
  console.log("预加载...");
  const imgs = [abc, ciciyou, pystary, VE1GR, bg];
  imgs.forEach((img) => {
    new Image().src = img;
  });

  const audio = [welcome];
  audio.forEach((aud) => {
    const a = new Audio(aud);
    a.preload = "auto";
    a.oncanplaythrough = () => {
      console.log("资源预加载完毕");
      a.oncanplaythrough = null;
    };
  });
}

export default function () {
  return { abc, ciciyou, pystary, VE1GR, welcome, bg, preload };
}
