<template>
  <div v-if="isShow" class="backgro">
    <van-image width="100%" height="200" :src="Bgimage" />

    <div class="logoWin" style="margin-top: -20px; border-radius: 10px;">
      <div class="van-ellipsis">验证码登录</div>
      <div class="Phoneorigin" style="">
        <div class="Phonelabel">手机号</div>
      </div>
      <van-field
        v-model="phone"
        center
        clearable
        label=""
        placeholder="请输入手机号"
      >
        <template #button>
          <van-button
            size="small"
            type="primary"
            @click="SendVerificationCode"
            :disabled="!disabledCodeBtn"
            >{{ codeText }}</van-button
          >
        </template>
      </van-field>
      <div class="TheDivider"></div>

      <div class="Paworigin" style=""><div class="Phonelabel">验证码</div></div>
      <van-field
        v-model="password"
        center
        clearable
        label=""
        placeholder="请输入验证码"
      >
        <!-- <template #button>
    <van-button size="small" type="primary">发送验证码</van-button>
  </template> -->
      </van-field>
      <div class="TheDivider" style=""></div>
      <van-button round type="info" @click="TheLoginAction">登录</van-button>
    </div>
  </div>
</template>

<script>
// import NavBar from '@/components/NavBar/Navbar'
import { Image as VanImage, Field, Button, Toast } from 'vant'
import Qs from 'qs'
import domain from '../../domain.js'

