<template>
  <div id="comments">
    <div class="search-box">
      <input class="search-text" v-model="value" @keyup.enter="onSubmit" placeholder="搜索喜爱电影....">
      <div class="search-btn">
        <Icon type="md-search" size="20"/>
      </div>
    </div>
    <div v-if="getDoubanData">
      <imdbVideo></imdbVideo>
      <div class="info-container">
        <div class="img-wrapper">
          <img :src="getMaoyanData.cover" alt>
        </div>
        <div class="infos">
          <div class="title">
            {{getMaoyanData.title}}
            <span class="subtitle">{{getDoubanData.subtitle}}</span>
          </div>
          <div class="more-about">
            <span>{{getMaoyanData.duration}}</span>
            <span>{{getMaoyanData.category}}</span>
            <span>
              <Icon type="md-calendar"/>
              {{getMaoyanData.release}}
            </span>
          </div>
          <div class="report">{{getDoubanData.report}}</div>
        </div>
        <div class="ratings">
          <span class="rating-group">
            <img src="../assets/svgs/douban.svg" alt>
            <span class="rate-num">{{getDoubanData.rating}}</span>
            <span class="rate-people">{{getDoubanData.rating_people}}人参与评分</span>
          </span>
          <span class="rating-group">
            <img src="../assets/svgs/icon_24-猫眼电影.svg" alt>
            <span class="rate-num">{{getMaoyanData.rating_num}}</span>
            <span class="rate-people">{{getMaoyanData.detail_score_count}}</span>
          </span>
          <span class="rating-group">
            <img src="../assets/svgs/imdb.svg" alt>
            <span class="rate-num">{{getMaoyanData.imdb_num}}</span>
          </span>
          <span class="rating-group">
            <img src="../assets/svgs/star.svg" alt>
            <span class="want-to">{{getMaoyanData.detail_wish_count}}</span>
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
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
    <div v-else class="pre-spin-container">
      <Spin fix size="large"></Spin>
      <h1 class="pre-title">搜索电影吧！</h1>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import imdbVideo from "../components/imdbVideo";
export default {
  data() {
    return {
      value: ""
    };
  },
  components: {
    imdbVideo
  },
  methods: {
    ...mapActions(["onSearchDouban", "onSearchMaoyan", "onSearchBiliBili"]),
    onSubmit() {
      // 调用 action中search方法
      this.onSearchDouban(this.value);
      this.onSearchMaoyan(this.value);
      this.onSearchBiliBili(this.value);
      // 最后清空value
      this.value = "";
    }
  },
  computed: {
    ...mapGetters(["getDoubanData", "getMaoyanData"]) //召唤豆瓣数据
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/colors.less");
#comments {
  padding-top: 1rem;
  .pre-spin-container {
    height: 100vh;
    .pre-title {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-38%, -50%);
    }
  }
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
      z-index: 99;
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
      min-height: 380px;
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
