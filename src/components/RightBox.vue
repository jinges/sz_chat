<template>
	<div class="right-box">
		<!-- SVG图标 -->
		<svg style="display: none;">
	        <symbol viewBox="0 0 1024 1024" id="svgUserImg">
	            <path d="M510 64.4c-246.5 0-447.6 200-447.6 447.6 0 246.5 200 447.6 447.6 447.6 246.5 0 447.6-200 447.6-447.6 0-246.5-200.1-447.6-447.6-447.6z m0 831.9c-212.3 0-384.3-172-384.3-384.3s172-384.3 384.3-384.3 384.3 172 384.3 384.3-172 384.3-384.3 384.3z m229.1-181.2c-18.4-70.4-67.9-125.5-131.2-153.6 48-30.6 79.6-84.2 79.6-144.9 0-94.9-77.1-172-172-172s-172 77.1-172 172c0 61.2 31.6 114.8 79.6 144.9-63.8 27.6-113.3 83.2-131.7 153.6-4.1 16.3 5.6 33.2 21.9 37.3 2.6 0.5 5.1 1 7.7 1 13.8 0 26-9.2 29.6-23 19.4-75 87.3-127.1 164.3-127.1S660 655.4 679.4 730.4c4.1 16.3 20.9 26 37.3 21.9 16.8-4 27-20.9 22.4-37.2zM515.6 305.8c61.2 0 110.7 49.5 110.7 110.7s-49.5 110.7-110.7 110.7-110.7-49.5-110.7-110.7 49.5-110.7 110.7-110.7z" p-id="924"></path>
	        </symbol>
            <symbol viewBox="0 0 1024 1024" id="svgUserInfo">
                <path d="M870.4 153.6H736v-56C736 79 721 64 702.4 64s-33.6 15-33.6 33.6v56H355.2v-56c0-18.6-15-33.6-33.6-33.6S288 79 288 97.6v56H153.6c-49.5 0-89.6 40.1-89.6 89.6v627.2c0 49.5 40.1 89.6 89.6 89.6h716.8c49.5 0 89.6-40.1 89.6-89.6V243.2c0-49.5-40.1-89.6-89.6-89.6zM892.8 848c0 24.7-20.1 44.8-44.8 44.8H176c-24.7 0-44.8-20.1-44.8-44.8V265.6c0-24.7 20.1-44.8 44.8-44.8h112v56c0 18.6 15 33.6 33.6 33.6s33.6-15 33.6-33.6v-56h313.6v56c0 18.6 15 33.6 33.6 33.6s33.6-15 33.6-33.6v-56h112c24.7 0 44.8 20.1 44.8 44.8V848zM456.9 642.7c33.3-24.5 55.1-63.8 55.1-108.3 0-74.2-60.2-134.4-134.4-134.4s-134.4 60.2-134.4 134.4c0 44.5 21.7 83.8 55.1 108.3-52.7 26.1-90.6 77.4-98.2 138.1h67.8c10.4-51.1 55.6-89.6 109.7-89.6s99.4 38.5 109.7 89.6h67.8c-7.5-60.7-45.4-112-98.2-138.1z m-79.3-41.1c-37.1 0-67.2-30.1-67.2-67.2s30.1-67.2 67.2-67.2 67.2 30.1 67.2 67.2-30.1 67.2-67.2 67.2z m369.6 44.8H680c-18.6 0-33.6 15-33.6 33.6s15 33.6 33.6 33.6h67.2c18.6 0 33.6-15 33.6-33.6s-15-33.6-33.6-33.6zM792 467.2H635.2c-18.6 0-33.6 15-33.6 33.6s15 33.6 33.6 33.6H792c18.6 0 33.6-15 33.6-33.6s-15-33.6-33.6-33.6z" p-id="1048"></path>
            </symbol>
            <symbol viewBox="-100 -100 1224 1224" id="svgPengyouquan">
                <path d="M541.76 311.637L283.947 54.72c-9.856 4.907-19.542 10.048-28.971 15.51-37.973 21.738-73.75 48.597-106.07 80.789-13.973 13.845-26.666 28.373-38.506 43.221-29.12 36.523-52.523 76.096-70.165 117.483 0 0 485.973-2.56 501.525-0.086zM391.723 348.16H27.093c-3.52 10.197-6.634 20.715-9.536 31.296C6.187 421.504 0 465.686 0 511.36c0 19.52 1.216 38.741 3.435 57.643 5.248 46.378 16.853 90.773 33.813 132.416 0 0 341.717-344.171 354.475-353.259zM970.24 282.432c-4.843-9.664-10.005-19.328-15.488-28.821-21.888-37.718-48.768-73.408-81.173-105.622-13.846-13.781-28.374-26.56-43.35-38.378-36.672-28.992-76.33-52.331-117.866-69.867 0 0 2.581 484.139 0 499.563L970.24 282.432zM676.565 390.336V27.072c-10.304-3.477-20.864-6.656-31.445-9.6C602.965 6.208 558.592 0 512.725 0c-19.605 0-38.869 1.216-57.877 3.413-46.485 5.248-91.05 16.854-132.97 33.643 0 0 345.407 340.608 354.687 353.28zM311.147 482.09L53.419 739.009c4.778 9.835 10.048 19.37 15.488 28.885 21.781 37.782 48.746 73.472 81.173 105.707 13.824 13.803 28.373 26.475 43.35 38.379 36.671 29.056 76.245 52.288 117.866 69.802 0-0.021-2.645-484.16-0.15-499.69zM479.744 714.283L737.621 971.2a612.547 612.547 0 0 0 28.992-15.51c37.782-21.695 73.536-48.49 106.006-80.831 13.781-13.76 26.538-28.203 38.485-43.158 29.056-36.544 52.523-75.989 70.101-117.461-0.042 0-485.888 2.645-501.461 0.043zM1020.544 455.19c-5.312-46.315-16.832-90.753-33.77-132.46 0 0-341.782 344.15-354.56 353.345h364.629a553.476 553.476 0 0 0 9.493-31.339c11.435-42.09 17.664-86.144 17.664-131.84 0-19.541-1.259-38.784-3.456-57.707zM347.456 633.6v363.307c10.347 3.498 20.864 6.656 31.424 9.493 42.219 11.456 86.528 17.6 132.395 17.6 19.541 0 38.848-1.216 57.77-3.435 46.55-5.269 91.051-16.725 132.907-33.6 0.064 0-345.301-340.565-354.496-353.365z" p-id="1172"></path>
            </symbol>
            <symbol viewBox="0 0 1024 1024" id="svgTalking">
                <path d="M229.5 757.9v-0.1c-56.1-0.1-101.4-45.4-101.5-101.4v-254h-20.7c-28.3 0-43.3 23-43.3 51.4v298c0 28.4 24.5 58.6 52.8 58.6h46.8l-22.2 82.4s-2.2 4.6 2.2 5.1c5.6 0.7 16.8-5.2 16.8-5.2L318 810.4h267.1c13.7 0 26.1 2.7 35.3-6l-83.7-46.5H229.5z" p-id="1296"></path><path d="M862.4 126H263.6c-54 0.1-97.6 43.7-97.7 97.6v399.1c0.1 54 43.7 97.6 97.7 97.7H572l195.9 109c4.9 2.7 10.2 4.1 15.6 4.1 6.5 0 13-2 18.6-6 10.1-7.2 15.1-19.5 13-31.7l-13.2-75.4h60.5c53.8 0 97.6-43.6 97.6-97.6V223.6c0-53.9-43.7-97.6-97.6-97.6z m0 530.3h-98.7c-9.5 0-18.5 4.2-24.6 11.5s-8.7 16.8-7.1 26.2l8.2 46.7-144.4-80.3c-4.8-2.6-10.2-4.1-15.6-4.1H263.6c-18.6 0-33.4-14.9-33.4-33.4V223.6c0-18.5 14.9-33.4 33.4-33.4h598.7c18.4 0 33.4 14.9 33.4 33.4v399.3h0.1c0 18.5-15 33.4-33.4 33.4z" p-id="1297"></path><path d="M378.4 419.3m-48.6 0a48.6 48.6 0 1 0 97.2 0 48.6 48.6 0 1 0-97.2 0Z" p-id="1298"></path><path d="M567.4 419.3m-48.6 0a48.6 48.6 0 1 0 97.2 0 48.6 48.6 0 1 0-97.2 0Z" p-id="1299"></path><path d="M756.4 419.3m-48.6 0a48.6 48.6 0 1 0 97.2 0 48.6 48.6 0 1 0-97.2 0Z" p-id="1300"></path>
            </symbol>
        </svg>
        <!-- 选项卡 -->
		<div class="header-tab">
			<div class="header-tab-item" v-for="(item,index) in tabData" 
				:key="index" 
				@click="tabClick($event, index)" 
				:class="{select:index===nowIndex}">
				<svg>
					<use :xlink:href="'#'+item.svg"/>
				</svg>
				<span>{{item.name}}</span>
			</div>
		</div>
		<!-- 选项卡内容 -->
		<div class="right-box-container">
			<div class="right-box-item" v-show="nowIndex==0">
				<RightBoxUserImg ref="RightBoxUserImg"></RightBoxUserImg>
			</div>
			<div class="right-box-item" v-show="nowIndex==1">
				<RightBoxUserInfo :myAddressBook="myAddressBook" :editState='false' ref="RightBoxUserInfo"></RightBoxUserInfo>
			</div>
			<div class="right-box-item" v-show="nowIndex==2">
				<Pengyouquan ref="pengYouQuan" id="pengyouquan"></Pengyouquan>
			</div>
			<div class="right-box-item" v-show="nowIndex==3">
				<RightBoxTalking ref="RightBoxTalking" ></RightBoxTalking>
			</div>
		</div>
	</div>
