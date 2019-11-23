<template>
	<div class="publishBlog">
		<font-awesome-icon class="close" @click="$emit('close')" icon="times-circle"></font-awesome-icon>
		<el-card class="content">
			<el-form>
				<el-form-item label="发布类型">
					<el-radio label="1" v-model="formData.momentType">文本</el-radio>
					<el-radio label="2" v-model="formData.momentType">图片</el-radio>
					<el-radio label="3" v-model="formData.momentType">视频</el-radio>
					<el-radio label="4" v-model="formData.momentType">链接</el-radio>
				</el-form-item>
				<el-form-item>
					<el-input :rows="5" v-model="formData.momentTitle" type="textarea" placeholder="请输入内容"></el-input>
				</el-form-item>
				<el-form-item v-show="formData.momentType==2||formData.momentType==3">
					<el-upload :action="uploadAction" list-type="picture-card" name="files" :auto-upload="true" :limit="9" :on-success="fileUploadSucc"
					 :on-remove="handleRemove">
						<i class="el-icon-plus"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="私密类型">
					<el-radio label="0" v-model="formData.publicMode">公开</el-radio>
					<el-radio label="1" v-model="formData.publicMode">私有</el-radio>
				</el-form-item>
				<el-form-item align="right">
					<el-button :loading="btnLoading" @click="publish" type="success">{{btnLoading?'正在发布':'立即发布'}}</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import util from '@/util/util.js'

	export default {
		data() {
			return {
				uploadAction: process.env.VUE_APP_SERVER_UPLOAD_URL,
				bufferData: {},
				btnLoading: false,
				fileList: [],
				formData: {
					filePath: "",
					imei: util.getImei(),
					label: "",
					momentTitle: "",
					momentType: "1",
					myWxid: util.getMyWxId(),
					publicMode: "1"
				}
			}
		},
		methods: {
			publish() {
				this.btnLoading = true;
				if ((this.formData.momentType == 2 || this.formData.momentType == 3) && !this.formData.filePath) {
					this.$message.error("请先上传图片");
					this.btnLoading = false;
					return;
				}
				this.$axios.post('/postMoment', this.formData).then((data) => {
					this.bufferData[data] = true;
				}).catch(() => {});
			},
			//删除图片
			handleRemove(res) {
				this.fileList.splice(res.response.data[0].url);
				this.formData.filePath = this.fileList.toString();
			},
			//上传图片成功
			fileUploadSucc(res) {
				if (res.errcode != 0) {
					this.$message.error(res.errmsg);
					return;
				}
				this.fileList.push(res.data[0].url);
				this.formData.filePath = this.fileList.toString();
			},
			//上传图片失败
			fileUploadErr(err, file, fileList) {
				this.$message.error('文件发送失败');
				console.error(err);
			},
			onWsMsg(json) {
				var msgid = json.messageId;
				if (this.bufferData[msgid]) {
					delete this.bufferData[msgid];
					this.$message.success('发布成功');
					this.btnLoading = false;
					this.$emit('close');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publishBlog {
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		bottom: 0px;
		background: rgba(0, 0, 0, 0.65);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;

		.close {
			position: absolute;
			color: #fff;
			font-size: 38px;
			right: 20px;
			top: 20px;
			cursor: pointer;

			&:hover {
				color: #ddd;
			}
		}

		.content {
			width: 520px;
			padding: 20px;
		}
	}
</style>
