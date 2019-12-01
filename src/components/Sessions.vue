<template>
    <div class="sessions">
        <vue-scroll>
            <Session v-for="session in $store.getters.filterSessionsByName" v-bind="session" @selectSession="selectSession" />
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
                imei:util.getImei()
            }
        },
        methods: {
            selectSession: function(target) {
                this.$emit('selectSession', target)
            },
            onWsMsg: function(json) {
                
                if (json.messageType != 'NOTIFY_TO_SERVER')
                    return;

                var messageContent = JSON.parse(json.messageContent);
                if (json.commandName == 'CLIENTNOTIFY_TEXT'||json.commandName=='CLIENTNOTIFY_GROUP_TEXT') { //收到文本消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: messageContent.sendContent,
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_IMAGE'||json.commandName=='CLIENTNOTIFY_GROUP_IMAGE') { //收到图片消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[图片]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_VOICE'||json.commandName=='CLIENTNOTIFY_GROUP_VOICE') { //收到语音消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[语音]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_VIDEO'||json.commandName=='CLIENTNOTIFY_GROUP_VIDEO') { //收到视频消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[视频]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_FILE'||json.commandName=='CLIENTNOTIFY_GROUP_FILE') { //收到文件消息
                    this.$store.commit('topSession', {
                        groupId: messageContent.groupId,
                        targetWxid: messageContent.targetWxid,
                        msg: '[文件]',
                        createTime: parseInt(messageContent.createTime)
                    });
                } else if (json.commandName == 'CLIENTNOTIFY_LINK'||json.commandName=='CLIENTNOTIFY_GROUP_LINK') { //收到链接消息
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
                    console.error('无法识别的新消息' + JSON.stringify(json));
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
