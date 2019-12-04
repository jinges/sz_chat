<template>
	<div class="addFriends">
		<div class="tips">
			<div class="msg">
				<div>*注意：为保证账号安全每日添加好友上限制为30人</div>
				<div>若您的好友添加计划超出上限，将自动将添加计划顺延至下一天。</div>
			</div>
		</div>

		<div class="content">
			<div style="width: 100%; border-bottom: 1px solid #d5d5d5; cursor: pointer;">
				<div class="title" @click="showAddFriendDialog()" style="text-align: center; padding: 10px; width: 13%; float: left;">
					<i class="el-icon-plus"></i>添加
				</div>
				<div class="title" @click="showExportAddFriendDialog()" style="float: left; padding: 10px; width: 82%; border: 0;">
					<i class="el-icon-download"></i>导出
				</div>
				<div style="clear: both;"></div>
			</div>
			<div class="addFriends-type">
				<!-- <div class="title" @click="showAddFriendDialog()"><i class="el-icon-plus"></i>添加</div> -->
				<div class="type-list">
					<div class="type-item on" show-type="">全部</div>
					<div class="type-item" show-type="等待添加">等待中</div>
					<div class="type-item" show-type="需好友验证">需好友验证</div>
					<div class="type-item" show-type="添加成功">已添加</div>
					<!-- <div class="type-item" show-type="对方已拒绝">被拒绝</div> -->
					<div class="type-item" show-type="未回应">未回应</div>
					<div class="type-item" show-type="查找失败">未找到</div>
					<!-- <div class="type-item" show-type="好友已经存在">好友已存在</div> -->
				</div>
			</div>
			<div class="addFriends-list">
				<!-- <div class="title" @click="showExportAddFriendDialog()"><i class="el-icon-download"></i>导出</div> -->
				<div class="friends-list" style="overflow: auto; height: 500px;">
					<div class="friend session" v-for="(item, index) in addFriendsInfo.data" :key="index" :status="item.status">
						<img class="face" :src="item.head || headimgurl" />
						<div class="content">
							<div class="info" v-if="item.status!='查找失败'">
								<div class="name">{{item.name || '未获取'}}</div>
								<div class="address">{{item.province || '所在地'}}{{item.city}}</div>
							</div>
							<div class="info" v-else>
								<div class="name" style="line-height: 35px;">{{item.name || '未找到用户'}}</div>
							</div>
							<div class="phone">{{item.wxid}}</div>
							<div class="addTimes">{{item.createdAt}}</div>
							<div class="status">
								<div style="color: rgb(122, 171, 94);" v-if="item.status=='等待添加'">等待添加</div>
								<div style="color: rgb(122, 171, 94);" v-if="item.status=='需好友验证'">需好友验证</div>
								<div style="color: #C0C4CC;" v-if="item.status=='添加成功'">添加成功</div>
								<!-- <div style="color: rgb(218, 0, 18);" v-if="item.status=='对方已拒绝'">对方已拒绝</div> -->
								<div style="color: rgb(179, 120, 78);" v-if="item.status=='未回应'">未回应</div>
								<div style="color: rgb(218, 0, 18);" v-if="item.status=='查找失败'">查找失败</div>
								<!-- <div style="color: #C0C4CC;" v-if="item.status=='好友已经存在'">好友已经存在</div> -->
							</div>
							<div class="icon" style="font-size: 180%;">
								<i class="el-icon-success" v-if="item.status=='添加成功' || item.status=='好友已经存在'"></i>
								<i class="el-icon-warning" v-if="item.status=='需好友验证' || item.status=='未回应' || item.status=='等待添加'"></i>
								<i class="el-icon-error" v-if="item.status=='对方已拒绝' || item.status=='查找失败'"></i>
							</div>
						</div>
					</div>
				</div>
				<el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="addFriendsInfo.totalRecords" @current-change="currentChange"></el-pagination>
			</div>
		</div>

		<el-dialog title="新建好友添加任务" width="400px" :visible="isShowAddFriendDialog" :before-close="closeAddFriendDialog" id="addFriendDialog">
			<el-tabs v-model="addType" type="card" :stretch="true">
				<el-tab-pane label="批量添加" name="batchAdd">
					<el-form ref="form" hide-required-asterisk status-icon style="padding: 0 20px;">
						<el-form-item label="导入好友列表">
							<!-- <el-upload
								class='image-uploader'
								:multiple='false'
								:auto-upload='true'
								list-type='text'
								:show-file-list='true'
								:before-upload="beforeUpload"
								:drag='true'
								action=''
								:limit="1"
								:on-exceed="handleExceed"
								:http-request="uploadFile" >
								<i class="el-icon-upload"></i>
								<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
								<div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限text格式，单文件不超过1MB</div>
							</el-upload> -->
							<el-upload
							  class="upload-demo"
							  ref="upload"
							  action="/importAddfriendExcel"
							  :auto-upload="false"
							  :data="{imei: imei}"
							  :headers="batchAddHeaders">
							  <el-input type="hidden" name="imei" value="1"></el-input>
							  <el-input slot="trigger" placeholder="请选择名单文件" readonly="readonly" suffix-icon="el-icon-folder"></el-input>
							  <!-- <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
							  <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
							</el-upload>
						</el-form-item>
						<el-form-item label="打招呼消息" prop="sendWord" style="display: none;">
							<el-input placeholder="您好!"></el-input>
						</el-form-item>
						<el-form-item style="text-align: center;">
							<el-button size="small" type="primary" @click="onSubmitBatchAdd">加入队列</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="指定添加" name="appointAdd">
					<el-form ref="appointAddForm" :rules="appointAddRules" :model="appointAddFormData" hide-required-asterisk status-icon style="padding: 0 20px;">
						<el-form-item label="添加指定的微信好友(该好友将优化被添加)" prop="wxid">
							<el-input v-model="appointAddFormData.wxid" placeholder="请输入对方手机号码"></el-input>
						</el-form-item>
						<el-form-item label="打招呼消息" prop="msg">
							<el-input v-model="appointAddFormData.msg" placeholder="您好!"></el-input>
						</el-form-item>
						<el-form-item style="text-align: center;">
							<el-button size="small" type="primary" @click="onSubmitAppointAdd">加入队列</el-button>
						</el-form-item>
					</el-form>
				</el-tab-pane>
				<el-tab-pane label="未通过用户重试" name="retryAdd">
					<div style="padding: 0 20px;">
						<div>选择需要重新尝试添加的用户</div>
						<div style="margin: 15px 0;"></div>
						<el-checkbox v-model="retryType" :label="6">需要好友验证({{addFriendsWaitVerificationCount}})</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox v-model="retryType" :label="3">未回复({{addFriendsUnansweredCount}})</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<div style="text-align: center; margin: 20px;">
							<el-button size="small" type="primary" @click="onSubmitRetry">加入队列</el-button>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
		</el-dialog>

		<el-dialog title="新建好友添加任务" width="400px" :visible="isShowExportAddFriendDialog" :before-close="closeExportAddFriendDialog"
		 id="exportAddFriendDialog">
			<div style="padding: 0 20px;">
				<div>选择需要导出的用户</div>
				<div style="margin: 15px 0;"></div>
				<el-checkbox v-model="exportType" :label="1">已添加({{addFriendsSuccessCount}})</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox v-model="exportType" :label="0">等待中({{addFriendsWaitCount}})</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox v-model="exportType" :label="6" style="margin-right: 10px;">需好友验证({{addFriendsWaitVerificationCount}})</el-checkbox>
				<el-checkbox v-model="exportType" :label="3" style="margin-right: 10px;">未回应({{addFriendsUnansweredCount}})</el-checkbox>
				<el-checkbox v-model="exportType" :label="4" style="margin-right: 10px;">未找到({{addFriendsFailCount}})</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<div style="text-align: center; margin: 20px;">
					<el-button size="small" type="primary" @click="onSubmitExport">导出</el-button>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import $ from 'jquery'
	import util from '@/util/util.js'

	export default {
		data() {
			return {
				imei: '',
				showType: '',
				isShowAddFriendDialog: false,
				isShowExportAddFriendDialog: false,
				addType: 'batchAdd',
				addFriendsInfo: {
					data: [{
						name: '养车达人',
						address: '广东深圳',
						phone: '13623051216',
						addTimes: '2019-11-24 12:12:12',
						status: '1'
					}],
					totalRecords: 0
				},
				appointAddFormData: {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					sendWord: '你好，我是' + JSON.parse(util.getMyWxInfo()).nickName,
					wxid: '',
					msg: ''
				},
				appointAddRules: {
				    wxid: [{
				        required: true,
				        message: "微信号不能为空",
				        trigger: "blur"
				    }],
				    msg: [{
				        required: true,
				        message: "打招呼不能为空",
				        trigger: "blur"
				    }]
				},
				batchAddHeaders: {
					Authorization: 'Bearer:' + util.getToken()
				},
				pageSize: 10,
				retryType: [],
				exportType: [],
				addFriendsAllCount: 0,
				addFriendsWaitCount: 0,
				addFriendsWaitVerificationCount: 0,
				addFriendsSuccessCount: 0,
				addFriendsRefuseCount: 0,
				addFriendsUnansweredCount: 0,
				addFriendsFailCount: 0,
				addFriendsRepeatCount: 0,
				headimgurl: require('../assets/timg.jpg')
			}
		},
		methods: {
			// 获取添加好友列表
			getAddFriendInfo: function(pageIndex) {
				this.statusGroupAddfriend();
				this.$axios.post('/queryAddfriendByPage', {
					imei: util.getImei(),
					my_wxid: util.getMyWxId(),
					page: pageIndex,
					rows: this.pageSize
				}).then(data => {
					for (var i = 0; i < data.data.length; i++) {
						data.data[i].createdAt = data.data[i].createdAt.replace('T', ' ');
						
						/**
						switch(data.data[i].status) {
							case '添加成功':
								this.addFriendsSuccessCount ++;
							break;
							case '对方已拒绝':
								this.addFriendsRefuseCount ++;
							break;
							case '未回应':
								this.addFriendsUnansweredCount ++;
							break;
							case '查找失败':
								this.addFriendsFailCount ++;
							break;
							case '好友已经存在':
								this.addFriendsRepeatCount ++;
							break;
							case '等待添加':
								this.addFriendsWaitCount ++;
								break;
							case '需好友验证':
								this.addFriendsWaitVerificationCount ++;
								break;
						}
						*/
					}
					this.addFriendsInfo = data;
				}).catch(() => {});
			},
			// 弹出添加好友页面
			showAddFriendDialog: function() {
				this.isShowAddFriendDialog = true;
				this.addType = 'batchAdd';
				this.imei = util.getImei();
				this.appointAddFormData = {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					sendWord: '你好，我是' + JSON.parse(util.getMyWxInfo()).nickName,
					wxid: '',
					msg: ''
				}
				this.retryType = [];
				this.exportType = [];
			},
			// 关闭添加好友页面
			closeAddFriendDialog: function() {
				this.isShowAddFriendDialog = false;
			},
			// 弹出导出添加好友记录页面
			showExportAddFriendDialog: function() {
				this.isShowExportAddFriendDialog = true;
				this.exportType = [];
			},
			// 关闭导出添加好友页面
			closeExportAddFriendDialog: function() {
				this.isShowExportAddFriendDialog = false;
			},
			// 指定添加提交
			onSubmitAppointAdd: function() {
				this.$refs["appointAddForm"].validate(valid => {
					if (valid) {
						this.$axios.post("/addSingleAddfrien", this.appointAddFormData)
							.then((data) => {
								this.closeAddFriendDialog();
								this.getAddFriendInfo(1);
							})
							.catch(() => {});
					} else {
						return false;
					}
				});
			},
			// 导入Excel批量添加
			onSubmitBatchAdd: function() {
				this.$refs.upload.submit();
				this.closeAddFriendDialog();
				this.getAddFriendInfo(1);
			},
			// 重试
			onSubmitRetry: function() {
				if(this.retryType.length > 0) {
					var data = {
						imei: util.getImei(),
						myWxid: util.getMyWxId(),
						statusList: this.retryType
					}
					this.$axios.post("/reTryAddfrien", data)
						.then((data) => {
							this.closeAddFriendDialog();
							this.getAddFriendInfo(1);
						})
						.catch(() => {});
				} else {
					
				}
			},
			// 导出
			onSubmitExport: function() {
				if(this.exportType.length > 0) {
					var data = {
						imei: util.getImei(),
						myWxid: util.getMyWxId(),
						statuss: this.exportType.join(',')
					}
					window.open("/api/exportMyFriend?imei=" + data.imei + "&myWxid=" + data.myWxid + "&statuss=" + data.statuss, '_blank');
					return;
					this.$axios.get("/exportMyFriend?imei=" + data.imei + "&myWxid=" + data.myWxid + "&statuss=" + data.statuss, data)
						.then((data) => {
							this.closeAddFriendDialog();
						})
						.catch(() => {});
				} else {
					
				}
			},
			// 添加好友的统计
			statusGroupAddfriend: function() {
				this.addFriendsAllCount = 0;
				this.addFriendsWaitCount = 0;
				this.addFriendsWaitVerificationCount = 0;
				this.addFriendsSuccessCount = 0;
				this.addFriendsRefuseCount = 0;
				this.addFriendsUnansweredCount = 0;
				this.addFriendsFailCount = 0;
				this.addFriendsRepeatCount = 0;
				var data = {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
				}
				this.$axios.post("/statusGroupAddfriend", data)
					.then((data) => {
						for (var i = 0; i < data.length; i++) {
							var status = data[i].status;
							switch(status) {
								case "0":
									this.addFriendsWaitCount = data[i].count;
								break;
								case "1":
									this.addFriendsSuccessCount = data[i].count;
								break;
								case "3":
									this.addFriendsUnansweredCount = data[i].count;
								break;
								case "4":
									this.addFriendsFailCount = data[i].count;
								break;
								case "6":
									this.addFriendsWaitVerificationCount = data[i].count;
								break;
							}
						}
					})
					.catch(() => {});
			},
			currentChange:function(currentPage){
			    this.getAddFriendInfo(currentPage);
			}
		},
		mounted: function() {
			let that = this;
			// that.getAddFriendInfo(1);

			$(".type-list .type-item").click(function(e) {
				$(".type-list .type-item").removeClass('on');
				$(this).addClass('on');
				this.showType = $(this).attr('show-type');
				if(this.showType == '') {
					$(".friends-list .friend").show();
				} else {
					$(".friends-list .friend").hide();
					$(".friends-list .friend[status='" + this.showType + "']").show();
				}
			});
		}
	}
