<template>
  <div>
    <div class="center">
      <van-image round width="6rem" height="6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <div class="center lh">{{userName}}</div>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item title="个人信息" name="0" icon="manager-o">
        <van-list>
          <van-cell title="姓名：" :value="userName" />
          <van-cell title="职位：" :value="position" />
          <van-cell title="学院：" :value="college" />
        </van-list>
      </van-collapse-item>
      <van-collapse-item title="未读" name="1" icon="shop-o" :value="noRead">
        <van-list>
          <van-cell
            v-for="(item,index) in noReadList"
            :key="index"
            :title="item.title"
            @click="showDetail(item.num)"
          />
        </van-list>
      </van-collapse-item>
      <van-collapse-item title="已读" name="2" icon="shop-o" :value="read">
        <van-list>
          <van-cell
            v-for="(item,index) in readList"
            :key="index"
            :title="item.title"
            @click="showDetail(item.num)"
          />
        </van-list>
      </van-collapse-item>

        <van-list>
          <van-button type="danger" class="button" block round @click="outLog">退出登录</van-button>
        </van-list>
    </van-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: 0,
      userName: "",
      position: "",
      college: "",
      read: "",
      noRead: "",
      readDetail: "",
      noReadDetail: "",
      readList: "", //读了的列表
      noReadList: "" //未读的列表
    };
  },
  methods: {
    showDetail(e) {
      let urlParams = {
        path: "/DetailFromAbout", //要跳转的页面路径
        query: {
          num: e //要带的参数
        }
      };
      this.$router.push(urlParams);
    },
    outLog() {
      this.$router.push("/");
      this.common.id = "";
      this.common.userName = "";
    }
  },
  created() {
    this.$axios
      .get("/user/get/one", {
        params: {
          id: this.common.id
        }
      })
      .then(res => {
        this.userName = res.data.userName;
        this.position = res.data.position;
        this.college = res.data.college;
        this.read = res.data.read;
        this.noRead = res.data.noRead;
        this.readDetail = res.data.readDetail;
        this.noReadDetail = res.data.noReadDetail;

        //未读的
        this.$axios
          .get("/content/all", {
            params: {
              detail: this.noReadDetail
            }
          })
          .then(res => {
            this.noReadList = res.data;
          });

        //已读的
        this.$axios
          .get("/content/all", {
            params: {
              detail: this.readDetail
            }
          })
          .then(res => {
            this.readList = res.data;
          });
      });
  }
};
</script>
<style scoped>
.center {
  text-align: center;
  margin-top: 5px;
}
.lh {
  line-height: 50px;
  color: rgb(121, 121, 121);
  font-size: 20px;
}
.button {
  width: 50%;
  margin: 80px auto;
  height: 40px;
}
</style>