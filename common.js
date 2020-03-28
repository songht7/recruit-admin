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
		"interface": "https://api-job.jobpgroup.com", //接口
		"domain": "http://job.jobpgroup.com",
		"appName": "人力资源",
		"phoneNumber": "4008200000",
		"cosConfig": { //`https://plbs-test-1257286922.cos.ap-shanghai.myqcloud.com/...`
			"Bucket": 'plbs-test-1257286922',
			"Region": 'ap-shanghai',
			"SecretId": '',
			"SecretKey": ''
		},
		"wx": {
			"AppID": "wx0d0ff48dbccca9b8",
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
		"wxConfig": api[lks]["wx"],
		"addr": {
			"getRegion": "/v2/ApiEnum-getRegion.htm", //获取中国地区的接口
			"screening": "/v4/ApiBase-screening.htm", //筛选条件列表
			
			"weChatAuth": "/v4/ApiAuth-signWithWeChatAuthAuthorize.htm", //获取b端用户微信授权后的用户信息?code=1
			"savePhone": "/v4/ApiAuth-savePhone.htm", //验证手机号码【post】
			"sendSms": "/v4/ApiSms-sendSms.htm", //获取短信验证码（Tencent渠道）?phone=13564138770
		}
	}
}
