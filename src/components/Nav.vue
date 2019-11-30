<template>
  <div class="nav">
    <div class="users">
      <div  v-for="(item,index) in userdata" 
        :key="index"  class="imgbox" 
        :class="{hasMsg:item.hasMsg}"
        @click="switchUser(item, index)">
        <img class="face" :src="item.face" />
      </div>
    </div>
    <font-awesome-icon
      :icon="[activeIndex==0?'fas':'far','comment']"
      @click="nav('Sessions',0)"
      :class="{active:activeIndex==0}"
      title="会话"
    ></font-awesome-icon>

    <font-awesome-icon
      :icon="[activeIndex==1?'fas':'far','address-book']"
      @click="nav('AddressBook',1)"
      :class="{active:activeIndex==1}"
      title="通讯录"
    ></font-awesome-icon>

    <!-- <font-awesome-icon :icon="['fab','bandcamp']" @click="nav('pengyouquan',-1)" :class="{active:activeIndex==2}">
    </font-awesome-icon>-->

    <font-awesome-icon
      :icon="[activeIndex==3?'fas':'far','plus-square']"
      @click="nav('AddFriends',3)"
      :class="{active:activeIndex==3}"
      title="批量添加好友"
    ></font-awesome-icon>

    <font-awesome-icon
      icon="sign-out-alt"
      @click="logout"
      style="position: absolute;bottom: 60px;color:#ccc;cursor: pointer;font-size: 25px;"
      title="退出系统"
    ></font-awesome-icon>

    <font-awesome-icon
      icon="cog"
      @click="settings"
      style="position: absolute;bottom: 15px;color:#ccc;cursor: pointer;font-size: 25px;"
      title="设置"
    ></font-awesome-icon>
  </div>
</template>

<script>
import util from "@/util/util.js";

export default {
  props: ["userdata"],
  data() {
    return {
      activeIndex: 0,
      userdata: []
    };
  },
  mounted() {
  },
  watch:{
    userdata(data){
      this.userdata = data;
    },
    immediate: true
  },
  methods: {
    composeValue(item) {
      return item;
    },
    // Alluser() {
    //   this.userdata = JSON.parse(
    //     localStorage.getItem("__WBS__H5__GLOBAL__WXLIST", this.wxList)
    //   );
    // },
    switchUser(wx, index) {
      this.$emit("switchUser", index);
    },
    nav: function(action, index) {
      if (index != -1) {
        this.activeIndex = index;
      }
      this.$emit("selectNav", action);
    },
    logout: function() {
      this.$confirm("确定要退出聊天窗口吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          util.removeToken();
          util.removeExTime();
          util.removeImei();
          util.removeMyWxId();
          util.removeImeis();
          this.$router.push({
            path: "logout"
          });
        })
        .catch(() => {});
    },
    settings: function() {
      this.$emit("selectNav", "Settings");
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;

 
  .imgbox{
    height: 40px;
    width: 40px;
    margin: 5px 10px;
    &.hasMsg::before{
      content: "";
    width: 10px;
    height: 10px;
    background: #f00;
    display: block;
    position: absolute;
    border-radius: 20px;
    left: 44px;
    margin-top: -4px;
    }
    img{
      display: block;
    }
  }

  .face {
    width: 40px;
    height: 40px;
    margin-top: 15px;
    border-radius: 3px;
    /*margin-bottom: 20px;*/
    cursor: pointer;
  }

  svg {
    margin-top: 20px;
    transition: 0.4s all ease;
    cursor: pointer;
    font-size: 25px;
    color: #aaa;

    &.active {
      color: #409eff;
    }
  }
}
</style>
