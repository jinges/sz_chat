<template>
  <div class="user_content">
    <div class="user_info">
      <div class="user_info_item">
        <div class="user_info_title">微信资料</div>
        <div class="user_info_wrap">
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">备注</span>
            <span class="user_info_wrap_text">{{myAddressBook.remark}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">地区</span>
            <span class="user_info_wrap_text">{{myAddressBook.addressBook.region}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">微信号</span>
            <span class="user_info_wrap_text">{{myAddressBook.targetWxid}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">来源</span>
            <span class="user_info_wrap_text">{{myAddressBook.addFrom}}</span>
          </div>
        </div>
      </div>
      <div class="user_info_item">
        <div class="user_info_title">客户档案</div>
        <div class="user_info_wrap">
          <div class="user_info_wrap_li" v-for="(item,index) in userInfoData" :key="index">
            <span class="user_info_wrap_sub">{{item.fieldLabel}}</span>
            <span
              :id="'fieldId'+item.fieldId"
              class="user_info_wrap_text userEdit"
              :class="{'editor': editState}"
              :contenteditable="editState"
            >{{item.recordValue}}</span>
          </div>
        </div>
      </div>
      <div class="user_info_item">
        <div class="user_info_title">标签</div>
        <div class="user_info_wrap">
          <p class="tag_tip" v-show="editState">已添加</p>
          <span class="user_info_wrap_tag" v-for="(item,index) in tagData" :key="index">
            {{item.labelName}}
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
	import util from '@/util/util.js'

export default {
  name: "RightBoxUserInfo",
  props: ['myAddressBook', 'editState'],
  data() {
    return {
      title: "",
      loading: false,
      editState: editState,
      userInfoData: [],
      tagData: [],
      allTags:[],
      flag:1,
      imei:util.getImei(),
      targetWxid: myAddressBook.targetWxid,
      add:'',
      myWxid: util.getMyWxId()
    };
  },
  watch: {
    myAddressBook(newObj){
      this.getLoadData(newObj);
    },
    editState(state){
      this.editState = state;
    }
  },
  components: {},
  methods: {
    getLoadData(obj){
      this.imei = util.getImei();
      this.targetWxid = obj.targetWxid;
      this.myWxid = util.getMyWxId();
      this.allTags = [];
      this.getdata();
      this.getTags({
            "tenantId": this.imei,
						 myWxid: util.getMyWxId()
          });
    },
    editor() {
      this.editState = !this.editState;
      if(!!this.editState){
      this.getTags({
            "tenantId": this.imei
          });
      } else {
        this.saveTag();
        this.saveUserInf();
      }
    },
    getTags(params) {
      let $this = this;
      this.$axios.post('/queryMyLabel', params)
        .then(data => {
          if(params.myWxid) {
            $this.tagData = data;
          } else {
            $this.allTags = data;
          }
        })
    },
    saveTag(){
      let tags = [];
      this.tagData.map(item=>{
        tags.push(item.labelName);
      })
      this.$axios.post('/setTag',{
             myWxid: this.getMyWxId,
             targetWxid: this.targetWxid,
             Tag: tags,
             imei: this.imei,
          })
        .then(data => {
  
        })
    },
    saveUserInf() {
      let _this = this;
      let fieldRecordList = _this.userInfoData;
      let tags = document.querySelectorAll('.userEdit');
      tags.forEach((v,k)=>{
        fieldRecordList[k]['recordValue'] = v.innerHTML;
        })
      this.$axios.post('/saveCustomer',{
             add: 1,
             wxid: this.targetWxid,
             fieldRecordList: fieldRecordList,
             imei: this.imei,
          })
        .then(data => {
  
        })
    },
    removeTag(index) {
			var tag = this.tagData.splice(index, 1);
			this.allTags = [...this.allTags, ...tag];
		},
		checkTag(index){
      var tag = this.allTags.splice(index, 1);
			this.tagData = [...this.tagData, ...tag];
    },
    getdata(){
      let $this = this;
        this.$axios.post('/getCustomerFieldRecords',{
              "imei": util.getImei(),
              "wxid": this.targetWxid
            })
          .then(data => {
              $this.userInfoData = data.fieldRecordList;
          })
    }
  },
  mounted() {
  },
  created() {
    // this.getLoadData(this.myAddressBook);
    // this.getUserInf();
    // this.getdata();
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
          min-height: 1.4em;
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