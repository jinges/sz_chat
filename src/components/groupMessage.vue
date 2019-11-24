<template>
<div style="top:50%;">
    <group-left @returnSelectTag="returnSelectTag" :groupType="groupType" ref="groupLeft" @returnFriendList="returnFriendList"></group-left>
    <group-right @retunContent="retunRightContent" @returnSendText="returnSendText"></group-right>
    <div class="clear"></div>
    <div style="padding:10px;">
        <el-button type="primary" :loading="sendToLoad" @click="sendTo" :disabled="sendToFlag">发送</el-button>
    </div>
</div>
</template>

<script>
import groupLeft from './groupLeft.vue'
import groupRight from './groupRight.vue'
import util from '@/util/util.js'
export default{
    data(){
        return{
            sendToFlag:true,
            RightContentType:'' , //右边选中的dataType
            RightContentSelectData:{} , //右边选中的Selectdata
            LeftSelectTagData:{},
            SendText:'',
            sendToLoad:false,
            friendList:[]
        }
    },
    props:{
        groupType:{
            type:String,
            default:''
        }
    },
    mounted(){

    },
    components: {
        groupLeft,
        groupRight
    },
    methods:{
        retunRightContent(type,item){
            this.RightContentType = type;
            this.RightContentSelectData = item;
        },
        returnFriendList(item){
            this.friendList = item
        },
        returnSelectTag(item){
            this.LeftSelectTagData = item
        },
        returnSendText(SendText){
            this.SendText = SendText;
        },
        sendTo(){
            let tagStr = '';
            let momentType = '';
            if(this.RightContentType == 1 ){
                momentType = 4
            }else if(this.RightContentType == 2 || this.RightContentType == 5){
                momentType = 2
            }else if(this.RightContentType ==3 ){
                momentType = 1
            }else if(this.RightContentType == 4){
                momentType = 3
            }
            for(let i=0;i<this.LeftSelectTagData.length;i++){
                if(i == this.LeftSelectTagData.length-1){
                    tagStr = tagStr +this.LeftSelectTagData[i].labelID
                }else{
                    tagStr = tagStr +this.LeftSelectTagData[i].labelID +','
                }
            }
            //设置sendToLoad为true避免多次点击
            //这是发布朋友圈的 多了 this.$refs.groupLeft.openFlag 是否公开的值
            if(this.groupType == 'groupFriend'){
                this.$axios.post('/postMoment', 
                    {
                        "filePath": this.RightContentType != 3 ? this.RightContentSelectData.url : '',
                        "imei": util.getImei(),
                        "label": tagStr,
                        "momentTitle":  this.RightContentType == 3 ? this.RightContentSelectData.title :this.SendText,
                        "momentType":momentType,
                        "myWxid": util.getMyWxId(),
                        "publicMode": 2
                    }
                )
                .then(data => {
                    
                })
                .catch(() => {
                    
                });
            }else{
                 //这是群发消息
                 //单个循环调用
                 let fileType = '';
                 let filePath = ''
                 if(this.RightContentType == 2 || this.RightContentType == 5){
                    fileType = 'IMAGE'
                    filePath  = this.RightContentType.url
                 }else if(this.RightContentType == 4){
                    fileType = 'VIDEO'
                    filePath  = this.RightContentType.url
                 }else{
                    fileType = ''
                    filePath = ''
                 }
                for(let i=0;i<this.friendList.length;i++){
                 let body = {}
                 if(this.RightContentType == 2 || this.RightContentType == 5 || this.RightContentType == 4){
                    body =    {
                            "imei": util.getImei(),
                            'createTime':new Date().getTime(),
                            "fileType":fileType,
                            "fileName":"",
                            'filePath':filePath,
                            'fileId':'',
                            'targetWxid':this.friendList[0].targetWxid,
                            "myWxid": util.getMyWxId()
                        }
                 }else{
                        body =    {
                            'createTime':new Date().getTime(),
                            "imei": util.getImei(),
                            "myWxid": util.getMyWxId(),
                            "sendContent":this.RightContentSelectData.title,
                            'targetWxid':this.friendList[0].targetWxid,
                        }
                    }
                    this.$axios.post('/sendText', body)
                    .then(data => {
                    })
                    .catch(() => {
                        
                    });
                }
            }
        }
    },
    watch:{
        RightContentSelectData:function(item){
            if(item || this.SendText){
                this.sendToFlag = false
            }else{
                this.sendToFlag = true
            }
        },
        SendText:function(item){
            if(this.RightContentSelectData && this.RightContentSelectData.title || item){
                this.sendToFlag = false
            }else{
                this.sendToFlag = true
            }
        }
    }
}

</script>
<style lang="scss" scoped>
    .clear{
        clear: both;
    }
    button{
        margin: 0 auto;
        display: block;
    }
    .el-dialog.dialog{
        top: 50% !important;
    }
</style>
<style lang="scss">
.groupMessage{
    .el-dialog__body{
        padding: 0px 20px !important;
    }
}
</style>