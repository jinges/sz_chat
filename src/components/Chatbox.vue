<template>
  <div class="toolbar" style="border-bottom: 1px solid #e9e2e2">
    <div class="send-area">
      <div class="icons" >
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
      <div class="tips">
        <!-- <el-button type="success" @click="send()" :style="options.btn || {}" size="mini">发送</el-button> -->
      </div>
    </div>
  </div>
</template>
<script>
import Emotions from "@/components/Emotions.vue";
export default {
  props:{'options':{
    toolbar: {},
    color: {}
  }},
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
      IMG.setAttribute("title",emotion.code);

      IMG.onload = () => {
        this.rangCoordinate.insertNode(IMG);
        this.rangCoordinate = this.rangCoordinate.cloneRange();
        this.rangCoordinate.setStartAfter(IMG);
        this.rangCoordinate.collapse(true);
        // 存在最后光标对象，选定对象清除所有光标并添加最后光标还原之前的状态
        sel.removeAllRanges();
        sel.addRange(this.rangCoordinate);
      };
      this.showEmotion = false;
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
    send(){
      let msg  = document.querySelector('.myarea').innerHTML;
      if(msg.trim().length) {
        this.$emit('msg', msg);
      }
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
    }
  }
};
</script>

<style scoped lang="scss">
.send-area {
  bottom: 0px;
  height: 99px;
  width: 100%;
  .tips {
    text-align: right;
    padding: 0px 15px;
    line-height: 33px;
    color: #b5b9bc;
  }
  .icons {
    padding: 0px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    background: #fff;
    color: #000;
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
    height: 70px;
    padding: 5px 15px;
    color: #fff;
    background: 'rgba(0,0,0,.4)';
  }
  .myarea:focus {
    outline: none;
  }
}
</style>
