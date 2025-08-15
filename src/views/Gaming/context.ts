/* 
  一个 sentence 必须包含: id
  可以包含: text, left, center, right
  角色必须包含 exporession
*/
export const sentenceContext = {
  "0": {
    "0": {
      sentences: [
        {
          text: "... 这是一项测试， 作为开场白， 没什么好说的",
          // choices: [
          //     {

          //     }
          // ],
          center: "abc",
          expression: "smile",
        },
        {
          text: "这又是一项测试， 也没什么好说的",
          // choices: [
          //     {

          //     }
          // ],
          center: "abc",
          expression: "angry",
        },
        {},
      ],
    },
  },
};

import abc_normal from "@/assets/welcome/abc_normal.jpg";
import abc_smile from "@/assets/welcome/abc_smile.jpg";
import abc_happy from "@/assets/welcome/abc_happy.jpg";
import abc_think from "@/assets/welcome/abc_think.jpg";
import abc_angry from "@/assets/welcome/abc_angry.jpg";

export const roles = {
  abc: {
    smile: null,
    angry: abc_angry,
    happy: null,
    think: null,
    sad: null,
  },

  pystary: {
    smile: null,
    angry: null,
    happy: null,
    think: null,
    sad: null,
  },

  ciciyou: {
    smile: null,
    angry: null,
    happy: null,
    think: null,
    sad: null,
  },

  VE1GR: {
    smile: null,
    angry: null,
    happy: null,
    think: null,
    sad: null,
  },
};
