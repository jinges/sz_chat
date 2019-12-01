<template>
	<div id="NewFriend" class="new_friend">
		<div class="header">
			{{title}}
		</div>
		<ul class="new_friend_ul">
			<li class="new_friend_li" v-for="(item, index) in $store.state.newFriends" :key="item.index" >
				<div class="new_friend_img" :style="[{backgroundImage: `url(${item.face})`}]"></div>
				<div class="new_friend_name">{{item.name}}</div>
				<div class="new_friend_content">{{item.content}}</div>
				<el-button type="success" :loading="btnLoading == index" :disabled="btnDisabled"  class="new_friend_btn" @click="agreeNewFriend($event,index,item)" >{{agreeBtnText}}</el-button>
			</li>
		</ul>
	</div>
</template>

<script>
	import util from '../util/util.js';
	import Vue from 'vue'

	export default {
		name:'NewFriend',
		props: [],
		data() {
			return {
				bufferData: {},
				loading: false,
				bufferData: {},
				result: [],
				btnLoading: -1,
				btnDisabled: false,
				title:'新的朋友',
				detail: Object,
				agreeBtnText: '接受',

			}
		},
		computed: {
			
		},
		methods: {
			agreeNewFriend: function(event, index, item) {
				this.btnLoading = index;
				this.btnDisabled = true;
				//console.log('同意好友申请：'+item.name);
				Vue.prototype.$axios.post('/confirmAdd', {
					imei: util.getImei(),
					myWxid: item.wxid,
					scene: item.scene,
					stranger: item.encryptusername
				}).then(data => {
					this.bufferData[data] = true;
				})
				.catch(() => {});
			},
			onWsMsg(json) {
			    if (json.commandName == 'SERVER_CONFIRM_ADD_BUDDY_ACK') {
			        var messageId = json.messageId;
			        //console.log("进入NewFriend:",messageId);
			        if (this.bufferData[messageId]) {
			            this.$message.success('添加好友成功');
			            delete this.bufferData[messageId];
			            this.$store.commit('initNewFriends');

			            this.btnLoading = -1;
			            this.btnDisabled = false;
			        }
			    }
			}
		},
		mounted: function() {
			
		}
	}
</script>

<style lang="scss" scoped>
	.new_friend{
		display: flex;
		height: 100%;
		flex-direction: column;

		.header {
			height: 45px;
			line-height: 45px;
			text-align: center;
			position: relative;
		}
		.new_friend_ul{
			padding: 0 0 44px 0;
			margin: 0;
			overflow-y: auto;

			.new_friend_li{
				position: relative;
				list-style: none;
				padding: 10px 16px;
				min-height: 48px;

				&:hover {
					background-color: rgba(0, 0, 0, 0.1);
		        }

		        &.active {
		            background: rgba(103, 194, 58, 0.5);
		        }


				.new_friend_img{
					position: absolute;
					left: 16px;
					width: 48px;
					height: 48px;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 4px;
				}
				.new_friend_name{
					margin-left: 48px;
					margin-right: 120px;
					padding-left: 1em;
					line-height: 30px;
					max-width: 476px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 14px;
				}
				.new_friend_content{
					margin-left: 48px;
					margin-right: 120px;
					padding-left: 1em;
					line-height: 18px;
					max-width: 476px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 12px;
					color:#999;
				}
				.new_friend_btn{
					position: absolute;
					right: 16px;
					top: 50%;
					margin-top: -15PX;
					border-radius: 4px;
					padding: 0 1.5em;
					text-align: center;
					line-height: 30px;
					user-select: none;
					cursor:pointer;
					font-size: 14px;
					color:#fff;

					&:hover{
						background-color: #5aa255;
					}

				}

			}
		}
	}
	
</style>
