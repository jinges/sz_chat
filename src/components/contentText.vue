<template>
<div style="min-height:342px" v-loading="loading">
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
            v-if="pageFlag"
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
            loading:true,
            pageFlag:false,
            searchTxt:'',
            contentIndex:null,
            currentPage:1,
            totalPage:null,
            dataArr:[]
        }
    },
    methods:{
        //搜索
        search(){
            this.getcontent()
        },
         //查找内容库
        getcontent(){
            this.loading = true
            this.$axios.post('/content/searchPage', {"contentTypeName": this.searchTxt,"page": this.currentPage,"rows": 5,"type": this.type })
                .then(data => {
                    this.loading = false
                    this.dataArr = data.data
                    this.totalPage = data.totalPage
                    if(data.totalPage<5){
                        this.pageFlag =  false;
                    }else{
                        this.pageFlag =  true;
                    }
                    //查标签下面的好友
                })
                .catch(() => {
                    this.loading = false
                });
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
            this.currentPage = item;
        }
    },
    mounted(){
       this.getcontent()
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