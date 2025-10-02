<template>
 <div>
  <van-nav-bar
  title="会员登录"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="content">
  <h1>手机号登录</h1>
  <span class="prompt">未注册的手机号登录后将自动注册</span>
  <van-cell-group>
    <van-field v-model="tel" placeholder="请输入手机号" />

    <van-field v-model="identifyImg" placeholder="请输入图形验证码">
      <template #button>
        <van-button class="image" :icon="identifyPic" @click="getPicCode"></van-button>
      </template>
    </van-field>

    <van-field v-model="identifyEmil" placeholder="请输入短信验证码">
      <template #button>
        <van-button v-if="unsend" ref="messageButton" size="small" type="primary" @click="sendMessage">获取验证码</van-button>
        <van-count-down
          v-else
          ref="countDown"
          :time="60000"
          format="重新发送（ss）"
          :auto-start="false"
          @finish="finish"
      />
      </template>
    </van-field>
  </van-cell-group>
  <div class="login"><van-button type="primary" size="large" round @click="login">登录</van-button></div>
</div>
 </div>
</template>

<script>
// import request from '@/utils/request'
import { getPicCode, getMessageCode, login } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      tel: '', // 用户手机号
      identifyImg: '', // 图片验证码
      identifyPic: '', // 图片url
      identifyKey: '', // 图片key
      identifyEmil: '', // 短信
      reg_tel: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, // 手机号正则
      reg_img: /^[A-Za-z0-9]{4}$/, // 图片验证码正则
      reg_message: /^\d{6}$/, // 短信正则
      unsend: true
    }
  },
  async created () {
    this.getPicCode()
  },
  methods: {
    async getPicCode () {
      const { data: { base64, key } } = await getPicCode()
      // console.log(res.data)
      this.identifyPic = base64
      this.identifyKey = key
    },
    vaildFn () {
      if (!this.reg_tel.test(this.tel)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!this.reg_img.test(this.identifyImg)) {
        this.$toast('请输入正确的验证码')
        return false
      }
      return true
    },
    async sendMessage () {
      if (this.vaildFn()) {
        this.$toast('短信验证码已发送，请注意查收')
        const res = await getMessageCode(
          {
            captchaCode: this.identifyPic,
            captchaKey: this.identifyKey,
            mobile: this.tel
          })
        // console.log(res)
        if (res.status === 200) this.identifyEmil = 246810
        this.unsend = false
        // ref只能选定渲染出来的dom，即将渲染出来的dom要加定时器延迟一下，才能操作这个dom
        setTimeout(() => { this.$refs.countDown.start() }, 0)
      }
    },
    finish () {
      this.$refs.countDown.reset()
      this.unsend = true
    },
    async login () {
      if (this.vaildFn && this.reg_message.test(this.identifyEmil)) {
        const res = await login({
          isParty: false,
          mobile: this.tel,
          partyData: {},
          smsCode: this.identifyEmil
        })
        // console.log(res.data)
        this.$store.commit('user/setUserInfo', res.data)
        this.$toast('登录成功')
        // 判断地址栏是否有回跳地址
        // 如果有 => 则需回跳
        // 没有   => 则跳回首页
        const url = this.$route.query.backUrl || '/'
        this.$router.replace(url)
      }
    },
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 74px 44px;
  h1 {
    font-size: 40px;
    font-weight: 400;
  }
  .prompt {
    color: #b3b3b3;
    font-size: 20px;
  }
  .image {
    margin: 0;
    padding: 0;
    // font-size: 44.01px;
    .van-icon__image {
      width: 100%;
      height: 41.26px;
    }
  }
  .van-count-down {
    color: #b3b3b3;
  }
  .login {
    margin:59px 0 0 0;
  }
}
</style>
