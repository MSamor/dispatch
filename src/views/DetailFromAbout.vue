<template>
  <transition name="van-slide-left">
    <div v-show="visiable">
      <van-nav-bar
        title="文章详情"
        left-text="返回"
        right-text="按钮"
        left-arrow
        class="title"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
      <div class="title-t" />
      <van-row>
        <van-col span="24" class="contentTitle">{{title}}</van-col>
        <van-col span="24" class="content">{{content}}</van-col>
      </van-row>
      <van-cell center title="未阅读">
        <van-switch v-model="checked" slot="right-icon" size="24" />
      </van-cell>
    </div>
  </transition>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      checked: false,
      visiable: false, //整个页面的动画
      title: "",
      content: "",
      read: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$emit("zi", true); //触发父组件的显示
      this.$router.push("/about");
    },
    onClickRight() {
      Toast("按钮");
    },
    //按钮
    onInput(checked) {
      this.checked = checked;
    }
  },
  mounted() {
    this.visiable = true;
    this.$emit("zi", false); //触发父组件的消失
    this.$axios
      .get("/content/one", {
        params: {
          readDetail: this.$route.query.num
        }
      })
      .then(res => {
        this.title = res.data.title;
        this.content = res.data.content;
      });
  }
};
</script>
<style scoped>
.title {
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
}
.title-t {
  height: 46px;
}
.contentTitle {
  text-align: center;
  font-size: 20px;
}
.content {
  padding: 15px;
}
</style>