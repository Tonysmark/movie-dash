<template>
  <div id="about">
    <div class="content">
      <header>
        <img src="../assets/svgs/electron.svg" alt>
        <div class="width">+</div>
        <img src="../assets/svgs/Vue.svg" alt>
      </header>
      <h1>基于Electron-Vue的电影聚合平台</h1>
      <h2>
        <Icon type="logo-github"/>访问我的GitHub地址
        <a>https://github.com/tonysmark</a>
      </h2>
    </div>
  </div>
</template>
<script>
export default {
  name: "about"
};
</script>
<style lang="less" scoped>
#about {
  height: 100vh;
  // margin-top: 100px;
  text-align: center;
  .content {
    position: absolute;
    top: 47%;
    left: 56%;
    transform: translate(-50%, -50%);
  }
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    .width {
      font-size: 70px;
    }
    img {
      padding: 10px;
      width: 100px;
    }
  }
  h2 {
    padding: 20px 0;
  }
}
</style>
