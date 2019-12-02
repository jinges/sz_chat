<template>
	
	<iframe :src="profileUrl" height="100%" width="100%" name="user-img" frameborder="0"></iframe>
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
				console.log(112)
				this.$axios.post('/getCustomerProfile', {
					wxid:id
				}).then(data => {
					this.profileUrl = data.profileUrl
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
