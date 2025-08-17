/* 
  一个 sentence 必须包含: id
  含next则根据next进行跳转，若不包含则句子索引id自增
  tip: 进行章节和小结过渡时必须使用next，否则id自增到未定义的索引
  可以包含: text, left, center, right
  角色包含 exporession 则指定表情，如果不，则滞留到指定表情为止
  角色第一次出现必须指定表情
*/
export const sentenceContext = {
  "0": {
    "0": {
      sentences: [
        {
          // 0
          id: 0,
          effects: [
            {
              blackBlock: "linear",
              duration: 1000,
              reserve: false,
            },
          ],
          text: "...一年前，在KKC，我有幸结识这么一个传奇人物",
        },
        {
          // 1
          id: 1,
          text: "它技术高端，打遍kk无敌手，刀法娴熟堪比一线厨师",
        },
        {
          // 2
          id: 2,
          text: "它就是abcpqrklm3",
        },
        {
          // 3
          id: 3,
          effects: [
            {
              blackBlock: "easeOut",
              duration: 500,
              reserve: true,
            },
          ],
          text: "虽然这么说，但这个千刀杀的真不是个人",
        },
        {
          // 4
          id: 4,
          text: "我都懒得举例",
        },
        {
          // 5
          id: 5,
          next: "0-0-0",
          text: 'aaaaaaaaaaaaaaaaaaaaaaaaa<a style="color: red">aaaaa</a><i><a style="color:blue">aaaaaa</a></i>',
        },
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
