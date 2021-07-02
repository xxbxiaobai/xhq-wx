<template>
  <div class="">
    <van-cell-group
      v-for="item in listconten"
      :key="item.key"
      @click="Persdetails(item.idCardNo)"
    >
      <van-cell title="姓名" :label="item.username">
        <!-- <van-cell   slot="default"> 你好吗</van-cell>
  <van-cell   slot="default"> w好吗</van-cell> -->
        <div class="listRight">
          <div style="text-align: left; color: #666;font-size: 12px;">
            <span>身份证号</span>
          </div>
          <img
            :src="listimg"
            alt=""
            style="float: right; margin-top: -6px; width: 8px;"
          />
          <div
            style="text-align: left;font-weight: bolder;color: #000;font-size: 14px;"
          >
            <span>{{ item.idCardNo }}</span>
          </div>
        </div>
      </van-cell>
      <!-- <div> -->

      <!-- </div> -->
    </van-cell-group>
    <center
      style="text-align: -moz-center;position: absolute; bottom: 160px; width: 100%;"
    >
      <van-button
        style="background-color: #28CFB3; border: 0; margin-top: 10px; font-size: 16px; width: 230px; height: 40px;"
        type="info"
        round
        block
        @click="addperson"
      >
        添加人员
      </van-button>
    </center>
    <center
      style="text-align: -moz-center;position: absolute; bottom: 110px; width: 100%;"
    >
      <van-button
        style="background-color: red; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
        type="info"
        round
        block
        @click="UnbundlingWeChat"
      >
        解绑微信
      </van-button>
    </center>
    <center
      style="text-align: -moz-center;position: absolute; bottom: 60px; width: 100%;"
    >
      <van-button
        style="background-color: #0061ED; border: 0; margin-top: 30px; font-size: 16px; width: 230px; height: 40px;"
        type="info"
        round
        block
        @click="TechnicalSupport"
      >
        技术支持
      </van-button>
    </center>
        <!-- <center
      style="text-align: -moz-center;position: absolute; bottom: 210px; width: 100%;"
    >
    <div class="prompt_text">*非浙江户口请在工作日08:00~18:00注册及修改信息</div>
    </center> -->
    <van-tabbar route>
      <van-tabbar-item replace to="/personList" icon="friends-o">
        人员列表
      </van-tabbar-item>
       <van-tabbar-item replace to="/perMap" icon="location-o">
        地图
      </van-tabbar-item>
      <van-tabbar-item replace to="/DataStatistics" icon="chart-trending-o">
        数据统计
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {
  Image as VanImage,
  Field,
  Button,
  Cell,
  CellGroup,
  Toast,
  Tabbar,
  TabbarItem,
  Dialog
} from 'vant'
import domain from '../../domain.js'
export default {
  components: {
    [VanImage.name]: VanImage,
    [Field.name]: Field,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Toast.name]: Toast,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Dialog.name]: Dialog
  },

  data() {
    return {
      //   title: '赛事活动',
      listconten: [],
      phone: '',
      listimg: require('../../assets/icon_more@2x.png')
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
    DataRequest(phone) {
      // alert(111111111111);
      Toast.loading({
        message: '请稍等...',
        forbidClick: true,
        duration: 0
      })
      // 测试测试
      this.$axios
        .get(
          domain.testUrl +
            'api-movement/movement/api/school/card/page?mobile=' +
            phone,
          {
            headers: {
              'front-token': localStorage.getItem('apitoken')
            }
          }
        )
        .then(response => {
          console.log(response.data)
          // alert(JSON.stringify(response))
          // eslint-disable-next-line eqeqeq
          if (response.data.code == 0) {
            // 取消等待
            Toast.clear()
            this.count = response.data.data.length
            response.data.data.forEach(item => {
              this.listconten.push(item)
            })
          }
        })
        .catch(function(error) {
          console.log(error)
          // 取消等待
          Toast.clear()
          // alert(JSON.stringify(error))
        })
    },
    Persdetails(idCardNo) {
      this.$router.push({
        path: '/persondetails',
        name: 'persondetails',
        query: {
          idCardNo: idCardNo,
          phone: this.phone
        }
      })
    },
    addperson() {
      this.$router.push({
        path: '/PersonInfo',
        name: 'PersonInfo',
        query: {
          phone: this.phone
        }
      })
    },
    UnbundlingWeChat() {
      Dialog.confirm({
        title: '提示',
        message: '确定要解绑微信吗？'
      })
        .then(() => {
          // on confirm
          this.getUnbWeChat()
        })
        .catch(() => {
          // on cancel
        })
    },
    // 技术支持
    TechnicalSupport() {
      this.$router.push({
        path: '/Techical',
        name: 'Techical'
      })
    },
    getUnbWeChat() {
      var openid = localStorage.getItem('openid')
      // 测试测试
      this.$axios
        .get(
          domain.testUrl + 'api-movement/map/api/user/exit?openid=' + openid,
          {
            headers: {
              'front-token': localStorage.getItem('apitoken')
            }
          }
        )
        .then(response => {
          console.log(response.data)
          // eslint-disable-next-line eqeqeq
          if (response.data.code == 0) {
            // alert('11111111');
            // 清空存储内容
            localStorage.removeItem('phone')
            this.$router.push({
              path: '/',
              name: 'index',
              query: {
                phone: this.phone
              }
            })
          } else {
            Toast.fail('解绑失败')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  mounted() {
    // this.title = '个人信息'
    // this.RightText = '提交'
    // this.phone = this.$route.query.phone
    // 备注备注
    // localStorage.setItem('phone', '15839263540');
    // localStorage.setItem('apitoken', 'ad26e414-dfce-4763-8efb-12e6d7e37991')
    // localStorage.setItem('openid', 'oHpRbs7-k77iPeIbL6GgXgT97iq0');
    // alert(phone)
    // eslint-disable-next-line no-undef
    this.phone = localStorage.getItem('phone');
    // alert(this.phone)
    this.DataRequest(this.phone);
  }
  //   beforeCreate() {
  //     document.querySelector('body').setAttribute('style', 'background:#F6FAFD')
  //   },
  //   beforeDestroy() {
  //     document.querySelector('body').setAttribute('style', '')
  //   }
}
</script>

<style lang="less">
body {
  width: 100%;
  height: 100%;
  //   position: relative;
  background-color: #f6fafd;
}
.van-cell__title {
  text-align: left;
  color: #666;
  font-size: 12px;
  margin-right: -80px;
}
.van-cell__label {
  font-weight: bolder;
  color: #000;
  font-size: 14px;
}

.van-cell-group {
  margin: 10px;
  border-radius: 5px;
}
.prompt_text {
  font-size: 12px;
  color: red;
}
</style>
