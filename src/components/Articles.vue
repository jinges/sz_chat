<template>
	<div class="articles">
		<el-row :gutter="20" style="margin-bottom:15px">
			<el-col :span="10">
				<el-input placeholder="请输入内容" v-model="keyword" clearable :span="6">
					<el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
				</el-input>
			</el-col>
		</el-row>

		<el-table @row-click="clickRow" ref="articlesTable" :data="tableData" style="width: 100%; border-top: 1px solid #EBEEF5;" @selection-change="handleSelectionChange"
		 :show-header="false" stripe>
			
			<el-table-column prop="id" label="选择" align="right"  width="48">
				<template scope="scope">
					<el-radio v-model="articlesId" :label="scope.row.id"></el-radio>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题"></el-table-column>
		</el-table>
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
				articlesId: 1,
				tableData: [],
				totalRecord: 0
			}
		},
		methods: {
			// 获取文章信息
			getArticles: function(pageIndex, pageSize) {
				this.$axios.post('/content/searchPage', {
					contentTypeName: this.keyword,
					page: pageIndex,
					rows: pageSize,
					type: this.type
				}).then(data => {
					this.tableData = data.data;
					this.totalRecord = data.totalRecords;
				}).catch(() => {});
			},
			currentChange:function(currentPage){
			    this.getArticles(currentPage, 10);
			},
			search: function() {
				this.getArticles(1, 10);
			},
			handleSelectionChange: function(val) {
				console.log(val);
			},
			clickRow: function(row) {
				this.articlesId = row.id;
				this.$emit('msg', row);
			}
		},
		mounted() {
			this.getArticles(1, 10);
		}
	}
</script>

<style lang="scss">
	.el-pagination {
		text-align: center;
		margin-top: 20px;
	}
	.el-radio__label {
		display: none;
	}
</style>
