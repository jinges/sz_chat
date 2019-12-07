<template>
<div style="min-height:342px" v-loading="loading">
      <div class="search">
                <el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </div>
            <ul class="content-img">
                <li :class="imgFlag == index ? 'select' : ''" v-for="(item,index) in dataArr " :key='index' @click="imgSwitch(index)" :title="item.title" >
                    <!-- <img :src="item.url" alt=""> 
                    <div>{{item.title}}</div> -->
                    <div class="img_box" :class="type == 4 ? 'default_video' : 'default_pic'" :style="imgStyle(item,type)">
                        <i class="el-icon-success active_icon"></i>
                    </div>
                    <div class="img_title">{{item.title}}</div>
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
    computed:{
        
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
        //封面图处理
        imgStyle(item,type){
            var imgUrl = item.url
            if(type==4){
                imgUrl = item.coverUrl;//视频取coverUrl
            }
            return {
                'background-image':imgUrl ?'url('+imgUrl+')' : ''
            }
        }
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
        margin: 10px 0 0 20px;
        padding: 16px 0;
        font-size: 0;

         li{
            cursor: pointer;
            list-style-type:none;
            display: inline-block;
            width:18%;
            margin: 0 8px 10px 0;
            text-align: center;
            min-height: 123px;
            border: 1px solid transparent;

            &:hover{
                border: 1px solid #409EFF;
            }
            &.select{
                border: 1px solid #409EFF;
            }
            &.select .active_icon{
			    display: block;
            }

            .img_box {
                position: relative;
                padding-top: 100%;
                background-color: #eee;
                margin: 1px;
            }
            .img_title{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #333;
                line-height: 2;
                padding: 0 6px;
                font-size: 14px;
            }

            img{
                width: 120px;
                height: 95px;
            }
            

            .active_icon{
                display: none;
                position: absolute;
                top: 4px;
                right: 4px;
                color: #3a8ee6;
                font-size: 24px;
                background: #fff;
                border-radius: 50%;
            }
            
        }
        
    }
    
    .el-pagination{
        text-align: center;
        padding: 10px 0;
    }
</style>