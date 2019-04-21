<template>
  <div>
    <nav>
      <div class="app-title">电影推荐系统</div>
      <div class="control">
        <span @click="min">
          <Icon size="16" type="md-remove"/>
        </span>
        <span @click="max">
          <Icon  size="14" type="md-square-outline" />
        </span>
        <span @click="close">
          <Icon size="16" type="md-close"/>
        </span>
      </div>
    </nav>
  </div>
</template>
<script>
import {ipcRenderer} from "electron";
export default {
  methods: {
    min: () => {
      ipcRenderer.send("min");
    },
    max: () => {
      ipcRenderer.send("max");
    },
    close: () => {
      ipcRenderer.send("close");
    }
  }
};
</script>
<style lang="less" scoped>
@import url('../assets/style/colors.less');
nav {
  position: fixed;
  top:0;
  background-color: @bg-color;
  -webkit-app-region: drag;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  height: 34px;
  width: 100%;
  .app-title {
    padding-left: 20px;
    -moz-user-select: none;
    user-select: none;
  }
  .control {
    -webkit-app-region: no-drag;
    span {
      padding: 10px 16px;
      overflow: hidden;
      &:hover {
        background: #dd182b;
        color: #fff;
      }
    }
  }
}
</style>
