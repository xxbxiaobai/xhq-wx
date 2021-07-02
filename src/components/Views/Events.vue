<template>
  <div>
       <!-- 3.在页面使用这个组件 -->
    <NavBar :title="title" :RightText="RightText" :LeftText="LeftText" :isleftarrow="isleftarrow"></NavBar>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item">
  <van-card
  num="进行中"
  price="2020.2.21~2020.3.19"
  desc="绍兴市xx街道xx路"
  title="2019年 北京市某某某杯健美操锦标赛"
  thumb="https://img.yzcdn.cn/vant/cat.jpeg"
>
<div class="van-ellipsis" slot="price">2020.2.21~2020.3.19</div>
<div class="van-ellipsis" slot="num">进行中</div>
  </van-card>
    </van-cell>
  </van-list>
</van-pull-refresh>
    </div>
</template>

<script>
// import NavBar from '@/components/NavBar/Navbar'
// import { List, PullRefresh, Cell, Card } from 'vant'

export default {
  components: {
    // [List.name]: List,
    // [PullRefresh.name]: PullRefresh,
    // [Cell.name]: Cell,
    // [Card.name]: Card
  },

  data() {
    return {
      title: '赛事活动',
      RightText: '',
      LeftText: '',
      isleftarrow: true,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
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
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          alert(111111111);
          this.list = [];
          this.refreshing = false;
        }
        if (this.refreshing) {
          alert(55555555);
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        this.loading = false;

        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    onRefresh() {
      // alert(22222222);
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    }
  },
  mounted() {
    // this.title = '个人信息'
    // this.RightText = '提交'
  }
}
</script>

<style lang="less">
.van-card__desc{
padding-top: 25px;
font-size: 11px;
color: #999999;
}
.van-card__title{
font-size: 13px;
color: #464646;
}
.van-card__price{
font-size: 11px;
color: #999999;
}
.van-card__num{
font-size: 10px;
color: #00E3AA;
}
.van-card__thumb{
width: 120px;
height: 90px;
}
.van-card{
padding: 0px;
}
</style>
