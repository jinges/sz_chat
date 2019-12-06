<template>
<div class="groupLeft">
    <div class="title">
            选择用户标签
            <!-- <span style="float: right;">
                <el-checkbox v-model="openFlag" v-if="groupType == 'groupFriend'">公开</el-checkbox>
            </span> -->
    </div>
     <div class="tag">
        <ul>
            <li :class="currIndex.indexOf(index)!=-1 ? 'active' : ''" v-for="(item,index) in tagArr" :key="index"  @click="tagSwitch(index,item.labelName)">{{item.labelName}}</li>
            <div class="clear"></div>
        </ul>
    </div> 
    <div class="title">
            用户列表
            <span>{{friendListLength}}</span>
    </div> 
    <div class="friendList" 
    v-loading="loading">
        <li v-for="(item,index) in friendList" :key="index">
            <img class="headImg" :src="item.addressBook.headPic" alt="">
            <span>
                {{item.remark ? item.remark :item.addressBook.nickName}}
            </span>
        </li>
       
    </div>
</div>
</template>
<script>
import util from '@/util/util.js'
    export default{
        data(){
            return{
                openFlag:false,
                loading:true,
                currIndex:[],
                tagArr:[
                  
                ],
                friendList:[],
                friendListLength:'',
                selectTag:[],
                nameArr:[]
            }
            
        },
        props:{
            groupType:{
                type:String,
                default:''
            }
        },
        methods:{
            cleanTag(){
            },
            unique(ary,str) {
                if (ary.indexOf(str)==-1) {
                    ary.push(str);
                }else{
                    ary.splice(ary.indexOf(str), 1)
                }
                return ary;
            },
            tagSwitch(index,name){
                // this.currIndex.push(index)
                this.currIndex = this.unique(this.currIndex,index)
                this.getfriendList(this.unique(this.nameArr,name))
                // this.selectTag.push(this.tagArr[index]);
            },
            gettabs(){
                //查询tags
                this.$axios.post('/queryMyLabel', {
                        myWxid: util.getMyWxId(),tenantId:1
                    })
                    .then(data => {
                        // this.tagArr = data
                        //查标签下面的好友
                        if(data && data.length>0){
                            this.tagArr = data
                            this.selectTag = [];
                            // this.nameArr.push(data[0].labelName)
                            this.getfriendList([])
                        }else{
                            this.loading = false;                       
                            this.tagArr = []

                        }
                    }).catch(() => {});
                    
                this.currIndex = [];
            },
            getfriendList(labelName){
                    this.loading = true;
                   this.$axios.post('/queryMyAddressBookByLabels', {
                        myWxid: util.getMyWxId(),tenantId:1,labels:labelName
                    })
                    .then(data => {
                        this.friendList = data;
                        this.friendListLength = data.length;
                        this.loading = false;
                    })
                    .catch(() => {
                        this.loading = false;
                    });
            }
        },
        watch:{
            currIndex:function(item){
                if(item.length>0){
                    let arr = [];
                    for(let i=0;i<item.length;i++){
                        arr.push(this.tagArr[item[i]])
                    }
                    this.$emit('returnSelectTag',arr)
                }else{
                    this.$emit('returnSelectTag',[])
                }
            },
            friendList:function(item){
                this.$emit('returnFriendList',this.friendList)
            }
        },
        mounted(){
           
        }
    }
</script>
<style lang='scss' scoped>
.groupLeft{
    float: left;
    border:1px solid rgb(233, 226, 226);  
    width:25%;
    .title{
        background: #dcdfe6;
        font-size: 14px;
        padding: 10px;
        span{
            float: right;
        }
    }
    ul{
        padding: 0;
    }
    .clear{
        clear: both;
    }
    .tag{
        min-height: 90px;
        li{
            cursor: pointer;
            float: left;
            list-style-type:none;
            width: 40%;
            margin: 0 4%;
            color: #aaa;
            text-align: center; 
            border:1px solid #aaa;  
            padding: 5px 0;
            border-radius: 3px;
            margin-top: 5px;
            height: 20px;
        }
        li.active{
            color:white;
            background: #409eff;
            border:1px solid #409eff;  
        }
    }
    .friendList{
        height: 400px;
        overflow: auto;
        li{
            list-style-type:none;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid rgb(233, 226, 226);  
            .headImg{
                width: 40px;
                height: 40px;
                padding: 5px 15px;
                float: left;
            }
        }
    }
}
</style>