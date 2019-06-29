
/* @file comet.chat.js
 * @date 2018.05.09 14:32:12 
 */
!function(e,t){e.TChat=e.Class.create(),e.TChat.prototype={name:"TChat",options:null,data:null,connectParams:["userid","usertoken","sessionid","destid","machineID","devicetype","chattype","chatvalue","username","userlevel","settingid"],connect:null,debug:!1,login:!1,status:!1,defBody:{bold:!1,italic:!1,color:"000000",fontsize:"14",underline:!1},abnormalCount:0,loginAbnormalCount:0,fontsize:14,_reCount:0,callback:"",disconnectparams:null,_waitReconnectTimeID:null,robotQueue:0,initialize:function(t){this.callback="tchat_"+e.randomChar(),this.hashSend=new e.HASH,this.hashComplete=new e.HASH,this.hashReceive=new e.HASH,this.data=e.store,this._reCount=0,this.options=e.extend({devicetype:e.browser.mobile?3:0,chattype:"0",chatvalue:"0"},t),(!this.options.pcid||this.options.pcid.length<=10)&&(this.options.pcid=this.data.get("machineid"),(!this.options.pcid||this.options.pcid.length<=10)&&(this.options.pcid=e.base._createScriptPCID())),this.data.set("machineid",this.options.pcid),this.options.userid||(this.options.userid=e.base.userIdFix+this.options.pcid.substr(0,21)),this.debug&&e.Log("initialize comet chatConnect"),this.status=!0,this.firstConnected=!0,this._initQueue(),this.loginConnect()},loginConnect:function(){var t=this,s=this._toArray(this.options,this.connectParams);e.Log("connect tChat:"+s.join(","),1),this.connect=new e.comet(this.options.tchatgoserver,{timeout:8,onCallback:function(){t._onCallback.apply(t,arguments)},onComplete:function(){t._onComplete.apply(t,arguments)},onAbnormal:function(){t._onAbnormal.apply(t,arguments)},onTimeout:function(){t._onTimeout.apply(t,arguments)}}),this.sessionIdleReplys={},this.sessionIdleReplys[+this.options.disconnecttime]="超时未发送消息，自动断开连接",this.connect.connect({ac:"conn",action:"roomconnect",login:!0,params:s.join(","),timeout:8})},kaliveConnect:function(t){e.Log("nTalk.TChat.kaliveConnect("+t+")",1);var s=this,i={ac:"kalive",action:"roomconnect",login:!1,params:this._toArray(this.options,this.connectParams).join(","),clientid:this.options.clientid,timeout:10};this.status?setTimeout(function(){s.connect.kalive(i)},1e3):e.Log("stop kalive connect")},reconnect:function(){var t=this;++this._reCount<=3?this._waitTime=500:this._waitTime=1e3*+"034567890".charAt(Math.ceil(5*Math.random())),this.status?this._waitReconnectTimeID=setTimeout(function(){t.connect.reconnect()},this._waitTime):e.Log("stop reconnect")},disconnect:function(){for(var e in this.sessionIdleReplys)this.sessionIdleTimeouts&&this.sessionIdleTimeouts[e]&&clearTimeout(this.sessionIdleTimeouts[e].id);this.status=!1,clearTimeout(this._waitReconnectTimeID),this._waitReconnectTimeID=null,this.connect.disconnect()},sendMessage:function(t){var s,i;t=e.isObject(t)?t:e.JSON.parseJSON(t),t=e.charFilter(t),i=e.whereGet(t,["type","msgid"],["type","msgid"]),t.url&&(i=e.extend(i,e.whereGet(t,["url","emotion","oldfile","size","extension","sourceurl","mp3","length"]))),s={action:"remoteSendMessage",myuid:this.options.userid,clientid:this.options.clientid,sessionid:this.options.sessionid,flashuid:t.timerkeyid,type:"",fs:this.fontsize},1===t.type?(e.extend(s,{msgid:t.msgid,style:0,type:1,msg:t.msg}),t.hidden&&(s.hidden=t.hidden)):(e.extend(s,{msgid:t.msgid,msg:{msg:e.extend(t.msg,{attributes:i})}}),s.msg.msg.evaluate&&(s.msg.msg.evaluate=e.JSON.toJSONString(s.msg.msg.evaluate)),s.msg=e.jsonToxml(s.msg)),this.hashSend.add(s.msgid,s),5===t.type||this.robotQueue||this.processSessionIdle(),this._splitParcels(s)},sendAbnormal:function(t){var s=this.hashSend.items(t),i=e.getTime(),n=e.extend({},{type:9,msgType:2,timesample:i,msgid:i+"J",userid:"system",body:s},s);delete n.timerkeyid,this._callback("fIM_receiveMessage",[n])},_splitParcels:function(t){var s,i,n,o,a,l=e.browser.mobile?300:768,c=0,r=0,h=[];for(i=encodeURIComponent(t.msg),n=Math.ceil(i.length/l);i.length>0;){for(o=!0,l=l<=i.length?l:i.length;o;){a=i.substring(0,l);try{a=decodeURIComponent(a),o=!1}catch(e){l--}}s={msgid:t.msgid,index:r,body:e.extend({},t,{sendpacket:r,packetcount:n,msg:a})},h.push(s),this.messageQueue.addMessage(s),this.startSend(s),r++,c=l,i=i.substring(c,i.length)}return h},startSend:function(t){t&&this.login&&(t.timestamp&&t.recount||(t.timestamp=e.getTime(),t.recount=1),this.connect.send(e.extend({callback:this.callback},t.body)))},_callbackComplete:function(e,t,s){e&&(this.messageQueue.removeMessage(t,s),this.hashComplete.add(t,this.hashSend.items(t)))},verificationMessage:function(){var t=this.messageQueue.first(),s=e.getTime(),i=0;if(this.login)for(;t;){if(s-t.timestamp>=3e3)if(t.recount>=3)this.sendAbnormal(t.msgid),this.messageQueue.removeMessage(t.msgid,-1);else{if(i>=2){t=this.messageQueue.nextMessage(t.msgid,t.body.sendpacket);continue}i++,t.timestamp=s,t.recount=t.recount+1,this.startSend(t)}t=this.messageQueue.nextMessage(t.msgid,t.body.sendpacket)}},closeTChat:function(){this.disconnect()},setTextStyle:function(e){e&&e.fontsize&&(this.fontsize=e.fontsize)},predictMessage:function(t){var s={action:"onPredictMessage",myuid:this.options.userid,clientid:this.options.clientid,sessionid:this.options.sessionid,msg:t};this.connect.send(s,function(t){e.Log("comet.TChat.predictMessage()")})},LoginResult:function(t,s,i,n,o,a){this.login=!0===t,this.options.result=!0===t?1:0,this.options.clientid=s,this.options.sessionid=n,this.options.soid=o,this.options.time=a;try{this.options.userinfo=e.JSON.parseJSON(i)}catch(e){this.options.userinfo=this.options.userinfo||{}}if(this._callback("fIM_tchatFlashReady",[this.options.userid,this.options.pcid,this.options.settingid]),this.options.result){!0===this.firstConnected&&(this.firstConnected=!1,this.processSessionIdle()),this.userinfo=e.extend({},{myuid:this.options.userinfo.userid,myuname:this.options.userinfo.username,signature:"",mylogo:this.options.userinfo.usericon,sessionid:this.options.sessionid,timesample:this.options.time});var l=this.options.userid.split("_ISME9754_");this.disconnectparams={from:"TCHAT",cid:this.options.clientid,sitid:this.options.siteid,uid:2==l.length?l[1]:""},this.flashGoURL=this.connect.disconnectServer(this.disconnectparams,!1)}this.options.userinfo&&!1===this.options.userinfo.connectable?this._callback("fIM_onGetUserInfo",['{"status": 0}']):(this.options.result?(this.kaliveConnect("login kalive"),this._callback("fIM_setTChatGoServer",[this.flashGoURL]),this._reCount=0):(this.reconnect("login relogin"),this.userinfo="",this.flashGoURL=""),this._callback("fIM_ConnectResult",[this.options.result,this.userinfo,""]))},remoteHistroyMessage:function(){for(var t,s,i,n=this,o=(arguments[0],0),a=[],l={history:1},c={userId:this.options.userinfo.userid,userName:this.options.userinfo.username,cid:this.options.pcid||NTKF.global.pcid},r=1;r<arguments.length;r++)switch(r%4){case 1:l.timestamp=arguments[r];break;case 2:l.userid=arguments[r];break;case 3:l=e.extend(l,e.whereGet(e.JSON.parseJSON(arguments[r]),["externalname","usericon","nickname","username"],["name","logo","nickname","username"]));break;case 0:if(null===(t=arguments[r])||""===t||-1!=t.indexOf("<msgtype"))continue;if(t=t.replace(/<\?xml\s+version=\"1\.0\"\s+encoding=\"utf\-\d+\"\?>/gi,""),t=t.replace(/&(?!amp;)/gi,"&amp;"),s=e.htmlToElement(t)[0],"true"==(i=s&&3==s.nodeType?{msg:s.textContent}:e.elementToObject(s)).xnlink&&i.msg&&7!=i.type){u=new RegExp(/\[[0-9]*\].+[\n]/g);i.msg=i.msg.replace("&amp;lt;![CDATA[","").replace("<![CDATA[","").replace("]]>","");p=i.msg.match(u);if(i.msg=i.msg.replace(/&amp;/gi,"&"),(i.msg.indexOf("&lt;")>-1||i.msg.indexOf("&gt;")>-1)&&(i.msg=i.msg.replace(/[\n]/gi,"")),p&&p.length>0)for(var h=0,m=p.length;h<m;h++){d=p[h].replace(/[\n]/g,"");if(i.msg.indexOf("&lt;")>-1||i.msg.indexOf("&gt;")>-1)f="[xnlink]"+d+"[/xnlink]\n";else f="[xnlink]"+d+"[/xnlink]";i.msg=i.msg.replace(d,f)}i.msg=i.msg.replace(/&lt;/g,"<"),i.msg=i.msg.replace(/&gt;/g,">")}else if(7==i.type&&t){var g=t.replace(/</g,"&lt;").replace(/>/g,"&gt;").match("&lt;content&gt;(.+?)&lt;/content&gt;");if(g&&g.length>=2&&(i.msg=e.base64.decode(g[1])),"true"==i.xnlink){var u=new RegExp(/\[[0-9]*\].+[\n]/g);i.msg=i.msg.replace("&amp;lt;![CDATA[","").replace("<![CDATA[","").replace("]]>","");var p=i.msg.match(u);if(i.msg=i.msg.replace(/&amp;/gi,"&"),i.msg=i.msg.replace(/[\n]/gi,""),i.msg=i.msg.replace(/</g,"&lt;"),i.msg=i.msg.replace(/>/g,"&gt;"),p&&p.length>0)for(var h=0,m=p.length;h<m;h++){var d=p[h].replace(/[\n]/g,"");if(i.msg.indexOf("&lt;")>-1||i.msg.indexOf("&gt;")>-1)f="[xnlink]"+d+"[/xnlink]\n";else var f="[xnlink]"+d+"[/xnlink]";i.msg=i.msg.replace(d,f)}i.msg=i.msg.replace(/&lt;/g,"<"),i.msg=i.msg.replace(/&gt;/g,">")}}else if(i.msg=s.textContent||s.text,"string"==typeof i.msg){try{i.msg=this.regTu(i.msg,c)}catch(e){}i.msg=i.msg.replace(/&lt;/g,"<"),i.msg=i.msg.replace(/&gt;/g,">")}if("ch"==i.msg||"fq"==i.msg)continue;l=e.extend(l,this.defBody,i),a.push(l),l={history:1}}e.each(a,function(e,t){setTimeout(function(){n._callback("fIM_receiveMessage",[t])},o),o+=50})},remoteSendMessage:function(t,s,i,n,o){var a,l,c,r={userId:this.options.userinfo.userid,userName:this.options.userinfo.username,cid:this.options.userinfo.pcid||NTKF.global.pcid};if(n&&!(n.indexOf('type="5"')>-1&&-1===n.indexOf('systype="5"'))){i&&"string"==typeof i&&(i=e.JSON.parseJSON(i),i=e.whereGet(i,["usericon","userid","externalname"],["logo","userid","name"])),n=n.replace(/<\?xml\s+version=\"1\.0\"\s+encoding=\"utf\-\d+\"\?>/gi,""),n=n.replace(/&(?!amp;)/gi,"&amp;");try{l=(c=e.htmlToElement(n)[0])&&3==c.nodeType?{type:1,msg:c.textContent,msgid:o+"x"}:e.elementToObject(c)}catch(t){return void e.Log("remoteSendMessage:"+t.description+"; xmlString:"+n,3)}if("true"==l.xnlink&&l.msg){u=new RegExp(/\[[0-9]*\].+[\n]?/g);if(l.msg=l.msg.replace("&amp;lt;![CDATA[","").replace("<![CDATA[","").replace("]]>",""),(p=l.msg.match(u))&&p.length>0)for(var h=0,m=p.length;h<m;h++){f="[xnlink]"+(d=p[h].replace(/[\n]/g,""))+"[/xnlink]\n";l.msg=l.msg.replace(p[h],f)}l.msg=l.msg.replace(/&amp;/gi,"&"),l.msg=l.msg.replace(/&lt;/g,"<"),l.msg=l.msg.replace(/&gt;/g,">")}else if(7==l.type&&n){var g=n.replace(/</g,"&lt;").replace(/>/g,"&gt;").match("&lt;content&gt;(.+?)&lt;/content&gt;");if(g&&g.length>=2&&(l.msg=e.base64.decode(g[1])),"true"==l.xnlink){var u=new RegExp(/\[[0-9]*\].+[\n]?/g);l.msg=l.msg.replace("&amp;lt;![CDATA[","").replace("<![CDATA[","").replace("]]>","");var p=l.msg.match(u);if(p&&p.length>0)for(var h=0,m=p.length;h<m;h++){var d=p[h].replace(/[\n]/g,""),f="[xnlink]"+d+"[/xnlink]\n";l.msg=l.msg.replace(p[h],f)}l.msg=l.msg.replace(/&amp;/gi,"&"),l.msg=l.msg.replace(/&lt;/g,"<"),l.msg=l.msg.replace(/&gt;/g,">")}}else{l.msg=c.textContent||c.text;try{l.msg=this.regTu(l.msg,r)}catch(e){}l.msg=l.msg.replace(/&lt;/g,"<"),l.msg=l.msg.replace(/&gt;/g,">")}a=e.extend({},this.defBody,l,i,{timestamp:t}),this.hashSend.contains(a.msgid)||this.hashReceive.contains(a.msgid)||(this._callback("fIM_receiveMessage",[a]),this.hashReceive.add(a.msgid,a))}},regTu:function(e,t){var s=[],i="";i=e.indexOf("&amp;")?e.replace(/&amp;/gi,"&"):e;var n=new RegExp(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/gi);s=i.match(n);for(var o=0;o<s.length;o++){var a,l="",c="";if(s[o].indexOf("ntform=1")>-1){if(a=s[o].replace(/ntform=1/gi,"userId="+t.userId+"&userName="+t.userName+"&cid="+t.cid),s[o].split("?")[1].split("&").length>1){for(var r=s[o].split("?")[1].split("&"),h=0;h<r.length;h++)"ntform=1"==r[h]?c+="":c+=r[h]+"&";c="?"+c.substr(0,c.length-1)}l="ntform=1"==s[o].split("?")[1]?s[o].split("?")[0]:s[o].split("?")[0]+c,i=i.replace(s[o].substr(0,s[o].length),'&lt;a href="'+a+'"&gt;'+l+"&lt;/a&gt;")}}return i},remoteNotifyUserList:function(t){var s=[];try{s=e.JSON.parseJSON(t)}catch(t){e.Log("remoteNotifyUserList toJSON abnormal",3)}for(var i=0;i<s.length;i++)s[i].userid==this.options.userid&&s.splice(i,1);this._callback("fIM_notifyUserNumbers",[s.length]),this._callback("fIM_notifyUserList",[e.JSON.toJSONString(s)])},remoteSearchWaiter:function(e,t){this._callback("fIM_onGetUserInfo",[t])},remoteNotifyUserInformation:function(e,t){e!=this.options.userid&&this._callback("fIM_onGetUserInfo",[t])},remoteNotifyUserEnter:function(e,t){this.options.destid=e;var s=this._toArray(this.options,this.connectParams);this.connect&&(this.connect.connectOptions.params=s.join(","),this.connect.kaliveOptions.params=s.join(",")),this._callback("fIM_notifyUserEnter",[this.options.destid,t,""])},remoteNotifyUserLeave:function(t){e.Log("tchat.remoteNotifyUserLeave("+t+")",2),this._callback("fIM_notifyUserLeave",[t])},remoteNotifyUserClose:function(e,t){e==this.options.clientid&&(this._callback("fIM_ConnectResult",[5,"",""]),this.disconnect(),this._callback("fIM_ConnectResult",[4,"",""]))},remoteNotifySessionScene:function(e){this._callback("fIM_onNotifySessionSence",[e])},remoteNotifyUserInputing:function(e,t){this._callback("fIM_notifyUserInputing",[t])},remoteRequestEvalute:function(e,t,s){this._callback("fIM_requestEvaluate",[t,s])},processSessionIdle:function(){var t=this;this.sessionIdleTimeouts||(this.sessionIdleTimeouts={}),e.each(this.sessionIdleReplys,function(e,s){t.sessionIdleTimeouts[e]&&clearTimeout(t.sessionIdleTimeouts[e].id),t.sendIdleReply(e)})},clearSessionIdle:function(){var t=this;this.sessionIdleTimeouts||(this.sessionIdleTimeouts={}),e.each(this.sessionIdleReplys,function(e,s){t.sessionIdleTimeouts[e]&&clearTimeout(t.sessionIdleTimeouts[e].id)})},sendIdleReply:function(t){var s=this,i=e.extend(this.sessionIdleTimeouts[t],{start:e.formatDate(),id:setTimeout(function(){var i=0,n=s.sessionIdleReplys[t];delete s.sessionIdleReplys[t],s.sessionIdleTimeouts[t].end=e.formatDate(),e.each(s.sessionIdleReplys,function(e){i++}),e.Log("setTimeout "+t+"s "+s.sessionIdleTimeouts[t].end+", disconnect tchat",1),0===i&&s.connect&&s.options.result&&(s._callback("fIM_ConnectResult",[4,"",n]),s.disconnect())},1e3*t)});this.sessionIdleTimeouts[t]=i},_toArray:function(t,s){var i=[];if(!t)return"error";for(var n=0;n<s.length;n++)i.push(e.isDefined(t[s[n]])?t[s[n]]:"");return i},_handleResponse:function(t,s){this[t]?this[t].apply(this,s):e.Log("The object of the method '"+t+"' does not exist",3)},_callback:function(t,s){if(s.push(this.options.settingid),e.hasOwnProperty(t))try{e[t].apply(this,s)}catch(e){}else e.Log("nTalk."+t+"(...)",2)},_onCallback:function(e,t){var s,i=this;if(t.length)if("LoginResult"===(s=t[0])){if(!e)return!1;this.LoginResult.apply(i,t.slice(1))}else this._handleResponse.call(i,s,t.slice(1)),e&&(this.abnormalCount=0,this.kaliveConnect("call kalive"))},_onComplete:function(){var t=Array.prototype.slice.call(arguments);this.debug&&e.Log("TChat.onComplete( "+t[0]+","+t[1]+","+t[2]+" )"),"kalive"==t[0]?(this.abnormalCount=0,this.kaliveConnect("complete kalive")):"login"==t[0]&&this.reconnect("abnormal login")},_onAbnormal:function(){var t=Array.prototype.slice.call(arguments);this.debug&&e.Log("TChat.onAbnormal( "+t[0]+","+t[1]+","+t[2]+" )",3),this.abnormalCount++,"login"==t[0]||this.abnormalCount>=3?(this.abnormalCount=0,this._callback("fIM_ConnectResult",[2,"","连接服务器超时，请稍后重试！"]),this.reconnect("abnormal login")):this.kaliveConnect("abnormal kalive")},_onTimeout:function(){var t=Array.prototype.slice.call(arguments);this.debug&&e.Log("TChat.onTimeout( "+t[0]+","+t[1]+","+t[2]+" )",3),"login"==t[0]&&this.loginAbnormalCount++,this.abnormalCount++,this.loginAbnormalCount>=3||this.abnormalCount>=5?(this.abnormalCount=0,this.loginAbnormalCount=0,this._callback("fIM_ConnectResult",[2,"","连接服务器超时，请稍后重试！"]),this.reconnect("time login")):this.kaliveConnect("timeout kalive")},_initQueue:function(){var t=this;this.messageQueue=new e.Queue,this.messageQueue.first=function(){return this.queueFront()},this.messageQueue.nextMessage=function(e,t){if(t=t||0,!this.list.length)return null;if(!e)return this.list[0];for(var s=0;s<this.list.length;s++)if(this.list[s].msgid==e&&this.list[s].body.sendpacket==t)return this.list[s+1];return null},this.messageQueue.removeMessage=function(e,t){var s=[];t=t||0;for(var i=0;i<this.list.length;i++)(this.list[i].msgid!=e||this.list[i].index!=t&&-1!=t)&&s.push(this.list[i]);this.list=s,this.length=s.length},this.messageQueue.addMessage=function(e){for(var t=0;t<this.list.length;t++)if(this.list[t].msgid==e.msgid&&this.list[t].index==e.index)return!1;return this.list.push(e),this.length=this.list.length,!0},this.messageQueue.getSendingNum=function(){for(var e=0,t=0;t<this.list.length;t++)this.list[t].status&&e++;return e},window[this.callback]=function(){t._callbackComplete.apply(t,arguments)},this.sendIntervalID=setInterval(function(){t.verificationMessage()},1e3)}}}(nTalk);