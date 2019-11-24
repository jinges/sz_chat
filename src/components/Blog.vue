<template>
	<div class="blog" v-if="momentType!=4">
		<img :src="publisher.face" class="face" @click="showPengyouquan">
		<div class="content">
			<div class="name">{{publisher.name}}</div>
			<div :class="{text:true,all:allText}" @click="showFullText" v-html="textWithEmo"></div>
			<!--视频-->
			<div v-if="momentType==3" class="video">
				<Movie :src="filePath" style="max-width: 200px;" />
			</div>
			<!--图片-->
			<div v-if="momentType==2" class="images">
				<Pic v-for="img in fileList" :src="img" @click="showImg(img)" />
			</div>
			<div class="footer">
				<div class="time">
					<!-- 2小时前 -->
				</div>
				<el-popover ref="popover1" placement="left" trigger="click" style="opacity: 0.5;">
					<div>
						<div style="cursor: pointer; float: left;" @click="likeMoment">
							<font-awesome-icon icon="heart"></font-awesome-icon>
							<span v-if="showLikeButton">赞</span>
							<!-- <span v-else>取消</span> -->
							{{likeDetail.length}}
						</div>
						<div style="cursor: pointer; float: left; margin-left: 10px;" @click="showCommentInput = !showCommentInput;">
							<font-awesome-icon icon="comment-alt"></font-awesome-icon> 评论
							{{commentDetail.length}}
						</div>
					</div>
				</el-popover>
				<div class="blocks">
					<div class="block" style="margin-right: 10px;">
						<strong v-popover:popover1><i style="font-size: 18px;" class="el-icon-more"></i></strong>
					</div>
				</div>
			</div>
			<div class="likePeople" v-if="showLike">
				<font-awesome-icon icon="heart"></font-awesome-icon>
				{{likePeople}}
			</div>
			<div class="commentPeople" v-if="showComment">
				<div class="commentItem" v-for="item in commentList">
					<img :src="item.face" class="commentFace">
					<span class="commentName">{{item.name}}:</span>
					<div class="commentContent">{{item.content}}</div>
				</div>
			</div>
			<el-input v-model="commentText" size="mini" placeholder="评论" v-if="showCommentInput" style="margin-top: 5px;">
				<el-button slot="append" size="mini" @click="commentMoment">发送</el-button>
			</el-input>
		</div>
	</div>
</template>

