<template>
    <div class="nav">
        <el-dropdown trigger="click" @command="switchUser" placement="left">
            <img :src="face" id="face" />
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :key="index" v-for="(item,index) in userdata" :command="composeValue(item)">
                    <img :src="item.face"  style="width:30px;height:30px;vertical-align:middle;"/>
                    <span style="padding-left: 10px;position: relative;margin-top: -10%;">{{item.name}}</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <font-awesome-icon :icon="[activeIndex==0?'fas':'far','comment']" @click="nav('Sessions',0)" :class="{active:activeIndex==0}" title="会话">
        </font-awesome-icon>

        <font-awesome-icon :icon="[activeIndex==1?'fas':'far','address-book']" @click="nav('AddressBook',1)" :class="{active:activeIndex==1}" title="通讯录">
        </font-awesome-icon>

        <!-- <font-awesome-icon :icon="['fab','bandcamp']" @click="nav('pengyouquan',-1)" :class="{active:activeIndex==2}">
        </font-awesome-icon> -->

        <font-awesome-icon :icon="[activeIndex==3?'fas':'far','plus-square']" @click="nav('AddFriends',3)" :class="{active:activeIndex==3}" title="批量添加好友">
        </font-awesome-icon>

        <font-awesome-icon icon="sign-out-alt" @click="logout" style="position: absolute;bottom: 60px;color:#ccc;cursor: pointer;font-size: 25px;" title="退出系统">
        </font-awesome-icon>

         <font-awesome-icon icon="cog"  @click="settings" style="position: absolute;bottom: 15px;color:#ccc;cursor: pointer;font-size: 25px;" title="设置">
         </font-awesome-icon>
       
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
            composeValue(item){
                return item
            },
            Alluser(){
                /*  this.$axios.post("/deviceAndWeChatList", {})
                    .then(data => {
                        this.userdata = data;
                    })
                    .catch(() => {
                    
                    }); */
                this.userdata = JSON.parse(localStorage.getItem('__WBS__H5__GLOBAL__WXLIST', this.wxList));
            },
            switchUser(wx){
                // if(wx.wxid != util.getMyWxId()){
                    util.removeToken();
                    util.removeExTime();
                    util.removeImei();
                    util.removeMyWxId();
                    util.setToken(wx.token);
                    util.setExTime(wx.exTime);
                    util.setImei(wx.imei);
                    util.setMyWxId(wx.wxid);
                    this.$emit('switchUser') 
                // }
                //切换用户   
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
            /*margin-bottom: 20px;*/
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
