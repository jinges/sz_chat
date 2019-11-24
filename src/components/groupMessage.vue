<template>
<div style="top:50%;">
    <group-left @returnSelectTag="returnSelectTag" :groupType="groupType" ref="groupLeft" ></group-left>
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
export default{
    data(){
        return{
            sendToFlag:true,
            RightContentType:'' , //右边选中的dataType
            RightContentSelectData:{} , //右边选中的Selectdata
            LeftSelectTagData:{},
            SendText:'',
            sendToLoad:false
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
        returnSelectTag(item){
            this.LeftSelectTagData = item
        },
        returnSendText(SendText){
            this.SendText = SendText;
        },
        sendTo(){
            //设置sendToLoad为true避免多次点击

            console.log(this.RightContentType,this.RightContentSelectData,this.LeftSelectTagData)
            //这是发布朋友圈的 多了 this.$refs.groupLeft.openFlag 是否公开的值
            if(this.groupType == 'groupFriend'){
                console.log(this.$refs.groupLeft.openFlag)
            }else{
                 //这是群发消息
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
            if(this.RightContentSelectData.title || item){
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