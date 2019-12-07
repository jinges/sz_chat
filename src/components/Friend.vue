<template>
    <div class="friend" @click="selectFriend" :style="{width:blockWidth}">
        <div class="face default_head" :style="'background-image: '+ (face ?'url('+face+')' : '')+';'"></div>
        <!-- <img class="face" :src="face" /> -->
        <div class="name">{{name}}</div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        props: {
            face: String,
            name: String,
            toggleCls: Boolean,
            wxid: String,
            detail: Object,
            isGroup:Boolean,
            blockWidth: {
                type: String,
                default: '250px'
            }
        },
        methods: {
            selectFriend: function() {
                if (this.toggleCls) {
                    $(this.$el).addClass('active').siblings().removeClass('active');
                }
                this.$emit('selectFriend', this.isGroup,this.detail);
            }
        }
    }
</script>

<style scoped lang="scss">
    .friend {
        font-size: 14px;
        display: flex;
        padding: 10px;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
        }

        &.active {
        }

        .face {
            width: 38px;
            height: 38px;
            border-radius: 3px;
            margin-right: 13px;
        }

        .name {
            line-height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
