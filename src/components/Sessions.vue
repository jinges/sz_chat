<template>
    <div class="sessions">
        <vue-scroll>
            <Session v-for="(session, index) in $store.getters.filterSessionsByName" :key="index" :selIndex="selIndex" :index="index" v-bind="session" @selectSession="selectSession" />
        </vue-scroll>
    </div>
</template>

<script>
    import Session from './Session.vue'
    import util from '@/util/util.js'
    import pinyin from 'js-pinyin'

    export default {
        components: {
            Session
        },
        data(){
            return {
                selIndex: 0
            }
        },
        methods: {
            initSel(){
                this.selIndex = 0;
            },
            selectSession: function(target) {
                this.$emit('selectSession', target);
                this.selIndex = target.selIndex;
            },
            onWsMsg: function(json) {
                debugger;
                var messageContent = JSON.parse(json.messageContent);
                if (json.commandName == 'CLIENTNOTIFY_TEXT'||json.commandName=='CLIENTNOTIFY_GROUP_TEXT' || json.commandName == "CLIENT_SEND_TEXT") { //收到文本消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: messageContent.sendContent,
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_IMAGE'||json.commandName=='CLIENTNOTIFY_GROUP_IMAGE' || json.commandName == "CLIENT_SEND_IMAGE") { //收到图片消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[图片]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_VOICE'||json.commandName=='CLIENTNOTIFY_GROUP_VOICE'  || json.commandName == "CLIENT_SEND_VOICE") { //收到语音消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[语音]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_VIDEO'||json.commandName=='CLIENTNOTIFY_GROUP_VIDEO' || json.commandName == "CLIENT_SEND_VIDEO") { //收到视频消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[视频]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_FILE'||json.commandName=='CLIENTNOTIFY_GROUP_FILE' || json.commandName == "CLIENT_SEND_FILE") { //收到文件消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[文件]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_LINK'||json.commandName=='CLIENTNOTIFY_GROUP_LINK' || json.commandName == "CLIENT_SEND_LINK") { //收到链接消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[链接]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else {
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[未知类型]',
                        createTime: parseInt(messageContent.createTime)
                    });
                }
            }
        },
        created: function() {
            this.$store.commit('initSessions');
        }
    }
</script>

<style scoped lang="scss">
    .sessions {
        height: 100%;
    }
</style>
