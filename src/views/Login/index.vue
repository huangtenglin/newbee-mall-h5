<template>
  <div class="login">
    <Header :title="formData.type == 'login' ? '登录' : '注册'" :back="'/home'"></Header>
    <img
      class="logo"
      src="https://s.yezgea02.com/1604045825972/newbee-mall-vue3-app-logo.png"
      alt=""
    />
    <div v-if="formData.type === 'login'" class="login-body login">
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
          v-model="formData.username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
          <van-field
            v-model="formData.imgCode"
            center
            clearable
            label="验证码"
            placeholder="输入验证码"
            :rules="[{ validator: checkImageCodeRules }]"
          >
            <template #button>
              <VueImageVerify ref="verifyRef" />
            </template>
          </van-field>
        </van-cell-group>
        <div style="margin: 16px">
          <div class="link-register" @click="toggle('register')">立即注册</div>
          <van-button round block color="#1baeae" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div v-else class="login-body register">
      <van-form @submit="onSubmit">
        <van-field
          v-model="formData.username1"
          name="username1"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="formData.password1"
          type="password"
          name="password1"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          center
          clearable
          label="验证码"
          placeholder="输入验证码"
          v-model="formData.verify"
        >
          <template #button>
            <VueImageVerify ref="verifyRef" />
          </template>
        </van-field>
        <div style="margin: 16px">
          <div class="link-login" @click="toggle('login')">已有登录账号</div>
          <van-button round block color="#1baeae" native-type="submit"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue"
import { ref, reactive } from "vue"
import VueImageVerify from "@/components/VueImageVerify.vue"
import { login, register } from "@/service/index.js"
import { setLocal } from "@/common/js/utils.js"
import md5 from "js-md5"
import { showSuccessToast, showFailToast } from "vant"
let type = ref("login")

const verifyRef = ref(null)

const formData = reactive({
  username: "",
  password: "",
  username1: "",
  password1: "",
  type: "login",
  imgCode: "",
  verify: "",
})

const checkImageCodeRules = () => {
  if (!formData.imgCode) {
    return "请输入验证码"
  }
  let imgCode = localStorage.getItem("imgCode")
  // 忽略大小写
  if (imgCode && imgCode.toLowerCase() !== formData.imgCode.toLowerCase()) {
    return "请输入正确的验证码"
  }
  return true // 表示验证通过
}
const onSubmit = async (values) => {
  // 根据type的值来判断登录或者注册
  if (formData.type == "login") {
    const { data } = await login({
      "loginName": values.username,
      "passwordMd5": md5(values.password),
    })
    setLocal("token", data)
    // 需要刷新页面，否则 axios.js 文件里的 token 不会被重置
    window.location.href = "/"
  } else {
    try {
      await register({
        "loginName": values.username1,
        "password": values.password1,
      })
      showSuccessToast("注册成功")
      formData.type = "login"
      formData.verify = ""
    } catch (error) {
      console.log(error, "htl->测试错误信息")
    }
  }
}

const toggle = (type) => {
  formData.type = type
  formData.imgCode = ""
}
</script>

<style lang="less" scoped>
::v-deep(.van-field__label) {
  width: 60px;
}

.login {
  .logo {
    width: 120px;
    height: 120px;
    display: block;
    margin: 80px auto 20px;
  }

  .login-body {
    padding: 0 20px;
  }

  .login {
    .link-register {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
      margin-left: 16px;
    }
  }

  .register {
    .link-login {
      font-size: 14px;
      margin-bottom: 20px;
      color: #1989fa;
      display: inline-block;
    }
  }

  .verify-bar-area {
    margin-top: 24px;

    .verify-left-bar {
      border-color: #1baeae;
    }

    .verify-move-block {
      background-color: #1baeae;
      color: #fff;
    }
  }

  .verify {
    > div {
      width: 100%;
    }

    display: flex;
    justify-content: center;

    .cerify-code-panel {
      margin-top: 16px;
    }

    .verify-code {
      width: 40% !important;
      float: left !important;
    }

    .verify-code-area {
      float: left !important;
      width: 54% !important;
      margin-left: 14px !important;

      .varify-input-code {
        width: 90px;
        height: 38px !important;
        border: 1px solid #e9e9e9;
        padding-left: 10px;
        font-size: 16px;
      }

      .verify-change-area {
        line-height: 44px;
      }
    }
  }
}
</style>
