<template>
  <van-pull-refresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
    <div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
      count: 0,
      isLoading: false,//下拉刷新
      list: [],
      loading: false, //上拉加载状态
      finished: false, //数据全部加载完成
      noReadDetail: "", //这个是未读的数字列表
      noReadList: "" //这个是list
    };
  },

  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    onRefresh() {
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
            .get("/content/all", {
              params: {
                detail: this.noReadDetail
              }
            })
            .then(res => {
              this.noReadList = res.data;
              this.isLoading = false;
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
          .get("/content/all", {
            params: {
              detail: this.noReadDetail
            }
          })
          .then(res => {
            this.noReadList = res.data;
          });
      });
  }
};
</script>
