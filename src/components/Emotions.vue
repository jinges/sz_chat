<template>
    <div class="emotions">
        <div class="list">
            <img v-for="e in list" :src="e.img" @click="selected(e)" />
        </div>
    </div>
</template>

<script>
    import {
        emotions
    } from 'weixin-emotion';
    import $ from 'jquery'

    export default {
        data() {
            return {
                //code text img
                list: emotions
            }
        },
        methods: {
            selected(e) {
                this.$emit('selected', e);
            }
        },
        mounted(){
            var _this=this;
            $('body').on('click',function(e){
                if(!$(e.target).closest(".emotions")[0]){
                    _this.$emit('emotionBlur');
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .emotions {
        .list {
            width: 350px;
            background: rgba(0, 0, 0, 0.4);
            height: 200px;
            padding: 10px;
            border-radius: 5px;
            box-sizing: border-box;
            overflow-y: auto;

            img {
                padding: 2px 4px;
                cursor: pointer;

                &:hover {
                    background: #aaa;
                }
            }
        }
    }
</style>
