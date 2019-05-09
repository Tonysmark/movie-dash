<template>
  <div class="content">
    <div class="user-head">
      <img src="../assets/img/52i27wxkyo2xoryw9kp2rx834.jpg" alt>
    </div>
    <div class="user-name">
      <Dropdown trigger="click">
        <a href="javascript:void(0)">
          Tony Smark
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>
            <router-link to="/login">登录</router-link>
          </DropdownItem>
          <DropdownItem>
            <router-link to="/register">注册</router-link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.content {
  text-align: center;
  .user-head img {
    cursor: pointer;
    position: relative;
    margin-top: 3rem;
    width: 100px;
    border-radius: 50%;
    filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16));
  }
  .user-name {
    margin-top: 1rem;
  }
}
</style>
