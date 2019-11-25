<template>
    <div class="nav">
        <el-dropdown trigger="click" @command="switchUser" placement="left">
            <img :src="face" id="face" />
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :key="index" v-for="(item,index) in userdata" :command="item.myWxid">
                    <img :src="item.headPic"  style="width:30px;height:30px;vertical-align:middle;"/>
                    <span style="padding-left: 10px;position: relative;margin-top: -10%;">{{item.nickName}}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    
        <font-awesome-icon :icon="[activeIndex==0?'fas':'far','comment']" @click="nav('Sessions',0)" :class="{active:activeIndex==0}">
        </font-awesome-icon>
        <font-awesome-icon :icon="[activeIndex==1?'fas':'far','user']" @click="nav('AddressBook',1)" :class="{active:activeIndex==1}">
        </font-awesome-icon>
        <font-awesome-icon :icon="['fab','chrome']" @click="nav('pengyouquan',-1)" :class="{active:activeIndex==2}">
        </font-awesome-icon>
        <font-awesome-icon :icon="chromecast" />
        <font-awesome-icon :icon="['fab','coffee']"></font-awesome-icon>
        <font-awesome-icon :icon="[activeIndex==3?'fas':'far','users']" @click="nav('AddFriends',3)" :class="{active:activeIndex==3}">
        </font-awesome-icon>
        <font-awesome-icon icon="sign-out-alt" @click="logout" style="position: absolute;bottom: 60px;color:#ccc;cursor: pointer;font-size: 25px;"></font-awesome-icon>
        <font-awesome-icon icon="cog" @click="settings" style="position: absolute;bottom: 15px;color:#ccc;cursor: pointer;font-size: 25px;"></font-awesome-icon>
    </div>
</template>

<script>
    import util from '@/util/util.js'

    export default {
        props: ['face'],
        data() {
            return {
                activeIndex: 0,
                userdata:[]
            }
        },
        mounted(){
            this.Alluser()
        },
        methods: {
            Alluser(){
                 this.$axios.post("/deviceAndWeChatList", {})
                    .then(data => {
                        this.userdata = data;
                    })
                    .catch(() => {
                    
                    });
            },
            switchUser(c){
                console.log(c)
            },
            nav: function(action, index) {
                if (index != -1) {
                    this.activeIndex = index;
                }
                this.$emit('selectNav', action);
            },
            logout: function() {
                this.$confirm('确定要退出聊天窗口吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    util.removeToken();
                    util.removeExTime();
                    util.removeImei();
                    util.removeMyWxId();
                    this.$router.push({
                        path: 'logout'
                    })
                }).catch(() => {});

            },
            settings: function() {
                this.$emit('selectNav', 'Settings');
            }
        }
    }
</script>

<style scoped lang="scss">
    .nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        position: relative;

        #face {
            width: 40px;
            height: 40px;
            margin-top: 15px;
            border-radius: 3px;
            margin-bottom: 20px;
            cursor: pointer;
        }

        svg {
            margin-top: 20px;
            transition: .4s all ease;
            cursor: pointer;
            font-size: 25px;
            color: #aaa;

            &.active {
                color: #409EFF;
            }
        }
    }
</style>
