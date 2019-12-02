<template>
		<div class="rightboxtalking">
			<div class="search">
				<el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
			</div>
			<ul class="searchList history">
				<li v-for="(item,index) in history" :key="index"  @click="eject(item)">
					{{item.title}}
					<span>{{item.subTitle}}</span>
				</li>
			</ul>
			<ul class="searchList">
				<li v-for="(item,index) in arrList" :key="index"  @click="eject(item)">
					{{item.title}}
					<span>{{item.subTitle}}</span>
				</li>
			</ul>

			<el-dialog
				title=""
				:visible.sync="dialogVisible"
				:before-close="handleClose">
					<iframe :src="detailUrl" height="100%" width="100%" name="user-img" frameborder="0"
						style=" height: 600px;overflow: auto;"></iframe>
				<span slot="footer" class="dialog-footer">
					<!-- <el-button @click="dialogVisible = false">关闭</el-button> -->
				</span>
			</el-dialog>
			<!-- <iframe :src="detailUrl" height="100%" width="100%" name="user-img" frameborder="0"></iframe> -->
		</div>
</template>

<script>
	export default {
		name: 'RightBoxTalking',
		data() {
			return {
				dialogVisible:false,
				arrList:[],
				history: [],
				searchTxt:'',
				userid:'',
				orderId:'',
				detailUrl:''
			}
		},
		watch: {
		},
		components: {
		},
		methods: {
			handleClose(){
				this.dialogVisible = false
			},
			//发送
			/* send(){
				console.log('双击')
			}, */
			/* 弹框 */
			eject(item){
				this.detailUrl = item.detailUrl;
				this.dialogVisible = true
			},
			cleanSrarch(){
				this.arrList = [];
				this.history = [];
			},
			searchKeyword(id){
				this.userid = id;
				this.$axios.post('/getCustomerProfile', {
					wxid:this.userid 
				}).then(data => {
					this.orderId = data.orderId;
					//this.getkeyword()
				}).catch(() => {});
			},
			getkeyword(msg){
				this.$axios.post('/searchKeyword', {
						"orderId": this.orderId,
						"sentence": msg
					}).then(data => {
						this.arrList = data;
						this.history = [...[], ...data, ...this.history];
						this.history = this.history.slice(0,3);
					}).catch(() => {});
			},
			search(){
				if(!this.searchTxt){
				this.$message({
					showClose: true,
					message: '请输入你要搜索的关键词',
					type: 'error'
				});
					return false
				}else{
					this.getkeyword(this.searchTxt);
				}
			}
		},
		created() {
			// this.loadData();
		}
	}
</script>
<style lang="scss">
.rightboxtalking{
	.el-dialog{
		height: 667px;
    	width: 337px;
	}
}
</style>
<style lang="scss" scoped>
		.searchList{
			margin: 0;
			list-style-type:none;
			padding-left: 0px;
			font-size: 14px;
			background: rgba(0,0,0,.4)
			&.history{
				margin-bottom: 10px;
				background: rgba(0,0,0,.2)
			}
			li{
				cursor: pointer;
				background: #fff;
				color: #606266;
				padding:10px;
				border-bottom: 1px solid #606266;
				span{
					display: block;
					font-size: 12px;
				}
			}
		}
</style>
