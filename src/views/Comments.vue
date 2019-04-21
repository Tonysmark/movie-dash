<template>
  <div id="comments">
    <div class="search-box">
      <input
        class="search-text"
        v-model="value"
        v-on:keyup.enter="searchcat(value);searchdou(value)"
        type="text"
        placeholder="搜索喜爱电影...."
      >
      <div class="search-btn">
        <Icon type="md-search" size="20"/>
      </div>
    </div>
    <imdbVideo :imdbLink="doubanData.imdb"></imdbVideo>
    <!-- <Bilibili :bilisearch="value"></Bilibili> -->
    <div class="info-container">
      <div class="img-wrapper">
        <img :src="maoyanproData.cover" alt>
      </div>
      <div class="infos">
        <div class="title">
          {{
          maoyanproData.title
          }}
          <span class="subtitle">{{doubanData.subtitle}}</span>
        </div>
        <div class="more-about">
          <span>{{maoyanproData.duration}}</span>
          <span>
            {{
            maoyanproData.category
            }}
          </span>
          <span>
            <Icon type="md-calendar"/>
            {{maoyanproData.release}}
          </span>
        </div>
        <div class="report">{{doubanData.report}}</div>
      </div>
      <div class="ratings">
        <span class="rating-group">
          <img src="../assets/svgs/douban.svg" alt>
          <span class="rate-num">{{doubanData.rating}}</span>
          <span class="rate-people">
            {{doubanData.rating_people}}
            人参与评分
          </span>
        </span>
        <span class="rating-group">
          <img src="../assets/svgs/icon_24-猫眼电影.svg" alt>
          <span class="rate-num">{{maoyanproData.rating_num}}</span>
          <span class="rate-people">{{maoyanproData.detail_score_count}}</span>
        </span>
        <span class="rating-group">
          <img src="../assets/svgs/imdb.svg" alt>
          <span class="rate-num">
            {{
            maoyanproData.imdb_num
            }}
          </span>
        </span>
        <span class="rating-group">
          <img src="../assets/svgs/star.svg" alt>
          <span class="want-to">{{maoyanproData.detail_wish_count}}</span>
        </span>
      </div>
      <Menu mode="horizontal">
        <MenuItem name="1" to="/bilibili">
          <Icon type="ios-paper"/>Bilibili 影评
        </MenuItem>
        <MenuItem name="2" to="/subComments">
          <Icon type="ios-people"/>最新评论
        </MenuItem>
      </Menu>
      <div class="subpage-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import imdbVideo from "../components/imdbVideo";
