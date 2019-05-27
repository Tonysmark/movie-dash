<template>
  <div>
    <div class="button-group">
      <span class="play">
        <a @click="onScrap">
          <Icon type="md-play"/>预告
        </a>
      </span>
      <span class="get-ticket">
        <a @click="onGetTickets">购买电影票</a>
      </span>
    </div>
    <div v-if="showTralier">
      <Modal v-model="showTralier" draggable scrollable title="预告视频" width="auto">
        <div>
          <video :src="videoUrl" controls></video>
        </div>
      </Modal>
    </div>
    <Modal v-model="showTickets" fullscreen title="购买电影票">
      <div>
        <iframe id="getTickets" :src="ticketsPage" frameborder="0"></iframe>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from "axios";
import cheerio from "cheerio";
export default {
  data() {
    return {
      showTralier: false,
      showTickets: false,
      videoUrl: "",
      ticketsPage: ""
    };
  },
  props: {
    movieId: String,
    movieTickets: String
  },
  methods: {
    async onScrap() {
      let movieId = this.movieId;
      async function TralierPage(movieId) {
        console.log(this);
        const TralierPage = await axios({
          url: `https://movie.douban.com/subject/${movieId}/trailer`,
          method: "get"
        });
        const $ = cheerio.load(TralierPage.data);
        const TralierUrl = $(".video-list .pr-video").attr("href");
        if (TralierUrl == undefined) return "";
        else return TralierUrl;
      }
      async function TralierVideo(url) {
        const page = await axios({
          url,
          method: "get"
        });
        const $ = cheerio.load(page.data);
        const videoLink = $(".vjs-douban source").attr("src");
        return videoLink;
      }
      let url = await TralierPage(movieId);
      if (url == "") {
        this.$Message.warning("没有预告");
      } else {
        this.videoUrl = await TralierVideo(url);
        this.showTralier = true;
      }
    },
    async onGetTickets() {
      let movieTickets = this.movieTickets;
      if (movieTickets == undefined) {
        this.$Message.warning("暂时没有电影票");
      } else {
        const page = await axios({
          method: "get",
          url: movieTickets
        });
        const $ = cheerio.load(page.data);
        let ticketUrl = $(".redirect .btn-redir").attr("href");
        this.ticketsPage = ticketUrl;
        this.showTickets = true;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/colors.less");
.button-group {
  text-align: center;
  margin-bottom: 1rem;
  .play {
    border-radius: 5px;
    padding: 7px;
    background-color: @card-button;
    margin-right: 15px;
  }
  .get-ticket {
    a {
      padding: 6px 30px;
      background: @card-button;
    }
  }
}
</style>

