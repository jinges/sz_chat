<template>
<div>
       <div class="search">
            <el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        <ul class="content-text">
            <li v-for="(item,index) in dataArr" :key="index" @click="contentSwitch(index)">{{item.title}}
                <el-radio v-model="contentIndex" :label="index">&nbsp;</el-radio>
            </li>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalPage"
                :page-size="5"
                :current-page.sync="currentPage"
                @current-change='currentChange'>
            </el-pagination>
        </ul>
</div>
</template>
<script>
export default{
    props:{
        type:{
            default:null,
            type:Number
        }
    },
    data(){
        return{
            searchTxt:'',
            contentIndex:null,
            currentPage:1,
            totalPage:100,
            dataArr:[{title:'宝马车优惠降价通知'},{title:'宝马车优惠降价通知'},{title:'宝马车优惠降价通知'},{title:'宝马车优惠降价通知'},{title:'宝马车优惠降价通知'}]
        }
    },
    methods:{
        //搜索
        search(){

        },
        Reset(){
            this.currentPage = 1;
            this.contentIndex=null;
            this.searchTxt = '';
            this.search();
        },
        contentSwitch(index){
            this.contentIndex = index
        },
        currentChange(item){
            
        }
    },
    watch:{
        contentIndex:function(item){
            //
            this.$emit('returndata',this.type,this.dataArr[item]);
        }
    }
}
</script>
<style lang="scss" scoped>
  .search{
        width: 50%;
        padding: 0 20px;
    }
    ul{
        padding: 0px;
        margin: 0;
    }
    .content-text li{
        list-style-type:none;
        padding: 0 30px;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid rgb(233, 226, 226);  
        cursor: pointer;
        .el-radio{
            padding-top: 20px;
            float: right;
        }
    }
    .el-pagination{
        text-align: center;
        padding: 10px 0;
    }
</style>