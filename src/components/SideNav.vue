<template>
  <!-- TODO: 怎么让侧栏可以收起来 -->
  <div id="side-nav">
    <Menu active-name="1">
      <User></User>
      <MenuGroup>
        <MenuItem name="1" to="/">
          <Icon size="20" type="md-videocam"/>正在热映
        </MenuItem>
        <MenuItem name="2" to="/comming">
          <Icon size="20" type="md-trending-up"/>即将上映
        </MenuItem>
        <MenuItem name="3" to="/comments">
          <Icon size="20" type="md-star-half"/>电影评分
        </MenuItem>
        <MenuItem name="4" to="/recommand">
          <Icon size="20" type="md-thumbs-up"/>TOP推荐
        </MenuItem>
        <MenuItem name="5" to="/about">
          <Icon size="20" type="md-alert"/>关于作者
        </MenuItem>
      </MenuGroup>
    </Menu>
  </div>
</template>
<script>
import User from "./User";
export default {
  name: "SdieNav",
  components: {
    User
  }
};
</script>
<style lang="less" scoped>
#side-nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999; //FIXME:
  .ivu-menu-vertical {
    &:after {
      width: 0;
    }
  }
  .ivu-menu-item-active:not(.ivu-menu-submenu) {
    background-color: #fff;
  }
  .ivu-menu-item-active.ivu-menu-item-selected::after {
    width: 0 !important;
  }
  .ivu-menu-item {
    padding: 20px 14px 20px 0;
    text-align: center;
  }
  .ivu-menu {
    height: 100vh;
    .ivu-menu-item i {
      margin-right: 10px;
    }
    .ivu-menu-item-active.ivu-menu-item-selected::before {
      content: "";
      display: block;
      width: 5px;
      position: absolute;
      top: 17px;
      bottom: 17px;
      left: 0;
      background: #2d8cf0;
    }
    .ivu-menu-item-group-title {
      font-size: 16px;
    }
  }
}
</style>
