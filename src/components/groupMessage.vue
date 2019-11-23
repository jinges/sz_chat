<template>
<div style="top:50%;">
    <group-left></group-left>
    <group-right></group-right>
    <div class="clear"></div>
    <el-button type="primary" :loading="false">发送</el-button>
</div>
</template>

<script>
import groupLeft from './groupLeft.vue'
import groupRight from './groupRight.vue'
export default{
    data(){
        return{

        }
    },
    components: {
        groupLeft,
        groupRight
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