<template>
	<div class="chat">
		<div class="header">
			{{title}}
			<span class="groupBtn" v-if="isGroup" @click="showGroupInfo=!showGroupInfo">
				<font-awesome-icon icon="ellipsis-h"></font-awesome-icon>
			</span>
			<transition name="slide2">
				<div class="groupInfo" v-show="isGroup&&showGroupInfo">
					<div class="title">群成员</div>
					<div class="memberList">
						<div class="item plus">
							<i class="el-icon-circle-plus-outline" @click="addMember"></i>
						</div>
						<div class="item remove">
							<i class="el-icon-remove-outline" @click="removeMember"></i>
						</div>
						<div class="item" v-for="(member, index) in groupMembers" :targetId="member.targetId" :key="index">
							<img :src="member.face" />
							<div>{{member.nickName}}</div>
						</div>
					</div>
					<div class="title">群设置</div>
					<div class="settings">
						<el-form label-position="left" label-width="80px" size="mini">
							<el-form-item label="群名称">
								<el-input v-model="groupName" placeholder="请输入群名称" style="width: 70px;margin-right: 4px;"></el-input>
								<el-button type="primary" plain @click="saveGroupName" :loading="settingGroupLoading">确定</el-button>
							</el-form-item>

						</el-form>
					</div>
					<div id="leaveGroup" @click="leaveGroup">删除并退出</div>
				</div>
			</transition>
		</div>
		<div class="body" v-loading="loading" element-loading-background="rgba(0,0,0,0.3)" element-loading-text="聊天加载中">
			<vue-scroll ref="vs">
				<div id="nomore" v-if="nomore">没有更多消息了</div>
				<div id="loadmore" v-else @click="loadmore">点击加载更多</div>
				<Message v-for="(item, index) in history" v-bind="item" :key="index"/>
			</vue-scroll>
		</div>
		<div class="footer">
			<div class="toolbar">
				<font-awesome-icon @click.stop="showEmotion=!showEmotion" icon="smile"></font-awesome-icon>
				<transition name="slide">
					<Emotions @emotionBlur="closeEmotions" v-show="showEmotion" @selected="selectEmotion" id="emotions" />
				</transition>
				<el-upload :disabled="uploadLoading" :action="uploadAction" name="files" :on-success="fileUploadSucc"
				 :show-file-list="false" :before-upload="fileUploadBefore" v-if="false">
					<font-awesome-icon icon="folder"></font-awesome-icon>
				</el-upload>
				<template>
					<font-awesome-icon @click.stop="isShowMaterial=!isShowMaterial" icon="folder"></font-awesome-icon>
					<el-dialog width="700px" :visible="isShowMaterial" :before-close="closeMaterial" id="materialDialog">
						<span slot="title">
							<el-tabs v-model="materialActiveName">
							    <el-tab-pane label="文章链接" name="articles">
									<Articles :type="1" @msg="setMaterialId" />
								</el-tab-pane>
							    <el-tab-pane label="图片" name="pictures">
									<Pictures :type="2" @msg="setMaterialId" />
								</el-tab-pane>
							    <el-tab-pane label="文本" name="texts">
									<Articles :type="3" @msg="setMaterialId" />
								</el-tab-pane>
							    <el-tab-pane label="视频" name="videos">
									<Pictures :type="4" @msg="setMaterialId" />
								</el-tab-pane>
							    <el-tab-pane label="H5海报" name="poster">
									<Pictures :type="5" @msg="setMaterialId" />
								</el-tab-pane>
							</el-tabs>
						</span>
						<el-button type="primary" size="small" @click="sendTo()">发送</el-button>
					</el-dialog>
				</template>
				<template v-if="uploadLoading">
					<i class="el-icon-loading"></i><span style="font-size: 12px;color: #A09D9D;">上传中</span>
				</template>
			</div>
			<AtMember :members="isGroup?groupMembers:[]" name-key="nickName" v-model="sendText" :filterMatch="filterMatch" :deleteMatch="deleteMatch" :value="targetId">
				<!-- custom: with avatars -->
				<template slot="item" scope="s">
					<img :src="s.item.face" style="width: 20px;margin-right: 20px;">
					<span v-text="s.item.nickName"></span>
				</template>
				<textarea class="editor" placeholder="请输入内容,Ctrl+Enter发送" v-model="sendText" @keydown.ctrl.enter="send"></textarea>
			</AtMember>
			<el-button class="submit" :loading="sendLoading" @click="send" type="success" size='mini'>发送</el-button>
		</div>
		<el-dialog width="1000px" center :title="isAddMember?'邀请成员':'移除成员'" :visible="showGroupMember" :before-close="closeGroupMember"
		 destroy-on-close>
			<GroupMember ref="groupMember" :groupMembers="groupMembers" :groupId="targetId" :isAddMember="isAddMember" @submit="loadGroupMembers" />
		</el-dialog>
	</div>
