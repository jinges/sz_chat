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
            <div class="headImg default_head" :style="'background-image: '+ (item.face ?'url('+item.face+')' : '')+';'"></div>
            <!-- <img class="headImg" :src="item.addressBook.headPic" alt=""> -->
            <div class="user_name">
                <span>
                    {{item.name}}
                </span>
            </div>
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
                // this.getfriendList(this.unique(this.nameArr,name))
                
                    this.getfriendList(name,index)
                
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
                            // this.getfriendList([])
                            this.friendList = this.$store.getters.groupFriends();
                            this.loading = false;
                        }else{
                            this.loading = false;                       
                            this.tagArr = []

                        }
                    }).catch(() => {});
                    
                this.currIndex = [];
            },
            getfriendList(labelName,index){
                if( this.tagArr[index].children && this.tagArr[index].children.length > 0){
                    this.tagArr[index].children = [];
                }else{
                      let arr = [];
                    let friendsList = this.$store.getters.groupFriends(); 
                        for(let k=0;k<friendsList.length;k++){
                            if(friendsList[k].detail.labelNames.indexOf(labelName) != -1){
                                arr.push(friendsList[k])    
                            }
                        } 
                    this.tagArr[index].children = arr; 
                }    
                if(this.currIndex.length == 0){
                    this.friendList = this.$store.getters.groupFriends();
                }else{
                    this.showList()
                }
                // this.friendList = arr;
                this.loading = false;
                //     this.loading = true;
                //    this.$axios.post('/queryMyAddressBookByLabels', {
                //         myWxid: util.getMyWxId(),tenantId:1,labels:labelName
                //     })
                //     .then(data => {
                //         this.friendList = data;
                //         this.friendListLength = data.length;
                //         this.loading = false;
                //     })
                //     .catch(() => {
                //         this.loading = false;
                //     });
            },
            showList(){
                let list = [];
                console.log(this.tagArr)
                for(let k=0;k<this.tagArr.length;k++){
                    let item = this.tagArr[k].children ? this.tagArr[k].children : []

                    list = [...list,...item];
                }
                this.friendList = this.uniqueArray(list, 'wxid');
            },
            uniqueArray(array, key){
                var result = [array[0]];
                for(var i = 1; i < array.length; i++){
                    var item = array[i];
                    var repeat = false;
                    for (var j = 0; j < result.length; j++) {
                    if (item[key] == result[j][key]) {
                        repeat = true;
                        break;
                    }
                    }
                    if (!repeat) {
                    result.push(item);
                    }
                }
                return result;
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
            position: relative;
            list-style-type:none;
            height: 50px;
            line-height: 50px;
            border-bottom: 1px solid rgb(233, 226, 226);  
            .headImg{
                position: absolute;
                left: 5px;
                top: 5px;
                width: 40px;
                height: 40px;
            }
            .user_name{
                margin-left: 55px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>