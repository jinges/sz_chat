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
        <div class="user_info_wrap" v-show="!editState">
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户姓名</span>
            <span class="user_info_wrap_text">{{userInfoData.name}}</span>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">手机号码</span>
            <span class="user_info_wrap_text">{{userInfoData.phone}}</span>
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
            <span class="user_info_wrap_text">{{formatLocal(userInfoData.licensePlateArea)}}</span>
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
            <span class="user_info_wrap_sub">备注 </span>
            <span class="user_info_wrap_text">{{userInfoData.remark}}</span>
          </div>
          <div
            class="user_info_wrap_li"
            v-if="(userInfoData.userStatus == 1 || userInfoData.userStatus == 2) ?true:false"
          >
            <span class="user_info_wrap_sub">下次回访时间</span>
            <span class="user_info_wrap_text big_row">{{userInfoData.nextVisitTime}}</span>
          </div>
          <div class="user_info_wrap_li" v-if="userInfoData.userStatus == 2 ?true:false">
            <span class="user_info_wrap_sub">到店时间</span>
            <span class="user_info_wrap_text">{{userInfoData.arrivalTime}}</span>
          </div>
          <div class="user_info_wrap_li" v-if="userInfoData.userStatus == 3 ?true:false">
            <span class="user_info_wrap_sub">战败原因</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 1">无购车意向</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 2">预算不符</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 3">客户已购车</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == 4">其它</span>
            <span class="user_info_wrap_text" v-if="userInfoData.defeatCause == null"></span>
          </div>
          <div class="user_info_wrap_li" v-if="userInfoData.userStatus == 3 ?true:false">
            <span class="user_info_wrap_sub">战败原因其他</span>
            <span class="user_info_wrap_text big_row">{{userInfoData.defeatCauseOther}}</span>
          </div>
        </div>
        <div class="user_info_wrap" v-show="editState">
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户姓名</span>
            <div class="user_info_wrap_text">
              <input
                type="text"
                class="editor"
                name="fullname"
                v-model="name"
                required="required"
                maxlength="10"
              />
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">手机号码</span>
            <div class="user_info_wrap_text">
              <input
                type="text"
                class="editor"
                name="fullname"
                v-model="phone"
                required="required"
                maxlength="11"
              />
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户性别</span>
            <div class="user_info_wrap_text">
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="1"
                  class="user_info_wrap_radio"
                  v-model="gender"
                  :checked="gender == 1 ? true:false"
                  required="required"
                />
                男
              </label>
              <label>
                <input
                  type="radio"
                  name="sex"
                  value="2"
                  class="user_info_wrap_radio1"
                  v-model="gender"
                  :checked="gender == 2 ? true:false"
                  required="required"
                />
                女
              </label>
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">意向车型</span>
            <div class="user_info_wrap_text">
              <input
                type="text"
                class="editor"
                v-model="intentModel"
                required="required"
                maxlength="50"
              />
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">上牌地区</span>
            <div class="user_info_wrap_text">
              <el-cascader
                size="large"
                :options="options"
                v-model="licensePlateArea"
                class="editor"
                @change="handleChange">
              </el-cascader>
              <!-- <input
                  type="text"
                  class="editor"
                  v-model="licensePlateArea"
                  required="required"
                  maxlength="50"
                /> -->
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">是否贷款</span>
            <div class="user_info_wrap_text">
              <label v-for="(item, index) of ['是','否']" :key="index">
                <input
                  type="radio"
                  name="isLoan"
                  value="1"
                  class="user_info_wrap_radio"
                  v-model="isLoan"
                  :checked="userInfoData.isLoan == index"
                  required="required"
                />
                {{item}}
              </label>
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">是否试驾</span>
            <div class="user_info_wrap_text">
              <label v-for="(item, index) of ['是','否']" :key="index">
                <input
                  type="radio"
                  name="isTestDrive"
                  value="1"
                  class="user_info_wrap_radio"
                  v-model="isTestDrive"
                  :checked="isTestDrive == index"
                />
                {{item}}
              </label>
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">购车预算</span>
            <div class="user_info_wrap_text">
              <input type="number" class="editor" v-model="purchaseBudget" />
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">用户状态</span>
            <div class="user_info_wrap_text">
              <label v-for="(item, index) of ['跟进中','到店','战败']" :key="index"  :for="item">
                <input
                  type="radio"
                  name="userStatus"
                  value="1"
                  :id="item"
                  class="user_info_wrap_radio"
                  v-model="userStatus"
                  required="required"
                  @change="changeUserStatus(index)"
                />
                {{item}}
              </label>
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">客户分级</span>
            <div class="user_info_wrap_text">
              <label v-for="(item, index) in ['H','A','B','C','D']" :key="index" @click="setLevel(item)">
                <input
                  type="radio"
                  name="grading"
                  :value="item"
                  class="user_info_wrap_radio"
                  v-model="grading"
                  :checked="grading == item"
                  required="required"
                />
                {{item}}
              </label>
            </div>
          </div>
          <div class="user_info_wrap_li">
            <span class="user_info_wrap_sub">备注</span>
            <div class="user_info_wrap_text">
              <textarea
                type="text"
                class="editor"
                v-model="remark"
                maxlength="200"
                rows="4"
                cols="5"
              />
            </div>
          </div>
          <div class="user_info_wrap_li" v-if="userStatus < 3">
            <span class="user_info_wrap_sub">下次回访时间</span>
            <div class="user_info_wrap_text big_row">
              <el-date-picker
                v-model="nextVisitTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                class="user_info_wrap_picker editor"
                size="small"
              ></el-date-picker>
            </div>
          </div>
          <div class="user_info_wrap_li" v-if="userStatus == 2">
            <span class="user_info_wrap_sub">到店时间</span>
            <div class="user_info_wrap_text">
              <el-date-picker
                v-model="arrivalTime"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                format="yyyy-MM-dd HH:mm:ss"
                class="user_info_wrap_picker editor"
                size="small"
              ></el-date-picker>
            </div>
          </div>
          <div class="user_info_wrap_li" v-if="userStatus == 3">
            <span class="user_info_wrap_sub">战败原因</span>
            <div class="user_info_wrap_text">
              <label v-for="(item, index) of ['无购车意向','预算不符','客户已购车','其他']" :key="index">
                <input
                  type="radio"
                  name="defeatCause"
                  value="1"
                  class="user_info_wrap_radio"
                  v-model="defeatCause"
                  :checked="defeatCause == index"
                />
                {{item}}
              </label>
            </div>
          </div>
          <div class="user_info_wrap_li" v-if="userStatus == 3">
            <span class="user_info_wrap_sub">战败原因其他</span>
            <div class="user_info_wrap_text big_row">
            <textarea
              type="text"
              class="editor"
              v-model="defeatCauseOther"
              maxlength="100"
              rows="4"
              cols="5"
            />
            </div>
          </div>
        </div>
      </div>
      <div class="user_info_item">
        <div class="user_info_title">标签</div>
        <div class="user_info_wrap">
          <p class="tag_tip" v-show="editState">已添加</p>
          <span class="user_info_wrap_tag" v-for="(item,index) in tagData" :key="index">
            {{item}}
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
            >{{item}}</span>
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
import { CodeToText, provinceAndCityData } from "element-china-area-data";
export default {
  name: "RightBoxUserInfo",
  props: ["myAddressBook"],
  data() {
    return {
      title: "",
      loading: false,
      name1:'',
      time2:'',
        editState: false,
        labelName: '',
        phone: '',
      userInfoData: {
        remark:'',
        name:'',
        phone: '',
        gender:'',
        intentModel:'',
        licensePlateArea:'',
        isLoan:'',
        isTestDrive: 0,
        purchaseBudget:'',
        userStatus:'',
        grading:'',
        remark:'',
        userStatus:'',
        arrivalTime:'',
        nextVisitTime:'',
        defeatCause:''
      },
      tagData: [],
      allTags: [],
      flag: 1,
      imei: util.getImei(),
      add: "",
      myWxid: util.getMyWxId(),
      options: provinceAndCityData,
      name: "",
      gender: "",
      intentModel: "",
      licensePlateArea: "",
      isLoan: "0",
      isTestDrive: 0,
      purchaseBudget: "",
      userStatus: "3",
      grading: "",
      remark: "", 
      nextVisitTime: "",
      arrivalTime: "",
      defeatCause: "",
      defeatCauseOther: ""
    };
  },
  watch: {
    myAddressBook(newObj) {
       this.getLoadData(newObj);
    }
  },
  components: {},
  methods: {
    setLevel(tag){
      debugger;
      let index = this.tagData.indexOf(tag);
      if(index > -1) {
        this.tagData.splice(index,1, tag);
      } else {
        this.tagData.push(tag);
      }
    },
    changeUserStatus(val) {
      this.userStatus = val + 1;
    },
    handleChange(value) {
      
      this.licensePlateArea = value[1];
    },
    getLoadData(obj) {
      debugger;
      this.imei = util.getImei();
      this.targetWxid = obj.targetWxid;
      this.myWxid = util.getMyWxId();
      this.allTags = [];
      this.getdata();
      this.tagData = obj.labelNames;
    },
    editor() {
      if (!this.editState) {
        this.getTags({
          tenantId: 1
        });
        this.editUserInfo();
      } else {
        this.saveUserInf();
        this.saveTag();
      }

        this.editState = !this.editState;
    },
    //点编辑赋值
    editUserInfo() {
      this.name = this.userInfoData.name;
      this.gender = parseInt(this.userInfoData.gender);
      this.intentModel = this.userInfoData.intentModel;
      this.licensePlateArea = this.userInfoData.licensePlateArea;
      // this.licensePlateArea = this.userInfoData.licensePlateArea;
      this.isLoan = parseInt(this.userInfoData.isLoan);
      this.isTestDrive = parseInt(this.userInfoData.isTestDrive);
      this.purchaseBudget = this.userInfoData.purchaseBudget;
      this.userStatus = parseInt(this.userInfoData.userStatus);
      this.grading = this.userInfoData.grading;
      this.remark = this.userInfoData.remark;
      this.nextVisitTime = this.userInfoData.nextVisitTime || new Date();
      this.arrivalTime = this.userInfoData.arrivalTime || new Date();
      this.defeatCause = parseInt(this.userInfoData.defeatCause);
      this.defeatCauseOther = this.userInfoData.defeatCauseOther;
      this.phone = this.userInfoData.phone;
    },
    getTags(params) {
      let $this = this;
      this.$axios.post("/queryMyLabel", params).then(data => {
          data.map(item=>{
            if(!this.tagData.includes(item.labelName)) {
              $this.allTags.push(item.labelName);
            }
          })
      });
    },
    saveTag() {
      let tags = [];
      this.tagData.map(item => {
        tags.push(item);
      });
      this.$axios
        .post("/setTag", {
          myWxid: this.myWxid,
          targetWxid: this.targetWxid,
          tag: tags,
          imei: this.imei
        })
        .then(data => {
          this.$store.commit('refershFriend');
        });
    },
    saveUserInf() {
      debugger;
      let targetWxid = this.myAddressBook.targetWxid;
      if (
        this.name == null ||
        this.gender == null ||
        this.intentModel == null ||
        this.licensePlateArea == null ||
        this.isLoan == null ||
        this.userStatus == null ||
        this.grading == null
      ) {
        this.$message({
          message: "有未填写的必输字段",
          type: "warn"
        });
        this.editState = true;
      } else {
        
        this.$axios
          .post("/saveCustomer", {
            myWxid: this.myWxid,
            wxid: targetWxid,
            imei: this.imei,
            name: this.name,
            id: this.userInfoData.id,
            phone: this.phone,
            gender: parseInt(this.gender),
            intentModel: this.intentModel,
            licensePlateArea: this.licensePlateArea,
            isLoan: parseInt(this.isLoan),
            isTestDrive: parseInt(this.isTestDrive),
            purchaseBudget: this.purchaseBudget,
            userStatus: parseInt(this.userStatus),
            grading: this.grading,
            remark: this.remark,
            //下次回访时间
            nextVisitTime: this.nextVisitTime,
            // nextVisitTime: "2019-12-02 12:00",
            //到店时间
            arrivalTime: this.arrivalTime,
            // arrivalTime: "2019-12-02 12:00",
            defeatCause: parseInt(this.defeatCause),
            defeatCauseOther: this.defeatCauseOther
          })
          .then(data => {
            this.getdata();
          });
      }
    },
    formatLocal(code){
      return code ? CodeToText[code] : '';
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
      this.$axios
        .post("/getCustomer", {
          imei: util.getImei(),
          wxid: this.targetWxid
        })
        .then(data => {
          this.userInfoData = data;
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
          color: #fff;
          vertical-align: middle;

          &.big_row{
            min-height: 3em;
          }

          .editor {
            border: 1px solid rgba(255, 255, 255, 0.2);
            background: rgba(255, 255, 255, 0.14);
            border-radius: 4px;
            padding: 0.04em 0.6em;
            min-width: 6em;
            width: 100%;
            line-height: 1.4em;
            color:#fff;
            &:focus {
              outline: none;
              color: #fff;
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
          
        }
        .user_info_wrap_picker {
          width: 100%;
          color: #fff;
        }
        .area-select{
            padding-left: 7px;
        }
        .user_info_wrap_cascader {
          
          // margin-left: 5em;
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

