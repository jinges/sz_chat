<template>
  <div class="toolbar">
    <div class="send-area">
      <div class="icons">
        <font-awesome-icon @click.stop="showEmotion=!showEmotion" icon="smile"></font-awesome-icon>
        <transition name="slide" >
          <Emotions
            @emotionBlur="closeEmotions"
            v-show="showEmotion"
            @selected="selectEmotion"
            id="emotions"
          />
        </transition>
      </div>
      <div
        class="myarea"
        placeholder="请输入内容"
        contenteditable="true"
        tabindex="-1"
        @click="setRangCoordinate"
        @keydown="setDownKeyValue($event)"
      ></div>
      <div class="tips">按下Enter发送内容,Ctrl+Enter换行</div>
    </div>
  </div>
</template>
<script>
import Emotions from "@/components/Emotions.vue";
export default {
  components: {
    Emotions
  },
  data() {
    return {
      showEmotion: false, //是否展示表情选择
      sendText: String,
      rangCoordinate: null //当前编辑器的range坐标
    };
  },
  mounted() {
    
  },
  methods: {
    //表情
    closeEmotions() {
      this.showEmotion = false;
    },
    //表情
    selectEmotion(emotion) {
      if (!this.rangCoordinate) {
        //让编辑器获得焦点
        document.querySelector(".myarea").focus();
        //设置最后光标对象；
        this.getMyAreaRang();
      }
      let sel = window.getSelection();
      let IMG = document.createElement("img");
      IMG.src = emotion.img;
      IMG.setAttribute("width", 16);
      IMG.setAttribute("height", 16);
      IMG.setAttribute("title", "[" + emotion.code + "]");

      IMG.onload = () => {
        this.rangCoordinate.insertNode(IMG);
        this.rangCoordinate = this.rangCoordinate.cloneRange();
        this.rangCoordinate.setStartAfter(IMG);
        this.rangCoordinate.collapse(true);
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        sel.removeAllRanges();
        sel.addRange(this.rangCoordinate);
      };
    },
    setRangCoordinate() {
      // 获取选定对象
      this.getMyAreaRang();
    },
    getMyAreaRang() {
      let sel = window.getSelection();
      if (sel.rangeCount && sel.getRangeAt) {
        // 设置最后光标对象
        this.rangCoordinate = sel.getRangeAt(0);
        this.rangCoordinate.deleteContents();
      }
    },
    setDownKeyValue(e) {
      //设置最后光标对象；
      this.debounce(this.getMyAreaRang, 1000)();
    },
    debounce(fn, delay) {
      let $this = this;
      // 定时器，用来 setTimeout
      //var timer
      // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
      return function() {
        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this;
        var args = arguments;
        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout($this.timer);
        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        $this.timer = setTimeout(function() {
          fn.apply(context, args);
        }, delay);
      };
    },
    //发送消息
    send() {
      if (!this.sendText.trim()) {
        this.$message.error("发送消息不能为空");
        return;
      }
      this.sendLoading = true;
      var now = new Date();
      var url = "sendText";
      var objId = "targetWxid";
      if (this.isGroup) {
        url = "sendGroupText";
        objId = "groupId";
      }
      var param = {
        createTime: now.getTime(),
        imei: util.getImei(),
        myWxid: util.getMyWxId(),
        sendContent: this.sendText,
        [objId]: this.targetId
      };
      if (this.selectAtUserId.length && this.isGroup) {
        url = "sendGroupForText";
        param = {
          createTime: now.getTime(),
          imei: util.getImei(),
          myWxid: util.getMyWxId(),
          sendContent: this.sendText,
          groupId: this.targetId,
          userId: this.selectAtUserId.toString()
        };
      }

      this.$axios
        .post(url, param)
        .then(data => {
          this.sendLoading = false;
          this.sendingMap[data] = true;
          this.history.push({
            type: "receiver",
            media: "text",
            face: this.myFace,
            content: this.sendText,
            time: now.toLocaleString(),
            sending: true,
            sendingId: data
          });
          this.sendText = "";

          //滚动到底部
          this.$refs["vs"].scrollBy(
            {
              dy: 1000
            },
            500,
            "easeInQuad"
          );
        })
        .catch(() => {});
    }
  }
};
</script>

<style scoped lang="scss">
.send-area {
  border-top: 1px solid #ddd;
  position: absolute;
  left: 60px;
  bottom: 0px;
  height: 180px;
  width: calc(100% - 60px);
  .tips {
    text-align: right;
    padding: 0px 15px;
    line-height: 33px;
    color: #b5b9bc;
    background: #eee;
  }
  .icons {
    padding: 0px 10px;
    height: 30px;
    background: #eee;
    position: relative;
    .upload-demo {
      display: inline-block;
    }
    i {
      font-size: 16px;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      color: #676d79;
      cursor: pointer;
      text-align: center;
    }
    .emoji-box {
      position: absolute;
      overflow: hidden;
      left: 0px;
      bottom: 31px;
      z-index: 999;
    }
  }
  .myarea {
    height: 108px;
    padding: 5px 15px;
    background: #eee;
  }
  .myarea:focus {
    outline: none;
  }
}
</style>
