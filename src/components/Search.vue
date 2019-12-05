<template>
    <div class="search">
        <el-input size="small" style="width:188px;margin: 10px;" placeholder="请输入搜索内容" suffix-icon="el-icon-search" v-model="searchText" class="friend_search">
        </el-input>

        <el-dropdown trigger="click" @command="clickMenu" class="friend_search_plus">
            <span class="plus"></span>
            <el-dropdown-menu slot="dropdown"  class="plus_menu">
                <el-dropdown-item command="addFriend">
                    <font-awesome-icon icon="user-plus" />添加好友
                </el-dropdown-item>
                <el-dropdown-item command="createGroup">
                    <font-awesome-icon icon="comment" />创建群组
                </el-dropdown-item>
                <el-dropdown-item command="groupMessage">
                    <font-awesome-icon icon="comments" />群发消息
                </el-dropdown-item>
                <el-dropdown-item command="groupFriend">
                    <font-awesome-icon icon="bullseye" />发送朋友圈
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <el-dialog width="400px" center title="添加好友" :visible="showAddFriend" :before-close="closeAddFriend"
            destroy-on-close>
            <AddFriend ref="addFriend" @submit="showAddFriend = false;"/>
        </el-dialog>

        <el-dialog width="1000px" center title="创建群组" :visible="showCreateGroup" :before-close="closeCreaetGroup"
            destroy-on-close>
            <CreateGroup ref="createGroup" @submit="submitCreateGroup"/>
        </el-dialog>
        <el-dialog width="1000px" left title="群发消息" :visible="showgroupMessage" :before-close="closegroupMessage"
            class="groupMessage">
            <group-Message :time="time" groupType="groupMessage" @succ="groupMessageSucc"></group-Message>
        </el-dialog>
         <el-dialog width="1000px" left title="发送朋友圈信息" :visible="showgroupFriend" :before-close="closegroupFriend"
            class="groupMessage">
            <group-Message :time="time" groupType="groupFriend" @succ="groupFriendSucc"></group-Message>
        </el-dialog>

    </div>
</template>

<script>
    import AddFriend from './AddFriend.vue'
    import CreateGroup from './CreateGroup.vue'
    import groupMessage from './groupMessage.vue'

    export default {
        props: ['searchType'],
        data: function() {
            return {
                createGroupAck: false,
                searchText: '',
                showAddFriend: false,
                showCreateGroup: false,
                showgroupMessage:false,
                showgroupFriend:false,
                time: new Date().getTime()
            }
        },
        methods: {
            groupMessageSucc(){
                this.showgroupMessage = false;
            },
            groupFriendSucc(){
                this.showgroupFriend = false;
            },
            //关闭群发消息弹框
            closegroupMessage(){
                this.showgroupMessage = false;
            },
            clickMenu: function(c) {
                if (c == 'addFriend') {
                    this.showAddFriend = true;
                } else if (c == 'createGroup') {
                    this.showCreateGroup = true;
                }else if (c == 'groupMessage') {
                    this.showgroupMessage = true;
                }else if (c == 'groupFriend') {
                    this.showgroupFriend = true;
                }
                this.time = new Date().getTime();
            },
            closeAddFriend() {
                this.showAddFriend = false;
            },
            closeCreaetGroup: function() {
                this.showCreateGroup = false;
            },
            submitCreateGroup: function(result) {
                this.showCreateGroup = false;
            },
            closegroupFriend(){
                this.showgroupFriend = false;
            },
            onWsMsg: function(json) {
                this.$refs['addFriend']&&this.$refs['addFriend'].onWsMsg(json);
                this.$refs['createGroup']&&this.$refs['createGroup'].onWsMsg(json);
            }
        },
        watch: {
            searchType() {
                this.searchText='';
                if (this.searchType == 'Sessions') {
                    this.$store.commit('setSessionsKeyword', '');
                } else if (this.searchType == 'AddressBook') {
                    this.$store.commit('setFriendsKeyword', '');
                }
            },
            searchText(newVal) {
                if (this.searchType == 'Sessions') {
                    this.$store.commit('setSessionsKeyword', newVal);
                } else if (this.searchType == 'AddressBook') {
                    this.$store.commit('setFriendsKeyword', newVal);
                }
            }
        },
        components: {
            AddFriend,
            CreateGroup,
            groupMessage
        }
    }
</script>

<style scoped lang="scss">
    .search {
        /*background: rgba(0, 0, 0, 0.6);*/
        .friend_search_plus{
            vertical-align: middle;
        }
        div input{
            background-color:red;
        }
        .plus {
            outline:none;
            cursor: pointer;
            margin-left: 5px;
            width: 24px;
            height: 24px;
            border: 1px solid #C0C4CC;
            display: inline-block;
            vertical-align: middle;
            border-radius: 3px;
            position: relative;

            &:hover {
                border-color: rgb(64, 158, 255);
                background: rgb(64, 158, 255);
            }

            &:before {
                content: '';
                position: absolute;
                top: 5px;
                left: 11px;
                bottom: 5px;
                width: 2px;
                background: #C0C4CC;
            }

            &:after {
                content: '';
                position: absolute;
                left: 5px;
                top: 11px;
                right: 5px;
                height: 2px;
                background: #C0C4CC;
            }
        }
    }
    .plus_menu{
        border: none;
        li{
            color: #fff;

            &:hover {
                color: #fff;
            }

            svg{
                margin-right: 5px;
            }
        }
    }
</style>