</script>

<style lang="scss">
	.addFriends .tips {
		position: relative;
		height: 75px;
		border-bottom: 1px solid #5a5a5a;
		font-size: 90%;
		line-height: 25px;

		.msg {
			position: absolute;
			top: 15px;
			left: 23px;
			color: #ccc;
		}
	}

	.addFriends .content {
		.addFriends-type {
			float: left;
			width: 15%;

			.title {
				text-align: center;
				padding: 10px;
				border-bottom: 1px solid #5a5a5a;

				.el-icon-plus {
					margin-right: 5px;
				}
			}

			.type-list {
				.type-item {
					font-size: 90%;
					text-align: center;
					padding: 10px;
					border-bottom: 1px solid #5a5a5a;
					color: #aaa;

					&.on {
						background-color: green;
					}
				}
			}
		}

		.addFriends-list {
			float: left;
			width: 85%;

			.title {
				padding: 10px;
				border-bottom: 1px solid #5a5a5a;

				.el-icon-download {
					margin-right: 5px;
				}
			}
		}
	}

	.session {
		font-size: 14px;
		display: flex;
		padding: 15px;
		cursor: pointer;
		box-sizing: border-box;
		position: relative;
		border-bottom: 1px solid #5a5a5a;

		&.newmsg:not[active] {
			&:before {
				content: '';
				position: absolute;
				display: inline-block;
				width: 8px;
				background: #F56C6C;
				height: 8px;
				border-radius: 100%;
				left: 42px;
				top: 7px;
				border: 1px solid #fff;
			}
		}

		&:hover {
			background: rgba(230, 162, 60, 0.2);
		}

		&[active] {
			background: rgba(230, 162, 60, 0.5);

			.lastMsg {
				color: #fff;
			}
		}

		.face {
			width: 38px;
			height: 38px;
			border-radius: 3px;
			margin-right: 13px;
		}

		.content {
			flex-grow: 1;
			width: 1px;

			.info,
			.phone,
			.addTimes,
			.status,
			.icon {
				float: left;
				width: 20%;
				color: #C0C4CC;
				line-height: 38px;
			}

			.status {
				padding-left: 20px;
				width: 25%;
			}

			.icon {
				width: 10%;
			}

			.info {
				line-height: inherit;
			}

			.name {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: inline-block;
				max-width: 128px;
				vertical-align: middle;
			}

			.address {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				font-size: 12px;
				color: #C0C4CC;
				clear: both;
				margin-top: 3px;
			}
		}
	}

	#addFriendDialog {
		.el-dialog__header {
			padding: 12px;
			border-bottom: 1px solid #E9E9E9;
		}

		.el-dialog__body {
			padding: 0;
		}

		.el-tabs__item {}

		.el-form-item {
			margin-bottom: 10px;
		}
	}

	#exportAddFriendDialog {
		.el-dialog__header {
			padding: 12px;
			border-bottom: 1px solid #E9E9E9;
		}

		.el-dialog__body {
			padding: 12px;
		}
	}
	
	.el-upload {
		width: 100%;
	}
	
	.el-form-item__content {
		line-height: 0;
	}
</style>
