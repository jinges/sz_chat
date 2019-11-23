<template>
    <video controls ref="video">
        <source ref="src" @error="error" :src="src" type="video/mp4">
        您的浏览器不支持 video 标签。
    </video>
</template>

<script>
    import $ from 'jquery'

    export default {
        data() {
            return {
                retryTimes: 1
            }
        },
        props: ["src"],
        methods: {
            error() {
                if (this.retryTimes > 5) {
                    return;
                }
                var _this = this;
                setTimeout(() => {
                    console.log('第'+_this.retryTimes+'/5次重新加载视频')
                    _this.retryTimes++;
                    $(_this.$refs['src']).attr('src', _this.src);
                    _this.$refs['video'].load();
                }, _this.retryTimes * 1000);
            }
        }
    }
</script>

<style>
</style>
