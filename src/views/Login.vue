<template>
    <div id="login">

        <div id="box" v-if="!showWxItem">
            <div class="title">
                <img id="logo" src="../assets/logo.gif" />
                <div id="text">WBS微运营平台</div>
            </div>
            <el-form :model="formData" :rules="rules" label-position="top" ref="form" hide-required-asterisk
                status-icon>
                <el-form-item label="用户名" class="item" prop="loginname">
                    <el-input v-model="formData.loginname" placeholder="请输入用户名" class="input"></el-input>
                </el-form-item>
                <el-form-item label="密码" class="item" prop="password">
                    <el-input show-password v-model="formData.password" placeholder="请输入密码" class="input"></el-input>
                </el-form-item>
                <el-form-item class="footer">
                    <el-button :loading="btnLoading" style="background:rgba(0,0,0,0.7);border-color:rgba(0,0,0,0.9);"
                        type="primary" plain @click="selectWx">{{btnText}}</el-button>
                </el-form-item>
            </el-form>
        </div>

        <transition name="slide">
            <div id="wxSel" v-if="showWxItem">
                <div class="selectTitle">请选择要登录的微信</div>
                <div v-for="(wx,index) in wxList" class="wxItem" :key="index" @click="login(wx)">
                    <img :src="wx.face" class="face" />
                    <div class="detail">
                        <div class="name">昵称：{{wx.name}}</div>
                        <div class="imei">设备：{{wx.imei}}</div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    import util from "@/util/util.js";

    export default {
        data() {
            return {
                //展示选择微信
                showWxItem: false,
                btnText: "立即登录",
                btnLoading: false,
                formData: {
                    type: "USER"
                },
                wxList: [],
                rules: {
                    loginname: [{
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur"
                    }],
                    password: [{
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur"
                    }]
                }
            };
        },
        methods: {
            selectWx: function() {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        if (!"WebSocket" in window) {
                            this.$message.error("您的浏览器不支持WebSocket,请更换浏览器");
                            return;
                        }

                        this.$axios
                            .post("/getToken", this.formData)
                            .then(data => {
                                this.btnText = "查找设备与微信";
                                this.btnLoading = true;
                                this.$axios
                                    .post(
                                        "/deviceAndWeChatList", {}, {
                                            headers: {
                                                Authorization: "Bearer:" + data.token
                                            }
                                        }
                                    )
                                    .then(d => {
                                        if (!d || d.length == 0) {
                                            this.$message.error("当前没有在线的设备与微信");
                                            this.btnText = "立即登录";
                                            this.btnLoading = false;
                                            return;
                                        }
                                        for(let i=0;i<d.length;i++){
                                            this.wxList.push({
                                                face: d[i].headPic,
                                                name:d[i].nickName,
                                                imei: d[i].imei,
                                                wxid: d[i].myWxid,
                                                token: data.token,
                                                exTime: data.expireTime
                                            });
                                        }
		                                localStorage.setItem('__WBS__H5__GLOBAL__WXLIST', JSON.stringify(this.wxList));
                                        // this.wxList = d
                                        // this.wxList.push({
                                        //     face: d.headPic,
                                        //     name:d.nickName,
                                        //     imei: d.imei,
                                        //     wxid: d.myWxid,
                                        //     token: data.token,
                                        //     exTime: data.expireTime
                                        // });
                                        this.showWxItem = !this.showWxItem;
                                    })
                                    .catch(e => {});
                            })
                            .catch(e => {});
                    } else {
                        return false;
                    }
                });
            },
            login: function(wx) {
                util.setToken(wx.token);
                util.setExTime(wx.exTime);
                util.setImei(wx.imei);
                util.setMyWxId(wx.wxid);
                this.$router.push("/");
            }
        }
    };
</script>

<style scoped lang="scss">
    #login {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 15%;
        display: flex;
        justify-content: center;
        align-items: center;

        .slide-enter-active {
            transition: 0.3s all ease-in;
        }

        .slide-enter {
            opacity: 0;
            transform: translateX(-25px);
        }

        #box {
            width: 450px;
            height: 380px;
            background: rgba(0, 0, 0, 0.6);
            color: #fff;
            border-radius: 9px;
            box-shadow: 0px 0px 28px rgba(0, 0, 0, 0.7);
            overflow: hidden;
            position: relative;

            .title {
                line-height: 60px;
                text-align: center;
                background: rgb(21, 21, 23);
                font-size: 15px;
                height: 64px;
                overflow: hidden;
                position: relative;

                #logo {
                    height: 159px;
                    position: absolute;
                    top: -42px;
                    left: -107px;
                }

                #text {
                    position: absolute;
                    z-index: 1;
                    left: 172px;
                    top: 3px;
                    font-size: 14px;
                }
            }

            .item {
                box-sizing: border-box;
                padding: 0px 50px;
            }

            .footer {
                text-align: center;
                margin-top: 46px;
                background: rgba(0, 0, 0, 0.5);
                height: 70px;
                justify-content: center;
                align-items: center;
                display: flex;
                position: absolute;
                bottom: 0px;
                left: 0px;
                right: 0px;
                margin-bottom: 0px;
            }
        }

        #wxSel {
            max-height: 80%;
            overflow: auto;
            background: rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            padding: 39px;
            border-radius: 4px;

            .selectTitle {
                color: #fff;
                text-align: center;
                font-weight: bold;
                font-size: 23px;
                margin-bottom: 30px;
                letter-spacing: 1px;
            }

            .wxItem {
                display: flex;
                padding: 15px;
                background: rgba(0, 0, 0, 0.4);
                border-radius: 5px;
                margin-bottom: 10px;
                width: 400px;
                cursor: pointer;
                border: 2px solid rgba(0, 0, 0, 0.4);
                color: #fff;

                &:hover {
                    background: rgba(0, 0, 0, 0.6);
                    border: 2px solid #fff;
                    color: #409eff;
                }

                .face {
                    width: 68px;
                    height: 68px;
                    border-radius: 6px;
                }

                .detail {
                    width: 1px;
                    flex-grow: 1;
                    padding-left: 20px;
                    font-size: 15px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    line-height: 34px;

                    .imei {
                        color: #c0c4cc;
                        font-size: 14px;
                    }
                }
            }
        }
    }
</style>
<style lang="scss">
    #login {
        .el-form-item__label {
            color: #fff !important;
            font-size: 15px !important;
            padding-bottom: 0px;
            line-height: 32px;
            padding-top: 14px;
        }

        input {
            background: rgba(0, 0, 0, 0.2);
            border-color: #999;
            transition: 0.5s all ease;

            &:focus {
                background: #fff;
                border-color: #dcdfe6;
            }
        }
    }
</style>
