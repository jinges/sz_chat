<template>
<div class="groupRight">
      <div class="title">
            选择内容
    </div>
    <el-tabs tab-position="top" >
        <el-tab-pane label="文章链接">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <ul class="content-text">
                <li v-for="(item,index) in 5" :key="index" @click="contentSwitch(index)">宝马车优惠降价通知 
                <el-radio v-model="contentIndex" :label="index">&nbsp;</el-radio>
            </li>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="totalPage"
                :page-size="5"
                :current-page="currentPage">
            </el-pagination>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="图片">
            <div class="search">
                <el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <ul class="content-img">
                <li :class="imgFlag == index ? 'select' : ''" v-for="(item,index) in 10 " :key='index' @click="imgSwitch(index)"> 
                    <img src="../assets/f5.jpg" alt=""> 
                    <div>{{imgFlag}}-{{index}}</div>
                </li>
                <div class='clear'></div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="totalPage"
                    :page-size="5"
                    :current-page="currentPage">
                </el-pagination>
            </ul>
        </el-tab-pane>
        <el-tab-pane label="文本">文本</el-tab-pane>
        <el-tab-pane label="视频">视频</el-tab-pane>
        <el-tab-pane label="H5海报">H5海报</el-tab-pane>
    </el-tabs>
    <div class="title" style="margin-top:10px">
        自定义文案
    </div>
	<div>
        
		<div class="footer">
			<div class="toolbar">
				<font-awesome-icon @click.stop="showEmotion=!showEmotion" icon="smile"></font-awesome-icon>
				<transition name="slide">
					<Emotions @emotionBlur="closeEmotions" v-show="showEmotion" @selected="selectEmotion" id="emotions" />
				</transition>
			</div>
			<AtMember :members="isGroup?groupMembers:[]" name-key="nickName" v-model="sendText" :filterMatch="filterMatch" :deleteMatch="deleteMatch" >
				<!-- custom: with avatars -->
				<template slot="item" scope="s">
					<img :src="s.item.face" style="width: 20px;margin-right: 20px;">
					<span v-text="s.item.nickName"></span>
				</template>
               <el-input
                type="textarea"
                resize="none"
                placeholder=""
                :rows="3"
                v-model="sendText">
                </el-input>
                    <!-- <el-button type="primary" :loading="false" @click="send">发送</el-button> -->
				<!-- <textarea class="editor" v-model="sendText" ></textarea> -->
			</AtMember>
		</div>
    </div>
</div>
</template>
<script>
	import Emotions from '@/components/Emotions.vue';
	import AtMember from 'vue-at/dist/vue-at-textarea';
 export default{	
     components: {
            Emotions,
            AtMember
		},
        data(){
            return{
                imgFlag:null,
                isGroup:false,
                searchTxt:'',
                contentIndex:null,
                currentPage:1,
                totalPage:100,
                showEmotion: false, //是否展示表情选择
                sendText:''
            }
            
        },
        created(){
            this.getcontent()
        },
        methods:{
            imgSwitch(index){
                this.imgFlag = index
            },
            //查找内容库
            getcontent(){
                this.$axios.post('/other/contentPage', {"contentTypeName": "","page": 0,"rows": 0,"type": "1" })
                    .then(data => {
                        // this.tagArr = data
                        //查标签下面的好友
                    })
                    .catch(() => {});
            },
			//添加@
			filterMatch: function(name, chunk, at) {
				return name.toLowerCase().indexOf(chunk.toLowerCase()) > -1
			},
			//删除@
			deleteMatch: function(name, chunk, suffix) {
				return chunk === name + suffix
			},
            contentSwitch(index){
                this.contentIndex = index
            },
        //表情
			closeEmotions() {
				this.showEmotion = false;
			},
			//表情
			selectEmotion(emotion) {
				this.sendText += '1231312'
            },
            send(){

            }
        }
    }
</script>
<style lang="scss">
.groupRight{
    .el-textarea__inner{
        border:none !important;
    }
}
</style>
<style lang="scss" scoped>
.groupRight{
    border:1px solid rgb(233, 226, 226);  
    width:70%;
    float: right;
   
    #emotions {
        position: absolute;
        bottom: 36px;
        left: 5px;
        z-index: 100;
    }
    svg {
        font-size: 22px;
        margin-right: 10px;
        cursor: pointer;

        &:hover {
            color: #E6A23C;
        }
    }
    .el-tabs{
        border-bottom: 1px solid rgb(233, 226, 226);  
    }
    .title{
        background: #dcdfe6;
        font-size: 14px;
        padding: 10px;
        span{
            float: right;
        }
    }
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
    .content-img{
        margin-top: 10px;
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
}
</style>