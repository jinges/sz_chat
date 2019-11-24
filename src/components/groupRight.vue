<template>
<div class="groupRight">
      <div class="title">
            选择内容
    </div>
    <el-tabs tab-position="top" @tab-click='tabclick' :stretch="true">
        <el-tab-pane label="文章链接">
           <content-text ref="Article" :type='1' @returndata="returndata"></content-text>
        </el-tab-pane>
        <el-tab-pane label="图片">
           <content-img ref="Img" :type='2' @returndata="returndata"></content-img>
        </el-tab-pane>
        <el-tab-pane label="文本">
           <content-text ref="Txt" :type='3' @returndata="returndata"></content-text>
        </el-tab-pane>
        <el-tab-pane label="视频">
           <content-img ref="Video" :type='4' @returndata="returndata"></content-img>
        </el-tab-pane>
        <el-tab-pane label="H5海报">
           <content-img  ref="Html" :type='5' @returndata="returndata"></content-img>
        </el-tab-pane>
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
	import contentText from '@/components/contentText.vue';
	import contentImg from '@/components/contentImg.vue';
	import AtMember from 'vue-at/dist/vue-at-textarea';
 export default{	
     components: {
            Emotions,
            AtMember,
            contentText,
            contentImg
		},
        data(){
            return{
                imgFlag:null,
                isGroup:false,
                showEmotion: false, //是否展示表情选择
                sendText:''
            }
            
        },
        created(){
            this.getcontent()
        },
        methods:{
            //type:1 2 3 4 5
            //item 选中的数据
            returndata(type,item){
                this.$emit('retunContent',type,item)
            },
            //tab切换
            tabclick(index){
                this.$refs.Article.Reset()
                this.$refs.Img.Reset()
                this.$refs.Txt.Reset()
                this.$refs.Video.Reset()
                this.$refs.Html.Reset()
            },
            //查找内容库
            getcontent(){
                this.$axios.post('/searchContentPage', {"contentTypeName": "","page": 0,"rows": 0,"type": "1" })
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
  
   
     .clear{
        clear: both;
    }
}
</style>