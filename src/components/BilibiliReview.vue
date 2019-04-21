<template>
  <div id="BilibiliReview">
    <div class="video-container">
      <iframe
        src="https://player.bilibili.com/player.html?aid=48288447"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="btn-group">
      <div class="prev btn">
        <Icon type="ios-arrow-dropleft" size="25"/>上一个
      </div>
      <div class="next btn">
        下一个
        <Icon type="ios-arrow-dropright" size="25"/>
      </div>
    </div>
  </div>
</template>

<script>
import cheerio from "cheerio";
import request from "axios";
export default {
  props: {},
  data() {
    return {};
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

<style lang="less" scoped>
@import url("../assets/style/colors.less");
#BilibiliReview {
  margin: 3rem auto;
  .video-container {
    box-shadow: @depth1;
    width: 100%;
    height: 600px;
    border-radius: 5px;
    overflow: hidden;
    iframe {
      width: 100%;
      height: 100%;
    }
  }
  .btn-group {
    margin-top: 2rem;
    & > div {
      display: inline;
    }
    .btn {
      font-size: 16px;
      vertical-align: middle;
      background-color: @bilibili-pink;
      margin-right: 60px;
      padding: 10px 30px;
      color: #fff;
      border-radius: 5px;
      box-shadow: @depth1;
      cursor: pointer;
    }
  }
}
</style>
