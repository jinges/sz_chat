<template>
  <div class="user_content">
    <div class="user_info">
      <div class="user_info_item" v-for="(item,index) in userInfoData" :key="index">
        <div class="user_info_title">{{item.title}}</div>
        <div class="user_info_wrap">
          <div class="user_info_wrap_li" v-for="(item,uindex) in item.content" :key="uindex">
            <span class="user_info_wrap_sub">{{item.sub}}</span>
            <span
              class="user_info_wrap_text"
              :class="{'editor': (editState && index == 1)}"
              :contenteditable="(editState && index == 1)"
            >{{item.text}}</span>
          </div>
        </div>
      </div>
      <div class="user_info_item">
        <div class="user_info_title">标签</div>
        <div class="user_info_wrap">
          <p class="tag_tip" v-show="editState">已添加</p>
          <span class="user_info_wrap_tag" v-for="(item,index) in tagData" :key="index">
            {{item.tagName}}
            <em class="del el-icon-close" @click="removeTag(index)" v-show="editState"></em>
          </span>
          <div v-show="editState">
            <p class="tag_tip">未添加</p>
            <span class="user_info_wrap_tag no_sel" @click="checkTag(index)" v-for="(item,index) in allTags" :key="index">
              {{item.tagName}}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="user_bottom">
      <el-button type="primary" @click="editor()" size="mini">{{editState?'保存':'修改'}}</el-button>
    </div>
  </div>
</template>

<script>
import util from "@/util/util.js";

export default {
  name: "RightBoxUserInfo",
  data() {
    return {
      title: "",
      loading: false,
      editState: false,
      userInfoData: [
        {
          title: "微信资料",
          content: [
            {
              sub: "备注",
              text: "有意向客户有意向客户有意向客户有意向客户有意向客户"
            },
            {
              sub: "地区",
              text: "广东 深圳"
            },
            {
              sub: "微信号",
              text: "A1234566"
            },
            {
              sub: "来源",
              text: "通过手机号添加"
            }
          ]
        },
        {
          title: "客户档案",
          content: [
            {
              sub: "真实姓名",
              text: "张三"
            },
            {
              sub: "性别",
              text: "男"
            },
            {
              sub: "偏好",
              text: "高端车型"
            },
            {
              sub: "学历",
              text: "本科"
            }
          ]
        }
      ],
      tagData: [
        {
          tagName: "意向客户",
          tagId: "123456"
        },
        {
          tagName: "高端客户",
          tagId: "456789"
        },
        {
          tagName: "高端客户",
          tagId: "456789"
        },
        {
          tagName: "高端客户",
          tagId: "456789"
        },
        {
          tagName: "高端客户高端客户高端客户",
          tagId: "456789"
        }
			],
			allTags:[
        {
          tagName: "意向客户",
          tagId: "123456"
        },
        {
          tagName: "高端客户",
          tagId: "456789"
        },
        {
          tagName: "高端客户",
          tagId: "456789"
        },
			]
    };
  },
  watch: {},
  components: {},
  methods: {
    editor() {
			if(this.editState) {
				
			}
      this.editState = !this.editState;
      // this.$axios.post('other/momentList', {
      // 	targetWxid: this.$store.state.currentPengyouquan,
      // 	imei: util.getImei(),
      // 	myWxid: util.getMyWxId()
      // })
      // .then(() => {
      // 	debugger;
      // })
    },
    getTags() {},
    saveUserInf() {},
    removeTag(index) {
			var tag = this.tagData.splice(index, 1);
			debugger;
			this.allTags = [...this.allTags, ...tag];
		},
		checkTag(index){
      var tag = this.allTags.splice(index, 1);
			this.tagData = [...this.tagData, ...tag];
		}
  },
  created() {
    // this.loadData();
  }
};
</script>

<style lang="scss" scoped>
.user_info {
  color: #fff;
  padding-bottom: 12px;
  height: 1px;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  overflow: auto;

  .user_info_item {
    padding: 6px 12px;

    .user_info_title {
      text-align: center;
      font-size: 16px;
      line-height: 2;
    }
    .user_info_wrap {
      border-radius: 4px;
      background-color: rgba(0, 0, 0, 0.2);
      padding: .6em 1em;
      min-height: 80px;
			font-size: .9em;

      .user_info_wrap_li {
        position: relative;
        padding: 0.2em;

        .user_info_wrap_sub {
          color: #aaa;
          width: 4em;
          position: absolute;
          text-align: justify;
          text-align-last: justify;
        }

        .user_info_wrap_text {
          margin-left: 5.5em;
          margin-right: 0.5em;
          display: block;
          padding: 0.1em;
          &.editor {
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.14);
            border-radius: 4px;
            padding: 0.04em 0.6em;
            &:focus {
              outline: none;
            }
          }
        }
      }
      .user_info_wrap_tag {
        display: inline-block;
        border-radius: 4px;
        border: 1px solid #666;
        padding: 0 0.5em;
        margin: 0.5em 0.3em;
        line-height: 2;
        position: relative;
				font-size: .88em;
        cursor: pointer;
        .del {
          width: 12px;
          height: 12px;
          display: block;
          border-radius: 50%;
          position: absolute;
          right: -6px;
          top: -6px;
          background: #fff;
          color: #000;
          font-size: 13px;
          text-align: center;
          cursor: pointer;
        }
				&.no_sel{
					color: #5297e8;
					border-color: #5297e8;
				}
      }
			.tag_tip{
				margin: .1em;
			}
    }
  }
}

.user_content {
  height: 100%;
  overflow: auto;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  display: flex;
  flex-direction: column;
  display: -webkit-box;
  position: relative;
  overflow: hidden;
}
.user_bottom {
  padding: 10px;
  text-align: center;
}
</style>
