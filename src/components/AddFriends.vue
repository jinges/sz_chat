<template>
	<div class="addFriends">
		<div class="tips">
			<div class="msg">
				<div>*注意：为保证账号安全每日添加好友上限制为30人</div>
				<div>若您的好友添加计划超出上限，将自动将添加计划顺延至下一天。</div>
			</div>
		</div>
		
		<div class="content">
			<div class="addFriends-type">
				<div class="title" @click="showAddFriendDialog()"><i class="el-icon-plus"></i>添加</div>
				<div class="type-list">
					<div class="type-item on" type="-1">全部</div>
					<div class="type-item" type="0">等待中</div>
					<div class="type-item" type="1">已添加</div>
					<div class="type-item" type="2">被拒绝</div>
					<div class="type-item" type="3">未回应</div>
					<div class="type-item" type="4">未找到</div>
					<div class="type-item" type="5">好友已存在</div>
				</div>
			</div>
			<div class="addFriends-list">
				<div class="title" @click="showExportAddFriendDialog()"><i class="el-icon-download"></i>导出</div>
				<div class="friends-list" style="overflow: auto; height: 580px;">
					<div class="friend session" v-for="(item, index) in addFriendsInfo.data" :key="index">
					    <img class="face" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3901832655,3141114671&fm=26&gp=0.jpg" />
					    <div class="content">
					        <div class="info">
								<div class="name">{{item.name}}</div>
								<div class="address">{{item.address}}</div>
							</div>
							<div class="phone">{{item.phone}}</div>
							<div class="addTimes">{{item.addTimes}}</div>
							<div class="status">
								<div style="color: #435837;" v-if="item.status==0">等待添加</div>
								<div style="color: #C0C4CC;" v-if="item.status==1">添加成功</div>
								<div style="color: #6e3e42;" v-if="item.status==2">对方已拒绝</div>
								<div style="color: #785f4d;" v-if="item.status==3">未回应</div>
								<div style="color: #6e3e42;" v-if="item.status==4">查找失败</div>
								<div style="color: #C0C4CC;" v-if="item.status==5">好友已经存在</div>
								<div style="color: #C0C4CC;" v-if="item.status==6">需好友验证</div>
							</div>
							<div class="icon" style="font-size: 180%;">
								<i class="el-icon-success" v-if="item.status==1 || item.status==5"></i>
								<i class="el-icon-warning" v-if="item.status==0 || item.status==3 || item.status==6"></i>
								<i class="el-icon-error" v-if="item.status==2 || item.status==4"></i>
							</div>
					    </div>
					</div>
				</div>
			</div>
		</div>
		
		<el-dialog title="新建好友添加任务" width="400px" :visible="isShowAddFriendDialog" :before-close="closeAddFriendDialog" id="addFriendDialog">
			<el-tabs v-model="addType" type="card" @tab-click="handleClick" :stretch="true">
			    <el-tab-pane label="批量添加" name="batchAdd">
					<el-form ref="form" hide-required-asterisk status-icon style="padding: 0 20px;">
					    <el-form-item label="导入好友列表">
					        <el-input placeholder="选择名单文件"></el-input>
					    </el-form-item>
					    <el-form-item label="打招呼消息" prop="sendWord">
					        <el-input placeholder="您好!"></el-input>
					    </el-form-item>
					    <el-form-item style="text-align: center;">
					        <el-button size="small" type="primary" @click="onSubmit">加入队列</el-button>
					    </el-form-item>
					</el-form>
				</el-tab-pane>
			    <el-tab-pane label="指定添加" name="appointAdd">
					<el-form ref="appointAddForm" :model="appointAddFormData" hide-required-asterisk status-icon style="padding: 0 20px;">
					    <el-form-item label="添加指定的微信好友(该好友将优化被添加)">
					        <el-input v-model="appointAddFormData.wxid" placeholder="请输入对方手机号码"></el-input>
					    </el-form-item>
					    <el-form-item label="打招呼消息" prop="sendWord">
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
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">被拒绝(20)</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">未回复(20)</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<div style="text-align: center; margin: 20px;">
					        <el-button size="small" type="primary" @click="onSubmit">加入队列</el-button>
						</div>
					</div>
				</el-tab-pane>
			  </el-tabs>
		</el-dialog>
		
		<el-dialog title="新建好友添加任务" width="400px" :visible="isShowExportAddFriendDialog" :before-close="closeExportAddFriendDialog" id="exportAddFriendDialog">
			<div style="padding: 0 20px;">
				<div>选择需要导出的用户</div>
				<div style="margin: 15px 0;"></div>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">已添加(20)</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">等待中(20)</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">被拒绝(20)</el-checkbox>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">未回应(20)</el-checkbox>
				<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">未找到(20)</el-checkbox>
				<div style="margin: 15px 0;"></div>
				<div style="text-align: center; margin: 20px;">
			        <el-button size="small" type="primary" @click="onSubmit">导出</el-button>
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
				isShowAddFriendDialog: false,
				isShowExportAddFriendDialog: false,
				addType: 'batchAdd',
				addFriendsInfo: {
					data: [
						{
							name: '养车达人',
							address: '广东深圳',
							phone: '13623051216',
							addTimes: '2019-11-24 12:12:12',
							status: '1'
						}
					],
					totalRecords: 0
				},
				appointAddFormData: {
				    imei: util.getImei(),
				    myWxid: util.getMyWxId(),
				    sendWord: '你好，我是' + JSON.parse(util.getMyWxInfo()).nickName,
					wxid: '',
					msg: ''
				}
			}
		},
	    methods: {
			// 获取添加好友列表
			getAddFriendInfo: function() {
				console.log('=====获取添加好友列表开始=====');
				this.$axios.post('/queryAddfriendByPage', {
					imei: util.getImei(),
					my_wxid: util.getMyWxId()
				}).then(data => {
					// this.addFriendsInfo = data;
				}).catch(() => {});
				console.log('=====获取添加好友列表结束=====');
			},
			// 弹出添加好友页面
			showAddFriendDialog: function() {
				this.isShowAddFriendDialog = true;
			},
			// 关闭添加好友页面
			closeAddFriendDialog: function() {
				this.isShowAddFriendDialog = false;
			},
			// 弹出导出添加好友记录页面
			showExportAddFriendDialog: function() {
				this.isShowExportAddFriendDialog = true;
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
								this.getAddFriendInfo();
				            })
				            .catch(() => {});
				    } else {
				        return false;
				    }
				});
			}
	    },
		mounted: function() {
			this.getAddFriendInfo();
			
			$(".type-list .type-item").click(function(e) {
				$(".type-list .type-item").removeClass('on');
				$(this).addClass('on');
				this.getAddFriendInfo($(this).attr('type'));
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
	
	    &[active]{
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
			
			.info, .phone, .addTimes, .status, .icon {
				float: left;
				width: 20%;
				color: #C0C4CC;
				line-height: 38px;
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
		
		.el-tabs__item {
			
		}
		
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
</style>
