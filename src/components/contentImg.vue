<template>
<div style="min-height:342px" v-loading="loading">
      <div class="search">
                <el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <ul class="content-img">
                <li :class="imgFlag == index ? 'select' : ''" v-for="(item,index) in dataArr " :key='index' @click="imgSwitch(index)"> 
                    <img :src="item.url" alt=""> 
                    <div>{{item.title}}</div>
                </li>
                <div class='clear'></div>
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
            currentPage:1,
            totalPage:null,
            imgFlag:null,
            dataArr:[
              
            ]
        }
    },
    mounted(){
        this.getcontent()
    },
    methods:{
         Reset(){
            this.currentPage = 1;
            this.imgFlag=null;
            this.searchTxt = '';
            this.search();
        },
         //查找内容库
        getcontent(){
            this.loading = true
            this.$axios.post('/content/searchPage', {"contentTypeName": this.searchTxt,"page": this.currentPage,"rows": 5,"type": this.type })
                .then(data => {
                    this.loading = false
                    this.dataArr = data.data
                    this.totalPage = data.totalPage
                    if(data.totalPage<10){
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
        currentChange(item){
            this.currentPage = item;
        },
        imgSwitch(index){
            this.imgFlag = index
        },
        //搜索
        search(){
            this.getcontent()
        },
    },
     watch:{
        imgFlag:function(item){
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
   .content-img{
        margin-top: 10px;
        margin-bottom: 0px;
    }
    .content-img li{
        cursor: pointer;
        list-style-type:none;
        float: left;
        width:20%;
        margin: 0 auto;
        text-align: center;
        min-height: 123px;
    }
    .content-img li img{
        width: 120x;
        height: 95px;
    }
    .content-img li div{
        overflow: hidden;/*超出部分隐藏*/
        white-space: nowrap;/*不换行*/
        text-overflow:ellipsis;/*超出部分文字以...显示*/
    }
    .content-img li.select img{
        border: 2px solid #409EFF;
    }
     .clear{
        clear: both;
    }
    
    .el-pagination{
        text-align: center;
        padding: 10px 0;
    }
</style>