<template>
    <div class="addressBook">
        <div class="container">
            <vue-scroll style="width:100%">
                <template v-for="friend in $store.getters.groupFriends(ignoreGroup)">
                    <div class="group" v-if="friend.letter">{{friend.letter}}</div>
                    <Friend :toggleCls="true" v-bind="friend" @selectFriend="selectFriend" />
                </template>
            </vue-scroll>
        </div>
        <div class="refresh" @click="$store.commit('initFriends')">
            <font-awesome-icon icon="redo-alt" class="icon"></font-awesome-icon>刷新
        </div>
    </div>
</template>

<script>
    import Friend from './Friend.vue'
    import util from '@/util/util.js'

    export default {
        props: ['ignoreGroup'],
        created: function() {
            this.$store.commit('initFriends');
        },
        components: {
            Friend
        },
        methods: {
            selectFriend: function(isGroup, detail) {
                this.$emit('selectFriend', isGroup, detail);
            }
        }
    }
</script>

<style scoped lang="scss">
    .addressBook {
        height: 100%;
        display: flex;
        flex-direction: column;

        .container {
            height: 1px;
            flex-grow: 1;
        }

        .refresh {
            height: 30px;
            text-align: right;
            font-size: 12px;
            line-height: 30px;
            background: rgba(0, 0, 0, 0.4);
            padding: 0px 10px;
            color: #e48863;
            cursor:pointer;

            .icon {
                margin-right: 4px;
            }
        }

        .group {
            font-size: 14px;
            padding: 10px;
            font-weight: bold;
        }
    }
</style>
