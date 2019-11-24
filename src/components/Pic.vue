<template>
    <img ref="img" :src="src" @error="error" @click="click" />
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
            click() {
                this.$emit('click', this.src)
            },
            error() {
                if (this.retryTimes > 5) {
                    return;
                }
                var _this = this;
                setTimeout(() => {
                    console.log('重新加载图片')
                    _this.retryTimes++;
                    $(_this.$refs['img']).attr('src', _this.src)
                }, _this.retryTimes * 1000);
            }
        }
    }
</script>

<style>
</style>
