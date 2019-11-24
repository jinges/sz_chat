<template>
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
</template>

<script>
	import util from '@/util/util.js'

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
