<template>
    <div id="createGroup">
        <el-container style="height:100%;" v-loading="loading"  element-loading-text="正在创建群" element-loading-background="rgba(255,255,255, 0.6)">
            <el-header>
                <el-form ref="form" :model="formData" inline style="margin-left: 40px;" :rules="rules" label-position="left"
                    hide-required-asterisk status-icon>
                    <el-form-item label="群名称" prop="groupName">
                        <el-input placeholder="请输入群名称" v-model="formData.groupName"></el-input>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-transfer v-model="result" :data="friends" filterable filter-placeholder="按名称搜索" :titles="['好友列表','群组成员']"
                    :render-content="fmt">
                    <el-button v-show="false" slot="left-footer" size="small">占位</el-button>
                    <el-button type="primary" slot="right-footer" style="float: right;" @click="submit" size="small">确定</el-button>
                </el-transfer>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import Friend from './Friend.vue'
    import util from '../util/util.js'

    export default {
        data() {
            return {
                loading:false,
                bufferData: {},
                formData: {
                    groupName: '',
                    imei: util.getImei(),
                    myWxid: util.getMyWxId(),
                    wxids: ''
                },
                rules: {
                    groupName: {
                        required: true,
                        message: '请输入群名称',
                        trigger: 'blur'
                    },
                },
                result: [],
                friends: this.$store.state.friends.filter(t=>!t.isGroup).map(t => {
                    return {
                        key: t.wxid,
                        label: t.name,
                        face: t.face
                    }
                })
            }
        },
        methods: {
            fmt: function(h, opt) {
                return ( < Friend name = {
                        opt.label
                    }
                    face = {
                        opt.face
                    }
                    blockWidth = "325px" / >
                )
            },
            submit: function() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (this.result.length < 2) {
                            this.$message.error('请至少选择两个群成员');
                        } else {
							var wxidList=this.result.concat(util.getMyWxId());
                            this.formData.wxids = wxidList.join(',');
                            this.loading=true;
                            this.$axios.post('createGroup', this.formData)
                                .then((data) => {
                                    this.bufferData[data] = true;
                                    this.$store.commit('initFriends')
                                })
                                .catch(() => {});
                        }
                    } else {
                        return false;
                    }
                });
            },
            onWsMsg(json) {
                if (json.commandName == 'SERVER_CREATE_GROUP_ACK') {
                    var messageId = json.messageId;
                    if (this.bufferData[messageId]) {
                        this.$message.success('创建群成功');
                        delete this.bufferData[messageId];
                        // this.$store.commit('initFriends');
                        this.$emit('submit');
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #createGroup {
        height: 600px;

        /deep/ .el-transfer {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .el-transfer-panel {
                height: 100%;
                width: 400px;
                display: flex;
                flex-direction: column;

                .el-transfer-panel__body {
                    height: 1px;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .el-transfer-panel__list {
                    flex-grow: 1;
                    height: 1px;
                }
            }
        }
    }
</style>
