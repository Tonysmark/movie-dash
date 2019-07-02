<template>
  <div id="subComments">
    <h2>最新短评论</h2>
    <div class="review-container">
      <div
        class="content"
        v-for="item in getDoubanData.comments"
        :key="item.id"
      >{{ item.short==null?item.full:item.short }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getDoubanData"]) //召唤豆瓣
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/colors.less");
#subComments {
  margin-top: 2rem;
  .content {
    margin: 2rem 0;
    padding: 3rem 2rem;
    box-shadow: @depth2;
    border-left: 2px solid @default-color;
    border-radius: 5px;
    transition: 0.3s;
    background-color: #fff;
    &:hover {
      box-shadow: @depth3;
    }
  }
}
</style>