<script>
	import {
		WxEmotions
	} from 'wechat-square-bracket-emotions'
	import Pic from '@/components/Pic.vue'
	import Movie from '@/components/Movie.vue'
	import util from '@/util/util.js'

	var wxEmo = new WxEmotions();
	export default {
		components: {
			Pic,
			Movie
		},
		props: ['momentTitle', 'momentType', 'likeCount', 'comment', 'filePath', 'wxid', 'snsid'],
		computed: {
			likeDetail() {
				var json = JSON.parse(this.likeCount);
				if (json.length > 0) {
					this.showLike = !this.showLike;
				}
				return json;
			},
			likePeople() {
				var json = JSON.parse(this.likeCount);
				this.showLikeButton = !json.map(t => t.wechatId).includes(util.getMyWxId());
				return json.map(t => t.nickName).join(',')
			},
			commentDetail() {
				var json = JSON.parse(this.comment);
				if (json.length > 0) {
					this.showComment = !this.showComment;
				}
				return JSON.parse(this.comment)
			},
			commentList() {
				var json = JSON.parse(this.comment);
				return json.map(t => {
					var wx = this.$store.getters.filterFriendsById(t.wechatId);
					return {
						face: wx.face,
						name: t.nickName,
						content: t.content
					}
				})
			},
			fileList() {
				return this.filePath.split(',')
			},
			publisher() {
				return this.$store.getters.filterFriendsById(this.wxid) || {
					name: '',
					face: require('@/assets/f1.jpg')
				};
			},
			textWithEmo() {
				return wxEmo.parse(this.momentTitle)
			}
		},
		data() {
			return {
				bufferData: {},
				allText: false,
				showLike: false, //显示点赞人员
				showComment: false, //显示评论
				commentText: '', //评论文本
				showCommentInput: false, //显示评论输入框
				showLikeButton: true //显示点赞按钮或者取消按钮，默认点赞按钮
			}
		},
		methods: {
			showPengyouquan() {
				this.$store.commit('setCurrentPengyouquan', this.wxid);
			},
			showFullText() {
				this.allText = true;
			},
			showImg(url) {
				this.$msgbox({
					message: '<img style="max-width: 60vw;max-height: 90vh;" src="' + url + '"/>',
					dangerouslyUseHTMLString: true,
					showConfirmButton: false,
					closeOnClickModal: true,
					center: true,
					showClose: false,
					customClass: 'el-message-box--image',
					callback: () => {}
				});
			},
			onWsMsg: function(json) {
				if (json.commandName == 'SERVER_LIKE_MOMENT_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('点赞成功');
						delete this.bufferData[messageId];
						this.$emit('loadData');
					}
				} else if (json.commandName == 'SERVER_REPLY_MOMENT_ACK') {
					var messageId = json.messageId;
					if (this.bufferData[messageId]) {
						this.$message.success('评论成功');
						delete this.bufferData[messageId];
						this.$emit('loadData');
					}
				}
			},
			//点赞动态
			likeMoment() {
				if (this.showLikeButton) {
					this.$axios.post('likeMoment', {
						imei: util.getImei(),
						myWxid: util.getMyWxId(),
						snsid: this.snsid
					}).then((data) => {
						this.bufferData[data] = true;
					}).catch(() => {});
				}
			},
			//评论动态
			commentMoment() {
				this.$axios.post('replyMoment', {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					sendWord: this.commentText,
					snsid: this.snsid
				}).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blog {
		font-size: 14px;
		display: flex;
		overflow: hidden;
		margin-bottom: 20px;

		.face {
			width: 38px;
			height: 38px;
			border-radius: 3px;
			cursor: pointer;
		}

		.content {
			width: 1px;
			flex-grow: 1;
			margin-left: 10px;

			.name {
				color: #409EFF;
				font-weight: bold;
			}

			.text {
				margin: 4px 0px 10px 0px;
				word-break: break-all;
				-webkit-line-clamp: 3;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				overflow: hidden;

				&.all {
					-webkit-line-clamp: initial;
				}
			}

			.images {
				display: flex;
				align-items: flex-start;
				flex-wrap: wrap;

				img {
					width: 78px;
					box-sizing: border-box;
					padding: 3px;
					cursor: pointer;
					object-fit: cover;
					height: 78px;
				}
			}

			.footer {
				display: flex;
				justify-content: space-between;
				font-size: 11px;
				margin-top: 8px;
				line-height: 16px;

				.time {
					color: #C0C4CC;
				}

				.blocks {
					display: flex;
					color: #409EFF;

					.block {
						cursor: pointer;
					}
				}
			}

			.likePeople {
				font-size: 12px;
				padding: 8px;
				word-break: break-word;
				background: rgba(0, 0, 0, 0.3);
				margin-top: 10px;
				max-height: 300px;
				overflow: auto;
			}

			.commentPeople {
				font-size: 12px;
				padding: 8px;
				word-break: break-word;
				background: rgba(0, 0, 0, 0.3);
				margin-top: 10px;
				max-height: 300px;
				overflow: auto;

				.commentItem {
					clear: both;
					margin-bottom: 12px;

					.commentFace {
						width: 20px;
						height: 20px;
						border-radius: 2px;
						vertical-align: middle;
						margin-right: 3px;
						float: left;
					}

					.commentName {
						float: left;
						margin-right: 4px;
					}
				}
			}
		}
	}
</style>
<style>
	.el-message-box--image {
		max-width: 60vw !important;
		width: auto !important;
		padding-bottom: 0px !important;
	}
</style>
