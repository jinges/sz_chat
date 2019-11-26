<template>
		<div>
			<div class="search">
				<el-input placeholder="请输入内容" v-model="searchTxt" class="input-with-select">
					<el-button slot="append" icon="el-icon-search" @click="search"></el-button>
				</el-input>
			</div>
			<iframe :src="detailUrl" height="100%" width="100%" name="user-img" frameborder="0"></iframe>
		</div>
</template>

<script>
	export default {
		name: 'RightBoxTalking',
		data() {
			return {
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
			searchKeyword(id){
				this.userid = id;
				this.$axios.post('/getCustomerProfile', {
					wxid:this.userid 
				}).then(data => {
					this.orderId = data.orderId;
					this.getkeyword()
				}).catch(() => {});
			},
			getkeyword(){
				this.$axios.post('/searchKeyword', {
						"orderId": this.orderId,
						"sentence": this.searchTxt
					}).then(data => {
						this.detailUrl = data.detailUrl
					}).catch(() => {});
			},
			search(){
				this.getkeyword();
			}
		},
		created() {
			// this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
