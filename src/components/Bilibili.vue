<template>
  <div>
    <iframe
      :src="urls[0]"
      scrolling="no"
      border="0"
      frameborder="no"
      framespacing="0"
      allowfullscreen="true"
    ></iframe>
  </div>
</template>

<script>
import request from "axios";
import cheerio from "cheerio";
export default {
  name: "Bilibili",
  props: {
    bilisearch: String
  },
  data() {
    return {
      urls: []
    };
  },
  watch: {
    bilisearch: function(bilisearch) {
      async function biliSpider(key) {
        const url =
          "https://search.bilibili.com/all?keyword=" +
          encodeURIComponent(key + "影评") +
          "&from_source=banner_search";
        const page = await request.get(url);
        const $ = await cheerio.load(page.data);
        let content = $(".video-contain li .title");
        let map = [];
        for (let i = 0; i < content.length; i++) {
          let href = content[i].attribs["href"];
          let reg = /\/av(\d*)/; // 正则匹配那去av号码
          let [, avNum] = href.match(reg); // 结构赋值,只给数组中第二个参数
          let iframeUrl = `https://player.bilibili.com/player.html?aid=${avNum}`;
          map.push(iframeUrl);
        }
        return map;
      }
      let fetchData = async function(bilisearch) {
        let res = biliSpider(bilisearch);
        return res;
      };
      fetchData(bilisearch)
        .then(e => {
          this.urls = e;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style lang='less' scoped>
iframe {
  width: 100%;
  height: 900px;
}
</style>
