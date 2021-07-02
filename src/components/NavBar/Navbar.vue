<template>
  <!-- eslint-disable -->
  <div>
<van-nav-bar
  :title="title"
  :right-text="RightText"
  @click-left="onClickLeft"
  :click-right="onClickRight"
  :left-text="LeftText" 
  :left-arrow="isleftarrow"
/>
  </div>
  <!-- eslint-enable -->
</template>
import {NavBar} from 'vant';
<script>
import { NavBar } from 'vant';
export default {
  props: ['title', 'RightText', 'LeftText', 'isleftarrow', 'onClickRight'],
  components: {
    [NavBar.name]: NavBar
  },

  methods: {
    onClickLeft() {
      console.log('clicked left');
      // 点击左侧的按钮，返回上一页，实现回退的效果
      this.$router.go(-1);
    }
    // onClickRight() {
    //   console.log('22222222');
    //   alert('111111111');
    // }
  }
};
</script>

<style lang="less">

</style>
