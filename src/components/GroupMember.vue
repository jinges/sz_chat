<template>
	<div id="groupMember">
		<el-container style="height:100%;" v-loading="loading" element-loading-text="正在执行" element-loading-background="rgba(255,255,255, 0.6)">
			<el-main>
				<el-transfer v-model="result" filterable filter-placeholder="按名称搜索" :data="isAddMember?friendsVal:membersVal"
				 :titles="isAddMember?['好友列表', '邀请成员列表']:['好友列表', '移除成员列表']" :render-content="fmt">
					<el-button v-show="false" slot="left-footer" size="small">占位</el-button>
					<el-button type="primary" slot="right-footer" style="float: right;" @click="submitForm" size="small">确定</el-button>
				</el-transfer>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import Friend from './Friend.vue'
	import util from '../util/util.js'

	export default {
		props: ['groupMembers', 'isAddMember', 'groupId'],
		data() {
			return {
				loading: false,
				bufferData: {},
				result: [],
				friends: this.$store.state.friends.filter(t => !t.isGroup).map(t => {
					return {
						key: t.wxid,
						label: t.name,
						face: t.face
					}
				})
			}
		},
		computed: {
			//去掉已存在的群组成员
			friendsVal: function() {
				var members = this.groupMembers.map(t => {
					return {
						key: t.targetId,
						label: t.nickName,
						face: t.face
					}
				});
				return this.friends.filter(
					item => !members.some(ele => ele.key === item.key)
				);
			},
			membersVal: function() {
				return this.groupMembers.filter(t => t.targetId != util.getMyWxId()).map(t => {
					return {
						key: t.targetId,
						label: t.nickName,
						face: t.face
					}
				});
			}
		},
		methods: {
			fmt: function(h, opt) {
				return ( < Friend name = {
						opt.label
					}
					face = {
						opt.face
					}
					blockWidth = "325px" / >
				)
			},
			submitForm: function() {
				this.loading = true;
				this.$axios.post(this.isAddMember ? 'inviteMember' : 'removeMember', {
					groupId: this.groupId,
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					wxids: this.result.toString()
				}).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			},
			onWsMsg: function(json) {
				if (json.commandName == 'SERVER_INVITE_MEMBER_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('邀请成员成功');
						delete this.bufferData[messageId];
						var _this = this; //延时查询
						setTimeout(function() {
							_this.$emit('submit');
						}, "1000");
					}
				} else if (json.commandName == 'SERVER_REMOVE_MEMBER_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('移除成员成功');
						delete this.bufferData[messageId];
						var _this = this; //延时查询
						setTimeout(function() {
							_this.$emit('submit');
						}, "1000");
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#groupMember {
		height: 600px;

		/deep/ .el-transfer {
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			.el-transfer-panel {
				height: 100%;
				width: 400px;
				display: flex;
				flex-direction: column;

				.el-transfer-panel__body {
					height: 1px;
					flex-grow: 1;
					display: flex;
					flex-direction: column;
				}

				.el-transfer-panel__list {
					flex-grow: 1;
					height: 1px;
				}
			}
		}
	}
</style>
