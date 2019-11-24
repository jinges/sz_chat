<template>
    <div class="AddFriend">
        <el-form ref="form" :rules="rules" :model="formData" hide-required-asterisk status-icon>
            <el-form-item label="微信号" prop="targetWxid">
                <el-input v-model="formData.targetWxid" placeholder="请输入要添加的微信"></el-input>
            </el-form-item>
            <el-form-item label="打招呼" prop="sendWord">
                <el-input v-model="formData.sendWord" placeholder="请输入打招呼的话"></el-input>
            </el-form-item>
            <el-form-item style="text-align: center;">
                <el-button :loading="btnLoading" type="warning" @click="onSubmit">{{btnText}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import util from '../util/util.js'

    export default {
        data() {
            return {
                bufferData: {},
                btnLoading: false,
                btnText: '立即添加',
                formData: {
                    imei: util.getImei(),
                    myWxid: util.getMyWxId(),
                    sendWord: '你好，我是' + JSON.parse(util.getMyWxInfo()).nickName,
                    targetWxid: ''
                },
                rules: {
                    targetWxid: [{
                        required: true,
                        message: "微信号不能为空",
                        trigger: "blur"
                    }],
                    sendWord: [{
                        required: true,
                        message: "打招呼不能为空",
                        trigger: "blur"
                    }]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.btnLoading = true;
                        this.btnText = '正在添加';
                        this.$axios.post("/addBuddy", this.formData)
                            .then((data) => {
                                this.bufferData[data] = true;
                            })
                            .catch(() => {});
                    } else {
                        return false;
                    }
                });
            },
            onWsMsg(json) {
                if (json.commandName == 'SERVER_ADD_BUDDY_ACK') {
                    var messageId = json.messageId;
                    if (this.bufferData[messageId]) {
                        this.$message.success('添加好友成功');
                        delete this.bufferData[messageId];
                        this.$emit('submit');
                    }
                }
            }
        }
    }
</script>

<style>
</style>
