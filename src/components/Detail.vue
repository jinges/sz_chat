<template>
	<div class="detail">
		<img class="face" :src="headPic" />
		<font-awesome-icon v-if="gender=='FEMALE'" class="sex" icon="venus"></font-awesome-icon>
		<font-awesome-icon v-else class="sex man" icon="mars"></font-awesome-icon>
		<div class="name" v-if="remark">{{remark}} ({{nickName}})</div>
		<div class="name" v-if="!remark">{{nickName}}</div>
		<div class="signture" v-if="signature&&signature!='[]'">{{signature||'暂无签名'}}</div>
		<el-divider></el-divider>
		<div class="row">
			<div class="key">手机号</div>
			<div class="value">{{phone||'未查询到'}}</div>
		</div>
		<div class="row">
			<div class="key">地区</div>
			<div class="value">{{region||'未查询到'}}</div>
		</div>
		<div class="row">
			<div class="key">邮箱</div>
			<div class="value">{{email||'未查询到'}}</div>
		</div>
		<div class="row">
			<div class="key">微信号</div>
			<div class="value">{{wxid||'未查询到'}}</div>
		</div>
		<!-- 暂时屏蔽 -->
		<!-- <div class="row" v-show="!opt.disableMsg">
			<div class="key">设为星标朋友</div>
			<div class="value">
				<el-switch v-model="isStarMark" active-color="#13ce66" inactive-color="rgba(0,0,0,0.3)" @change="setStarMark">
				</el-switch>
			</div>
		</div>
		<div class="row" v-show="!opt.disableMsg">
			<div class="key">加入黑名单</div>
			<div class="value">
				<el-switch v-model="isBlackList" active-color="#13ce66" inactive-color="rgba(0,0,0,0.3)" @change="setBlackList">
				</el-switch>
			</div>
		</div>
		<div class="row" v-show="!opt.disableMsg">
			<div class="key">标签</div>
			<div class="value">
				<el-input size="mini" placeholder="未设置" v-model="labelNames" @blur="setLabelNames"
				 clearable>
				</el-input>
			</div>
		</div> -->
		<div class="row" v-show="!opt.disableMsg">
			<div class="key">备注名</div>
			<div class="value">
				<el-input size="mini" placeholder="未设置" v-model="remark" @blur="setRemark" clearable>
				</el-input>
			</div>
		</div>
		<el-divider></el-divider>
		<div>
			<el-button v-if="!opt.disableMsg" type="success" plain @click="startChat" style="background:transparent;margin-top:10px;">发消息</el-button>
			<el-button v-if="!opt.disableMsg" type="danger" plain @click="delFriend" style="background:transparent;margin-top:10px;">删除好友</el-button>
			<el-button v-if="!opt.disableMsg" type="warning" plain @click="pengyouquan" style="background:transparent;margin-top:10px;">朋友圈</el-button>
		</div>
	</div>
</template>

<script>
	import util from '../util/util.js'
	export default {
		props: ['opt', 'headPic', 'gender', 'nickName', 'signature', 'phone', 'region', 'email', 'wxid', 'myAddressBook'],
		data() {
			return {
				bufferData: {},
				//设置通讯录好友信息: 星标，黑名单，标签，备注
				isStarMark: false,
				isBlackList: false,
				labelNames: '',
				remark: ''
			}
		},
		watch: {
			myAddressBook(newVal) {
				this.isStarMark = newVal.starMark == 'YES',
					this.isBlackList = newVal.blackList == 'YES',
					this.labelNames = newVal.labelNames || '',
					this.remark = newVal.remark || ''
			}
		},
		methods: {
			startChat: function() {
				this.$emit('startChat', {
					targetId: this.wxid,
					targetFace: this.headPic,
					targetName: this.nickName
				});
			},
			//星标好友
			setStarMark: function() {
				this.$axios.post(this.isStarMark ? 'removeStar' : 'addStar', {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					targetWxid: this.wxid
				}).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			},
			//黑名单
			setBlackList: function() {
				this.$axios.post(this.isStarMark ? 'removeBlackList' : 'addBlackList', {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					targetWxid: this.wxid
				}).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			},
			//设置标签
			setLabelNames: function() {
				if (this.labelNames == '') {
					return;
				}
				this.$axios.post('setTag', {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					remarkAndTag: this.labelNames,
					targetWxid: this.wxid
				}).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			},
			//设置备注
			setRemark: function() {
				if (this.remark == '') {
					return;
				}
				this.$axios.post('setRemark', {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					remarkAndTag: this.remark,
					targetWxid: this.wxid
				}).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			},
			//删除好友
			delFriend: function() {
				this.$confirm('确定将删除该好友, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$axios.post('removeBuddy', {
						imei: util.getImei(),
						myWxid: util.getMyWxId(),
						targetWxid: this.wxid
					}).then((data) => {
						this.bufferData[data] = true;
					}).catch(() => {});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			pengyouquan: function() {
				this.$store.commit('updatePengyouquanVisible', true);
				this.$store.commit('setCurrentPengyouquan', this.wxid);
			},
			//刷新好友信息
			refreshFriend: function(messageId) {
				delete this.bufferData[messageId];
				this.$store.commit('initFriends')
			},
			onWsMsg: function(json) {
				if (json.commandName == 'SERVER_ADD_STAR_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('设为星标朋友成功');
						this.refreshFriend(messageId);
					}
				} else if (json.commandName == 'SERVER_REMOVE_STAR_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('移除星标朋友成功');
						this.refreshFriend(messageId);
					}
				} else if (json.commandName == 'SERVER_ADD_BLACKLIST_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('加入黑名单成功');
						this.refreshFriend(messageId);
					}
				} else if (json.commandName == 'SERVER_REMOVE_BLACKLIST_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('移除黑名单成功');
						this.refreshFriend(messageId);
					}
				} else if (json.commandName == 'SERVER_SET_TAG_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('设置标签成功');
						this.refreshFriend(messageId);
					}
				} else if (json.commandName == 'SERVER_SET_REMARK_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('设置备注成功');
						this.refreshFriend(messageId);
					}
				} else if (json.commandName == 'SERVER_REMOVE_BUDDY_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('删除好友成功');
						this.refreshFriend(messageId);
					}
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.detail {
		height: 94%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 70%;
		margin: 3% auto;
		overflow: auto;

		.face {
			width: 72px;
			height: 72px;
			border-radius: 3px;
		}

		.sex {
			position: relative;
			top: -79px;
			left: 63px;
			font-size: 26px;
			color: #F56C6C;

			&.man {
				color: #67C23A;
			}
		}

		.name {
			color: #409EFF;
			font-size: 28px;
			margin: 3px auto 30px auto;
		}

		.signture {
			color: #E6A23C;
			font-size: 13px;
		}

		.row {
			width: 68%;
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			margin-bottom: 13px;

			.key {
				width: 90px;
				font-weight: bold;
			}

			.value {
				width: 180px;
				color: #C0C4CC;
			}
		}
	}
</style>
