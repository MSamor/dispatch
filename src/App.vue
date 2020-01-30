<template>
  <div id="app">
    <van-nav-bar 
    :title="title" 
    :left-text="back"
    class="title" 
    v-show="vis_show" 
   />
    <div class="title-t" v-show="vis_show"/>
    <div class="content">
      <router-view  @zi = "zi"></router-view>
    </div>
    <van-tabbar v-model="active" route v-show="vis_show">
      <van-tabbar-item icon="home-o" to="/index" @click="index()">主页</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/about" @click="me()">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title:"未读列表",
      active: 0,
      back:"",
      vis_show:true
    }
  },
   methods: {
      index() {
        this.title = '文章列表';
      },
      me() {
        this.title = '我的';
      },
      zi(data) {
        this.vis_show = data;//子组件的false
      }
  }
};
</script>
<style scoped>
#app {
  height: calc(100%);
}
.content {
  /* margin-top: 46px; */
  margin-bottom: 50px;
}
.title {
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
}
.title-t {
  height: 46px;
}
</style>
