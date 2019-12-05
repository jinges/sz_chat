<template>
  <div style="top:50%;">
    <group-left
      @returnSelectTag="returnSelectTag"
      :groupType="groupType"
      ref="groupLeft"
      @returnFriendList="returnFriendList"
    ></group-left>
    <group-right @retunContent="retunRightContent" @returnSendText="returnSendText"></group-right>
    <div  class="footerTxt">
      <div class="title" style="margin-top:10px">
        自定义文案
      </div>
      <div class="footer">
          <chat-box  ref="chatbox" :options="options" @msg="getMsg"></chat-box>
      </div>
    </div>
    <div class="clear"></div>
    <div style="padding:10px;">
      <!-- :disabled="sendToFlag" -->
      <el-button type="primary" :loading="sendToLoad" @click="sendTo" >发送</el-button>
    </div>
  </div>
</template>

<script>
import groupLeft from "./groupLeft.vue";
import groupRight from "./groupRight.vue";
import util from "@/util/util.js";
import chatBox from '@/components/Chatbox.vue';
export default {
  data() {
    return {
      msg:'',
      options: {  //配置所有的样式
        background: '#fff',
        color: '#000',
        color:'black',
        //toolbar icon导航的样式
        // toolbar: {
        //   background: '#ff0',
        //   color: '#000'
        // },
        //btn 按钮样式
        btn:{ 
            background: '#ff0',
            color: '#000'
        }
    },
      msgFlag: true,
      RightContentType: "", //右边选中的dataType
      RightContentSelectData: {}, //右边选中的Selectdata
      LeftSelectTagData: {},
      SendText: "",
      sendToLoad: false,
      friendList: []
    };
  },
  props: {
    groupType: {
      type: String,
      default: ""
    }
  },
  mounted() {},
  components: {
    groupLeft,
    groupRight,
    chatBox
  },
  methods: {
    getMsg(msg){
      this.msg = msg
    },
    retunRightContent(type, item) {
      this.RightContentType = type;
      this.RightContentSelectData = item;
    },
    returnFriendList(item) {
      this.friendList = item;
    },
    returnSelectTag(item) {
      this.LeftSelectTagData = item;
    },
    returnSendText(SendText) {
      this.SendText = SendText;
    },
    sendTo() {
      this.$refs.chatbox.send()
      if(!this.msg && !this.RightContentType){
        this.$message({
          showClose: true,
          message: '请选择或输入你要发送的内容！',
          type: 'error'
        });
        return false
      }
      let tagStr = "";
      let momentType = "";
      if(!this.RightContentType){
          momentType = 1;
      }else{
        if (this.RightContentType == 1) {
          momentType = 4;
        } else if (this.RightContentType == 2 || this.RightContentType == 5) {
          momentType = 2;
        } else if (this.RightContentType == 3) {
          momentType = 1;
        } else if (this.RightContentType == 4) {
          momentType = 3;
        }
      }
      for (let i = 0; i < this.LeftSelectTagData.length; i++) {
        if (i == this.LeftSelectTagData.length - 1) {
          tagStr = tagStr + this.LeftSelectTagData[i].labelID;
        } else {
          tagStr = tagStr + this.LeftSelectTagData[i].labelID + ",";
        }
      }
      //设置sendToLoad为true避免多次点击
      //这是发布朋友圈的 多了 this.$refs.groupLeft.openFlag 是否公开的值
      if (this.groupType == "groupFriend") {
        this.$axios
          .post("/postMoment", {
            filePath:
              this.RightContentType && this.RightContentType != 3  ? this.RightContentSelectData.url : "",
            imei: util.getImei(),
            label: tagStr,
            momentTitle:
              this.RightContentType && this.RightContentType == 3 ? this.RightContentSelectData.title : this.msg,
            momentType: momentType,
            myWxid: util.getMyWxId(),
            publicMode: 2
          })
          .then(data => {
             this.$message({
                showClose: true,
                message: '发送成功！',
                type: 'success'
              });
              this.$emit('succ') 
          })
          .catch(() => {
             this.$message({
                showClose: true,
                message: '发送失败！',
                type: 'success'
              });
          });
      } else {
        //这是群发消息
        //单个循环调用
        let fileType = "";
        let filePath = "";
       /* if (this.RightContentType == 2 || this.RightContentType == 5) {
          fileType = "IMAGE";
          filePath = this.RightContentType.url;
        } else if (this.RightContentType == 4) {
          fileType = "VIDEO";
          filePath = this.RightContentType.url;
        } else {
          fileType = "";
          filePath = "";
        } */
        let params = this.msgContent(fileType, filePath);
        this.sendGroupMsg(0, params,this.RightContentType)
        
      }
    },
    sendGroupMsg(i, params,RightContentType){
        var $this = this;
        let freads = this.friendList;
        if(!freads.length) {
          return false;
        }
        let targetWxid = freads[i].targetWxid;
        let len = freads.length;
        params.targetWxid = targetWxid;
        let url = '';
         if (RightContentType == 2  || RightContentType == 4 
          ) {
            url= '/sendFile'
          }else if( RightContentType == 1  || RightContentType == 5 ){
              url= '/sendLink'
          }else{
               url= '/sendText'
          }
        var a = ++i;
        this.$axios
            .post(url, params)
            .then(data => {})
            .finally(()=>{
                        console.log(a,len);
                if(a == len){
                  this.$message({
                    showClose: true,
                    message: '发送成功！',
                    type: 'success'
                  }); 
                  this.$emit('succ') 
                }
                if(a < len) {
                    let t = Math.ceil(Math.random() * 1+1.5);
                    setTimeout(() => {
                        $this.sendGroupMsg(a, params,RightContentType);
                    }, t * 1000);
                }
            })
            .catch(() => {});
    },
    msgContent(fileType, filePath){
        let body = {
            imei: util.getImei(),
            createTime: new Date().getTime(),
            myWxid: util.getMyWxId()
        };
        if(this.RightContentType){
          if (
          this.RightContentType == 2  ||
          this.RightContentType == 4 
          ) {
              body = Object.assign({}, body, {
                  "fileId": this.RightContentSelectData.id,
                  "fileName": this.RightContentSelectData.title,
                  "filePath": this.RightContentSelectData.url,
                  "fileType": this.RightContentType == 2 ? "IMAGE" : 'VIDEO',
              })
          } else if( this.RightContentType == 1  || this.RightContentType == 5 ) {
              body = Object.assign({}, body, {
                  "desc": this.RightContentSelectData.title,
                  "icon": "https://s.autoimg.cn/fe/topbar/logo_topbar.png",
                  "link": this.RightContentSelectData.url,
                  "title": this.RightContentSelectData.title,
              })
          }else{
            body = Object.assign({}, body, {
                "sendContent": this.RightContentSelectData.title,
              })
          }
        }else{
           body = Object.assign({}, body, {
                sendContent: this.msg
            })
        }
        return body;
    }
  },
  watch: {
    RightContentSelectData: function(item) {
      if (item || this.SendText) {
        this.sendToFlag = false;
      } else {
        this.sendToFlag = true;
      }
    },
    SendText: function(item) {
      if (
        (this.RightContentSelectData && this.RightContentSelectData.title) ||
        item
      ) {
        this.sendToFlag = false;
      } else {
        this.sendToFlag = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.footerTxt{
    border:1px solid rgb(233, 226, 226);  
    border-top:none;  
    width:70%;
    float: right;
    .title{
        background: #dcdfe6;
        font-size: 14px;
        padding: 10px;
        span{
            float: right;
        }
    }
}
.clear {
  clear: both;
}
button {
  margin: 0 auto;
  display: block;
}
.el-dialog.dialog {
  top: 50% !important;
}
</style>
<style lang="scss">
.groupMessage {
  .el-dialog__body {
    padding: 0px 20px !important;
  }
}
</style>