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
      
      
      <div class="user_info_item" >
        <div class="user_info_title">客户档案</div>
        <div class="user_info_wrap" v-if="!editState">
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户姓名</span>
            <span class="user_info_wrap_text">{{userInfoData.name}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户性别</span>
            <span class="user_info_wrap_text" v-if="userInfoData.gender == 1">男</span>
            <span class="user_info_wrap_text" v-if="userInfoData.gender == 2">女</span>
            <span class="user_info_wrap_text" v-if="userInfoData.gender == null"></span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">意向车型</span>
            <span class="user_info_wrap_text">{{userInfoData.intentModel}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">上牌地区</span>
            <span class="user_info_wrap_text">{{userInfoData.licensePlateArea}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">是否贷款</span>
            <span class="user_info_wrap_text" v-if="userInfoData.isLoan == 0">否</span>
            <span class="user_info_wrap_text" v-if="userInfoData.isLoan == 1">是</span>
            <span class="user_info_wrap_text" v-if="userInfoData.isLoan == null"></span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">是否试驾</span>
            <span class="user_info_wrap_text" v-if="userInfoData.isTestDrive == 0">否</span>
            <span class="user_info_wrap_text" v-if="userInfoData.isTestDrive == 1">是</span>
            <span class="user_info_wrap_text" v-if="userInfoData.isTestDrive == null"></span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">购车预算</span>
            <span class="user_info_wrap_text">{{userInfoData.purchaseBudget}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">用户状态</span>
            <span class="user_info_wrap_text" v-if="userInfoData.userStatus == 1">跟进中</span>
            <span class="user_info_wrap_text" v-if="userInfoData.userStatus == 2">到店</span>
            <span class="user_info_wrap_text" v-if="userInfoData.userStatus == 3">战败</span>
            <span class="user_info_wrap_text" v-if="userInfoData.userStatus == null"></span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户分级</span>
            <span class="user_info_wrap_text">{{userInfoData.grading}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">备注</span>
            <span class="user_info_wrap_text">{{userInfoData.remark}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">下次回访时间</span>
            <span class="user_info_wrap_text">{{userInfoData.nextVisitTime}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">到店时间</span>
            <span class="user_info_wrap_text">{{userInfoData.arrivalTime}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">战败原因</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 1">无购车意向</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 2">预算不符</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 3">客户已购车</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 4">其它</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == null"></span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">战败原因其他</span>
            <span class="user_info_wrap_text">{{userInfoData.defeatCauseOther}}</span>
          </div>
        </div>
        <div class="user_info_wrap" v-if="editState">
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户姓名</span>
            <input type="text" class="user_info_wrap_text editor" id="name" v-model="userInfoData.name"/>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户性别</span>
            <input type="radio" name="sex" value="1" class="user_info_wrap_radio" :checked="userInfoData.gender == 1 ? true:false"/>
            <label>男</label>
            <input type="radio" name="sex" value="2" class="user_info_wrap_radio1" :checked="userInfoData.gender == 2 ? true:false"/>
            <label>女</label>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">意向车型</span>
            <input type="text" class="user_info_wrap_text editor" v-model="userInfoData.intentModel"/>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">上牌地区</span>
            <area-cascader
              v-model="selected2"
              :data="$pcaa"
              :level="1"
              size="small"
              @change="handleChange"
              class="user_info_wrap_cascader"
            ></area-cascader>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">是否贷款</span>
            <input type="radio" name="isLoan" value="1" class="user_info_wrap_radio" :checked="userInfoData.isLoan == 1 ? true:false"/>
            <label>是</label>
            <input type="radio" name="isLoan" value="0" class="user_info_wrap_radio1" :checked="userInfoData.isLoan == 0 ? true:false" />
            <label>否</label>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">是否试驾</span>
            <input type="radio" name="isTestDrive" value="1" class="user_info_wrap_radio" :checked="userInfoData.isTestDrive == 1 ? true:false"/>
            <label>是</label>
            <input type="radio" name="isTestDrive" value="0" class="user_info_wrap_radio1" :checked="userInfoData.isTestDrive == 0 ? true:false"/>
            <label>否</label>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">购车预算</span>
            <input type="text" class="user_info_wrap_text editor" v-model="userInfoData.purchaseBudget"/>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">用户状态</span>
            <input type="radio" name="userStatus" value="1" class="user_info_wrap_radio" :checked="userInfoData.userStatus == 1 ? true:false"/>
            <label>跟进中</label>
            <input type="radio" name="userStatus" value="2" class="user_info_wrap_radio1" :checked="userInfoData.userStatus == 2 ? true:false"/>
            <label>到店</label>
            <input type="radio" name="userStatus" value="3" class="user_info_wrap_radio1" :checked="userInfoData.userStatus == 3 ? true:false"/>
            <label>战败</label>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户分级</span>
            <input type="radio" name="grading" value="A" class="user_info_wrap_radio" :checked="userInfoData.grading == A ? true:false"/>
            <label>A</label>
            <input type="radio" name="grading" value="B" class="user_info_wrap_radio1" :checked="userInfoData.grading == B ? true:false"/>
            <label>B</label>
            <input type="radio" name="grading" value="C" class="user_info_wrap_radio1" :checked="userInfoData.grading == C ? true:false"/>
            <label>C</label>
            <input type="radio" name="grading" value="D" class="user_info_wrap_radio1" :checked="userInfoData.grading == D ? true:false"/>
            <label>D</label>
            <input type="radio" name="grading" value="H" class="user_info_wrap_radio" :checked="userInfoData.grading == H ? true:false"/>
            <label>H</label>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">备注</span>
            <input type="text" class="user_info_wrap_text editor" v-model="userInfoData.remark"/>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">下次回访时间</span>
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              class="user_info_wrap_picker"
              size="small"
            ></el-date-picker>
            <!-- <date-picker v-model="time2" type="datetime" class="user_info_wrap_picker"></date-picker> -->
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">到店时间</span>
            <el-date-picker
              v-model="value1"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss"
              format="yyyy-MM-dd HH:mm:ss"
              class="user_info_wrap_picker"
              size="small"
            ></el-date-picker>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">战败原因</span>
            <input type="radio" name="defeatCause" value="1" class="user_info_wrap_radio" checked="userInfoData.defeatCause == 1 ? true:false"/>
            <label>无购车意向</label>
            <input type="radio" name="defeatCause" value="2" class="user_info_wrap_radio1" checked="userInfoData.defeatCause == 2 ? true:false"/>
            <label>预算不符</label>
            <input type="radio" name="defeatCause" value="3" class="user_info_wrap_radio1" checked="userInfoData.defeatCause == 3 ? true:false"/>
            <label>客户已购车</label>
            <input type="radio" name="sdefeatCauseex" value="4" class="user_info_wrap_radio1" checked="userInfoData.defeatCause == 4 ? true:false"/>
            <label>其他</label>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">战败原因其他</span>
            <input type="text" class="user_info_wrap_text editor" v-model="userInfoData.defeatCauseOther"/>
          </div>
        </div> 
      </div>
      <div class="user_info_item">
        <div class="user_info_title">标签</div>
        <div class="user_info_wrap">
          <p class="tag_tip" v-show="editState">已添加</p>
          <span class="user_info_wrap_tag" v-for="(item,index) in tagData" :key="index">
            {{item.labelName}}
            <em
              class="del el-icon-close"
              @click="removeTag(index)"
              v-show="editState"
            ></em>
          </span>
          <div v-show="editState">
            <p class="tag_tip">未添加</p>
            <span
              class="user_info_wrap_tag no_sel"
              @click="checkTag(index)"
              v-for="(item,index) in allTags"
              :key="index"
            >{{item.tagName}}</span>
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
import { regionData, provinceAndCityDataPlus } from "element-china-area-data";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  name: "RightBoxUserInfo",
  props: ["myAddressBook", "editState"],
  components: { DatePicker },
  data() {
    return {
      title: "",
      loading: false,
      // editState: editState,
      // userInfoData: [],
      userInfoData: {},
      tagData: [],
      allTags: [],
      flag: 1,
      imei: util.getImei(),
      targetWxid: myAddressBook.targetWxid,
      add: "",
      myWxid: util.getMyWxId(),
      value1: "",
      options: provinceAndCityDataPlus,
      selected2: [],
      time2:'',
      name:''
    };
  },
  watch: {
    myAddressBook(newObj) {
      this.getLoadData(newObj);
    },
    editState(olddata, state) {
      console.log(olddata, state);
      this.editState = state;
    }
  },
  components: {},
  methods: {
    handleChange(value) {
      // debugger;
      console.log(111);
      console.log(value);
    },
    getLoadData(obj) {
      this.imei = util.getImei();
      this.targetWxid = obj.targetWxid;
      this.myWxid = util.getMyWxId();
      this.allTags = [];
      this.getdata();
      this.getTags({
        tenantId: this.imei,
        myWxid: util.getMyWxId()
      });
    },
    editor() {
      this.editState = !this.editState;
      if (!!this.editState) {
        this.getTags({
          tenantId: this.imei
        });
      } else {
        this.saveTag();
        this.saveUserInf();
      }
    },
    getTags(params) {
      let $this = this;
      this.$axios.post("/queryMyLabel", params).then(data => {
        if (params.myWxid) {
          $this.tagData = data;
        } else {
          $this.allTags = data;
        }
      });
    },
    saveTag() {
      let tags = [];
      this.tagData.map(item => {
        tags.push(item.labelName);
      });
      debugger;
      this.$axios
        .post("/setTag", {
          myWxid: this.myWxid,
          targetWxid: this.targetWxid,
          Tag: tags,
          imei: this.imei
        })
        .then(data => {});
    },
    saveUserInf() {
      let _this = this;
      let fieldRecordList = _this.userInfoData;
      console.log(fieldRecordList);
      // let tags = document.querySelectorAll(".userEdit");
      // tags.forEach((v, k) => {
      //   fieldRecordList[k]["recordValue"] = v.innerHTML;
      // });
      this.$axios
        .post("/saveCustomer", {
          add: 1,
          wxid: this.targetWxid,
          fieldRecordList: fieldRecordList,
          imei: this.imei
        })
        .then(data => {});
    },
    removeTag(index) {
      var tag = this.tagData.splice(index, 1);
      this.allTags = [...this.allTags, ...tag];
    },
    checkTag(index) {
      var tag = this.allTags.splice(index, 1);
      this.tagData = [...this.tagData, ...tag];
    },
    getdata() {
      let $this = this;
      this.$axios
        .post("/getCustomer", {
          imei: util.getImei(),
          wxid: this.targetWxid
        })
        .then(data => {
          $this.userInfoData = data;
          // console.log($this.userInfoData);
        });
    }
  },
  mounted() {},
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
      padding: 0.6em 1em;
      min-height: 80px;
      font-size: 0.9em;
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
            width: 6em;
            &:focus {
              outline: none;
            }
          }
          // &.local {
          //   width: 7.4em;
          //   border: 1px solid rgba(255, 255, 255, 0.2);
          //   background: rgba(255, 255, 255, 0.14);
          //   border-radius: 4px;
          //   padding: 0.04em 0.6em;
          //   opacity: 0.2;
          // }
        }
        .user_info_wrap_radio {
          margin-left: 5.2em;
        }
        .user_info_wrap_picker {
          margin-left: 5.5em;
          border: 1px solid rgba(255, 255, 255, 0.2);
          // width: 10em;
          // opacity: 0.2;
        }
        .user_info_wrap_cascader {
          margin-left: 5em;
          // border: 1px solid rgba(255, 255, 255, 0.2);
          // opacity: 0.2;
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
        font-size: 0.88em;
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
        &.no_sel {
          color: #5297e8;
          border-color: #5297e8;
        }
      }
      .tag_tip {
        margin: 0.1em;
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