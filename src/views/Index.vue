<template>
  <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
    <div class="maxheight">
      <van-list v-model="loading" :finished="finished" finished-text="好像没有了耶" @load="onLoad">
        <van-card
          tag="鼎利学院"
          :desc="item.describe"
          :title="item.title"
          thumb="https://img.yzcdn.cn/vant/t-thirt.jpg"
          v-for="(item,index) in noReadList"
          :key="index"
          @click="detailById(item.num)"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{item.sendPerson}}</van-tag>
          </div>
        </van-card>
      </van-list>
    </div>
  </van-pull-refresh>
</template>

<script>
// import { Toast } from "vant";
export default {
  data() {
    return {
      count: 1,
      isLoading: false, //下拉刷新
      list: [],
      loading: false, //上拉加载状态
      finished: false, //数据全部加载完成
      noReadDetail: "", //这个是未读的数字列表
      noReadList: "", //这个是list
      total: ""
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      //上拉
      setTimeout(() => {
        //未读的
        this.$axios
          .get("/content/all/page", {
            params: {
              detail: this.noReadDetail,
              page: this.count + 1
            }
          })
          .then(res => {
            // window.console.log(res.data)

            this.isLoading = false;
            // 加载状态结束
            this.loading = false;
            // 数据全部加载完成
            if (this.noReadList.length >= this.total) {
              this.finished = true;
            }
            if (res.data[0] == null) {
              return;
            }
            this.count++;
            this.noReadList = this.noReadList.concat(res.data);
          });
      }, 1000);
    },
    onRefresh() {
      window.console.log("下拉");
      this.finished = true;
      this.count = 1;
      this.$axios
        .get("/user/get/one", {
          params: {
            id: this.common.id
          }
        })
        .then(res => {
          this.noReadDetail = res.data.noReadDetail;
          this.noReadList = "";
          //未读的
          this.$axios
            .get("/content/all/page", {
              params: {
                detail: this.noReadDetail,
                page: 1
              }
            })
            .then(res => {
              this.isLoading = false;
              this.finished = false;
              if (res.data[0] == null) {
                return;
              }
              this.noReadList = res.data;
            });
        });
    },
    detailById(currNum) {
      let urlParams = {
        path: "/detail", //要跳转的页面路径
        query: {
          num: currNum //要带的参数
        }
      };
      this.$router.push(urlParams);
    }
  },
  created() {
    if (this.common.id == "") {
      this.$router.push("/");
    }
    this.$axios
      .get("/user/get/one", {
        params: {
          id: this.common.id
        }
      })
      .then(res => {
        this.noReadDetail = res.data.noReadDetail;
        //未读的
        this.$axios
          .get("/content/all/page", {
            params: {
              detail: this.noReadDetail,
              page: 1
            }
          })
          .then(res => {
            window.console.log(res);
            if (res.data[0] == null) {
              return;
            }
            this.noReadList = res.data;
            this.total = res.data[0].total;
          });
      });
  }
};
</script>
<style scoped>
.maxheight {
  min-height: calc(87vh);
}
</style>