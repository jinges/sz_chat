<template>
    <div :class="{session:true,newmsg:newmsg}" @click="selectSession">
        <img class="face" :src="face" />
        <div class="content">
            <div class="name">{{name}}</div>
            <div class="time">{{prettyTime}}</div>
            <div class="lastMsg">{{lastMsg}}</div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    import moment from 'moment';
    moment.locale('zh-cn');

    export default {
        props: ['face', 'name', 'lastMsg', 'lastTime', 'targetId', 'newmsg','isGroup'],
        methods: {
            selectSession: function() {
                $(this.$el).removeClass('newmsg').attr('active','active').siblings().removeAttr('active');
                this.$store.commit('setCurrentSession',this.targetId);
                this.$emit('selectSession', {
                    targetId: this.targetId,
                    targetFace: this.face,
                    targetName: this.name,
                    isGroup:this.isGroup
                });
            }
        },
        computed: {
            prettyTime: function() {
                return moment(new Date(this.lastTime)).fromNow()
            }
        }
    }
</script>

<style scoped lang="scss">
    .session {
        font-size: 14px;
        display: flex;
        padding: 10px;
        cursor: pointer;
        width: 250px;
        box-sizing: border-box;
        position: relative;
        
        &.newmsg:not[active] {
            &:before {
                content: '';
                position: absolute;
                display: inline-block;
                width: 8px;
                background: #F56C6C;
                height: 8px;
                border-radius: 100%;
                left: 42px;
                top: 7px;
                border: 1px solid #fff;
            }
        }

        &:hover {
            background: rgba(230, 162, 60, 0.2);
        }

        &[active]{
            background: rgba(230, 162, 60, 0.5);

            .lastMsg {
                color: #fff;
            }
        }

        .face {
            width: 38px;
            height: 38px;
            border-radius: 3px;
            margin-right: 13px;
        }

        .content {
            flex-grow: 1;
            width: 1px;

            .name {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
                max-width: 128px;
                vertical-align: middle;
            }

            .time {
                display: inline-block;
                font-size: 12px;
                vertical-align: middle;
                color: #909399;
                float: right;
            }

            .lastMsg {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                color: #C0C4CC;
                clear: both;
                margin-top: 3px;
            }
        }
    }
</style>
