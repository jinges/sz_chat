<template>
  <div class="pengyouquan">
    <div class="header">
     <!-- <font-awesome-icon
        icon="arrow-alt-circle-left"
        v-if="$store.state.currentPengyouquan"
        @click="back"
      ></font-awesome-icon>-->
      <div class="title">{{title}}</div>
      <!-- <font-awesome-icon icon="edit" id="publish" @click="showPublicBlog=true"></font-awesome-icon> -->
      <font-awesome-icon icon="thumbs-up" id="publish" @click="batchPointPraise"></font-awesome-icon>
    </div>
    <div class="content">
      <vue-scroll>
        <div class="loading" v-if="loading">
          <span class="el-icon-loading"></span>朋友圈加载中
        </div>
        <div class="empty" v-if="!loading&&list.length==0">暂无朋友圈动态</div>
        <Blog
          ref="showBlog"
          v-else
          v-for="(blog, index) in list"
          :key="index"
          v-bind="blog"
          @loadData="loadData"
        ></Blog>
      </vue-scroll>
    </div>
    <transition name="el-fade-in-linear">
      <PublishBlog ref="publishBlog" v-show="showPublicBlog" @close="showPublicBlog=false" />
    </transition>
  </div>
</template>

<script>
import Blog from "./Blog.vue";
import PublishBlog from "./PublishBlog.vue";
import util from "@/util/util.js";

export default {
  data() {
    return {
      title: "",
      loading: false,
      showPublicBlog: false,
      list: []
    };
  },
  // watch: {
  //   "$store.state.currentPengyouquan": function(newVal) {
  //     if (newVal) {
  //       var wx = this.$store.getters.filterFriendsById(newVal);
  //       this.title = wx.name;
  //       this.loadData();
  //     } else {
  //       this.title = "";
  //       this.loadData();
  //     }
  //   }
  // },
  components: {
    Blog,
    PublishBlog
  },
  methods: {
    //批量点赞
    batchPointPraise() {
      let $this = this;
      this.list.forEach(item => {
        // $this.$refs.showBlog.likeAction(item.snsid);
        this.$axios
          .post("likeMoment", {
            imei: util.getImei(),
            myWxid: util.getMyWxId(),
            snsid: item.snsid
          })
          .then(data => {
            this.bufferData[data] = true;
          })
          .catch(() => {});
      });
    },
    back() {
      this.$store.commit("setCurrentPengyouquan", null);
    },
    onWsMsg(json) {
      if (
        json.commandName == "SERVER_GET_MOMENT_LIST_ACK" ||
        json.commandName == "SERVER_GET_TARGET_MOMENT_LIST_ACK"
      ) {
        this.loading = false;
        var content = JSON.parse(json.messageContent);
        this.list = content.momentList || [];
      } else if (json.commandName == "SERVER_POST_MOMENT_ACK") {
        this.$refs["publishBlog"].onWsMsg(json);
      } else if (
        json.commandName == "SERVER_LIKE_MOMENT_ACK" ||
        json.commandName == "SERVER_REPLY_MOMENT_ACK"
      ) {
        this.$refs["showBlog"].forEach(t => t.onWsMsg(json));
      }
    },
    loadData() {
      let $this = this;
      this.loading = true;
      if (this.$store.state.currentSession) {
        this.$axios
          .post("/momentListByWxid", {
            targetWxid: this.$store.state.currentSession,
            imei: util.getImei(),
            myWxid: util.getMyWxId()
          })
          .then(data => {})
          .catch(() => {});
      } else {
        this.$axios
          .post("/momentList", {
            imei: util.getImei(),
            myWxid: util.getMyWxId()
          })
          .then(data => {})
          .catch(() => {});
      }
    },
    emptyList(){
      this.list = [];//清空朋友圈
    }
  },
  created() {
    this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.pengyouquan {
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  height: 100%;

  .header {
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 7px 10px;
    display: flex;
    justify-content: space-between;

    svg {
      font-size: 27px;
      padding: 0px 5px;
      cursor: pointer;

      &:hover {
        color: #409eff;
      }
    }

    .title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin: 0px 15px;
      font-size: 15px;
      line-height: 27px;
      text-align: center;
    }

    #publish {
      font-size: 24px;
      color: #e6a23c;
      &:hover{
        color: #f0c17c;
      }
    }

  }

  .content {
    height: 1px;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 13px;

    .loading {
      text-align: center;
      line-height: 40px;
      font-size: 15px;
      color: #ddd;

      svg {
        margin-right: 10px;
      }
    }

    .empty {
      color: #c0c4cc;
      text-align: center;
      padding: 20px 0px;
    }
  }
}
</style>
