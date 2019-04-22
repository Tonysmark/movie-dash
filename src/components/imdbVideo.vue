<template>
  <div class="video">
    <div class="video-container" v-if="getIMDBData">
      <video id="tralier-video" :src="getIMDBData" controls></video>
    </div>
    <div class="wait-video" v-else>
      <Spin size="large" fix></Spin>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getDoubanData", "getIMDBData"])
  },
  methods: {
    ...mapActions(["onSearchImdb"])
  },
  watch: {
    getDoubanData: async function(val) {
      let imdbLink = await val.imdb;
      console.log("imdbLink: " + imdbLink);
      this.onSearchImdb(imdbLink);
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
  width: 100%;
  display: inline-block;
  position: relative;
  overflow: hidden;
}
</style>
