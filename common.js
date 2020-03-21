/*
 *	'dev',    	//开发版
 *	'trial',    //体验版
 *	'prod',  //正式版
 * */

var api = {
	"prod": {
		"interface": "https://api.bdmartech.com", //接口
		"domain": "http://m.bdmartech.com",
		"appName": "人力资源",
		"phoneNumber": "4008200000",
		"cosConfig": { //`https://plbs-test-1257286922.cos.ap-shanghai.myqcloud.com/...`
			"Bucket": 'plbs-test-1257286922',
			"Region": 'ap-shanghai',
			"SecretId": '',
			"SecretKey": ''
		},
		"wx": {
			"AppID": "wxeaf6d3cdbb53e013",
			"ast": ""
		}
	},
	"dev": {
		"interface": "https://api-test.wsshanghai.com", //接口
		"domain": "http://train.wsshanghai.com",
		"appName": "人力资源",
		"phoneNumber": "4008200000",
		"cosConfig": { //`https://plbs-test-1257286922.cos.ap-shanghai.myqcloud.com/...`
			"Bucket": 'plbs-test-1257286922',
			"Region": 'ap-shanghai',
			"SecretId": '',
			"SecretKey": ''
		},
		"wx": {
			"AppID": "wxeaf6d3cdbb53e013",
			"ast": ""
		}
	}
}
var lks = "dev";
export default {
	Interface: {
		"site": lks,
		"apiurl": api[lks]["interface"], //space111111
		"domain": api[lks]["domain"],
		"cosConfig": api[lks]["cosConfig"],
		"appName": api[lks]["appName"],
		"phoneNumber": api[lks]["phoneNumber"],
		"addr": {
			"getRegion": "/v2/ApiEnum-getRegion.htm", //获取中国地区的接口
			"screening": "/v4/ApiBase-screening.htm", //筛选条件列表
			
			"weChatAuth": "/v4/ApiAuth-signWithWeChatAuthAuthorize.htm", //获取b端用户微信授权后的用户信息?code=1
		}
	}
}
