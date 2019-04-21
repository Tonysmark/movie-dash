<template>
  <div id="recent">
    <h1>正在热映</h1>
    <Row>
      <Col
        :md="24"
        :lg="12"
        :xl="8"
        class-name="card"
        v-for="item in nowPlayingData"
        :key="item.id"
      >
        <div class="cover-wrapper">
          <img :src="item.CoverUrl" alt>
        </div>
        <div class="movie-info">
          <div class="titles">
            <span class="title">{{item.title}}</span>
            <span class="duration">{{item.duration}}分钟</span>
          </div>
          <div class="rate">
            <span v-if="item.score_star==0">暂无评分</span>
            <span v-else>
              <Rate allow-half disabled v-model="item.score_star"/>
              {{item.score}}
            </span>
          </div>
          <div class="film-maker">
            <div class="dir">导演：{{item.director}}</div>
            <div class="actor">演员：{{item.actors}}</div>
            <div>上映时间：{{item.release}} | {{item.region}}</div>
          </div>
          <div class="button-group">
            <span class="play">
              <a href>
                <Icon type="md-play"/>预告
              </a>
            </span>
            <span class="get-ticket">
              <a href>购买电影票</a>
            </span>
          </div>
        </div>
      </Col>
    </Row>
  </div>
</template>
<script>
import request from "superagent";
import cheerio from "cheerio";
export default {
  name: "recent",
  components: {},
  data() {
    return {
      nowPlayingData: []
    };
  },
  created() {
    request
      .get("https://movie.douban.com/cinema/nowplaying/qingdao")
      .then(res => {
        const $ = cheerio.load(res.text);
        let data = [];
        $("#nowplaying .lists .list-item").each((i, e) => {
          let title = $(e).attr("data-title");
          let score = $(e).attr("data-score");
          let score_star = $(e).attr("data-score");
          let star = $(e).attr("data-star");
          let release = $(e).attr("data-release");
          let duration = $(e).attr("data-duration").match(/\d+/)[0];
          let region = $(e).attr("data-region");
          let director = $(e).attr("data-director");
          let actors = $(e).attr("data-actors");
          let CoverUrl = $(e)
            .find(".poster img")
            .attr("src");
          return data.push({
            title,
            score,
            score_star:parseInt(score_star)/2,
            star,
            release,
            duration,
            region,
            director,
            actors,
            CoverUrl
          });
        });
        this.nowPlayingData = data;
        console.log(data);
      });
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/style/colors.less");
#recent {
  background-color: @bg-color;
  h1 {
    margin-bottom: 2rem;
  }
  .card {
    width: 444px;
    background-color: #fff;
    margin-right: 80px;
    margin-bottom: 3rem;
    box-shadow: @depth2;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    transition: 0.3s;
    .cover-wrapper {
      margin: 12px;
      height: 230px;
      border-radius: 5px;
      overflow: hidden;
      // border: 1px solid #000;
      img {
        width: 100%;
        height: 100%;
        transition: 0.3s;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .movie-info {
      width: 100%;
      padding: 15px 15px 5px 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 20px;
        color: @font-dark;
      }
      .duration {
        float: right;
        padding: 2px 5px;
        border-radius: 25px;
        border: 1px solid @default-color;
        color: @default-color;
      }
      .rate {
        font-size: 14px;
      }
      .film-maker {
        font-size: 15px;
        margin-bottom: 2rem;
      }
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
    }
  }
}
</style>
