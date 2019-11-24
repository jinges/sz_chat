<template>
	<div class="right-box">
		<div class="addFriendsProgress">
			<div class="title">当前进度</div>
			<div class="progress">
				<div class="name">总进度</div>
				<div class="value">50/100</div>
			</div>
			<div class="progress-info">
				<div class="name">等待添加</div>
				<div class="value">50</div>
			</div>
			<div class="progress-info">
				<div class="name">添加成功</div>
				<div class="value">50</div>
			</div>
			<div class="progress-info">
				<div class="name">被拒绝</div>
				<div class="value">50</div>
			</div>
			<div class="progress-info">
				<div class="name">未通过</div>
				<div class="value">50</div>
			</div>
			<div class="progress-info">
				<div class="name">查找失败</div>
				<div class="value">50</div>
			</div>
			<div class="progress-info">
				<div class="name">重复好友</div>
				<div class="value">50</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		mounted(){

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
