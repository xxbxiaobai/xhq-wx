<template>
  <div>
        <!-- 轮播图 -->
        <Sowing :sowing_list="sowing_list" />
  </div>
</template>

<script>
// import { Swipe, SwipeItem, Image as VanImage } from 'vant'
// import Sowing from '@/components/NavBar/Sowing'
// import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    // [Lazyload.name]: Lazyload,
    // [Swipe.name]: Swipe,
    // [SwipeItem.name]: SwipeItem,
    // [VanImage.name]: VanImage
    // [Swiper.name]: Swiper,
    // [SwiperSlide.name]: SwiperSlide
  },

  data() {
    return {
      sowing_list: [{
        icon_url: 'https://img.yzcdn.cn/vant/apple-1.jpg'
      },
      {
        icon_url: 'https://img.yzcdn.cn/vant/apple-2.jpg'
      },
      {
        icon_url: 'https://img.yzcdn.cn/vant/apple-3.jpg'
      }] // 首页轮播图数据
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
    // 这里计算数据的长度，以此来判断是否显示，这个貌似要必写
    showSwiper () {
      return 3
    }
  },
  // 函数要在这个方法下面添加
  methods: {

  },
  mounted() {
    // this.title = '个人信息'
    // this.RightText = '提交'
  }
}
</script>

<style lang='scss' >
.container-swiper{
  width: 100%;
  height: 2.11rem;
  overflow: hidden;
}
.swiper-container{
  height: 2.11rem;
  width: 100%;
  margin: 0px auto;
}
.swiper-slide a{
  display: block;
}
.swiper-slide a img{
  width: 100%;
  height: 2.11rem;
}
.swiper-pagination{
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.swiper-pagination .my-bullet{
  border-radius: 50%;
  width: 4px;
  height: 4px;
  margin: 4px;
  background: #000000;
  display: block;
}
.swiper-pagination .my-bullet-active{
  display: block;
  background: #000000;
  width: 10px;
  height: 4px;
  border-radius: 2px;
}
</style>
