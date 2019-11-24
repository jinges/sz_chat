<template>
	<div id="GroupList" class="group_list">
		<div class="header">
			{{title}}
		</div>
		<ul class="group_list_ul">
			<li class="group_list_li" v-for="(item,index) in $store.state.groupList" @click="selectGroup($event,index,item)">
				<div class="group_list_img" :style="[{backgroundImage: `url(${item.img})`}]"></div>
				<div class="group_list_name">{{item.name}}</div>
				<div class="group_list_btn">
					<span>发消息</span>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import util from '../util/util.js';
	import $ from 'jquery';

	export default {
		name:'GroupList',
		props: [],
		data() {
			return {
				loading: false,
				bufferData: {},
				result: [],
				title:'群组',
				isGroup:true,
				detail: Object,
				isActive:-1
			}
		},
		computed: {
			
		},
		methods: {
			selectGroup: function(event, index, item) {
				// console.log('点击了群组'+item.name);
				// this.isActive=index;
			    this.$emit('selectFriend', this.isGroup , item.detail);
			}
		},
		mounted: function() {

		}
	}
</script>

<style lang="scss" scoped>
	.group_list{
		display: flex;
		height: 100%;
		flex-direction: column;

		.header {
			height: 45px;
			border-bottom: 1px solid #aaa;
			line-height: 45px;
			text-align: center;
			position: relative;
		}
		.group_list_ul{
			padding: 0 0 44px 0;
			margin: 0;
			overflow-y: auto;

			.group_list_li{
				position: relative;
				list-style: none;
				padding: 10px 16px;

				&:hover {
					background-color: rgba(0, 0, 0, 0.1);
		        }
				.group_list_img{
					position: absolute;
					left: 16px;
					width: 48px;
					height: 48px;
					background-repeat: no-repeat;
					background-size: cover;
					border-radius: 4px;
				}
				.group_list_name{
					margin-left: 48px;
					padding-left: 1em;
					line-height: 48px;
					max-width: 560px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					font-size: 14px;
				}
				.group_list_btn{
					position: absolute;
					right: 16px;
					top: 50%;
					margin-top: -15PX;
					border-radius: 4px;
					border: 1px solid #69bb64;
					padding: 0 1.5em;
					text-align: center;
					line-height: 30px;
					user-select: none;
					cursor:pointer;
					font-size: 14px;

					&:hover{
						background-color: #69bb64;
					}

					&.active {
		            background: rgba(103, 194, 58, 0.5);
		        }
				}

			}
		}
	}
	
</style>
