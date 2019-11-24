<template>
<<<<<<< HEAD
	<div class="user_info">
		<div class="user_info_item" v-for="(item,index) in userInfoData">
			<div class="user_info_title">
				{{item.title}}
			</div>
			<div class="user_info_wrap">
				<div class="user_info_wrap_li" v-for="(item,index) in item.content">
					<span class="user_info_wrap_sub">{{item.sub}}</span>
					<span class="user_info_wrap_text">{{item.text}}</span>
				</div>

			</div>
		</div>

		<div class="user_info_item">
			<div class="user_info_title">
				标签
			</div>
			<div class="user_info_wrap">
				<span class="user_info_wrap_tag" v-for="(item,index) in tagData" :key="item.index">{{item.tagName}}</span>
			</div>
		</div>

	</div>
=======
  <div class="user_content">
    <div class="user_info">
      <div class="user_info_item" v-for="(item,index) in userInfoData" :key="index">
        <div class="user_info_title">{{item.title}}</div>
        <div class="user_info_wrap">
          <div class="user_info_wrap_li" v-for="(item,uindex) in item.content" :key="uindex">
            <span class="user_info_wrap_sub">{{item.fieldLabel}}</span>
            <span
              :id="'fieldId'+item.fieldId"
              class="user_info_wrap_text"
              :class="{'editor': (editState && index == 1)}"
              :contenteditable="(editState && index == 1)"
            >{{item.recordValue}}</span>
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
>>>>>>> dev
</template>

<script>
	import util from '@/util/util.js'

<<<<<<< HEAD
	export default {
		name: 'RightBoxUserInfo',
		data() {
			return {
				title: '',
				loading: false,
				userInfoData: [
					{
						title:"微信资料",
						content:[{
							sub:"备注",
							text:"有意向客户有意向客户有意向客户有意向客户有意向客户"
						},{
							sub:"地区",
							text:"广东 深圳"
						},{
							sub:"微信号",
							text:"A1234566"
						},{
							sub:"来源",
							text:"通过手机号添加"
						}]
					},{
						title:"客户档案",
						content:[{
							sub:"真实姓名",
							text:"张三"
						},{
							sub:"性别",
							text:"男"
						},{
							sub:"偏好",
							text:"高端车型"
						},{
							sub:"学历",
							text:"本科"
						}]
					}
				],
				tagData:[
					{
						tagName:"意向客户",
						tagId:"123456"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户高端客户高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户高端",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					},
					{
						tagName:"高端客户",
						tagId:"456789"
					}
				]
			}
		},
		watch: {
		},
		components: {
		},
		methods: {
			
		},
		created() {
			// this.loadData();
		}
	}
=======
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
              fieldLabel: "备注",
              recordValue: "有意向客户有意向客户有意向客户有意向客户有意向客户"
            },
            {
              fieldLabel: "地区",
              recordValue: "广东 深圳"
            },
            {
              fieldLabel: "微信号",
              recordValue: "A1234566"
            },
            {
              fieldLabel: "来源",
              recordValue: "通过手机号添加"
            }
          ]
        },
        {
          title: "客户档案",
          content: [
           
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
      ],
      imei:'',
      wxid:'',
      add:''
    };
  },
  watch: {},
  components: {},
  methods: {
    editor() {
			if(this.editState) {
        for(let i=0;i<this.userInfoData[1].content.length;i++){
            let str = 'fieldId'+this.userInfoData[1].content[i].fieldId;
            this.userInfoData[1].content[i].recordValue = document.getElementById(str).innerText
        }
			}
      this.editState = !this.editState;
      if(!this.editState){
        let obj = {}
        obj.add = this.add;
        obj.imei = this.imei;
        obj.wxid = this.wxid;
        obj.fieldRecordList = this.userInfoData[1].content;
        this.$axios.post('/saveCustomer', obj)
        .then(() => {
          this.getdata(this.wxid)
        })
      }
    },
    getTags() {},
    saveUserInf() {},
    removeTag(index) {
			var tag = this.tagData.splice(index, 1);
			this.allTags = [...this.allTags, ...tag];
		},
		checkTag(index){
      var tag = this.allTags.splice(index, 1);
			this.tagData = [...this.tagData, ...tag];
    },
    getdata(id){
        this.$axios.post('/getCustomerFieldRecords',{
              "imei": util.getImei(),
              "wxid": id
            })
          .then(data => {
              for(let i=0;i<this.userInfoData[1].content.length;i++){
                  let str = 'fieldId'+this.userInfoData[1].content[i].fieldId;
                  document.getElementById(str).innerText = ''
                  this.userInfoData[1].content[i].recordValue = document.getElementById(str).innerText
              }
              this.userInfoData[1].content = data.fieldRecordList;
              this.imei = data.imei;
              this.wxid = data.wxid;
              this.add = data.add;
          })
          .catch(() => {

          });
    }
  },
  created() {
    // this.getdata();
    // this.loadData();
  }
};
>>>>>>> dev
</script>

<style lang="scss" scoped>
	.user_info {
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;
		min-height:100%;
		padding-bottom: 12px;

		.user_info_item{
			padding: 6px 12px;

			.user_info_title{
				text-align: center;
				font-size: 16px;
				line-height: 2;
			}
			.user_info_wrap{
				border-radius: 4px;
				background-color: #333;
				background-color:rgba(255,255,255,.1);
				padding: 12px 0;
				min-height: 80px;

<<<<<<< HEAD
				.user_info_wrap_li{
					position: relative;
					padding: .2em;

					.user_info_wrap_sub{
						color: #aaa;
						width: 4em;
						position: absolute;
						left: 1em;
						text-align: justify;
        				text-align-last: justify;
					}
=======
      .user_info_wrap_li {
        position: relative;
        padding: 0.2em;
        min-height: 20px;
        .user_info_wrap_sub {
          color: #aaa;
          width: 4em;
          position: absolute;
          text-align: justify;
          text-align-last: justify;
        }
>>>>>>> dev

					.user_info_wrap_text{
						margin-left: 6.5em;
						margin-right: .5em;
						/*overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;*/
						display: block;
					}
				}
				.user_info_wrap_tag{
					display: inline-block;
					border-radius: 4px;
					border: 1px solid #666;
					padding: 0 .5em;
					margin: .5em .3em;
					line-height: 2;
				}
			}
		}
	}
</style>
