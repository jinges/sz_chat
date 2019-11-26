<template>
  <article class="message">
     <chatbox :options="options" @msg="getMsg"></chatbox>
  </article>
</template>
<script>
import chatbox from '@/components/Chatbox.vue';
export default {
  components:{
    chatbox
  },
  data(){
    return {
      options: {  //配置所有的样式
        background: 'rgba(0,255,0,.4)',
        //toolbar icon导航的样式
        toolbar: {
          background: '#ff0',
          color: '#000'
        },
        //btn 按钮样式
        btn:{ 
          background: '#ff0',
          color: '#000'
        }
      }
    }
  },
  methods: {
    getMsg(content){
      console.log(content);
    }
  },
}
</script>
<style lang="scss">
  .message{
    
  }
</style>