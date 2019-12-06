<template>
    <div :class="['message',type]">
        <div class="face default_head" :style="'background-image: '+ (face ?'url('+face+')' : '')+';'"></div>
        <div class="content">
            <!--图片消息-->
            <img v-if="media=='image'" @click="showImg(content)" style="cursor: pointer;max-width:250px;max-height:300px;border-radius: 4px;padding:8px 10px;"
                :src="content" />
            <!--语音消息-->
            <div v-else-if="media=='voice'" class="file" @click="downloadFile(content)">
                <font-awesome-icon icon="microphone"></font-awesome-icon>
                <div>[ 语音消息 ]</div>
                <div class="footer">
                    <font-awesome-icon icon="download"></font-awesome-icon>点击下载
                </div>
            </div>
            <!--视频消息-->
            <div v-else-if="media=='video'" style="padding: 8px 10px;">
                <video style="max-width: 180px;" controls>
                    <source :src="content" type="video/mp4">
                    您的浏览器不支持 video 标签。
                </video>
            </div>
            <!--文件消息-->
            <div v-else-if="media=='file'" class="file" @click="downloadFile(content)">
                <font-awesome-icon icon="file"></font-awesome-icon>
                <div>[ 文件消息 ]</div>
                <div class="footer">
                    <font-awesome-icon icon="download"></font-awesome-icon>点击下载
                </div>
            </div>
            <!--链接消息-->
            <div v-else-if="media=='link'" class="link" @click="downloadFile(content.link)">
                <font-awesome-icon icon="link"></font-awesome-icon>
                <div>
                    <div class="title">{{content.title}}</div>
                    <div class="desc">{{content.desc}}</div>
                </div>
            </div>
            <!--文本消息-->
            <div v-else v-html="textWithEmotion" style="padding: 8px 10px;"></div>
        </div>
        <div v-if="sending" class="sending"><i class="el-icon-loading"></i>发送中</div>
        <div class="time">{{time}}</div>
    </div>
</template>

<script>
    import {
        WxEmotions
    } from 'wechat-square-bracket-emotions'
    import Vue from 'vue'

    var wxEmo = new WxEmotions();
    export default {
        props: ['face', 'type', 'media', 'content', 'time', 'sending'],
        methods: {
            showImg: function(url) {
                this.$msgbox({
                    message: '<img style="max-width: 60vw;max-height: 90vh;" src="' + url + '"/>',
                    dangerouslyUseHTMLString: true,
                    showConfirmButton: false,
                    closeOnClickModal: true,
                    center: true,
                    showClose: false,
                    customClass: 'el-message-box--image',
                    callback: () => {}
                });
            },
            downloadFile(url) {
                window.open(url)
            }
        },
        computed: {
            //表情转图片
            textWithEmotion: function() {
                return wxEmo.parse(this.content)
            }
        }
    }
</script>

<style>
    .el-message-box--image {
        max-width: 60vw !important;
        width: auto !important;
        padding-bottom: 0px !important;
    }
</style>
<style scoped lang="scss">
    .message {
        margin: 14px 14px 10px 14px;
        clear: both;
        float: left;

        .face {
            width: 38px;
            height: 38px;
            border-radius: 4px;
            float: left;
        }

        .content {
            font-size: 14px;
            background: rgba(0, 0, 0, 0.5);
            color: #fff;
            border-radius: 4px;
            max-width: 480px;
            float: left;
            margin-top: 4px;
            margin-left: 14px;
            position: relative;
            word-wrap: break-word;
            word-break: break-all;

            .file {
                display: flex;
                padding: 8px 13px 36px 22px;
                cursor: pointer;
                position: relative;

                >svg {
                    font-size: 30px;
                    margin-right: 30px;
                    color: #E6A23C;
                }

                >div {
                    line-height: 30px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    max-width: 270px;
                }

                .footer {

                    svg {
                        margin-right: 5px;
                    }

                    position: absolute;
                    bottom: 0px;
                    left: 0px;
                    right: 0px;
                    height: 25px;
                    text-align: center;
                    font-size: 12px;
                    line-height: 25px;
                    padding-right: 6px;
                    color: #d5dbe6;
                    border-top: 1px solid #7a7c7d;
                }
            }

            .link {
                display: flex;
                width: 225px;
                padding: 10px;
                cursor: pointer;

                >svg {
                    font-size: 30px;
                    margin-right: 17px;
                    color: #C0C4CC;
                }

                >div {
                    flex-grow: 1;
                    width: 1px;

                    .title {
                        -webkit-line-clamp: 2;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        font-size: 13px;
                    }

                    .desc {
                        color: #909399;
                        margin-top: 2px;
                        font-size: 12px;
                        -webkit-line-clamp: 3;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                }
            }
        }

        .sending {
            float: left;
            font-size: 12px;
            transform: scale(0.9);
            color: #ddd;
            padding-top: 6px;
            margin: 0px 5px;
        }

        .time {
            clear: both;
            font-size: 12px;
            color: #909399;
            padding-top: 6px;
        }

    }

    .sender {
        .content:before {
            content: '';
            display: inline-block;
            width: 0px;
            height: 0px;
            border: 6px solid red;
            border-color: transparent rgba(0, 0, 0, 0.5) transparent transparent;
            position: absolute;
            top: 6px;
            left: -12px;
        }

        .time {
            margin-left: 55px;
        }
    }


    .receiver {
        float: right;

        .face {
            float: right;
        }

        .content {
            margin-right: 14px;
            margin-left: 0px;
            background: rgba(26, 188, 156, 0.3);
            float: right;

            &:before {
                content: '';
                display: inline-block;
                width: 0px;
                height: 0px;
                border: 6px solid red;
                border-color: transparent transparent transparent rgba(26, 188, 156, 0.3);
                position: absolute;
                top: 6px;
                right: -12px;
            }

            .file {
                .footer {
                    border-top: 1px solid #81a99c;
                }
            }
        }

        .sending {
            float: right;
        }

        .time {
            margin-right: 55px;
            text-align: right;
        }
    }
</style>
