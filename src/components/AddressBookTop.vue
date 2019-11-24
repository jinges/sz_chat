<template>
	<div class="address_book_top" @click="selectTopItem()">
	    <svg class="icon">
            <use :xlink:href="'#'+icon"/>
        </svg>
	    <div class="name">{{name}}</div>
	</div>
</template>

<script>
	import util from '@/util/util.js'
	import $ from 'jquery'

	export default {
		name: 'AddressBookTop',
		props: {
			icon: String,
            name: String,
		    toggleCls: Boolean,
		    wxid: String,
		    detail: Object,
		    isGroup:Boolean,
		    type:String
		},
		methods: {
			selectTopItem: function() {
				// console.log(this.type);
                if (this.toggleCls) {
                    $(this.$el).addClass('active').siblings().removeClass('active');
                }
                this.$emit('selectAddressBookTops', this.type, this.detail);
                
            }
		},
		created() {
			// this.loadData();
		}
	}
</script>

<style scoped lang="scss">
    .address_book_top {
        font-size: 14px;
        display: flex;
        padding: 10px;
        cursor: pointer;
        box-sizing: border-box;

        &:hover {
            background: rgba(103, 194, 58, 0.2);
        }

        &.active {
            background: rgba(103, 194, 58, 0.5);
        }

        .icon {
            width: 38px;
            height: 38px;
            border-radius: 3px;
            margin-right: 13px;
        }

        .name {
            line-height: 38px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
</style>
