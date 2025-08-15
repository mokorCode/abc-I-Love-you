import abc from "../welcome/abc_normal.jpg";
import ciciyou from "../welcome/ciciyou.jpg";
import pystary from "../welcome/pystary.jpg";
import VE1GR from "../welcome/VE1GR.jpg";
import welcome from "../welcome/welcome.wav";
import bg from "../welcome/bg.jpg";

// 预加载
async function preload() {
  console.log("预加载...");
  const imgs = [abc, ciciyou, pystary, VE1GR, bg];
  imgs.forEach((img) => {
    new Image().src = img;
  });

  return new Promise((resolve) => {
    const audio = [welcome];
    const audioPromises = audio.map((aud) => {
      return new Promise((resolve) => {
        const a = new Audio(aud);
        a.preload = "auto";
        a.oncanplaythrough = () => {
          a.volume = 0;
          a.play();
          a.oncanplaythrough = null;
          resolve(true);
        };
      });
    });
    Promise.all(audioPromises).then(() => {
      console.log("资源预加载完毕");
      resolve(true);
    });
  });
}

export default function () {
  return { abc, ciciyou, pystary, VE1GR, welcome, bg, preload };
}
