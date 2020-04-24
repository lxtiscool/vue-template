<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo" />
    </div>
    <div class="login-panel">
      <div class="banner"></div>
      <div class="form">
        <h4 v-if="error" class="tips"><i />{{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="el-icon-user-solid" />
        <el-input v-model="password" prefix-icon="el-icon-key" type="password" />
        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button
          v-loading="state.loginBtn"
          :disabled="state.loginBtn"
          class="btn-login"
          type="success"
          size="mini"
          @click="handleSubmit"
          >登录</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  data() {
    return {
      checked: '',
      username: '',
      password: '',
      error: '',
      state: {
        loginBtn: false
      }
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit() {
      this.state.loginBtn = true
      this.Login({
        username: encodeURIComponent(this.username),
        password: this.password
      })
        .then(res => this.loginSuccess(res))
        .catch(err => this.requestFailed(err))
        .finally(() => {
          this.state.loginBtn = false
        })
    },
    loginSuccess() {
      this.$router.push({ path: '/' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notify({
          title: '欢迎',
          message: `${timeFix()}，欢迎回来`,
          type: 'success'
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed(err) {
      this.isLoginError = true
      this.$notify.error({
        title: '错误',
        message: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.page-login {
  .login-header {
    position: relative;
    width: 980px;
    height: auto;
    margin: 40px auto 30px;
    .logo {
      // background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-retina.b95a7dd.png);
      background-position: 0 !important;
      background-size: contain !important;
      width: 82px;
      height: 54px;
      display: block;
    }
  }
  .login-panel {
    margin: 0 auto 70px;
    width: 980px;
    display: flex;
    .banner {
      margin-right: 115px;
    }
    .form {
      display: flex;
      flex-direction: column;
      width: 270px;
      .tips {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #f5d8a7;
        border-radius: 2px;
        background: #fff6db;
        font-size: 12px;
        padding-left: 26px;
        > i {
          position: relative;
          &:after {
            position: absolute;
            display: inline-block;
            width: 17px;
            height: 17px;
            font-family: iconfont;
            font-style: normal;
            content: '\e64d';
            font-size: 28px;
            top: -9px;
            left: -24px;
          }
        }
      }
      em {
        font-style: normal;
        float: right;
      }
    }
    .el-input {
      margin-top: 10px;
    }
    .foot {
      margin-top: 10px;
      b {
        float: right;
      }
    }
    .el-input__icon {
      &.profile {
        &:after {
          font-family: iconfont;
          content: '\e627';
          font-style: normal;
          top: -1px;
          left: 5px;
          position: absolute;
        }
      }
      &.password {
        &:after {
          font-family: iconfont;
          content: '\E600';
          font-style: normal;
          top: -1px;
          left: 3px;
          position: absolute;
          font-size: 18px;
        }
      }
    }
    .btn-login {
      margin-top: 10px;
      color: #fff;
      background-color: #2db3a6;
      border: none;
      padding: 12px 15px;
    }
  }
}
</style>
