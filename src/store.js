import Vue from 'vue'
import Vuex from 'vuex'
import pinyin from 'js-pinyin'
import $ from 'jquery'
import util from '@/util/util.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// face: item.addressBook.headPic,
		// name: item.addressBook.nickName,
		// wxid: item.addressBook.wxid,
		// detail: item
		friends: [], //我的好友
		friendsKeyword: '', //搜索我的好友关键字
		// name: item.name,
		// face: item.headPic,
		// lastMsg: item.msg,
		// lastTime: item.updateTime,
		// targetId: item.targetId
		//quanpin
		sessions: [], //会话
		sessionsKeyword: '', //搜索我的会话关键字
		currentSession: '', //当前聊天的targetId
		pengyouquanVisible: '', //显示/隐藏朋友圈
		currentPengyouquan: '' //当前正在查看的朋友圈
	},
	mutations: {
		initFriends(state) {

			function getAddressBook() {
				return Vue.prototype.$axios.post('/queryMyAddressBook', {
					imei: util.getImei(),
					myWxid: util.getMyWxId(),
					size: 5000
				});
			}

			function getGroups() {
				return Vue.prototype.$axios.post('/queryGroups', {
					myWxid: util.getMyWxId(),
					size: 5000
				});
			}

			Vue.prototype.$axios.all([getAddressBook(), getGroups()])
				.then(Vue.prototype.$axios.spread(function(addressBookData, groupChatData) {
					var arr = addressBookData.data.map(item => {
						return {
							face: item.addressBook.headPic || require('@/assets/wechat.png'),
							name: item.remark ? item.remark : item.addressBook.nickName,
							wxid: item.addressBook.wxid,
							detail: item
						}
					});
					arr = arr.concat(groupChatData.data.map(item => {
						return {
							face: require('@/assets/wechat.png'),
							name: item.groupName,
							wxid: item.groupId,
							detail: item,
							isGroup: true
						}
					}));
					state.friends = arr;
				}))
				.catch(() => {});
		},
		modifyFriend: (state, friend) => {
			for (var i = 0; i < state.friends.length; i++) {
				if (state.friends[i].wxid == friend.wxid) {
					$.extend(state.friends[i], friend)
					return;
				}
			}
		},
		initSessions(state) {
			Vue.prototype.$axios.post('/querySession', {
					myWxid: util.getMyWxId(),
					size: 100
				})
				.then(data => {
					state.sessions = data.data.map(function(item) {
						return {
							name: item.name || '',
							face: item.chartMode == 'SINGLE' ? item.headPic : require(
								'@/assets/wechat.png'),
							lastMsg: item.msg,
							lastTime: item.updateTime,
							targetId: item.targetId,
							isGroup: item.chartMode == 'GROUP',
							quanpin: pinyin.getFullChars(item.name || '')
						}
					});
				})
				.catch(() => {});
		},
		modifySession: (state, session) => {
			for (var i = 0; i < state.sessions.length; i++) {
				if (state.sessions[i].targetId == session.targetId) {
					$.extend(state.sessions[i], session)
					return;
				}
			}
		},
		setFriendsKeyword: (state, keyword) => {
			state.friendsKeyword = keyword;
		},
		setSessionsKeyword: (state, keyword) => {
			state.sessionsKeyword = keyword;
		},
		setCurrentSession: (state, targetId) => {
			state.currentSession = targetId;
		},
		setCurrentPengyouquan: (state, targetId) => {
			state.currentPengyouquan = targetId;
		},
		updatePengyouquanVisible: (state, visible) => {
			state.pengyouquanVisible = visible;
		},
		//session置顶
		topSession: (state, newmsg) => {
			var sessionIndex = -1;
			for (var i = 0; i < state.sessions.length; i++) {
				if ((state.sessions[i].targetId == newmsg.groupId && state.sessions[i].isGroup) ||
					(state.sessions[i].targetId == newmsg.targetWxid && !state.sessions[i].isGroup)) {
					sessionIndex = i;
					break;
				}
			}
			//如果会话列表没有，详情从我的好友中搜索
			var oldSession = null;
			if (sessionIndex == -1) {
				var friend = null;
				for (var i = 0; i < state.friends.length; i++) {
					if (state.friends[i].wxid == newmsg.targetWxid || state.friends[i].wxid == newmsg.groupId) {
						friend = state.friends[i];
						break;
					}
				}
				if (friend == null) {
					throw new Error('我的好友中找不到wxid=>' + (newmsg.targetWxid || newmsg.groupId));
				}
				//搜索到头像和名称
				oldSession = {
					name: friend.name,
					face: friend.face,
					targetId: newmsg.targetWxid || newmsg.groupId,
					isGroup: !!newmsg.groupId,
					quanpin: pinyin.getFullChars(friend.name)
				}
			} else {
				oldSession = $.extend({}, state.sessions[sessionIndex]);
				state.sessions.splice(sessionIndex, 1);
			}
			var newSession = $.extend(oldSession, {
				lastMsg: newmsg.msg,
				lastTime: newmsg.createTime,
				//当前聊天的会话不显示新消息
				newmsg: state.currentSession != newmsg.targetWxid
			});
			state.sessions.unshift(newSession);
		}
	},
	actions: {

	},
	getters: {
		//我的好友分组,可搜索
		//ignoreGroup是否忽略群组
		groupFriends: state => ignoreGroup => {
			var existsGroup = {};
			return state.friends.map(function(item) {
				//拿到首字母,及全拼
				return $.extend({
					quanpin: pinyin.getFullChars(item.name),
					pinyin: pinyin.getCamelChars(item.name),
					letter: item.isGroup ? '群聊' : pinyin.getCamelChars(item.name).charAt(0)
						.toUpperCase()
				}, item)
			}).sort(function(a, b) {
				//群聊排第一
				if (a.letter == '群聊')
					return -1;
				//首字母排序
				return a.letter.localeCompare(b.letter)
			}).map(function(item) {
				//分组
				var p = /[A-Z]/;
				if (item.letter != '群聊' && !p.test(item.letter)) {
					item.letter = '#'
				}
				if (existsGroup[item.letter]) {
					delete item.letter;
					return item;
				} else {
					existsGroup[item.letter] = true;
					return item;
				}
			}).filter(t => {
				if (ignoreGroup && t.isGroup) {
					return false;
				}
				var str = state.friendsKeyword.trim().toLowerCase();
				if (str == '') {
					return true;
				} else if (t.name.toLowerCase().indexOf(str) > -1 || t.quanpin.toLowerCase().indexOf(
						str) > -1) {
					return true;
				} else {
					return false;
				}
			});
		},
		//根据wxid搜索我的好友
		filterFriendsById: state => targetId => {
			for (var i = 0; i < state.friends.length; i++) {
				if (state.friends[i].wxid == targetId) {
					return state.friends[i];
				}
			}
			return null;
		},
		//根据wxname搜索我的会话
		filterSessionsByName: state => {
			var str = state.sessionsKeyword.trim().toLowerCase();
			if (str == '')
				return state.sessions;
			return state.sessions.filter(t => {
				return t.name.toLowerCase().indexOf(str) > -1 || t.quanpin.toLowerCase().indexOf(
					str) > -1;
			});
		}
	}
})
