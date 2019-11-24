<template>
    <div class="search">

        <el-input size="small" style="width:180px;margin: 10px;" placeholder="请输入搜索内容" suffix-icon="el-icon-search"
            v-model="searchText">
        </el-input>

        <el-dropdown trigger="click" @command="clickMenu">
            <span class="plus"></span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="addFriend">添加好友</el-dropdown-item>
                <el-dropdown-item command="createGroup">创建群组</el-dropdown-item>
                <el-dropdown-item command="groupMessage">群发消息</el-dropdown-item>
                <el-dropdown-item command="groupFriend">发送朋友圈</el-dropdown-item>
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
            <group-Message groupType="groupMessage"></group-Message>
        </el-dialog>
         <el-dialog width="1000px" left title="发送朋友圈信息" :visible="showgroupFriend" :before-close="closegroupFriend"
            class="groupMessage">
            <group-Message groupType="groupFriend"></group-Message>
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
                showgroupFriend:false
            }
        },
        methods: {
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
        background: rgba(0, 0, 0, 0.6);

        .plus {
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

                &:before,
                &:after {
                    background: #fff;
                }
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
</style>
<style lang="scss">
    .el-dropdown-menu {
        background-color: rgba(0, 0, 0, 0.4) !important;
        border: none !important;

        li {
            color: #fff !important;

            &:hover {
                background-color: #66b1ff !important;
                color: #fff !important;
            }
        }

        .popper__arrow {
            display: none !important;
        }
    }
</style>
