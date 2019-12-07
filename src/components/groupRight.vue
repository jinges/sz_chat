<template>
<div class="groupRight">
      <div class="title">
            选择内容
    </div>
    <el-tabs tab-position="top" @tab-click='tabclick' :stretch="true"  v-model="tabValue">
        <el-tab-pane label="文章链接">
           <content-text ref="Article" v-show="tabValue ==0" :type='1' @returndata="returndata"></content-text>
        </el-tab-pane>
        <el-tab-pane label="图片">
           <content-img ref="Img" v-show="tabValue == 1" :type='2' @returndata="returndata"></content-img>
        </el-tab-pane>
        <el-tab-pane label="文本">
           <content-text ref="Txt" v-show="tabValue == 2" :type='3' @returndata="returndata"></content-text>
        </el-tab-pane>
        <el-tab-pane label="视频">
           <content-img ref="Video" v-show="tabValue == 3" :type='4' @returndata="returndata"></content-img>
        </el-tab-pane>
        <el-tab-pane label="H5海报">
           <content-text  ref="Html" v-show="tabValue == 4" :type='5' @returndata="returndata"></content-text>
        </el-tab-pane>
    </el-tabs>
</div>
</template>
<script>
	import contentText from '@/components/contentText.vue';
    import contentImg from '@/components/contentImg.vue';
 export default{	
     components: {
            contentText,
            contentImg
		},
        data(){
            return{
                tabValue:'0',
                imgFlag:null,
                isGroup:false,
                showEmotion: false, //是否展示表情选择
                sendText:''
            }
            
        },
        created(){

        },
        watch:{
            sendText:function(item){
                this.$emit('returnSendText',this.sendText)
            }
        },
        methods:{
            getMsg(item){
                
            },
            //type:1 2 3 4 5
            //item 选中的数据
            returndata(type,item){
                this.$emit('retunContent',type,item)
            },
            //tab切换
            tabclick(index){
                if(this.tabValue == '0'){
                    this.$refs.Article.Reset()
                }else if(this.tabValue == '1'){
                    this.$refs.Img.Reset()
                }else if(this.tabValue == '2'){
                    this.$refs.Txt.Reset()
                }else if(this.tabValue == '3'){
                    this.$refs.Video.Reset()
                }else if(this.tabValue == '4'){
                    this.$refs.Html.Reset()
                }
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