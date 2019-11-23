<template>
	<div class="theme">
		<img :src="imagesList[imagesIndex].img" id="back" :style="{filter:'blur('+imgBlur+'px)'}" />
		<div class="tools">
			<div class="blur">
				<el-slider v-model="imgBlur" vertical height="100px" :max="25" @change="changeBlur">
				</el-slider>
				<div class="desc">背景虚化</div>
			</div>
			<div class="images">
				<el-tooltip v-for="(img,index) in imagesList" effect="dark" :content="img.title" placement="right">
					<img :src="img.img" @click="changeImg(index)" :class="{active:imagesIndex==index}" />
				</el-tooltip>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				imagesIndex: 0,
				imgBlur:10
			}
		},
		computed: {
			imagesList: function() {
				return ['海岸', '落日', '星空', '高山', '胜地'].map(function(v, i) {
					return {
						title: v,
						img: require('@/assets/back' + (++i) + '.jpg')
					}
				})
			}
		},
		methods: {
			changeBlur: function(v) {
				window.localStorage.setItem('__WBS__H5__THEME_IMG__BLUR__', v);
			},
			changeImg: function(t) {
				this.imagesIndex = t;
				window.localStorage.setItem('__WBS__H5__THEME_IMG__INDEX__', t);
			}
		},
		created: function() {
			var blur = window.localStorage.getItem('__WBS__H5__THEME_IMG__BLUR__');
			if (blur) {
				this.imgBlur = parseInt(blur);
			}
			var index = window.localStorage.getItem('__WBS__H5__THEME_IMG__INDEX__');
			if (index) {
				this.imagesIndex = parseInt(index);
			}
		}
	}
</script>

<style scoped lang="scss">
	.theme {
		#back {
			/* filter:blur(20px); */
			position: absolute;
			top: 0px;
			left: 0px;
			right: 0px;
			bottom: 0px;
			z-index: -1;
		}

		.tools {
			position: absolute;
			left: 10px;
			bottom: 15px;
			display: flex;

			.desc {
				font-size: 12px;
				color: #fff;
				margin-top: 15px;
				transform: scale(0.9);
				position: relative;
				left: -6px;
			}

			.images {
				display: flex;
				flex-direction: column;
				margin-left: 4px;

				>img {
					border-radius: 100%;
					width: 24px;
					height: 24px;
					cursor: pointer;
					border: 2px solid transparent;

					&.active {
						border-color: #fff !important;
					}

					&:hover {
						border-color: #aaa;
					}
				}
			}

		}
	}
</style>
