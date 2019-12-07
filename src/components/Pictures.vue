<template>
	<div class="pictures">
		<el-row :gutter="20" style="margin-bottom:15px">
			<el-col :span="10">
				<el-input placeholder="请输入内容" v-model="keyword" clearable :span="6">
					<el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
				</el-input>
			</el-col>
		</el-row>

		<el-row :gutter="10">
			<el-col :span="4" style="width: 20%;" v-for="(item, index) in data" :key="type.toString()+index">
				<div class="grid-content transition-box" :type="type" @click="choose(index)" :id="index" :title="item.title" :class=" chooseIndex == index ? 'on' : '' ">
					<div class="img_box" :class="type == 4 ? 'default_video' : 'default_pic'" :style="imgStyle(item,type)">
						<i class="el-icon-success active_icon"></i>
					</div>
					<div class="img_title">{{item.title}}</div>
				</div>
			</el-col>
		</el-row>

		<el-pagination background layout="prev, pager, next" :page-size="10" :total="totalRecord" @current-change="currentChange"></el-pagination>
	</div>
</template>

<script>
	import $ from 'jquery'

	export default {
		props: {
			type: {
				type: Number,
				default: 0
			 }
		},
		data() {
			return {
				keyword: '',
				chooseIndex: 0,
				data: [],
				totalRecord: 0
			}
		},
		methods: {
			// 选中图片
			choose: function(index,item) {
				console.log('tyle',this.type,this.chooseIndex);
				this.chooseIndex = index;
				//$(".transition-box").removeClass('on');
				//$(item).addClass('on');
				//$(".transition-box" + "[type='" + this.type + "']#" + this.chooseIndex).addClass('on');
				this.$emit('msg', this.data[index]);
			},
			// 获取图片信息
			getPictrues: function(pageIndex, pageSize) {
				this.$axios.post('/content/searchPage', {
					contentTypeName: this.keyword,
					page: pageIndex,
					rows: pageSize,
					type: this.type
				}).then(data => {
					this.data = data.data;
					this.totalRecord = data.totalRecords;
				}).catch(() => {});
			},
			currentChange:function(currentPage){
			    this.getPictrues(currentPage, 10);
			},
			search: function() {
				this.getPictrues(1, 10);
			},
			//封面图处理
			imgStyle(item,type){
				var imgUrl = item.url
				if(type==4){
					imgUrl = item.coverUrl;//视频取coverUrl
				}
				return {
					'background-image':imgUrl ?'url('+imgUrl+')' : ''
				}
			}
			
		},
		mounted() {
			$(".transition-box" + "[type='" + this.type + "']#" + this.chooseIndex).addClass('on');
			this.getPictrues(1, 10);
		}
	}
</script>

<style lang='scss' scoped>
	.transition-box {
		margin-bottom: 10px;
		width: 120px;
		text-align: center;
		color: #fff;
		box-sizing: border-box;
		margin-right: 10px;
		border: 1px solid transparent;

		&:hover{
			border: 1px solid #409EFF;
		}
		&.on {
			border: 1px solid #409EFF;
		}
		.active_icon{
			display: none;
			position: absolute;
			top: 4px;
			right: 4px;
			color: #3a8ee6;
			font-size: 24px;
			background: #fff;
			border-radius: 50%;
		}
		&.on .active_icon{
			display: block;
		}
	}
	.transition-box img {
		width: 100%;
		height: 100%;
	}
	.el-row {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}
	}
	.el-col {
		border-radius: 4px;
	}
	.bg-purple-dark {
		background: #99a9bf;
	}
	.bg-purple {
		background: #d3dce6;
	}
	.bg-purple-light {
		background: #e5e9f2;
	}
	.grid-content {
		min-height: 36px;	
		.img_box {
			position: relative;
			padding-top: 100%;
			background-color: #eee;
			margin: 1px;
		}
		.img_title{
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: #333;
			line-height: 2;
			padding: 0 6px;
		}
	}
	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
