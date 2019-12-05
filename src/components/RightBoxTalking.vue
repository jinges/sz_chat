<template>
  <div class="rightboxtalking">
    <!-- 搜索资料 -->
    <div class="search">
      <el-input placeholder="请输入搜索关键词" v-model="searchTxt" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
    </div>
    <ul class="searchList searchSeparate">
      <li v-for="(item,index) in arrList" :key="index" @click="eject(item)">
        {{item.title.indexOf("搜索.") != -1 ? item.title.replace('搜索.',''):item.title}}
        <span>{{item.subTitle}}</span>
      </li>
    </ul>	
    <ul class="searchList history">
      <li v-for="(item,index) in history" :key="index" @click="eject(item)">
        {{item.title.indexOf("搜索.") != -1 ? item.title.replace('搜索.',''):item.title}}
        <span>{{item.subTitle}}</span>
      </li>
    </ul>

    <!-- 分割线 -->
    <div class="line">
      <span>厂商话术库</span>
    </div>

    <!-- 厂商话术库 -->
    <div class="search">
      <el-input placeholder="请输入厂商话术库关键词" v-model="talkSearchTxt" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="searchTalk"></el-button>
      </el-input>
    </div>
    <ul class="searchList searchSeparate">
      <li v-for="(item,index) in talkArrList" :key="index" @click="selectTalk(item)">
        <span>{{item.content}}</span>
      </li>
    </ul>	
    <ul class="searchList history">
      <li v-for="(item,index) in talkHistory" :key="index" @click="selectTalkHistory(item)">
        <span>{{item.content}}</span>
      </li>
    </ul>

    <el-dialog title :visible.sync="dialogVisible" :before-close="handleClose">
      <iframe
        :src="detailUrl"
        height="100%"
        width="100%"
        name="user-img"
        frameborder="0"
        style=" height: 600px;overflow: auto;"
      ></iframe>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">关闭</el-button> -->
      </span>
    </el-dialog>
    <!-- <iframe :src="detailUrl" height="100%" width="100%" name="user-img" frameborder="0"></iframe> -->
  </div>
</template>

<script>
import util from "@/util/util.js";
export default {
  name: "RightBoxTalking",
  data() {
    return {
      dialogVisible: false,
      arrList: [],
      history: [],
      searchTxt: "",
      talkArrList: [],
      talkHistory: [],
      talkSearchTxt: "",
      userid: "",
      orderId: "",
      detailUrl: ""
    };
  },
  watch: {},
  components: {},
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    //发送
    /* send(){
				console.log('双击')
			}, */
    /* 弹框 */
    eject(item) {
      this.detailUrl = item.detailUrl;
      this.dialogVisible = true;
    },
    cleanSrarch() {
      this.arrList = [];
      this.history = [];
      this.talkArrList = [];
      this.talkArrList = [];

    },
    searchKeyword(wxid) {
      this.$axios
        .post("/getCustomerProfile", {
          wxid: wxid,
		      imei:util.getImei()
        })
        .then(data => {
          this.orderId = data.orderId;
        })
        .catch(() => {});
    },
    getkeyword(msg) {
      if(!this.orderId) {
        return false;
      }
      this.$axios
        .post("/searchKeyword", {
          orderId: this.orderId,
          sentence: msg
        })
        .then(data => {
          this.arrList = data;
          this.history = [...[], ...data, ...this.history];
          this.history = this.history.slice(0, 3);
        })
        .catch(() => {});
    },
    selectTalk(item){
      //console.log('点击话术：',item);
      var talkText = item.content;
      var newArr = [item];
      for (let i = 0; i < this.talkHistory.length; i++) {
        const element = this.talkHistory[i];
        if(i<2){
          newArr.push(this.talkHistory[i]);
        }
      }
      this.talkHistory = newArr;
      //console.log("话术历史",this.talkHistory);
      if(item.content){
        //this.$store.state.sendTalkMsg = item.content;
        this.$store.commit("updateSpeedMsg", item.content);
      }
    },
    selectTalkHistory(item){
      if(item.content){
        //this.$store.state.sendTalkMsg = item.content;
        //this.$emit('selectTalkHistory', item.content);
        //console.log(this.$store.state.sendTalkMsg);
      }
    },
    getTalkKeyword(msg) {
      this.$axios
        .post("/getTechnique", {
          imei:util.getImei(),
          content: msg
        })
        .then(data => {
          //console.log(data);
          this.talkArrList = data;
          this.talkHistory = this.talkHistory.slice(0, 3);
        })
        .catch(() => {});
    },
    search() {
      //console.log('进入search：'+this.searchTxt);
      if (!this.searchTxt) {
        this.$message({
          showClose: true,
          message: "请输入你要搜索的关键词",
          type: "error"
        });
        return false;
      } else {
        this.getkeyword(this.searchTxt);
      }
    },
    searchTalk() {
      //console.log('进入searchTalk：'+this.searchTxt);
      if (!this.talkSearchTxt) {
        this.$message({
          showClose: true,
          message: "请输入你厂商话术库的关键词",
          type: "error"
        });
        return false;
      } else {
        this.getTalkKeyword(this.talkSearchTxt);
      }
      this.talkSearchTxt = '';
    }
  },
  created() {
    // this.loadData();
  }
};
</script>
<style lang="scss">
.rightboxtalking {
  .el-dialog {
    height: 667px;
    width: 760px;
  }
}
</style>
<style lang="scss" scoped>
.rightboxtalking{
  .line{
    text-align: center;
    padding: 5px 0;
    font-size: 14px;
    
    span{
      position: relative;
      display: inline-block;
      padding: 0 1em;

      &::before{
        content: "";
        position: absolute;
        width: 4em;
        height: .5px;
        background-color: #fff;
        left:-4em;
        top: 50%;
      }
      &::after{
        content: "";
        position: absolute;
        width: 4em;
        height: .5px;
        background-color: #fff;
        right:-4em;
        top: 50%;
      }
    }
  }
}
.searchList {
  margin: 0;
  list-style-type: none;
  padding-left: 0px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.4);
  &.history {
    li{
      background: #ddd;
    }
  }
  &.searchSeparate {
	margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.2);
  }
  li {
    cursor: pointer;
    background: #fff;
    color: #606266;
    padding: 10px;
    border-bottom: 1px solid #606266;
    span {
      display: block;
      font-size: 12px;
    }
  }
}
</style>