</template>

<script>
	import Message from '@/components/Message.vue'
	import util from '@/util/util.js'
	import Emotions from '@/components/Emotions.vue';
	import GroupMember from '@/components/GroupMember.vue';
	import AtMember from 'vue-at/dist/vue-at-textarea';
	import Articles from '@/components/Articles.vue';
	import Pictures from '@/components/Pictures.vue';

	export default {
		props: ['targetId', "targetFace", "targetName", "myFace", "isGroup"],
		data() {
			return {
				//群组
				groupMembers: [], //群成员
				showGroupInfo: false, //群聊详情
				settingGroupLoading: false,
				groupName: this.targetName,

				uploadAction: process.env.VUE_APP_SERVER_UPLOAD_URL,
				showEmotion: false, //是否展示表情选择
				loading: false, //消息加载中
				nomore: false, //没有更多消息了
				msgPage: 0, //页数
				sendLoading: false, //发送按钮loading
				uploadLoading: false, //上传loading
				sendText: '', //发送文字
				sendingMap: {}, //发送中的消息
				history: [], //历史消息
				title: this.targetName,
				msgScrollId: null, //消息分页ES scrollId

				showGroupMember: false,
				isAddMember: false, //是否是邀请成员，否则为false
				selectAtUserId: [], //需要@的群成员
				
				isShowMaterial: false, //是否显示素材库
				materialActiveName: 'articles', // 素材类型
				materialId: 0, // 素材id
				materialUrl: '', // 素材链接
				materialTitle: '', // 素材标题
				sendToLoad: false,
			}
		},
		computed: {
			groupMemberFace: function() {
				var _this = this;
				return function(groupMemberTargetId) {
					var face = require('@/assets/wechat.png');
					//nickName: t.nickName,
					//face: t.headPic,
					//targetId: t.wxid
					for (var i = 0; i < _this.groupMembers.length; i++) {
						if (_this.groupMembers[i].targetId == groupMemberTargetId) {
							return _this.groupMembers[i].face;
						}
					}
					return face;
				}
			}
		},
		components: {
			Message,
			Emotions,
			GroupMember,
			AtMember,
			Articles,
			Pictures
		},
		methods: {
			//保存群名称
			saveGroupName: function() {
				if (this.groupName.trim() == '') {
					this.$message.error('群名称不能为空');
					return;
				}
				this.settingGroupLoading = true;
				this.$axios.post('/setGroupName', {
					groupId: this.targetId,
					groupName: this.groupName,
					imei: util.getImei(),
					myWxid: util.getMyWxId()
				}).then(data => {
					this.sendingMap[data] = true;
				}).catch(() => {});
			},
			//表情
			closeEmotions() {
				this.showEmotion = false;
			},
			//表情
			selectEmotion(emotion) {
				this.sendText += emotion.text;
			},
			//加载消息
			loadmore: function() {
				if (!this.targetId)
					return;
				this.msgPage++;
				this.loading = true;
				this.$axios.post('/queryMsg', {
					sid: util.getMyWxId(),
					rid: this.targetId,
					chatType: this.isGroup ? 'GROUP' : 'SINGLE',
					page: this.msgPage,
					rows: 20
				}).then(msgData => {
					var data = msgData.data;
					this.loading = false;
					var _this = this;
					
					if (data.length == 0) {
						this.nomore = true;
						_this.history = [];
						return;
					}
					data.forEach(item => {
						var media = item.mt.toLowerCase();
						var face = '';
						if (this.isGroup) {
							face = item.mdr == 'OUT' ? this.myFace : this.groupMemberFace(item.rid);
						} else {
							face = item.mdr == 'OUT' ? this.myFace : this.targetFace;
						}
						_this.history.unshift({
							type: item.mdr == 'OUT' ? 'receiver' : 'sender',
							media: media,
							face: face,
							content: (media == 'image' || media == 'voice' || media ==
									'video' || media == 'file') ? item.url : media ==
								'link' ? {
									link: item.lik,
									title: item.tle,
									desc: item.dec
								} : item.cnt,
							time: new Date(item.ctm).toLocaleString()
						});
						if (this.msgPage == 1) {
							this.$refs['vs'].scrollBy({
									dy: 1000000
								}, 500,
								'easeInQuad');
						}
					});
					this.msgScrollId = msgData.scrollId
				}).catch(() => {});
			},
			//发送消息
			send() {
				if (!this.sendText.trim()) {
					this.$message.error('发送消息不能为空');
					return;
				}
				this.sendLoading = true;
				var now = new Date();
				var url = "sendText";
				var objId = "targetWxid";
				if (this.isGroup) {
					url = "sendGroupText";
					objId = "groupId";
				}
				var param = {
					createTime: now.getTime(),
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					sendContent: this.sendText,
					[objId]: this.targetId
				};
				if (this.selectAtUserId.length && this.isGroup) {
					url = "sendGroupForText";
					param = {
						createTime: now.getTime(),
						imei: util.getImei(),
						myWxid: util.getMyWxId(),
						sendContent: this.sendText,
						groupId: this.targetId,
						userId: this.selectAtUserId.toString()
					};
				}

				this.$axios.post(url, param).then(data => {
					this.sendLoading = false;
					this.sendingMap[data] = true;
					this.history.push({
						type: 'receiver',
						media: 'text',
						face: this.myFace,
						content: this.sendText,
						time: now.toLocaleString(),
						sending: true,
						sendingId: data
					});
					this.sendText = '';

					//滚动到底部
					this.$refs['vs'].scrollBy({
							dy: 1000
						}, 500,
						'easeInQuad');
				}).catch(() => {});
			},
			//添加@
			filterMatch: function(name, chunk, at) {
				return name.toLowerCase().indexOf(chunk.toLowerCase()) > -1
			},
			//删除@
			deleteMatch: function(name, chunk, suffix) {
				return chunk === name + suffix
			},
			//发送消息确认
			//以及收到消息
			onWsMsg: function(json) {
				this.$refs['groupMember'] && this.$refs['groupMember'].onWsMsg(json);
				//将之前发送中状态改为已发送
				if (json.messageType == 'SERVER_TO_CLIENT' && this.sendingMap[json.messageId]) {

					delete this.sendingMap[json.messageId];

					//修改群名称
					if (json.commandName == 'SERVER_SET_GROUP_NAME_ACK') {
						this.settingGroupLoading = false;
						this.$store.commit('modifyFriend', {
							wxid: this.targetId,
							name: this.groupName
						});
						this.$store.commit('modifySession', {
							targetId: this.targetId,
							name: this.groupName
						});
						this.title = this.groupName;
						this.$message.success('修改群名称成功');
						return;
					}
					if (json.commandName == 'SERVER_LEAVE_GROUP_ACK') {
						this.$store.commit('initFriends');
						this.$message.success('退出群聊成功');
						return;
					}

					//收到消息确认
					for (var i = 0; i < this.history.length; i++) {
						if (this.history[i].sendingId == json.messageId &&
							this.history[i].sending == true) {
							this.history[i].sending = false;
							//置顶会话
							if (json.commandName == 'SERVER_SEND_TEXT_ACK' || json.commandName == 'SERVER_SEND_GROUP_TEXT_ACK') { //收到文本消息
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: this.history[i].content,
									createTime: new Date().getTime()
								});
							} else if (json.commandName == 'SERVER_SEND_IMAGE_ACK' || json.commandName == 'SERVER_SEND_GROUP_IMAGE_ACK') { //收到图片消息
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: '[图片]',
									createTime: new Date().getTime()
								});
							} else if (json.commandName == 'SERVER_SEND_VOICE_ACK' || json.commandName == 'SERVER_SEND_GROUP_VOICE_ACK') { //收到语音消息
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: '[语音]',
									createTime: new Date().getTime()
								});
							} else if (json.commandName == 'SERVER_SEND_VIDEO_ACK' || json.commandName == 'SERVER_SEND_GROUP_VIDEO_ACK') { //收到视频消息
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: '[视频]',
									createTime: new Date().getTime()
								});
							} else if (json.commandName == 'SERVER_SEND_FILE_ACK' || json.commandName == 'SERVER_SEND_GROUP_FILE_ACK') { //收到文件消息
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: '[文件]',
									createTime: new Date().getTime()
								});
							} else if (json.commandName == 'SERVER_SEND_LINK_ACK' || json.commandName == 'SERVER_SEND_GROUP_LINK_ACK') { //收到链接消息
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: '[链接]',
									createTime: new Date().getTime()
								});
							} else {
								this.$store.commit('topSession', {
									targetWxid: this.targetId,
									msg: '[未知类型]',
									createTime: new Date().getTime()
								});
								console.error('无法识别的消息确认' + JSON.stringify(json));
							}
							break;
						}
					}

				} else if (json.messageType == 'NOTIFY_TO_SERVER') {
					//收到通知
					var messageContent = JSON.parse(json.messageContent);
					//当前聊天的通知
					if (messageContent.targetWxid == this.targetId && !this.isGroup) {
						//文本通知
						if (json.commandName == 'CLIENTNOTIFY_TEXT') {
							this.postMsgToHome(messageContent.sendContent);
							this.history.push({
								type: 'sender',
								media: 'text',
								face: this.targetFace,
								content: messageContent.sendContent,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_IMAGE') {
							this.history.push({
								type: 'sender',
								media: 'image',
								face: this.targetFace,
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_VOICE') {
							this.history.push({
								type: 'sender',
								media: 'voice',
								face: this.targetFace,
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_VIDEO') {
							this.history.push({
								type: 'sender',
								media: 'video',
								face: this.targetFace,
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_FILE') {
							this.history.push({
								type: 'sender',
								media: 'file',
								face: this.targetFace,
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_LINK') {
							this.history.push({
								type: 'sender',
								media: 'link',
								face: this.targetFace,
								content: messageContent,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else {
							console.error('接收到无法识别的消息->' + JSON.stringify(json));
						}

						//滚动到底部
						this.$refs['vs'].scrollBy({
								dy: 1000
							}, 500,
							'easeInQuad');
					} else if (messageContent.groupId == this.targetId && this.isGroup) {

						//文本通知
						if (json.commandName == 'CLIENTNOTIFY_GROUP_TEXT') {
							this.history.push({
								type: 'sender',
								media: 'text',
								face: this.groupMemberFace(messageContent.targetWxid),
								content: messageContent.sendContent,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_GROUP_IMAGE') {
							this.history.push({
								type: 'sender',
								media: 'image',
								face: this.groupMemberFace(messageContent.targetWxid),
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_GROUP_VOICE') {
							this.history.push({
								type: 'sender',
								media: 'voice',
								face: this.groupMemberFace(messageContent.targetWxid),
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_GROUP_VIDEO') {
							this.history.push({
								type: 'sender',
								media: 'video',
								face: this.groupMemberFace(messageContent.targetWxid),
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_GROUP_FILE') {
							this.history.push({
								type: 'sender',
								media: 'file',
								face: this.groupMemberFace(messageContent.targetWxid),
								content: messageContent.filePath,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else if (json.commandName == 'CLIENTNOTIFY_GROUP_LINK') {
							this.history.push({
								type: 'sender',
								media: 'link',
								face: this.groupMemberFace(messageContent.targetWxid),
								content: messageContent,
								time: new Date(parseInt(messageContent.createTime)).toLocaleString()
							});
						} else {
							console.error('接收到无法识别的消息->' + JSON.stringify(json));
						}

						//滚动到底部
						this.$refs['vs'].scrollBy({
								dy: 1000
							}, 500,
							'easeInQuad');
					}
				}
			},
			postMsgToHome(msg){
				this.$emit('listenMsg', msg);
			},
			//上传图片前
			fileUploadBefore() {
				this.uploadLoading = true;
			},
			//上传图片后
			fileUploadSucc(res, file, fileList) {
				if (res.errcode != 0) {
					this.$message.error(res.errmsg);
					return;
				}
				var now = new Date();
				var fileType = util.matchType(res.data[0].originName);
				var objId = "targetWxid";
				if (this.isGroup) {
					objId = "groupId";
				}
				this.$axios.post(this.isGroup ? '/sendGroupFile' : '/sendFile', {
					imei: util.getImei(),
					fileType: fileType,
					fileName: res.data[0].originName,
					filePath: res.data[0].url,
					fileId: res.data[0].fileId,
					createTime: now.getTime(),
					[objId]: this.targetId,
					myWxid: util.getMyWxId()
				}).then(data => {
					this.uploadLoading = false;
					this.sendingMap[data] = true;

					this.history.push({
						type: 'receiver',
						media: fileType.toLowerCase(),
						face: this.myFace,
						content: res.data[0].url,
						time: now.toLocaleString(),
						sending: true,
						sendingId: data
					});

					//滚动到底部
					this.$refs['vs'].scrollBy({
							dy: 1000
						}, 500,
						'easeInQuad');
				}).catch(() => {});
			},
			//上传图片失败
			fileUploadErr(err, file, fileList) {
				this.uploadLoading = false;
				this.$message.error('文件发送失败');
				console.error(err);
			},
			//加载群组成员
			loadGroupMembers: function() {
				this.showGroupMember = false;
				this.$axios.post('/queryGroupMember', {
					groupId: this.targetId,
					imei: util.getImei(),
					my_wxid: util.getMyWxId()
				}).then(data => {
					this.groupMembers = data.map(t => {
						return {
							nickName: t.nickName,
							face: t.headPic,
							targetId: t.wxid
						}
					});
				}).catch(() => {});
			},
			closeGroupMember: function() {
				this.showGroupMember = false;
			},
			//邀请成员
			addMember: function() {
				this.showGroupMember = true;
				this.isAddMember = true;
			},
			//移除成员
			removeMember: function() {
				this.showGroupMember = true;
				this.isAddMember = false;
			},
			//删除群组
			leaveGroup: function() {
				this.$axios.post('/leaveGroup', {
					groupId: this.targetId,
					imei: util.getImei(),
					myWxid: util.getMyWxId()
				}).then(data => {
					this.sendingMap[data] = true;
				}).catch(() => {})
			},
			// 关闭素材库
			closeMaterial: function() {
				this.isShowMaterial = false;
			},
			setMaterialId: function(material) {
				this.materialId = material.id;
				this.materialTitle = material.title;
				this.materialUrl = material.url;
				this.isShowMaterial = true;
				return false;
			},
			// 发送素材库内容
			sendTo: function() {
				if(!this.materialId){
					this.$message({
						showClose: true,
						message: '请选择你要发送的内容！',
						type: 'error'
					});
					return false
				}
				let tagStr = "";
				let momentType = "";
				let apiType = "";
				if(!this.materialActiveName){
				    momentType = 1;
				} else {
					if(this.materialActiveName == 'articles' || this.materialActiveName == 'poster') {
						momentType = 4;
						apiType = "/sendLink";
					} else if(this.materialActiveName == 'pictures') {
						momentType = 2;
						apiType = "/sendFile";
					} else if(this.materialActiveName == 'texts') {
						momentType = 1;
						apiType = "/sendText";
					} else if(this.materialActiveName == 'videos') {
						momentType = 3;
						apiType = "/sendFile";
					}
				}
				let fileType = "";
				let filePath = "";
				if(this.materialActiveName == 'pictures' || this.materialActiveName == 'poster') {
					fileType = "IMAGE";
					filePath = this.materialUrl;
				} else if(this.materialActiveName == 'videos') {
					fileType = "VIDEO";
					filePath = this.materialUrl;
				} else if(this.materialActiveName == 'articles') {
					fileType = "ARTICLES";
					filePath = this.materialUrl;
				} else {
					fileType = "";
					filePath = "";
				}
				let params = this.msgContent(fileType, filePath);
				this.sendMsg(apiType, params);
			},
			msgContent(fileType, filePath){
				let body = {
					imei: util.getImei(),
					createTime: new Date().getTime(),
					myWxid: util.getMyWxId()
				};
				if(this.materialActiveName){
				  if (
				  this.materialActiveName == 'pictures' ||
				  this.materialActiveName == 'videos'
				  ) {
					  body = Object.assign({}, body, {
						  fileType: fileType,
						  fileName: this.materialTitle,
						  filePath: filePath,
						  fileId: this.materialId,
					  })
				  } else if(this.materialActiveName == 'poster' || 
						this.materialActiveName == 'articles') {
					  body = Object.assign({}, body, {
						  title: this.materialTitle,
						  desc: this.materialTitle,
						  link: filePath,
						  icon: 'https://s.autoimg.cn/fe/topbar/logo_topbar.png'
					  })
				  } else {
					  body = Object.assign({}, body, {
						  sendContent: this.materialTitle,
					  })
				  }
				}else{
				   body = Object.assign({}, body, {
						sendContent: this.materialTitle
					})
				}
				return body;
			},
			sendMsg(apiType, params){
				var $this = this;
				let targetWxid = this.targetId;
				params.targetWxid = targetWxid;
				this.$axios
					.post(apiType, params)
					.then(data => {})
					.finally(()=>{
						this.$message({
							showClose: true,
							message: '发送成功！',
							type: 'success'
						}); 
						this.$emit('succ');
						this.isShowMaterial = false;
					})
					.catch(() => {});
			}
		},
		watch: {
			targetName(newVal) {
				this.groupName = newVal;
				this.title = newVal;
			},
			targetId: function() {
				//页数重置
				this.msgPage = 0;
				//历史重置
				this.history = [];
				//nomore重置
				this.nomore = false;
				//loading重置
				this.loading = false;
				this.sendLoading = false;
				//发送消息重置
				this.sendText = '';
				//scrollId重置
				this.msgScrollId = null;

				this.loadmore();
				if (this.isGroup) {
					this.loadGroupMembers();
				}
			}
		}
	}
</script>

<style lang="scss">
	.chat {
		display: flex;
		height: 100%;
		flex-direction: column;

		.slide-enter,
		.slide-leave-to {
			opacity: 0;
			transform: translateY(25px);
		}

		.slide-enter-active,
		.slide-leave-active,
		.slide2-enter-active,
		.slide2-leave-active {
			transition: .3s all ease-in;
		}

		.slide2-enter,
		.slide2-leave-to {
			opacity: 0;
			transform: translateX(25px);
		}

		.header {
			height: 45px;
			border-bottom: 1px solid #aaa;
			line-height: 45px;
			text-align: center;
			position: relative;

			.groupBtn {
				font-size: 17px;
				position: absolute;
				right: 0px;
				cursor: pointer;
				padding: 0px 15px;

				&:hover {
					color: #E6A23C;
				}
			}

			.groupInfo {
				position: absolute;
				background: rgba(0, 0, 0, 0.4);
				top: 46px;
				right: 0px;
				width: 260px;
				z-index: 10;
				height: 509px;
				line-height: normal;
				overflow: hidden;

				>.title {
					font-size: 12px;
					text-align: left;
					padding: 12px;
				}

				.memberList {
					font-size: 14px;
					display: flex;
					overflow: auto;
					flex-wrap: wrap;
					padding: 15px 0px;
					background: rgba(0, 0, 0, 0.4);
					height: 180px;

					.item {
						font-size: 12px;
						width: 50px;
						text-align: center;
						height: 60px;
						cursor: pointer;

						&:hover {
							color: #409EFF;
						}

						img {
							width: 35px;
							height: 35px;
						}

						div {
							transform: scale(0.9);
							max-width: 100%;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}

					.plus,
					.remove {
						font-size: 35px;
					}
				}

				.settings {
					text-align: left;
					padding: 15px;
					background: rgba(0, 0, 0, 0.4);

					/deep/ .el-form-item__label {
						color: #C0C4CC;
					}
				}

				#leaveGroup {
					color: #F56C6C;
					font-size: 14px;
					padding: 10px 0px;
					cursor: pointer;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}

		.body {
			height: 1px;
			flex-grow: 1;

			#loadmore {
				padding: 7px 0px;
				font-size: 13px;
				text-align: center;
				cursor: pointer;
				width: 170px;
				margin: 10px auto;
				background: rgba(144, 147, 153, 0.5);
				border-radius: 18px;
				color: #DCDFE6;

				&:hover {
					background: rgba(144, 147, 153, 0.8);
					color: #fff;
				}
			}

			#nomore {
				padding: 20px 0px;
				font-size: 13px;
				text-align: center;
				margin: 10px auto;
				color: #DCDFE6;
			}

		}

		.footer {
			height: 145px;
			background: rgba(0, 0, 0, 0.4);

			.toolbar {
				height: 35px;
				display: flex;
				align-items: center;
				padding: 0px 10px;
				position: relative;

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
			}

			textarea {
				height: 70px;
				resize: none;
				display: block;
				padding: 5px 15px;
				line-height: 1.5;
				box-sizing: border-box;
				width: 100%;
				color: #606266;
				background: rgba(255, 255, 255, 0.1);
				border: 1px solid #777;
				width: 97%;
				margin: 0px auto;
				border-radius: 3px;
				outline: none;
				transition: 0.3s all ease;

				&:focus {
					background-color: #fefbfa;
					border: 1px solid #999;
				}
			}

			.submit {
				float: right;
				margin-top: 4px;
				margin-right: 1.5%;
				letter-spacing: 4px;
			}
		}

	}
	
	#materialDialog {
		.el-dialog__header {
			padding: 0px 10px;
			
			.el-tabs__header {
				margin: 0 0 10px;
			}
			
			.el-tabs__nav-wrap::after {
				background-color: #f9f9f9;
			}
			
			.el-dialog__headerbtn {
				top: 7px;
				font-size: 23px;
				z-index: 999999;
			}
		}
		
		.el-dialog__body {
			padding: 0;
			text-align: center;
			border-top: 1px solid #E9E9E9;
			margin: 15px;
			padding: 10px;
		}
	}
</style>