export default {
  components: {
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [Button.name]: Button,
    [Toast.name]: Toast
  },

  data() {
    return {
      //   title: '赛事活动',
      password: '',
      phone: '',
      Bgimage: require('../../assets/hbg.png'),
      code: '',
      codeText: '发送验证码',
      disabledCodeBtn: true,
      msg: '',
      openId: '',
      wxPhone: '',
      isShow: true
    }
  },
  // 计算属性
  computed: {
    // submitBarText() {
    //   const count = this.checkedGoods.length;
    //   return '结算' + (count ? `(${count})` : '');
    // },
    // totalPrice() {
    //   return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0);
    // }
  },
  // 函数要在这个方法下面添加
  methods: {
    // 发送验证码
    SendVerificationCode() {
      if (this.phone === '') {
        Toast('手机号不能为空')
        return
      }
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,
        duration: 0
      })
      this.$axios
        .post(domain.testUrl + 'api-movement/map/api/user/sendLoginCode?mobile=' + this.phone, {
          // headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          // data: { // 这里是发送给后台的数据
          //   mobile: this.phone
          // }
        })
        .then(response => {
          console.log(response.data)
          // 取消等待
          Toast.clear()
          // eslint-disable-next-line eqeqeq
          if (response.data.code == 0) {
            // alert(response.data.code)
            Toast.success('发送成功')
            // this.msg = response.data.msg
            this.countDown(60)
          } else {
            Toast.success('发送失败')
          }
        })
        .catch(function(error) {
          console.log(error)
          // 取消等待
          Toast.clear()
        })
    },
    // 倒计时方法
    countDown(time) {
      if (time === 0) {
        this.disabledCodeBtn = true
        this.codeText = '发送验证码'
        return
      } else {
        this.disabledCodeBtn = false
        this.codeText = '(' + time + ')重新发送'
        time--
      }
      setTimeout(() => {
        this.countDown(time)
      }, 1000)
    },
    // 验证 验证码
    TheLoginAction() {
      if (this.password === '') {
        Toast('验证码不能为空')
        return
      }
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,
        duration: 0
      })
      // alert(this.password + '-' + this.msg + '-' + this.phone + '-' + this.openId)
      this.$axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: domain.testUrl + 'api-movement/map/api/user/login',
        data: Qs.stringify({
          // 测试测试
          code: this.password,
          // msg: this.msg,
          mobile: this.phone,
          openid: this.openId
        })
      })
        .then(response => {
          // alert(response.data.code)
          // alert(response.data.code)
          console.log(response.data)
          // alert(response.data)
          // 取消等待
          Toast.clear()
          // eslint-disable-next-line eqeqeq
          if (response.data.code == 0) {
            localStorage.setItem('phone', this.phone)
            // alert('验证成功')
            this.$router.push({
              path: '/personList',
              name: 'personList'
            })
          } else {
            Toast(response.data.msg)
          }
        })
        .catch(function(error, XMLHttpRequest, textStatus, errorThrown) {
          console.log(error)
          // alert(error)
          // 取消等待
          Toast.clear()
          alert(error)
          alert(XMLHttpRequest.status)
          alert(XMLHttpRequest.readyState)
          alert(textStatus)
          alert(errorThrown)
        })
    },
    // 提交微信code
    SubmitTheWeChatCode() {
      this.$axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: 'post',
        url: domain.testUrl + 'api-movement/map/api/user/wxLogin',
        data: Qs.stringify({ code: this.code })
        // 测试测试
        // data: Qs.stringify({ code: '15839263540' })
      })
        .then(response => {
          console.log(response.data)
          if (response.data.code === 0) {
            this.openId = response.data.data.uid
            // alert(this.openId);
            this.wxPhone = response.data.data.mobile
            let token = response.data.data.token
            // alert(token);
            localStorage.setItem('openid', this.openId)
            localStorage.setItem('apitoken', token)
            if (
              this.wxPhone === '' ||
              this.wxPhone === null ||
              this.wxPhone.length === 0 ||
              this.wxPhone === 'null' ||
              this.wxPhone === '-1' ||
              this.wxPhone === -1
            ) {
              // 登录页是否出现
              this.isShow = true
            } else {
              localStorage.setItem('phone', this.wxPhone)
              this.$router.push({
                path: '/personList',
                name: 'personList'
              })
            }
          } else {
            Toast(response.data.msg)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },

    // 获取授权code
    GetUrlParam(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let url = window.location.href.split('#')[0]
      let search = url.split('?')[1]
      if (search) {
        var r = search.substr(0).match(reg)
        if (r !== null) return unescape(r[2])
        return null
      } else {
        return null
      }
    },
    // 获取微信openid
    getCode() {
       alert(window.location.href)
      const code = this.GetUrlParam('code'); // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
     
     const local = window.location.href
      // 正式
      // const appid = 'wx2a90fb869d9cd092'
      
      // 测试
      const appid = 'wx2f953b3dd99a129d'
      console.log(local)
      if (code === null || code === '') {
        window.location.href =
          'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
          appid +
          '&redirect_uri=' +
          encodeURIComponent(local) +
          '&response_type=code&scope=snsapi_base&state=#wechat_redirect'
      } else {
        this.code = code
        this.SubmitTheWeChatCode()
      }
    }
  },
  mounted() {},
  created() {
    this.openId = localStorage.getItem('openid')
    var phone = localStorage.getItem('phone')
    var token = localStorage.getItem('apitoken')
    if (this.openId && phone && token) {
      this.$router.push({
        path: '/personList',
        name: 'personList'
      })
    }
    // alert(this.openId);
    // alert(phone);
    // alert(token);
    // 测试测试
    // this.SubmitTheWeChatCode();
    if (!this.openId || !token) {
      // 获取微信code
      this.getCode()
    }
  },
  beforeCreate() {
    document.querySelector('body').setAttribute('style', 'background:#9AC590')
  },
  beforeDestroy() {
    document.querySelector('body').setAttribute('style', '')
  }
}
</script>

<style lang="less">
.logoWin {
  background-color: white;
  margin-left: 10px;
  margin-right: 10px;
}
.logoWin {
  height: 280px;
}
.Phoneorigin {
  display: list-item;
  list-style-type: disc;
  margin-left: 2em;
  color: #28cfb3;
}
.Phonelabel {
  text-align: left;
  color: black;
  font-weight: bolder;
  font-size: 14px;
}
.van-cell--center {
  padding-bottom: inherit;
  padding-top: inherit;
  margin-top: 5px;
}
.van-button--small {
  height: 26px;
  background-color: white;
  color: #009afc;
  border: 0;
}
.Paworigin {
  display: list-item;
  list-style-type: disc;
  margin-left: 2em;
  color: #28cfb3;
  margin-top: 25px;
}
.van-ellipsis {
  font-weight: bolder;
  padding-top: 25px;
}
.TheDivider {
  border: 0.5px solid #e7e7e7;
  margin-left: 15px;
  margin-right: 15px;
}
.van-button--round {
  height: 34px;
  width: 150px;
  margin-top: 35px;
}
</style>
