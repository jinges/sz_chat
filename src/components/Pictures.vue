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
			<el-col :span="4" style="width: 20%;" v-for="(item, index) in data" :key="index">
				<div class="grid-content transition-box" @click="choose(index)" :id="index">
					<img :src="item.url" />
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
			choose: function(index) {
				this.chooseIndex = index;
				$(".transition-box").removeClass('on');
				$(".transition-box#" + this.chooseIndex).addClass('on');
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
			}
		},
		mounted() {
			$(".transition-box#" + this.chooseIndex).addClass('on');
			this.getPictrues(1, 10);
		}
	}
</script>

<style>
	.transition-box {
		margin-bottom: 10px;
		width: 120px;
		height: 120px;
		text-align: center;
		color: #fff;
		box-sizing: border-box;
		margin-right: 10px;
		border: 1px solid #E9E9E9;
	}
	
	.transition-box.on {
		border: 1px solid #409EFF;
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
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}
</style>