</template>

<script>
	import RightBoxUserImg from './RightBoxUserImg.vue';
	import RightBoxUserInfo from './RightBoxUserInfo.vue';
	import Pengyouquan from './Pengyouquan.vue';
	import RightBoxTalking from './RightBoxTalking.vue';
	import util from '@/util/util.js'

	export default {
		name: 'RightBox',
		props:['myAddressBook', 'nowIndex'],
		data() {
			return {
				title: '',
				loading: false,
				showPublicBlog: false,
				tabData:[{
					name:"用户图像",
					svg:'svgUserImg'
				},{
					name:"档案资料",
					svg:'svgUserInfo'
				},{
					name:"朋友圈",
					svg:'svgPengyouquan'
				},{
					name:"沟通话术",
					svg:'svgTalking'
				}]
			}
		},
		components: {
			RightBoxUserImg,
			RightBoxUserInfo,
			Pengyouquan,
			RightBoxTalking
		},
		mounted(){ 

		},
		methods: {
			tabClick(e, index){
				if (this.activeItem === index) return
				this.activeItem = index || 0
				this.nowIndex = index
				// debugger;
				if(index == 2) {
					this.$refs.pengYouQuan.loadData();
				}
			},
			onWsMsg(json) {
				console.log('传数据都朋友圈');
				this.$refs['pengYouQuan'].onWsMsg(json);
			}
		},
		created() {
			// this.loadData();
		}
	}
