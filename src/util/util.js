export default {

	getMyWxId: () => {
		return localStorage.getItem('__WBS__H5__GLOBAL__WXID');
	},
	setMyWxId: (myWxId) => {
		localStorage.setItem('__WBS__H5__GLOBAL__WXID', myWxId);
	},
	removeMyWxId: () => {
		localStorage.removeItem('__WBS__H5__GLOBAL__WXID');
	},

	//{"createBy":"wxid_sq8gw9bbfzxe22","createTime":1565807260552,"updateBy":"wxid_sq8gw9bbfzxe22","updateTime":1565807260552,"limit":20,"offset":0,"tenantId":"1153137725126348800","id":"1153137725126348800-wxid_sq8gw9bbfzxe22","wxid":"wxid_sq8gw9bbfzxe22","wxno":null,"gender":"FEMALE","headPic":"http://wx.qlogo.cn/mmhead/ver_1/mic5fJEJO8I5ga9cMT5Ez7lDiasiaQ7PEuR6TsZ28asjs2njjIQTIqyGjlEVk5bufnICwVy8icghllp6Fk3JOyZMpIdJickLicQYniaWgknzyAVdYg/96","phone":"19923329765","nickName":"Cheng","pyInitial":null,"allSpell":null,"region":null,"signature":null,"qq":"0","email":null}}
	getMyWxInfo: () => {
		return localStorage.getItem('__WBS__H5__GLOBAL__WXINFO');
	},
	setMyWxInfo: (myWxInfo) => {
		localStorage.setItem('__WBS__H5__GLOBAL__WXINFO', myWxInfo);
	},
	removeMyWxInfo: () => {
		localStorage.removeItem('__WBS__H5__GLOBAL__WXINFO');
	},


	getImei: () => {
		return localStorage.getItem('__WBS__H5__GLOBAL__IMEI');
	},
	setImei: (imei) => {
		localStorage.setItem('__WBS__H5__GLOBAL__IMEI', imei);
	},
	removeImei: () => {
		localStorage.removeItem('__WBS__H5__GLOBAL__IMEI');
	},


	getToken: () => {
		return localStorage.getItem('__WBS__H5__GLOBAL__TOKEN');
	},
	setToken: (token) => {
		localStorage.setItem('__WBS__H5__GLOBAL__TOKEN', token);
	},
	removeToken: () => {
		localStorage.removeItem('__WBS__H5__GLOBAL__TOKEN');
	},


	getExTime: () => {
		return localStorage.getItem('__WBS__H5__GLOBAL__TOKEN__EXTIME');
	},
	setExTime: (exTime) => {
		localStorage.setItem('__WBS__H5__GLOBAL__TOKEN__EXTIME', exTime);
	},
	removeExTime: () => {
		localStorage.removeItem('__WBS__H5__GLOBAL__TOKEN__EXTIME');
	},

	//根据文件名后缀区分 文件类型
	//IMAGE VOICE VIDEO FILE
	matchType(fileName) {
		// 后缀获取
		var suffix = "";
		// 是否匹配
		var rest = "";
		var flieArr = fileName.split(".");
		suffix = flieArr[flieArr.length - 1];
		// 图片格式
		var imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
		rest = imglist.some(function(item) {
			return item == suffix;
		});
		if (rest) {
			rest = "IMAGE";
			return rest;
		}
		// 匹配 音频
		var radiolist = ["amr"];
		rest = radiolist.some(function(item) {
			return item == suffix;
		});
		if (rest) {
			rest = "VOICE";
			return rest;
		}
		// 匹配 视频
		var videolist = ["mp4", "m2v", "mkv", "rmvb", "avi", "mov", "mtv", "amv", "3gb"];
		rest = videolist.some(function(item) {
			return item == suffix;
		});
		if (rest) {
			rest = "VIDEO";
			return rest;
		}
		// 其他 文件类型
		rest = "FILE";
		return rest;
	},
}
