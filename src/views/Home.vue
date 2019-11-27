<template>
	<div id="home">
		<div id="box" :class="{shrink:$store.state.pengyouquanVisible}">
			<div id="navbar">
				<Nav @selectNav="selectNav" :face="selfData.headPic" @switchUser="switchUser"/>
			</div>
			<div id="subNav" v-show="!isShowAddFriends">
				<Search ref="search" :searchType="currentSubNav" />
				<transition-group name="slide" tag="div" id="subBox">
					<Sessions ref="sessions" key="sessions" v-show="currentSubNav=='Sessions'" @selectSession="startChat" />
					<AddressBook ref="addressBook" key="addressBook" v-show="currentSubNav=='AddressBook'" @selectFriend="selectFriend" @selectAddressBookTops="selectAddressBookTops"/>
				</transition-group>
			</div>
			<div id="content" v-show="!isShowAddFriends">
				<transition name="slide">
					<Chat ref="chat" v-show="currentContent=='Chat'" v-bind="targetInfo" :myFace="selfData.headPic" />
				</transition>
				<transition name="slide">
					<Detail ref="detail" v-bind="detailData" :opt="detailOpt" :myAddressBook="myAddressBook" v-show="currentContent=='Detail'" @startChat="startChat"></Detail>
				</transition>
				<transition name="slide">
					<GroupList ref="GroupList" v-show="currentContent=='GroupList'" @selectFriend="selectFriend"></GroupList>
				</transition>
				<transition name="slide">
					<NewFriend ref="newFriend" v-show="currentContent=='NewFriend'"></NewFriend>
				</transition>
			</div>
			
			<div v-show="isShowAddFriends" style="width: 100%;">
				<AddFriends ref="addFriends" id="addFriends" v-show="true"></AddFriends>
			</div>
		</div>
		<transition name="el-zoom-in-center">
			<!-- <Pengyouquan ref="pengYouQuan" id="pengyouquan" v-show="$store.state.pengyouquanVisible"></Pengyouquan> -->
			<RightBox ref="RightBox" id="RightBox" :myAddressBook='myAddressBook' v-show="!isShowAddFriends && showMore && showUser"></RightBox>
		</transition>
		<transition name="el-zoom-in-center">
			<AddFriendsProgress ref="addFriendsProgress" id="addFriendsProgress" v-show="isShowAddFriends"></AddFriendsProgress>
		</transition>
	</div>
</template>

