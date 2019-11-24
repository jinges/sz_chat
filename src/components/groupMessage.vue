<template>
<div style="top:50%;">
    <group-left></group-left>
    <group-right @retunContent="retunRightContent"></group-right>
    <div class="clear"></div>
    <el-button type="primary" :loading="false" @click="sendTo" :disabled="true">发送</el-button>
</div>
</template>

<script>
import groupLeft from './groupLeft.vue'
import groupRight from './groupRight.vue'
export default{
    data(){
        return{
            RightContentType:'' , //右边选中的dataType
            RightContentSelectData:[] , //右边选中的Selectdata
        }
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
        sendTo(){
            console.log(this.RightContentType,this.RightContentSelectData)
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