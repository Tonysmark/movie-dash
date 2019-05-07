<template>
  <div id="recommand">
    <h1>Top 推荐</h1>
    <Menu mode="horizontal" active-name="1">
      <MenuItem name="1">
        <Icon type="ios-paper"/>TOP10
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"/>动作类
      </MenuItem>
      <MenuItem name="4">
        <Icon type="ios-construct"/>科幻类
      </MenuItem>
      <MenuItem name="4">
        <Icon type="ios-construct"/>战争类
      </MenuItem>
    </Menu>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  mounted() {
    new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 170,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/style/colors.less");
#recommand {
  min-height: 100vh;
  .ivu-menu-light {
    background-color: @bg-color;
  }
  .swiper-container {
    width: 100%;
    padding-top: 7rem;
  }
  .swiper-slide {
    width: 300px;
    // height: 470px;
  }
}
</style>