</script>

<style lang="scss" scoped>
	.right-box {
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.6);
		color: #fff;

		.header-tab {
			background: rgba(0, 0, 0, 0.6);
			color: #fff;
			display: flex;
			justify-content: space-between;
			-moz-user-select: none;
			-khtml-user-select: none;
			user-select: none;
			cursor:pointer;

			.header-tab-item{
				text-align: center;
				padding: 8px 0;

				svg{
					fill: #aaa;
					width: 40%;
					height: 32px;
				}

				span{
					display: block;
					color: #aaa;
					font-size: 14px;
				}
			}
			.header-tab-item.select{
				background-color: #030303;

				svg{
					fill: #409eff;
				}
				span{
					color: #409eff;
				}
			}

			.header-tab-item:hover{

				svg{
					fill: #409eff;
				}

				span{
					display: block;
					color: #409eff;
					font-size: 14px;
				}
			}
		}
		.right-box-container{
			height: 100%;
			.right-box-item{
				height: 100%;
				overflow-y: auto;
				overflow-x: hidden;
			}
		}

		.content {
			height: 1px;
			flex-grow: 1;
			box-sizing: border-box;
			padding: 13px;

			.loading {
				text-align: center;
				line-height: 40px;
				font-size: 15px;
				color: #ddd;

				svg {
					margin-right: 10px;
				}
			}

			.empty {
				color: #C0C4CC;
				text-align: center;
				padding: 20px 0px;
			}
		}
	}
</style>
