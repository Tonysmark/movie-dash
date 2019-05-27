<template>
  <div id="comming">
    <h1>即将上映</h1>
    <Timeline>
      <TimelineItem v-for="item in comingData" :key="item.title">
        <div class="timeline-tag">{{item.releaseDate}}</div>
        <div class="card">
          <div class="img-wrapper">
            <img :src="item.imgsrc" alt>
          </div>
          <div class="card-content">
            <div class="title">{{item.title}}</div>
            <div class="type">
              <div>上映地区：{{item.country}}</div>
              <div>类型： {{item.type}}</div>
            </div>
            <div class="button-group">
              <div class="like">
                <Icon type="md-heart" color="#dd182b" size="20"/>
                {{item.want_to}}
              </div>
              <TralierBtn style="float:right" :movieId="item.id"></TralierBtn>
            </div>
          </div>
        </div>
      </TimelineItem>
    </Timeline>
  </div>
</template>
<script>
import TralierBtn from "../components/TraliersBtn";
import requests from "superagent";
import cheerio from "cheerio";
export default {
  data() {
    return {
      comingData: []
    };
  },
  methods: {},
  components: {
    TralierBtn
  },
  activated() {
    requests
      .get("https://movie.douban.com/cinema/later/qingdao/")
      .then(res => {
        const $ = cheerio.load(res.text);
        let data = [];
        $("#showing-soon .item").each((i, e) => {
          let imgsrc = $(e)
            .find(".thumb img")
            .attr("src");
          let title = $(e)
            .find(".intro h3 a")
            .text();
          let releaseDate = $(e)
            .find(".intro ul li")
            .eq(0)
            .text();
          let type = $(e)
            .find(".intro ul li")
            .eq(1)
            .text();
          let country = $(e)
            .find(".intro ul li")
            .eq(2)
            .text();
          let want_to = $(e)
            .find(".intro ul .last span")
            .text();
          let id = $(e)
            .find(".thumb")
            .attr("href");
          data.push({
            id: id.match(/\d+/)[0],
            imgsrc,
            title,
            releaseDate,
            type,
            country,
            want_to
          });
        });
        this.comingData = data;
        console.log(this.comingData);
      })
      .catch(e => console.log(e));
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/style/colors.less");
#comming {
  background-color: @bg-color;
  h1 {
    margin-bottom: 2rem;
  }
  ul.ivu-timeline {
    margin-left: 14rem;
    .ivu-timeline-item {
      padding-bottom: 2rem;
      .timeline-tag {
        position: absolute;
        top: 35%;
        left: -200px;
        padding: 10px 60px;
        background-color: #a6aaa9;
        color: #fff;
        font-size: 15px;
      }
      .ivu-timeline-item-content {
        .card {
          background-color: #fff;
          width: 650px;
          transition: 0.3s;
          display: flex;
          flex-direction: row;
          &:hover {
            box-shadow: @card-timeline-shadow;
            img {
              scale: (1.1);
            }
          }
          .img-wrapper {
            height: 190px;
            overflow: hidden;
            img {
              transition: 0.3s;
              width: 100%;
            }
          }
          .card-content {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            .title {
              padding: 2px 40px 0 40px;
              font-size: 20px;
              color: @font-dark;
              border-bottom: 1px solid #eee;
            }
            .type {
              padding: 25px 40px;
              div {
                font-size: 14px;
              }
            }
            .button-group {
              padding: 2px 40px 10px 40px;
              .like {
                font-size: 14px;
                display: inline;
                .ivu-icon-md-heart {
                  margin-right: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
