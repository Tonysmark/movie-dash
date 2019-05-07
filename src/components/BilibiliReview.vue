<template>
  <div id="BilibiliReview">
    <div class="video-container">
      <iframe
        :src="getBilibiliData[index]"
        scrolling="no"
        border="0"
        frameborder="no"
        framespacing="0"
        allowfullscreen="true"
      ></iframe>
    </div>
    <div class="btn-group">
      <div class="prev btn" @click="decrease">
        <Icon type="ios-arrow-dropleft" size="25"/>上一个
      </div>
      <div class="next btn" @click="increase">
        下一个
        <Icon type="ios-arrow-dropright" size="25"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      index: 0
    };
  },
  computed: {
    ...mapGetters(["getBilibiliData"]) // 召唤B站
  },
  methods: {
    decrease() {
      if (this.index > 0) {
        this.index--;
        console.log(this.index);
      }
    },
    increase() {
      if (this.index <= 20) {
        this.index++;
        console.log(this.index);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/colors.less");
#BilibiliReview {
  margin: 3rem auto 0 auto;
  padding-bottom: 5rem;
  .video-container {
    box-shadow: @depth1;
    width: 100%;
    height: 800px;
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
      user-select: none;
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
    .gray {
      background-color: #eee;
      color: #000;
    }
  }
}
</style>
