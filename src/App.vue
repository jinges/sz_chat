<template>
    <div id="app">
        <router-view />
        <Theme />
    </div>
</template>

<script>
    import Home from './views/Home.vue'
    import Theme from '@/components/Theme.vue'

    export default {
        name: 'app',
        components: {
            Home,
            Theme
        },
        created(){
            console.log(process.env.VUE_APP_MODE)
        }
    }
</script>

<style lang="scss">
    html,
    body {
        padding: 0px;
        margin: 0px;
    }

    * {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    ::-webkit-scrollbar {
        width: 3px;
        height: 3px;
    }

    ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.18);
        background-color: #fff;
    }

    ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #a09d9d;
    }

    /**请求进度**/
    .el-notify--ajax {
        width: 170px !important;
        background-color: rgba(0, 0, 0, 0.4) !important;
        color: #fff;
        border: none !important; 

        .el-notification__content {
            color: #fff;
            margin: 0px;
            line-height: 24px;
        }
    }
</style>
<style scoped>
    #app {
        position: absolute;
        top: 0px;
        left: 0px;
        bottom: 0px;
        right: 0px;
        overflow: hidden;
        min-width: 1024px;
    }
</style>
