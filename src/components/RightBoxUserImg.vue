<template>
	
	<iframe :src="profileUrl" v-if="profileUrl.length" height="100%" width="100%" name="user-img" frameborder="0"></iframe>
	<span v-else>没有画像</span>
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
	
</style>
