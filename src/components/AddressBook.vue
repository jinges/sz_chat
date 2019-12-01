<template>
  <div class="addressBook">
    <!-- SVG图标 -->
    <svg style="display: none;">
      <symbol viewBox="0 0 1024 1024" id="groupListIcon">
        <path
          class="st0"
          d="M923.54,1024H100.46C44.98,1024,0,979.02,0,923.54V100.46C0,44.98,44.98,0,100.46,0h823.08
                C979.02,0,1024,44.98,1024,100.46v823.08C1024,979.02,979.02,1024,923.54,1024z"
          fill="#4DC669"
        />
        <g>
          <path
            class="st1"
            d="M699.08,669.54c-49.23-29.54-147.69-68.92-157.54-88.62c-5.84-11.68-4.75-37.16-2.89-56.01
                        c34.26-25.21,57.05-69.35,57.05-119.71c0-78.43-55.1-142.01-123.08-142.01s-123.08,63.58-123.08,142.01
                        c0,50.36,22.79,94.5,57.05,119.71c1.85,18.85,2.95,44.33-2.89,56.01c-9.85,19.69-108.31,59.08-157.54,88.62
                        s-88.62,68.92-19.69,108.31h196.92h98.46h196.92C787.69,738.46,748.31,699.08,699.08,669.54z"
            fill="#FFFFFF"
          />
          <path
            class="st1"
            d="M789.4,614.29c-40.92-24.55-122.76-57.29-130.94-73.66c-4.85-9.71-3.95-30.89-2.41-46.55
                        c28.48-20.96,47.42-57.64,47.42-99.5c0-65.19-45.8-118.04-102.3-118.04c-4.63,0-8.76,7.79-6.52,11.02
                        c33.55,48.45,38.56,84.92,30.59,140.74c-7.2,50.4-35.46,95.53-50.13,116.15c-4.65,6.54-2.7,15.6,4.18,19.72l85.34,51.2
                        c49.23,29.54,103.79,55.25,118.15,88.93h23C863.05,671.58,830.32,638.84,789.4,614.29z"
            fill="#FFFFFF"
          />
        </g>
      </symbol>
      <symbol viewBox="0 0 1024 1024" id="newFriendIcon">
        <path
          class="st0"
          d="M923.54,1024H100.46C44.98,1024,0,979.02,0,923.54V100.46C0,44.98,44.98,0,100.46,0h823.08
                    C979.02,0,1024,44.98,1024,100.46v823.08C1024,979.02,979.02,1024,923.54,1024z"
          fill="#EE9C46"
        />
        <path
          class="st1"
          d="M728.97,521.69c-70.78,0-128.15,57.38-128.15,128.15S658.2,778,728.97,778s128.15-57.38,128.15-128.15
                    S799.75,521.69,728.97,521.69z M793.05,659.7h-54.22v54.22h-19.72V659.7H664.9v-19.72h54.22v-54.22h19.72v54.22h54.22V659.7z
                     M655.41,778H521.96h-98.58H226.22c-69.01-39.43-29.57-78.86,19.72-108.44c49.29-29.57,147.87-69.01,157.73-88.72
                    c5.85-11.69,4.75-37.21,2.9-56.07c-34.3-25.24-57.12-69.43-57.12-119.85c0-78.53,55.17-142.18,123.22-142.18
                    s123.22,63.66,123.22,142.18c0,50.43-22.81,94.61-57.12,119.85c-1.85,18.87-2.95,44.38,2.9,56.07c3.88,7.77,21.63,18.62,44.62,30.7
                    c-3.28,12.24-5.19,25.03-5.19,38.3C581.1,704.7,611.05,752.48,655.41,778z"
          fill="#FFFFFF"
        />
      </symbol>
    </svg>
    <!-- 列表区 -->
    <div class="container">
      <vue-scroll style="width:100%">
        <template v-for="topItem in topsData">
          <AddressBookTop
            :toggleCls="true"
            v-bind="topItem"
            @selectFriend="selectFriend"
            @selectAddressBookTops="selectAddressBookTops"
          ></AddressBookTop>
        </template>
        <template v-for="friend in $store.getters.groupFriends(ignoreGroup)">
          <div class="group" v-if="friend.letter">{{friend.letter}}</div>
          <Friend :toggleCls="true" v-bind="friend" @selectFriend="selectFriend" />
        </template>
      </vue-scroll>
    </div>
    <div class="refresh" @click="$store.commit('refershFriend')">
      <font-awesome-icon icon="redo-alt" class="icon"></font-awesome-icon>刷新
    </div>
  </div>
</template>

<script>
import Friend from "./Friend.vue";
import AddressBookTop from "./AddressBookTop.vue";
import util from "@/util/util.js";

export default {
  name: "RightBox",
  data() {
    return {
      topsData: [
        {
          name: "新的朋友",
          icon: "newFriendIcon",
          type: "isNewFriend"
        },
        {
          name: "群组",
          icon: "groupListIcon",
          type: "isGroupList"
        }
      ]
    };
  },
  props: ["ignoreGroup"],
  created: function() {
    this.$store.commit("initFriends");
  },
  components: {
    Friend,
    AddressBookTop
  },
  methods: {
    selectFriend: function(isGroup, detail) {
      this.$emit("selectFriend", isGroup, detail);
    },
    selectAddressBookTops: function(type, detail) {
      this.$emit("selectAddressBookTops", type, detail);
    },
    onWsMsg(json) {
      if (json.commandName == "SERVER_GET_BUDDY_LIST_ACK") {
        if(json.messageContent.length) {
          this.$store.commit('changeFriendList', JSON.parse(json.messageContent));
        }
      }
    }
  }
};
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
    cursor: pointer;

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
