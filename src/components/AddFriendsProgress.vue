<template>
	<div class="right-box">
		<div class="addFriendsProgress">
			<div class="title">当前进度</div>
			<div class="progress">
				<div class="name">总进度</div>
				<div class="value">{{addFriendsSuccessCount}}/{{addFriendsAllCount}}</div>
			</div>
			<div class="progress-info">
				<div class="name">等待添加</div>
				<div class="value">{{addFriendsWaitCount}}</div>
			</div>
			<div class="progress-info">
				<div class="name">需好友验证</div>
				<div class="value">{{addFriendsWaitVerificationCount}}</div>
			</div>
			<div class="progress-info">
				<div class="name">添加成功</div>
				<div class="value">{{addFriendsSuccessCount}}</div>
			</div>
			<!-- <div class="progress-info">
				<div class="name">被拒绝</div>
				<div class="value">{{addFriendsRefuseCount}}</div>
			</div> -->
			<div class="progress-info">
				<div class="name">未通过</div>
				<div class="value">{{addFriendsUnansweredCount}}</div>
			</div>
			<div class="progress-info">
				<div class="name">查找失败</div>
				<div class="value">{{addFriendsFailCount}}</div>
			</div>
			<!-- <div class="progress-info">
				<div class="name">重复好友</div>
				<div class="value">{{addFriendsRepeatCount}}</div>
			</div> -->
		</div>
	</div>
</template>

<script>
	import $ from 'jquery'
	import util from '@/util/util.js'
	export default {
		data() {
			return {
				addFriendsAllCount: 0,
				addFriendsWaitCount: 0,
				addFriendsWaitVerificationCount: 0,
				addFriendsSuccessCount: 0,
				addFriendsRefuseCount: 0,
				addFriendsUnansweredCount: 0,
				addFriendsFailCount: 0,
				addFriendsRepeatCount: 0
			}
		},
		mounted() {
			this.$axios.post('/queryAddfriendByPage', {
				imei: util.getImei(),
				my_wxid: util.getMyWxId()
			}).then(data => {
				this.addFriendsAllCount = data.data.length;
				for (var i = 0; i < data.data.length; i++) {
					data.data[i].createdAt = data.data[i].createdAt.replace('T', ' ');
					switch (data.data[i].status) {
						case '添加成功':
							this.addFriendsSuccessCount++;
							break;
						case '对方已拒绝':
							this.addFriendsRefuseCount++;
							break;
						case '未回应':
							this.addFriendsUnansweredCount++;
							break;
						case '查找失败':
							this.addFriendsFailCount++;
							break;
						case '好友已经存在':
							this.addFriendsRepeatCount++;
							break;
						case '等待添加':
							this.addFriendsWaitCount ++;
							break;
						case '需好友验证':
							this.addFriendsWaitVerificationCount ++;
							break;
					}
				}
				this.addFriendsInfo = data;
			}).catch(() => {});
		},
		methods: {

		},
		created() {

		}
	}
</script>

<style lang="scss" scoped>
	.right-box {
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;

		.addFriendsProgress {
			.title {
				text-align: center;
				background-color: #000000;
				color: #ffffff;
				height: 50px;
				line-height: 50px;
			}
		}

		.progress {
			display: flex;
			height: 60px;
			border-bottom: 1px solid #5a5a5a;
			position: relative;

			.name {
				left: 15%;
				position: absolute;
				bottom: 10px;
			}

			.value {
				color: #aaa;
				right: 15%;
				position: absolute;
				bottom: 10px;
			}
		}

		.progress-info {
			display: flex;
			height: 40px;
			position: relative;

			.name {
				left: 15%;
				position: absolute;
				bottom: 10px;
			}

			.value {
				color: #aaa;
				right: 15%;
				position: absolute;
				bottom: 10px;
			}
		}
	}
</style>
