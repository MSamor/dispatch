<template>
  <div class="bigDiv">
    <div class="title">登陆</div>
    <!-- 允许输入整数，调起数字键盘 -->
    <van-cell-group class="loginName">
      <van-field v-model="digit" border required type="digit" placeholder="账号" label="账号" />
    </van-cell-group>
    <!-- 密码输入框 -->
    <van-password-input
      :value="value"
      :info="info"
      :focused="showKeyboard"
      :error-info="errorInfo"
      @focus="showKeyboard = true"
    />
    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="onInput"
      @delete="onDelete"
      @blur="showKeyboard = false"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      digit: "", //账号
      show: true,
      value: "", //密码
      showKeyboard: false,
      errorInfo: '',
      info:'请输入账号密码'
    };
  },
  methods: {
    onClickLeft() {
      this.$emit("zi", true); //触发父组件的显示
      this.$router.push("/index");
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length === 6) {
        this.$axios.post(
          '/user/get',
          {
            id : this.digit,
            passWord : this.value
          }
        ).then((res)=>{
          window.console.log(res)
          if(res.data.msg == true){
            this.$emit("zi", true); //触发父组件的显示
            this.common.userName = res.data.userName;//用户名
            this.common.id = res.data.id;//用户id
            this.$router.push("/index");
          }else{
            this.errorInfo = '账号或密码错误';
          }
        })
      } else {
        this.errorInfo = '';
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    }
  },
  mounted() {
    this.$emit("zi", false); //触发父组件的消失
  }
};
</script>
<style scoped>
.bigDiv {
  height: 100vh;
}
.title {
  font-size: 24px;
  margin-top: 30%;
  text-align: center;
  margin-bottom: 10px;
}
.loginName {
  margin-bottom: 30px;
}
</style>