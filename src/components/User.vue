<template>
  <div class="content">
    <div class="user-head">
      <img :src="userInfo.avatar" alt>
    </div>
    <div class="user-name">
      <Dropdown trigger="click">
        <a class="name">
          {{userInfo.name}}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem>
            <a @click="onLogOut">退出登录</a>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      userInfo: ""
    };
  },
  computed: {
    ...mapGetters(["getToken"])
  },
  watch: {
    getToken: async function(getToken) {
      const response = await axios({
        method: "get",
        url: "http://localhost:5000/api/users/current",
        headers: {
          Authorization: getToken
        }
      });
      console.log(this.userInfo);
      this.userInfo = response.data;
    }
  },
  methods: {
    onLogOut() {
      localStorage.clear();
      this.$router.replace("/login");
    }
  }
};
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
    .name {
      margin-left: 15px;
      font-size: 16px;
      color: #444;
      // letter-spacing: 2px;
    }
    .ivu-dropdown-item a {
      color: #dd182b;
    }
  }
}
</style>