const request = require("axios");
const cheerio = require("cheerio");
export default {
  components: {
    imdbVideo
  },
  data() {
    return {
      value: "",
      rating_num: 7.0,
      rating: 8.2,
      cateye: 8.0,
      maoyanproData: [],
      doubanData: []
    };
  },
  methods: {
    searchcat: function(value) {
      let entry = async function(key) {
        let url = `https://piaofang.maoyan.com/search?key=${encodeURIComponent(
          key
        )}`;
        const page = await request.get(url);
        const $ = cheerio.load(page.data);
        let movielist = [];
        let patter = new RegExp(`(${key})+(?!\\d)`, "g");
        let nodeLength = $("#search-list .indentInner").length;
        console.log("node length: " + nodeLength);
        $("#search-list .indentInner").each((i, e) => {
          let dataUrl = $(e).attr("data-url");
          let title = $(e)
            .find(".title")
            .text();
          let gotmatch = title.match(patter);
          console.log(gotmatch);
          if (gotmatch) {
            title = gotmatch[0];
            movielist.push({ title, dataUrl });
          } else if (nodeLength == 1) {
            movielist.push({ title, dataUrl });
          }
        });
        console.log(movielist);
        return movielist[0];
      };
      let getData = async function(links) {
        const page = await request.get(`https://piaofang.maoyan.com${links}`);
        const $ = cheerio.load(page.data);
        let coverlink = $(".info-poster img").attr("src");
        let cover = `https:${coverlink.match(/.*\.jpg/)}`;
        let title = $(".info-title .info-title-content").text();
        let category = $(".info-category")
          .text()
          .trim();
        let duration = $(".info-source-duration span").text();
        let release = $(".info-release .score-info").text();
        let rating_num = $(".rating-stars .rating-num").text();
        let detail_score_count = $(".score-detail .detail-score-count").text();
        let detail_wish_count = $(".score-detail .detail-wish-count").text();
        let imdb_num = $(".NAmerican-show .item p")
          .eq(1)
          .text();
        return {
          title,
          cover,
          duration,
          category,
          release,
          rating_num,
          detail_score_count,
          detail_wish_count,
          imdb_num
        };
      };
      let fetchData = async function(value) {
        const links = await entry(value);
        const data = await getData(links.dataUrl);
        return data;
      };
      fetchData(value)
        .then(e => {
          console.log("猫眼电影专业版数据来源");
          console.log(e);
          this.maoyanproData = e;
        })
        .catch(e => console.log(e));
    },
    searchdou: function(value) {
      let getMovieUrl = async function(key) {
        // 入口应该是用户查寻信息
        let url = `https://movie.douban.com/j/subject_suggest?q=${encodeURIComponent(
          key
        )}`;
        const ajaxData = await request.get(url);
        let data = ajaxData.data;
        let patter = new RegExp(`(${key})+(?!\\d)`, "g");
        let movielist = [];
        data.forEach(e => {
          let gotmatch = e.title.match(patter);
          if (gotmatch) {
            movielist.push(e);
          }
        });
        let movieUrl = movielist[0].url;
        let movieCover = movielist[0].img;
        let subtitle = movielist[0].sub_title;
        return {
          movieUrl,
          movieCover,
          subtitle
        };
      };
      // // 拿到 AJAX 数据并且找到需要的页面
      let getInfo = async function(url, cover, subtitle) {
        const page = await request.get(url);
        const $ = cheerio.load(page.data);
        let comments = [];
        $("#hot-comments .comment-item").each((i, e) => {
          let short = $(e)
            .find(".comment .short")
            .text();
          let full = $(e)
            .find(".comment .full")
            .text();
          if (full) {
            comments[i] = { id: i, full };
          } else {
            comments[i] = { id: i, short };
          }
        });
        let title = $("#content h1").text();
        let rating = $("#interest_sectl .rating_self strong").text();
        let rating_people = $(
          "#interest_sectl .rating_self .rating_people span"
        ).text();
        let better_than = $("#interest_sectl .rating_betterthan a").text();
        let reportA = $("#link-report .all").text();
        let reportB = $("#link-report span").text();
        let report;
        reportA == "" ? (report = reportB) : (report = reportA);
        let imdb = $("#info a")
          .eq(-1)
          .attr("href");
        const doubaninfo = {
          title,
          rating,
          rating_people: parseFloat(rating_people),
          better_than,
          report,
          imdb, //imdb的链接
          cover,
          subtitle,
          comments
        };
        console.log(doubaninfo.imdb);
        return doubaninfo;
      };
      let fetchData = async function(key) {
        const links = await getMovieUrl(key);
        const data = await getInfo(
          links.movieUrl,
          links.movieCover,
          links.subtitle
        );
        return data;
      };
      fetchData(value)
        .then(e => {
          console.log("豆瓣数据来源 ↓");
          console.log(e);
          this.doubanData = e;
        })
        .catch(e => console.log(e));
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/colors.less");
#comments {
  padding-top: 1rem;
  .search-box {
    box-shadow: @depth1;
    z-index: 9999;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: @default-color;
    background-color: #03a9f4;
    border-radius: 40px;
    padding: 5px;
  }
  .search-box:hover > .search-text {
    margin-left: 20px;
    width: 200px;
  }
  .search-box:hover > .search-btn {
    scale: (0.9);
    background-color: #fff;
    color: #000;
  }
  .search-btn {
    transition: 0.3s;
    text-decoration: none;
    color: #fff;
    width: 40px;
    height: 40px;
    float: right;
    border-radius: 50%;
    background-color: #03a9f4;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .search-text {
    color: #fff;
    border: none;
    background: none;
    outline: none;
    float: left;
    padding: 0;
    font-size: 16px;
    transition: 0.3s;
    width: 0;
    line-height: 40px;
    &::-webkit-input-placeholder {
      color: #fff;
    }
  }
  .info-container {
    margin: 0 auto;
    width: 95%;
    .img-wrapper {
      width: 300px;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        top: -100px;
        box-shadow: @depth3;
        border-radius: 5px;
      }
    }
    .infos {
      margin-left: 310px;
      padding-left: 46px;
      min-height: 330px;
      .title {
        padding: 55px 0 40px 0;
        font-size: 34px;
        color: @font-dark;
        .subtitle {
          font-size: 24px;
          margin-left: 1rem;
        }
      }
      .more-about {
        margin-bottom: 2rem;
        span {
          font-size: 17px;
          padding-right: 40px;
          color: @font-dark;
          .ivu-icon-md-calendar {
            vertical-align: baseline;
          }
        }
      }
      .report {
        line-height: 1.8;
        padding-bottom: 1rem;
      }
    }
    .ratings {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 2rem 0;
      width: 100%;
      .rating-group {
        display: flex;
        align-items: center;
        & > * {
          margin-right: 20px;
        }
        img {
          width: 40px;
          height: 40px;
        }
        .rate-num {
          color: #000;
          font-size: 30px;
        }
        .rate-people {
          font-size: 16px;
        }
        .want-to {
          font-size: 17px;
        }
      }
    }
    .ivu-menu-horizontal {
      background: @bg-color;
    }
  }
}
</style>
