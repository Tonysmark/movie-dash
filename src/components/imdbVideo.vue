<template>
  <div class="video">
    <!-- 豆瓣数据传过来,然后这里拿到imdb数据之后就可以直接绑定在数据上了 -->
    <div class="video-container" v-if="videosrc">
      <video id="tralier-video"  :src="videosrc" controls>
      </video>
    </div>
    <div class="wait-video" v-else>
      <Spin size="large" fix></Spin>
    </div>
  </div>
</template>
<script>
const requests = require("axios");
const cheerio = require("cheerio");
export default {
  props: {
    imdbLink: String
  },
  data() {
    return {
      videosrc: ""
    };
  },
  watch: {
    imdbLink: function(imdbLink) {
      async function imdb(url) {
        let data = await mainpage(url);
        let videoURL = await page2link(data);
        return videoURL;
      }
      async function mainpage(url) {
        const page = await requests(url);
        const $ = cheerio.load(page.data);
        const ttid = $(".slate_wrapper .slate a").attr("data-tconst");
        const videoid = $(".slate_wrapper .slate a").attr("data-video");
        console.log("imdb返回查询结果" + ttid + " " + videoid);
        return { ttid, videoid };
      }
      async function page2link(data) {
        let url2 = `https://www.imdb.com/_json/video/${data.ttid}`;
        const page = await requests.get(url2);
        const dataBody = page.data;
        const current = await dataBody.videoMetadata[data.videoid];
        console.log("=========================");
        let video = [];
        let p1080 = current.encodings.filter(e => e.definition == "1080p");
        let p720 = current.encodings.filter(e => e.definition == "720p");
        let auto = current.encodings.filter(e => e.definition == "auto");
        if (p1080 != "") {
          video.push(p1080[0].videoUrl);
        } else if (p720 != "") {
          video.push(p720[0].videoUrl);
        } else {
          video.push(auto[0].videoUrl);
        }
        console.log("imdb预告视频：" + video[0]);
        return video[0];
      }
      imdb(imdbLink)
        .then(e => {
          console.log(e);
          this.videosrc = e;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/style/colors.less");
.video-container {
  background-color: #000;
  height: 450px;
  box-shadow: @depth1;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  align-items: center;
  #tralier-video {
    width: 100%;
  }
}
.wait-video {
  box-shadow: @depth1;
  border-radius: 5px;
  height: 420px;
  width:100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
</style>
