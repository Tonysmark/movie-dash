<template>
  <div id="app">
    <SideNav></SideNav>
    <WinControl></WinControl>
    <div class="main-view">
      <div class="container">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script>
import WinControl from "./components/WinControl";
import SideNav from "./components/SideNav";
export default {
  components: {
    WinControl,
    SideNav
  },
  created() {
    localStorage.setItem("login", false);
  }
};
</script>
<style lang="less">
@import url("./assets/style/login.less");
@import url("./assets/style/colors.less");
#app {
  .main-view {
    padding: 0 20px;
    margin-left: 240px;
    margin-top: 2rem;
    background-color: #fbf9fa;
    // Large devices (desktops, 992px and up)
    @media (min-width: 992px) and (max-width: 1199.98px) {
      .container {
        margin: 0 auto;
        width: 95%;
      }
    }
    @media (min-width: 1200px) and (max-width: 1599.98px) {
      .container {
        margin: 0 auto;
        width: 90%;
      }
    }
    // Extra large devices (large desktops, 1200px and up)
    @media (min-width: 1600px) {
      .container {
        margin: 0 auto;
        width: 85%;
      }
    }
  }
  #comming {
    .ivu-timeline-item-tail {
      border-left: 1px solid #707070;
      height: 180%;
    }
    .ivu-timeline-item-head {
      background-color: @bg-color;
      top: 35%;
    }
    .ivu-timeline-item-content {
      padding: 1px 1px 10px 34px;
    }
  }
}
#getTickets {
  width: 100%;
  height: 700px;
}
</style>
