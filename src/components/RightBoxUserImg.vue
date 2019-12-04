<template>
	<iframe :src="profileUrl" v-if="profileUrl.length" height="100%" width="100%" name="user-img" frameborder="0"></iframe>
	<div v-else class="no_user_img">
		<font-awesome-icon icon="inbox"></font-awesome-icon><br/>
		<span>没有画像</span>
	</div>
</template>

<script>
import util from "@/util/util.js";
	export default {
		name: 'RightBoxUserImg',
		data() {
			return {
				profileUrl:''
			}
		},
		watch: {
		},
		components: {
		},
		methods: {
			/* /getCustomerProfile */
			getCustomerProfile(id){
				let imei = util.getImei()
				console.log(imei);
				this.$axios.post('/getCustomerProfile', {
					wxid:id,
					imei: imei
				}).then(data => {
					this.profileUrl = '';
					if(!data.errcode) {
						this.profileUrl = data.profileUrl
					}
					
				}).catch(() => {});
			}
		},
		created() {
			//this.getCustomerProfile()
			// this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
	.no_user_img{
		text-align: center;
		padding: 64px 0;
		color: #999;
		line-height: 1.4;
		
		svg{
			width: 32px;
			height: 32px;
		}


	}
</style>
