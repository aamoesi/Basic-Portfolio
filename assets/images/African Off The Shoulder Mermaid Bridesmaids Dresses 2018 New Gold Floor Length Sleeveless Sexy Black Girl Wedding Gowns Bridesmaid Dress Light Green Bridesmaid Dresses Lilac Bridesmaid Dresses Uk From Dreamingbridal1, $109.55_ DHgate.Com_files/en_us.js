
/* @file lang/en_us.js
 * @date 2018.05.09 14:32:12 
 */
(function($){
	$.lang = {
		language: 'en_us',
		robot_name: 'robot',
		robot_question_tip: 'Reply numbers can be obtained corresponding answers',
		chat_title_ext: '(Xiaoneng online customer service trail version)',
		chat_xiaoneng_version: 'Xiaoneng Technology Co.Ltd',
		chat_button_close: 'Close',
		chat_button_min: 'Minimize',
		chat_button_resize_max: 'Zoom in',
		chat_button_resize_min: 'Zoom out',
		chat_button_send: 'Send',
		chat_button_audio: 'Hold on',
		chat_button_audio_end: 'Is the tape...',
		chat_button_audio_fingerup: 'Slip on your fingers, cancel send', //手指上滑，取消发送
		chat_button_audio_freefinger: 'Release your fingers, cancel send', //松开手指，取消发送
		chat_button_audio_shorttime: 'Short speaking', //说话时间太短
		chat_button_audio_error: 'Unworkable microphone', //麦克风无法使用
		chat_info_loading: 'Loading...',
		chat_info_failure: 'Loading failed',
		chat_info_reload: 'Reload',
		chat_show_website: 'View web pages',
		message_upload_failure: 'Attatchment uploading failed',
		message_button_submit: 'Message board',
		evaluation_button_submit: 'Evaluation',
		evaluation_button_cancel: 'Cancel',
		history:{
			drag_for_more:'Drop-down for more',
			loading:'Loading ...',
			nomore_data:'No more history record',
			fail_to_load:'Failed to load, please try again later'
		},
		rightlabel: {
			about: {title:'About us',selected:true},
			faq: {title:'FAQ',selected:false}
		},
		goodsinfo: {
			marketprice:"Market Price",
			siteprice:	"Sale Price",
			score:		"Score",
			sizelist:	"Color",
			colorlist:	"Size"
		},
		cant_play_video:'Unable to play video, please use a high version browser to view!',
		toolbar_default_text: 'New Session',
		toolbar_min_title: '{$destname}',
		toolbar_min_news: 'You has {$count} unread message. ',
		system_title_news: '{$name} is here to help you.',
		system_first_news: 'Hello, welcome to {$name}. What can I do for you?',
		system_merge_session: 'You are chatting with {$destname},session merged here',
		system_allocation_service: 'Now we are reserving a  customer service representative for you,please wait a moment...',
		system_queue1: 'Now you are the No.{$count} in the queue.{$br}Or you can click {$torobot} [link message={$settingid} source=2]message to us[/link],we will contact you asap!',
		system_mobile_queue1:'',
		system_queue2: 'Now you are the No.{$count} in the queue.',
		system_mobile_queue2: '',
		system_robot_queue1: '',
		system_robot_queue2: '',
		system_robot_offline1: '',
		system_robot_offline2: '',
		system_to_robot: '[link robot]Turn a robot[/link] or',
		system_to_artificial: '',
		system_no_user: 'The current customer service does not exist or the reception group is not configured customer service!',
		system_online: '{$destname} is very please to service you!',
		system_offline:'{$destname} is offline, please [link message={$settingid} source=4]message to us[/link]',
		system_abnormal: 'Server connection failed,is reconneting.Or you can [link message={$settingid} source=3]message to us[/link],we will contact you asap!',
		system_failure: 'Your connection has been interrupted, [link reconnect={$settingid}] retry [/link]',
		system_connect_timeout: 'Servere connection timeout,recommend you check the network connection.',
		system_connect_wait: 'Network is unstable,is reconnecting server.',
		system_change_session: '{$destname} continue service you',
		system_add_session: 'Now {$destname} joined this chatting',
		system_switch_session: 'You have replaced the customer service, {$destname} service is for you',
		system_go_away_session: '{$destname} left this chat.',
		system_auto_disconnect: 'Silence too long ,Server has been disconnected.',
		system_end_session: 'The chat is already ended.',
		system_before_evaluation: 'You have not evaluate the customer service,are you sure leave the page?',
		system_evaluation: 'You has post the "{$evaluation}"!',
		system_evaluation_failure: 'You failed to post evaluation!',
		system_mobile_evaluation: 'Message: thank you for your evaluation',
		system_fast_messaging: 'Your keytype speed is too fast,please have a rest at first.',
		system_send_failure: 'Failed to send message! [link href=javascript:void(0);]resend message[/link]',
		system_send_timeout: 'Connection timeout,failed to send message!',
		system_no_free_user: 'No available Customer Service', //当前没有空闲的客服
		system_over_rechatnum: 'Exceed limitation on the Customer Service quantity', //超过最大更换客服数量
		system_upload_compress: 'In compression',	//正在压缩
		system_upload_start: 'Uploading', //正在上传
		system_picture_error_type: 'Wrong picture type', //图片类型有误
		system_picture_error_size: 'Too big picture', //图片太大
		system_giveup_wait: 'Do you give up queue?', //您是否放弃排队
		system_giveup_submit: 'Yes', //确认
		system_no_prev_picture: 'No last picture', //没有上一张图片
		system_no_next_picture: 'No next picture', //没有下一张图片
		system_leave_message: 'To leave a message', //留言
		system_config_error: 'Data loading failed, please reload', //数据加载失败，请重新加载
		system_printing: 'Inputting', //正在输入
		system_cookie: 'To open cookie in iPhone', //建议开启cookie
		capture_forbidden: 'sorry, this browser don\'t support this capture plugin!',
		capture_reload: 'Online screenshots controls by the browser stop, please set the refresh current page after long time',
		capture_install: 'You have not install screenshot control,click OK to install \r\nTo intall the control, you must close the browser in advance...\r\nIf you have installed it ,please close browser and reopen ...',
		capture_activex_update: 'Screenshot control has new version, you should upgrade it before use the software! \r\nClick OK to upgrade, To intall the control, you must close the browser in advance...\r\nIf you have installed it ,please close browser and reopen...',
		capture_other_update: 'Screenshot control has new version, you should upgrade it before use the software! \r\nClick OK to upgrade...',
		news_download: 'Download',
		news_cancel_trans: 'Cancel file upload',
		news_trans_success: 'Upload successfully!', //上传成功
		news_trans_retry: 'Reload!', //重新上传
		news_trans_failure_size: 'Please upload file less than ($maxsize)MB', //请上传小于($maxsize)MB的文件
		news_trans_failure_type: 'Please upload file with $(type)', //仅支持以下上传文件类型：$(type)
		news_trans_failure: 'Upload fail',
		news_trans_cancel: 'Upload canceled',
		news_trans_size: 'Too big picture',
		news_trans_type: 'Wrong picture type',
		news_new: 'New message ',
		button_face: 'Emoticons',
		button_file: 'File',
		button_image: 'Image',
		button_save: 'Save',
		button_view: 'Chat History',
		button_captureImage: 'Image Capture',
		button_evaluation: 'Evaluation',
		button_change_csr: 'To exchange for a customer service', //更换客服
		button_switch_manual: 'Switch to Manual',
		button_wap_switch_manual:'Manual',
		button_more: 'More',
		button_history: 'Back',
		button_end_session: 'Finish Chat',
		button_start_session: 'Continue Chat',
		button_enter: 'Enter',
		button_ctrl_enter: 'Ctrl+Enter',
		button_capture_show_chatWin: 'Not to hide window',
		button_capture_hidden_chatWin: 'To hide window',
		back_button_text: 'Back',
		dest_sign_text: 'Our business',
		default_textarea_text: 'I want to ask...',
		send_button_text: 'Send',
		default_evaluation_form_title: 'Evaluation',
		default_evaluation_form_fields: [
			{title:"Please evaluate my service",name:"evaluation",type:"radio",required:true,defaultText:"5",options:[
				{text:"very satisfied",value:"5"},
				{text:"satisfied",value:"4"},
				{text:"general",value:"3"},
				{text:"unsatisfy",value:"2"},
				{text:"displeased",value:"1"}
			], message:["please evaluate the customer service", ""]},
			{title:"Suggestion and feedback", multipart: true,name:"proposal",type:"textarea","defaultText":"Thank for your feedback,we will work harder.",required:false,max:200,message:["","","Suggest word limit is 200 characters."]}
		],
		default_message_form_fields:[
			{title:"name",name:"msg_name",type:"text","defaultText":"Please input your name",required:true,message:["Please input your name"]},
			{title:"phone",name:"msg_tel",type:"text","defaultText":"Please input your phone or mobile",required:true,verification:"phone",message:["Please input phone number","Phone number format error"]},
			{title:"email",name:"msg_email",type:"text","defaultText":"",required:false,verification:"Email",message:["","Email format error"]},
			{title:"message",name:"msg_content",type:"textarea","defaultText":"Please write down your detail problem,we will contact you asap.",required:true,max:400,message:["Message can not be null.","","Message word limit is 200 characters."]}
		],
		default_submitinfo_form_title: '',
		default_submitinfo_form_fields: [
			{title:"Question",name:"tips_question",type:"text","defaultText":"",required:true,message:["title"]},
			{title:"Question Type",name:"tips_type",type:"select","defaultText":"-please type-",required:true, options:[
				"Pre-sale consulting",
				"Post-sale service",
				"Logistics consulting",
				"Out of stock recommendations"
			]},
			{title:"Name",name:"tips_name",type:"text","defaultText":"",required:false},
			{title:"Phone",name:"tips_phone",type:"text","defaultText":"",required:false,verification:"phone"},
			{title:"Email",name:"tips_email",type:"text","defaultText":"",required:false,verification:"email"}
		],
		message_prompt:'No service online[link href="javascript:void(0);"]leave a message[/link]',
		message_success: 'Message Posted!',
		message_no_null: '*',
		message_no_null_char: '(necessarily)',
		editorFaceAlt: {
			'1':'wx','2':'tx','3':'hx','4':'dy','5':'ll','6':'sj','7':'dk','8':'jy','9':'zj','10':'gg',
			'11':'kx','12':'zb','13':'yw','14':'dn','15':'sh','16':'ku','17':'fn','18':'ws','19':'ok','20':'xh'
		},
		leave_message: 'We are currently not available. Please leave us a message and we will get back to you as soon as possible. Thank you.'
	};
})(nTalk);
