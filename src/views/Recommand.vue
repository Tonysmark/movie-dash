<template>
  <div id="recommand">
    <h1>Top 推荐</h1>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
        <div
          class="swiper-slide"
          style="background-image:url(https://p0.meituan.net/moviemachine/f7d2ad70eb79d6d9b8a197713db9b8c41711752.jpg)"
        ></div>
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
        depth: 150,
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
#recommand {
  height: 100vh;
  .swiper-container {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 500px;
  }
}
</style>