<script>
	import Nav from '@/components/Nav.vue'
	import Chat from '@/components/Chat.vue'
	import Search from '@/components/Search.vue'
	import Sessions from '@/components/Sessions.vue'
	import AddressBook from '@/components/AddressBook.vue'
	import Pengyouquan from '@/components/Pengyouquan.vue'
	import RightBox from '@/components/RightBox.vue'
	import GroupList from '@/components/GroupList.vue'
	import NewFriend from '@/components/NewFriend.vue'
	import Detail from '@/components/Detail.vue'
	import AddFriends from '@/components/AddFriends.vue'
	import AddFriendsProgress from '@/components/AddFriendsProgress.vue'
	import util from '@/util/util.js'

	export default {
		data() {
			return {
				//聊天对象,id face name
				targetInfo: {},
				currentSubNav: 'Sessions',
				currentContent: '',
				//个人信息
				selfData: {},
				//要展示的微信详情
				detailData: {},
				//群组信息
				GroupListData:{},
				GroupListlOpt: {},
				detailOpt: {
					disableMsg: false
				},
				myAddressBook: {},
				
				isShowAddFriends: false,
				showMore: false,
				showUser: false
			}
		},
		name: 'home',
		components: {
			Nav,
			Chat,
			Search,
			Sessions,
			AddressBook,
			Pengyouquan,
			RightBox,
			GroupList,
			NewFriend,
			Detail,
			AddFriends,
			AddFriendsProgress
		},
		methods: {
			//切换用户刷新页面
			switchUser(){
				location.reload();
			},
			selectNav: function(t) {
				this.isShowAddFriends = false;
				this.showUser = false;
					this.showMore = false;
				if (t == 'Settings') {
					this.detailOpt.disableMsg = true;
					this.detailData = this.selfData;
					this.currentContent = 'Detail';
				} else if (t == 'pengyouquan') {
                    this.$store.commit('updatePengyouquanVisible',!this.$store.state.pengyouquanVisible);
				} else if (t == 'AddFriends') {
                    this.isShowAddFriends = true;
				} else {
					if(t == 'AddressBook'){
						this.showUser = true;
					} 
					this.currentSubNav = t;
				}
			},
			selectFriend: function(isGroup, detail) {
					this.showMore = false;
				if (isGroup) {
					this.targetInfo = {
						isGroup: true,
						targetId: detail.groupId,
						targetName: detail.name
					};
					this.currentContent = 'Chat'

				} else {
					this.detailOpt.disableMsg = false;
					this.myAddressBook = detail;
					this.detailData = detail.addressBook;
					this.currentContent = 'Detail';
					this.showMore = true;
				}
			},
			selectAddressBookTops: function(type, detail){
				 if(type == "isGroupList"){
					this.currentContent = 'GroupList';
					this.$store.commit('initGroupList');

				} else if(type == 'isNewFriend'){
					this.currentContent = 'NewFriend';
					this.$store.commit('initNewFriends');

				}
			},
			startChat: function(target) {
				/* target.targetId */
				this.$refs.RightBox.$refs.RightBoxUserInfo.getdata(target.targetId)
				this.$refs.RightBox.$refs.RightBoxUserImg.getCustomerProfile(target.targetId)
				this.$refs.RightBox.$refs.RightBoxTalking.searchKeyword(target.targetId)
				this.targetInfo = target;
				this.currentContent = 'Chat'
			}
		},
		mounted: function() {
			//查询个人信息
			this.$axios.post('/queryAddressBookByWxId', {
					wxid: util.getMyWxId()
				})
				.then(data => {
					this.selfData = data;
					util.setMyWxInfo(JSON.stringify(data));
				})
				.catch(() => {});

			//WebSocket入口     
			var websocketUrl = '';
			if (process.env.VUE_APP_MODE == 'development') {
				websocketUrl = process.env.VUE_APP_SERVER_WEBSOCKET + util.getImei();
			} else {
				websocketUrl = 'ws://' + window.location.host + '/chatWS/' + util.getImei();
			}
			var websocket = new WebSocket(websocketUrl);
			websocket.onopen = () => {
				console.log('WebSocket建立成功')
			};
			websocket.onmessage = (event) => {
				var json = JSON.parse(event.data);
				//分发到各个组件
				['search', 'sessions', 'addressBook', 'chat', 'pengYouQuan', 'detail', 'GroupList','newFriend'].forEach(t => {
					if (this.$refs[t] && this.$refs[t].onWsMsg) {
						this.$refs[t].onWsMsg(json);
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	#home {
		position: absolute;
		top: 0px;
		left: 0px;
		bottom: 0px;
		right: 0px;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;

		.slide-enter-active {
			transition: .3s all ease-in;
		}

		.slide-enter {
			opacity: 0;
			transform: translateX(-25px);
		}

		#box {
			height: 700px;
			max-height: 95%;
			width: 1000px;
			background: transparent;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			background: rgba(0, 0, 0, 0.55);
			color: #fff;
			display: flex;
			overflow: hidden;
			border-radius: 6px;
			transition: 0.3s all ease;

			&.shrink {
				border-radius: 6px 0px 0px 6px;
			}

			#navbar {
				width: 60px;
				background: rgba(0, 0, 0, 0.55);
			}

			#subNav {
				background: rgba(0, 0, 0, 0.3);
				width: 250px;
				display: flex;
				flex-direction: column;

				#subBox {
					flex-grow: 1;
					height: 1px;
				}
			}

			#content {
				flex-grow: 3;
			}
		}

		@media screen and (max-width: 1310px) {
			#box.shrink {
				width: 714px;
			}
		}

		#pengyouquan {
			width: 310px;
			height: 100%;
			border-radius: 0px 6px 6px 0px;
		}

		#RightBox, #addFriendsProgress {
			width: 310px;
			height: 700px;
			max-height:95%;
			border-radius: 0px 6px 6px 0px;
		}

	}
</style>
