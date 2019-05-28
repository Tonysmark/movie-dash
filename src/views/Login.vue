<template>
  <div id="login">
    <Modal id="login-modal" v-model="loginModal" fullscreen>
      <div class="container" v-if="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="email">
            <Input type="text" v-model="formInline.email" placeholder="你的邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="你的密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" class="form-btn login-btn">登录</Button>
          </FormItem>
          <a class="form-btn" @click="onRegist">没有账号? 快来注册吧！</a>
        </Form>
      </div>
      <div class="container" v-else>
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="你的姓名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="email">
            <Input type="text" v-model="formInline.email" placeholder="邮箱">
              <Icon type="ios-mail-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="phone">
            <Input type="text" v-model="formInline.phone" placeholder="手机号码">
              <Icon type="ios-phone-portrait" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="你的密码">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="signIn('formInline')" class="form-btn login-btn">注册账户</Button>
            <a @click="onLogin">已有帐号？</a>
          </FormItem>
        </Form>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      login: true,
      loginModal: true,
      formInline: {
        user: "",
        email: "",
        password: "",
        phone: ""
      },
      ruleInline: {
        user: [
          {
            required: true,
            message: "必须有用户名！！",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号码也得有",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "输入邮箱",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不可以为空呦！",
            trigger: "blur"
          }
        ]
      }
    };
  },
  activated() {
    this.loginModal = true;
  },
  methods: {
    onRegist() {
      this.login = false;
    },
    onLogin() {
      this.login = true;
    },
    ...mapActions(["updateUser"]),
    async signIn() {
      const data = {
        name: this.formInline.user,
        email: this.formInline.email,
        phone: this.formInline.phone,
        password: this.formInline.password
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/users/register",
        data
      }).catch(err => {
        if (err.response.status == 500) {
          this.$Message.warning("用户已经注册过");
        }
      });
      if (response.status == 200) {
        this.$Message.success("注册成功");
        this.login = true;
      }
    },
    async handleSubmit(name) {
      const data = {
        email: this.formInline.email,
        password: this.formInline.password
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/users/login",
        data
      }).catch(err => {
        switch (err.response.status) {
          case 400:
            this.$Message.error("密码错误");
            break;
          case 404:
            this.$Message.warning("用户不存在");
            break;
        }
      });
      if (response.status == 200) {
        const token = response.data.token;
        console.log("token:" + token);
        this.updateUser(token);
        this.$Message.success("欢迎回来！");
        this.loginModal = false;
        this.$router.replace("/");
        localStorage.setItem("login", true);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../assets/style/colors.less");
#login {
  background-color: @bg-color;
  min-height: 100vh;
}
</style>

