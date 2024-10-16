"ui";

/**
 * //初始化班花UI模板
 * banhua_ui.init({
 *     "title":"脚本标题",
 *      "color" : "脚本颜色",
 *        "subtitle" :: "副标题"
 * }, [页面1, 页面2] );
 * 
 * 添加xml代码到指定页面
 * banhua_ui.add_card("页面id", xml代码)
 * 
 * 网络验证模块
 * banhua_ui.mod_userSystem(密钥, sok密钥, 要添加的页面ID);
 * 
 * 自动读取本地的UI配置并写入
 * banhua_ui.get_ui();
 * 
 * 开始运行事件
 * ui.start.on("click", () => {
 * 
 *      toastLog("开始运行啦")
 * }})
 * 
 * 结束运行事件
 * ui.end.on("click", ()=> {
 *      toastLog("结束运行啦");
 * });
 * 
 * 判断是不是会员
 * paojiaoyun.isMember
 */
 (function(){
    function banhua_ui () {
        //初始化UI内部存储
        this.storage = null;

        //初始化项目XML文本
        this.xmls = "";
    }

    banhua_ui.prototype.init = function (uiConfig, lables) {
        //初始化banhua_ui
        if (!uiConfig) throw "请输入关键参数uiConfig";
        if (typeof(uiConfig) != "object") throw "您输入的参数类型不正确";
        
        if (!lables) throw "请输入关键参数lables";
        if (typeof(lables) != "object") throw "您输入lables参数类型不正确";

        this.storage = storages.create(uiConfig.title || "BanHua");

        // this.uiConfig = uiConfig;
        this.title = uiConfig.title || "我的脚本";
        this.color = uiConfig.color || "#FFC0CB";
        //副标题
        this.subtitle = uiConfig.subtitle || "";
        
        if (!ui.isUiThread()) throw "UI初始化只允许在UI线程中运行";
        // log(this.title);
        ui.layout(
            <RelativeLayout w='*' id='banhua' h='*'>
                <fab layout_alignParentBottom='true' id='end' margin='15dp' layout_width='wrap_content' layout_height='wrap_content' backgroundTint={this.color} elevation='5dp' src="@drawable/ic_power_settings_new_black_48dp" color={this.color}></fab>
                <fab layout_alignParentBottom='true' layout_alignParentRight='true' id='start' margin='15dp' layout_width='wrap_content' layout_height='wrap_content' backgroundTint={this.color} elevation='5dp' src="@drawable/ic_send_black_48dp" color={this.color}></fab>
                <appbar id='head' bg={this.color} w='*'>
                    <toolbar id='toolbar' title={this.title} w='*' subtitle={this.subtitle}>
                        <Switch id='autoService' layout_gravity='right' text='无障碍服务' textColor='#ffffff' padding='8dp' textSize='15sp' checked='{{auto.service != null}}'></Switch>
                    </toolbar>
                    <tabs id='tabs' tabIndicatorColor='#ffffff'></tabs>
                </appbar>
            </RelativeLayout>
        );
        let xmls = "<viewpager layout_below='head' layout_above='footer' id='viewpager'>";
        lables.forEach((name) => {
            xmls = xmls + "<LinearLayout w='*' h='*' padding='0 0 0 10' id='"+name+"' orientation='vertical'></LinearLayout>"
        });
        xmls = xmls + "</viewpager>";

        this.add_view(xmls, ui.banhua, true);

        this.add_view(
            <LinearLayout id='footer' layout_alignParentBottom='true' orientation='vertical' h='auto' w='*'>
                <text w='*' text='©️2019-2021 BanHua. All Rights Reserved' gravity='center'></text>
            </LinearLayout>, ui.banhua, true
        )

        //设置状态栏颜色
        ui.statusBarColor(this.color);
        //设置标签页
        ui.viewpager.setTitles(lables);
        //绑定标签栏
        ui.tabs.setupWithViewPager(ui.viewpager);

        //无障碍服务单击事件
        ui.autoService.on('click', () => {
            ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
        });

        //回到本界面时，触发resume事件
        ui.emitter.on('resume', ()=> {
            log("欢迎回来！");
            auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
        });

        // ui.start.on("click", this.start_click);
        // ui.end.on("click", this.end_click);
    }

    banhua_ui.prototype.add_view = function (xml, idName, zt) {
        this.xmls = this.xmls + xml;
        return ui.inflate(xml, idName, zt);
    }

    banhua_ui.prototype.add_card = function (page, xml) {
        if (!page) throw "请输入page参数"; 
        if (!xml) throw "请输入xml参数";

        cardStr = <card h='auto' w='*' cardCornerRadius='10dp' margin='10 10 10 0' cardElevation='5dp'>
            {xml}
        </card>
        this.add_view(cardStr, ui[page], true);
        this.ui_data = this.ui_data + xml;
    }


    //获取xml所有的bh_id的控件
    banhua_ui.prototype.get_xml_id = function (idName ,xmlStr) {
        let re = new RegExp(idName+"[_0-9a-zA-Z]+[\'$\"$]", "g");
        let idArr = [];
        let arr = xmlStr.match(re);
        for (idn in arr) {
            idArr.push(arr[idn].replace(/['"]/g, ""));
        }
        print("idArr:"+idArr);
        return idArr;
    }

    //保存指定id数组的控件内容到本地储存
    banhua_ui.prototype.putUiConfig = function (ids) {
        if (!this.storage) throw "本地储存变量不存在";

        
        ids.forEach((idName) => {
            print("【putUiConfig】\n正在写入【%s】", idName);
            if (ui[idName].toString().indexOf("EditText") > -1) {
                this.storage.put(idName, ui[idName].text());
            } else if (ui[idName].toString().indexOf("CheckBox") > -1) {
                this.storage.put(idName, ui[idName].isChecked());
            } else if (ui[idName].toString().indexOf("Spinner") > -1) {
                this.storage.put(idName, ui[idName].getSelectedItemPosition())
            } else if (ui[idName].toString().indexOf("Radio") > -1) {
                this.storage.put(idName, ui[idName].isChecked());
            } else {
                console.error("【%s】该类型的控件不支持保存", idName);
            }
        });
    }

    //设置界面中指定id内容      
    banhua_ui.prototype.setUiConfig = function (ids) {

        if (!this.storage) throw "本地储存变量不存在";
        ui.run(() => {
            ids.forEach((idName) => {
                // print("【setUiConfig】\n正在设置【%s】", idName);
                if (ui[idName].toString().indexOf("EditText") > -1) {
                    ui[idName].setText(this.storage.get(idName) || "");
                } else if (ui[idName].toString().indexOf("CheckBox") > -1) {
                    ui[idName].checked = this.storage.get(idName) || false;
                } else if (ui[idName].toString().indexOf("Spinner") > -1) {
                    ui[idName].setSelection(this.storage.get(idName) || 0);
                } else if (ui[idName].toString().indexOf("Radio") > -1) {
                    ui[idName].checked = this.storage.get(idName) || false;
                } else {
                    console.error("【%s】该类型的控件不支持设置控件信息", idName);
                }
            });
        });
    }

    //保存界面UI内容
    banhua_ui.prototype.put_ui = function () {
        let ids = this.get_xml_id("bh_", this.xmls);
        // log(ids);
        this.putUiConfig(ids);
    }

    //获取并设置界面UI内容
    banhua_ui.prototype.get_ui = function () {
        let ids = this.get_xml_id("bh_", this.xmls);
        // log(ids);
        this.setUiConfig(ids);
    }

    //班花会员框架生成
    banhua_ui.prototype.mod_userSystem = function (key, sok, ym) {
        let storage = this.storage;
        
        //用户系统生成
        if (!paojiaoyun) throw "请先导入paojiaoyun模块";
        if (!key || !sok || !ym) throw "key  sok ym参数不得为空";
        
        if (typeof(key) != "string" || typeof(sok) != "string") throw "key sok参数类型不正确";
        //是否是会员
        paojiaoyun.isMember = false;
        //开始生成会员框架();
        paojiaoyun.init(key, sok);
        paojiaoyun._debug = () => {};

        //开始读取本地卡密 如果本地有卡密则登录
        let endTime = "00:00:00";

        if (storage.get("kami")) {
            paojiaoyun.SetCard(storage.get("kami"));
            let res = paojiaoyun.CardLogin();
            log("登录返回值："+JSON.stringify(res));
            if (res.code == 0) {
                toastLog("登录成功！");
                endTime = res.result.expires;
                paojiaoyun.isMember = true;
            } else {
                toastLog(res.code + "\n" +res.message);
                paojiaoyun.isMember = false;
                endTime = res.message;

            }
        } else {
            toastLog("未登录");
        }
        
        let xml = <vertical padding='5dp' w='*'>
            <horizontal padding='5dp' gravity='center_vertical' w='*'>
                <img w='30dp' h='30dp' scaleType='centerCrop' marginLeft='5dp' src='@drawable/ic_account_circle_black_48dp' tint={this.color}></img>
                <text marginLeft='5dp' text='设备ID：'></text>
                <text marginLeft='5dp' id='deid' text={paojiaoyun.getDeviceID()}></text>
            </horizontal>
            <horizontal padding='5dp' gravity='center_vertical' w='*'>
                <img w='30dp' h='30dp' scaleType='centerCrop' marginLeft='5dp' src='@drawable/ic_fingerprint_black_48dp' tint={this.color}></img>
                <text marginLeft='5dp' text='设备卡密：'></text>
                <text marginLeft='5dp' id='kami' text={storage.get("kami") || "暂无卡密"}></text>
            </horizontal>
            <horizontal padding='5dp' gravity='center_vertical' w='*'>
                <img w='30dp' h='30dp' scaleType='centerCrop' marginLeft='5dp' src='@drawable/ic_alarm_black_48dp' tint={this.color}></img>
                <text marginLeft='5dp' text='到期时间：'></text>
                <text marginLeft='5dp' id='endTime' text={endTime}></text>
            </horizontal>
            <horizontal gravity='center_vertical' w='*'>
                <button layout_weight='1' id='login' text='登 录' textSize='14sp' style='Widget.AppCompat.Button.Borderless'></button>
                <button layout_weight='1' id='test' text='试 用' textSize='14sp' style='Widget.AppCompat.Button.Borderless'></button>
                <button layout_weight='1' id='recharge' text='充 值' textSize='14sp' style='Widget.AppCompat.Button.Borderless'></button>
                <button layout_weight='1' id='out' text='退 出' textSize='14sp' style='Widget.AppCompat.Button.Borderless'></button>
    
            </horizontal>
        </vertical>
        this.add_card(ym, xml);
        //登录事件


        let th = null;
        //卡密登录函数
        function login_click () {
            if (th != null && th.isAlive()) {
                toastLog("轻点,疼~");
            } else {
                th = threads.start(function(){
                    if (paojiaoyun.isMember) {
                        toastLog("您已登录，无需再登录");
                        return null;
                    }
                    toastLog("登 录");
                    dialogs.rawInput("请输入卡密：", "", (kamiStr) => {
                        log("输入的卡密是：%s", kamiStr);
                        if (!kamiStr || kamiStr == "" || typeof(kamiStr) != "string") {
                            toastLog("卡密格式不正确");
                        } else {
                            log("开始写入kami");
                            storage.put("kami", kamiStr);
                            log("开始登录");
                            paojiaoyun.SetCard(kamiStr);
                            let res = paojiaoyun.CardLogin();
                            log("登录返回值："+JSON.stringify(res));
                            let endTime;
                            if (res.code == 0) {
                                toastLog("登录成功！");
                                endTime = res.result.expires;
                                paojiaoyun.isMember = true;

                            } else {
                                toastLog(res.code + "\n" +res.message);
                                paojiaoyun.isMember = false;
                                endTime = res.message;
                            }
                            ui.run(() => {
                                ui.endTime.setText(endTime);
                                ui.kami.setText(kamiStr);
                            });
                        }
                    });
                });
            }
        }

        //试用登录函数
        function test_click () {
            if (th != null && th.isAlive()) {
                toastLog("轻点,疼~");
            } else {
                th = threads.start(function(){
                    if (paojiaoyun.isMember) {
                        toastLog("您已登录，无法试用");
                        return null;
                    }
                    toastLog("试用");
                    let res = paojiaoyun.TrialLogin();
                    let endTime = "00:00:00";
                    if (res.code == 0) {
                        toastLog("试用登录成功");
                        paojiaoyun.isMember = true;
                        endTime = res.result.expires;
                    } else {
                        toastLog(res.code + "\n" +res.message);
                        paojiaoyun.isMember = false;
                        endTime = res.message;
                    }

                    ui.run(() => {
                        ui.endTime.setText(endTime);
                        ui.kami.setText("试用登录");
                    });
                });
            }
        }

        //充值函数
        function recharge_click () {
            if (th != null && th.isAlive()) {
                toastLog("轻点,疼~");
            } else {
                th = threads.start(function(){
                    toastLog("充值");
                    if (!storage.get("kami")) {
                        toastLog("您没有可充值的卡密");
                        return null;
                    }
                    dialogs.rawInput("请输入卡密：", "", (kami) => {
                        if (kami != "") {
                            dialogs.confirm("确定要充值到："+storage.get("kami")+"吗?", "", (cz) => {
                                if (cz) {
                                    let endTime = "00:00:00";
                                    let res = paojiaoyun.CardRecharge(storage.get("kami"), kami);
                                    if (res.code == 0) {
                                        toastLog("充值成功，重新登录");

                                        paojiaoyun.SetCard(storage.get("kami"));
                                        let res = paojiaoyun.CardLogin();
                                        if (res.code == 0) {
                                            toastLog("重新登录成功");
                                            paojiaoyun.isMember = true;
                                            endTime = res.result.expires;
                                        } else {
                                            toastLog(res.code + "\n" +res.message);
                                            paojiaoyun.isMember = false;
                                        }
                                    } else {
                                        toastLog(res.code + "\n" +res.message);
                                    }

                                    ui.run(() => {
                                        ui.endTime.setText(endTime);
                                        ui.kami.setText(storage.get("kami"));
                                    });

                                } else {
                                    toastLog("充值取消");
                                }
                            });
                        }
                    });
                });
            }
        }

        //退出函数
        function out_click () {
            if (th != null && th.isAlive()) {
                toastLog("轻点,疼~");
            } else {
                th = threads.start(function(){
                    let endTime = "00:00:00", outStr = "null"
                    toastLog("退出");
                    let res = paojiaoyun.CardLogout();
                    if (res.code == 0) {
                        toastLog("退出登录成功");
                        outStr = "已退出";
                    } else {
                        toastLog(res.message);
                    }
                    storage.remove("kami");

                    ui.run(() => {
                        ui.endTime.setText(endTime);
                        ui.kami.setText(outStr);
                    });
                });
            }
        }

        //绑定卡密登录事件
        ui.login.on("click", login_click);
        //绑定试用登录事件
        ui.test.on("click", test_click);
        //绑定充值事件
        ui.recharge.on("click", recharge_click);
        //绑定退出事件
        ui.out.on("click", out_click);

        
    }
    
    this.banhua_ui = new banhua_ui();
})();


/**
 * 【泡椒云模块】待整理
 */

(function(){
    function PJYSDK(){
        http.__okhttp__.setMaxRetries(0);
        http.__okhttp__.setTimeout(10*1000);

        this.event = events.emitter();

        this.debug = true;
        this._lib_version = "v1.08";
        this._protocol = "https";
        this._host = "api.paojiaoyun.com";
        this._device_id = this.getDeviceID();
        this._retry_count = 9;
        
        this._card = null;
        this._username = null;
        this._password = null;
        this._token = null;
        
        this.is_trial = false;  // 是否是试用用户
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };

        this._auto_heartbeat = true;  // 是否自动开启心跳任务
        this._heartbeat_gap = 60 * 1000; // 默认60秒
        this._heartbeat_task = null;
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};

        this._prev_nonce = null;
    }
    //初始化泡椒云
    PJYSDK.prototype.init = function (app_key, app_secret) {
        
        this._app_key = app_key;
        this._app_secret = app_secret;
    }

    PJYSDK.prototype.SetCard = function(card) {
        this._card = card.trim();
    }
    PJYSDK.prototype.SetUser = function(username, password) {
        this._username = username.trim();
        this._password = password;
    }
    PJYSDK.prototype.getDeviceID = function() {
        let id = device.serial;
        if (id == null || id == "" || id == "unknown") {
            id = device.getAndroidId();
        }
        if (id == null || id == "" || id == "unknown") {
            id = device.getIMEI();
        }
        return id;
    }
    PJYSDK.prototype.MD5 = function(str) {
        try {
            let digest = java.security.MessageDigest.getInstance("md5");
            let result = digest.digest(new java.lang.String(str).getBytes("UTF-8"));
            let buffer = new java.lang.StringBuffer();
            for (let index = 0; index < result.length; index++) {
                let b = result[index];
                let number = b & 0xff;
                let str = java.lang.Integer.toHexString(number);
                if (str.length == 1) {
                    buffer.append("0");
                }
                buffer.append(str);
            }
            return buffer.toString();
        } catch (error) {
            alert(error);
            return "";
        }
    }
    PJYSDK.prototype.getTimestamp = function() {
        try {
            let res = http.get("http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
            let data = res.body.json();
            return Math.floor(data["data"]["t"]/1000);
        } catch (error) {
            return Math.floor(new Date().getTime()/1000);
        }
    }
    PJYSDK.prototype.genNonce = function() {
        const ascii_str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let tmp = '';
        for(let i = 0; i < 20; i++) {
            tmp += ascii_str.charAt(Math.round(Math.random()*ascii_str.length));
        }
        return this.MD5(this.getDeviceID() + tmp);
    }
    PJYSDK.prototype.joinParams = function(params) {
        let ps = [];
        for (let k in params) {
            ps.push(k + "=" + params[k])
        }
        ps.sort()
        return ps.join("&")
    }
    PJYSDK.prototype.CheckRespSign = function(resp) {
        if (resp.code != 0 && resp.nonce === "" && resp.sign === "") {
            return resp
        }

        let ps = "";
        if (resp["result"]) {
            ps = this.joinParams(resp["result"]);
        }

        let s = resp["code"] + resp["message"] + ps + resp["nonce"] + this._app_secret;
        let sign = this.MD5(s);
        if (sign === resp["sign"]) {
            if (this._prev_nonce === null) {
                this._prev_nonce = resp["nonce"];
                return {"code":0, "message":"OK"};
            } else {
                if (resp["nonce"] > this._prev_nonce) {
                    this._prev_nonce = resp["nonce"];
                    return {"code": 0, "message": "OK"};
                } else {
                    return {"code": -98, "message": "轻点，疼~"};
                }
            }
        }
        return {"code": -99, "message": "轻点，疼~"};
    }
    PJYSDK.prototype.retry_fib = function(num) {
        if (num > 9) {
            return 34
        }
        let a = 0;
        let b = 1;
        for (i = 0; i < num; i++) {
            let tmp = a + b;
            a = b
            b = tmp
        }
        return a
    }
    PJYSDK.prototype._debug = function(path, params, result) {
        if (this.debug) {
            log("\n" + path, "\nparams:", params, "\nresult:", result);
        }
    }
    PJYSDK.prototype.Request = function(method, path, params) {
        // 构建公共参数
        params["app_key"] = this._app_key;

        method = method.toUpperCase();
        let url = this._protocol + "://" + this._host + path
        let max_retries = this._retry_count;
        let retries_count = 0;

        let data = {"code": -1, "message": "连接服务器失败"};
        do {
            retries_count++;
            let sec = this.retry_fib(retries_count);

            delete params["sign"]
            params["nonce"] = this.genNonce();
            params["timestamp"] = this.getTimestamp();
            let ps = this.joinParams(params);
            let s = method + this._host + path + ps + this._app_secret;
            let sign = this.MD5(s);
            params["sign"] = sign;

            let resp, body;
            try {    
                if (method === "GET") {
                    resp = http.get(url + "?" + ps + "&sign=" + sign);
                } else {  // POST
                    resp = http.post(url, params);
                }
                body = resp.body.string();
                data = JSON.parse(body);
                this._debug(method+'-'+path+':', params, data);
                
                let crs = this.CheckRespSign(data);
                if (crs.code !== 0) {
                    return crs;
                } else {
                    return data;
                }
            } catch (error) {
                log("[*] request error: ", error, sec + "s后重试");
                this._debug(method+'-'+path+':', params, body)
                sleep(sec*1000);
            }
        } while (retries_count < max_retries);

        return data;
    }
    /* 通用 */
    PJYSDK.prototype.GetHeartbeatResult = function() {
        return this._heartbeat_ret;
    }
    PJYSDK.prototype.GetTimeRemaining = function() {
        let g = this.login_result.expires_ts - this.getTimestamp();
        if (g < 0) {
            return 0;
        } 
        return g;
    }
    /* 卡密相关 */
    PJYSDK.prototype.CardLogin = function() {  // 卡密登录
        if (!this._card) {
            return {"code": -4, "message": "请先设置卡密"};
        }
        let method = "POST";
        let path = "/v1/card/login";
        let data = {"card": this._card, "device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this._token = ret.result.token;
            this.login_result = ret.result;
            if (this._auto_heartbeat) {
                this._startCardHeartheat();
            }
        }
        return ret;
    }
    PJYSDK.prototype.CardHeartbeat = function() {  // 卡密心跳，默认会自动调用
        if (!this._token) {
            return {"code": -2, "message": "请在卡密登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/card/heartbeat";
        let data = {"card": this._card, "token": this._token};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.login_result.expires = ret.result.expires;
            this.login_result.expires_ts = ret.result.expires_ts;
        }
        return ret;
    }
    PJYSDK.prototype._startCardHeartheat = function() {  // 开启卡密心跳任务
        if (this._heartbeat_task) {
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        this._heartbeat_task = threads.start(function(){
            setInterval(function(){}, 10000);
        });
        this._heartbeat_ret = this.CardHeartbeat();
        
        this._heartbeat_task.setInterval((self) => {
            self._heartbeat_ret = self.CardHeartbeat();
            if (self._heartbeat_ret.code != 0) {
                self.event.emit("heartbeat_failed", self._heartbeat_ret);
            }
        }, this._heartbeat_gap, this);

        this._heartbeat_task.setInterval((self) => {
            if (self.GetTimeRemaining() == 0) {
                self.event.emit("heartbeat_failed", {"code": 10210, "message": "卡密已过期！"});
            }
        }, 1000, this);
    }
    PJYSDK.prototype.CardLogout = function() {  // 卡密退出登录
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
        if (this._heartbeat_task) { // 结束心跳任务
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        if (!this._token) {
            return {"code": 0, "message": "OK"};
        }
        let method = "POST";
        let path = "/v1/card/logout";
        let data = {"card": this._card, "token": this._token};
        let ret = this.Request(method, path, data);
        // 清理
        this._token = null;
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };
        return ret;
    }
    PJYSDK.prototype.CardUnbindDevice = function() { // 卡密解绑设备，需开发者后台配置
        if (!this._token) {
            return {"code": -2, "message": "请在卡密登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/card/unbind_device";
        let data = {"card": this._card, "device_id": this._device_id, "token": this._token};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.SetCardUnbindPassword = function(password) { // 自定义设置解绑密码
        if (!this._token) {
            return {"code": -2, "message": "请在卡密登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/card/unbind_password";
        let data = {"card": this._card, "password": password, "token": this._token};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CardUnbindDeviceByPassword = function(password) { // 用户通过解绑密码解绑设备
        let method = "POST";
        let path = "/v1/card/unbind_device/by_password";
        let data = {"card": this._card, "password": password};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CardRecharge = function(card, use_card) { // 以卡充卡
        let method = "POST";
        let path = "/v1/card/recharge";
        let data = {"card": card, "use_card": use_card};
        return this.Request(method, path, data);
    }
    /* 用户相关 */
    PJYSDK.prototype.UserRegister = function(username, password, card) {  // 用户注册（通过卡密）
        let method = "POST";
        let path = "/v1/user/register";
        let data = {"username": username, "password": password, "card": card, "device_id": this._device_id};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UserLogin = function() {  // 用户账号登录
        if (!this._username || !this._password) {
            return {"code": -4, "message": "请先设置用户账号密码"};
        }
        let method = "POST";
        let path = "/v1/user/login";
        let data = {"username": this._username, "password": this._password, "device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this._token = ret.result.token;
            this.login_result = ret.result;
            if (this._auto_heartbeat) {
                this._startUserHeartheat();
            }
        }
        return ret;
    }
    PJYSDK.prototype.UserHeartbeat = function() {  // 用户心跳，默认会自动开启
        if (!this._token) {
            return {"code": -2, "message": "请在用户登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/user/heartbeat";
        let data = {"username": this._username, "token": this._token};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.login_result.expires = ret.result.expires;
            this.login_result.expires_ts = ret.result.expires_ts;
        }
        return ret;
    }
    PJYSDK.prototype._startUserHeartheat = function() {  // 开启用户心跳任务
        if (this._heartbeat_task) {
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        this._heartbeat_task = threads.start(function(){
            setInterval(function(){}, 10000);
        });
        this._heartbeat_ret = this.UserHeartbeat();

        this._heartbeat_task.setInterval((self) => {
            self._heartbeat_ret = self.UserHeartbeat();
            if (self._heartbeat_ret.code != 0) {
                self.event.emit("heartbeat_failed", self._heartbeat_ret);
            }
        }, this._heartbeat_gap, this);

        this._heartbeat_task.setInterval((self) => {
            if (self.GetTimeRemaining() == 0) {
                self.event.emit("heartbeat_failed", {"code": 10250, "message": "用户已到期！"});
            }
        }, 1000, this);
    }
    PJYSDK.prototype.UserLogout = function() {  // 用户退出登录
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
        if (this._heartbeat_task) { // 结束心跳任务
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        if (!this._token) {
            return {"code": 0, "message": "OK"};
        }
        let method = "POST";
        let path = "/v1/user/logout";
        let data = {"username": this._username, "token": this._token};
        let ret = this.Request(method, path, data);
        // 清理
        this._token = null;
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };
        return ret;
    }
    PJYSDK.prototype.UserChangePassword = function(username, password, new_password) {  // 用户修改密码
        let method = "POST";
        let path = "/v1/user/password";
        let data = {"username": username, "password": password, "new_password": new_password};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UserRecharge = function(username, card) { // 用户通过卡密充值
        let method = "POST";
        let path = "/v1/user/recharge";
        let data = {"username": username, "card": card};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UserUnbindDevice = function() { // 用户解绑设备，需开发者后台配置
        if (!this._token) {
            return {"code": -2, "message": "请在用户登录成功后调用"};
        }
        let method = "POST";
        let path = "/v1/user/unbind_device";
        let data = {"username": this._username, "device_id": this._device_id, "token": this._token};
        return this.Request(method, path, data);
    }
    /* 配置相关 */
    PJYSDK.prototype.GetCardConfig = function() { // 获取卡密配置
        let method = "GET";
        let path = "/v1/card/config";
        let data = {"card": this._card};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UpdateCardConfig = function(config) { // 更新卡密配置
        let method = "POST";
        let path = "/v1/card/config";
        let data = {"card": this._card, "config": config};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.GetUserConfig = function() { // 获取用户配置
        let method = "GET";
        let path = "/v1/user/config";
        let data = {"user": this._username};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UpdateUserConfig = function(config) { // 更新用户配置
        let method = "POST";
        let path = "/v1/user/config";
        let data = {"username": this._username, "config": config};
        return this.Request(method, path, data);
    }
    /* 软件相关 */
    PJYSDK.prototype.GetSoftwareConfig = function() { // 获取软件配置
        let method = "GET";
        let path = "/v1/software/config";
        return this.Request(method, path, {});
    }
    PJYSDK.prototype.GetSoftwareNotice = function() { // 获取软件通知
        let method = "GET";
        let path = "/v1/software/notice";
        return this.Request(method, path, {});
    }
    PJYSDK.prototype.GetSoftwareLatestVersion = function(current_ver) { // 获取软件最新版本
        let method = "GET";
        let path = "/v1/software/latest_ver";
        let data = {"version": current_ver};
        return this.Request(method, path, data);
    }
    /* 试用功能 */
    PJYSDK.prototype.TrialLogin = function() {  // 试用登录
        let method = "POST";
        let path = "/v1/trial/login";
        let data = {"device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.is_trial = true;
            this.login_result = ret.result;
            if (this._auto_heartbeat) {
                this._startTrialHeartheat();
            }
        }
        return ret;
    }
    PJYSDK.prototype.TrialHeartbeat = function() {  // 试用心跳，默认会自动调用
        let method = "POST";
        let path = "/v1/trial/heartbeat";
        let data = {"device_id": this._device_id};
        let ret = this.Request(method, path, data);
        if (ret.code == 0) {
            this.login_result.expires = ret.result.expires;
            this.login_result.expires_ts = ret.result.expires_ts;
        }
        return ret;
    }
    PJYSDK.prototype._startTrialHeartheat = function() {  // 开启试用心跳任务
        if (this._heartbeat_task) {
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        this._heartbeat_task = threads.start(function(){
            setInterval(function(){}, 10000);
        });
        this._heartbeat_ret = this.TrialHeartbeat();

        this._heartbeat_task.setInterval((self) => {
            self._heartbeat_ret = self.TrialHeartbeat();
            if (self._heartbeat_ret.code != 0) {
                self.event.emit("heartbeat_failed", self._heartbeat_ret);
            }
        }, this._heartbeat_gap, this);

        this._heartbeat_task.setInterval((self) => {
            if (self.GetTimeRemaining() == 0) {
                self.event.emit("heartbeat_failed", {"code": 10407, "message": "试用已到期！"});
            }
        }, 1000, this);
    }
    PJYSDK.prototype.TrialLogout = function() {  // 试用退出登录，没有http请求，只是清理本地记录
        this.is_trial = false;
        this._heartbeat_ret = {"code": -9, "message": "还未开始验证"};
        if (this._heartbeat_task) { // 结束心跳任务
            this._heartbeat_task.interrupt();
            this._heartbeat_task = null;
        }
        // 清理
        this._token = null;
        this.login_result = {
            "card_type": "",
            "expires": "",
            "expires_ts": 0,
            "config": "",
        };
        return {"code": 0, "message": "OK"};;
    }
    /* 高级功能 */
    PJYSDK.prototype.GetRemoteVar = function(key) { // 获取远程变量
        let method = "GET";
        let path = "/v1/af/remote_var";
        let data = {"key": key};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.GetRemoteData = function(key) { // 获取远程数据
        let method = "GET";
        let path = "/v1/af/remote_data";
        let data = {"key": key};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CreateRemoteData = function(key, value) { // 创建远程数据
        let method = "POST";
        let path = "/v1/af/remote_data";
        let data = {"action": "create", "key": key, "value": value};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.UpdateRemoteData = function(key, value) { // 修改远程数据
        let method = "POST";
        let path = "/v1/af/remote_data";
        let data = {"action": "update", "key": key, "value": value};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.DeleteRemoteData = function(key, value) { // 删除远程数据
        let method = "POST";
        let path = "/v1/af/remote_data";
        let data = {"action": "delete", "key": key};
        return this.Request(method, path, data);
    }
    PJYSDK.prototype.CallRemoteFunc = function(func_name, params) { // 执行远程函数
        let method = "POST";
        let path = "/v1/af/call_remote_func";
        let ps = JSON.stringify(params);
        let data = {"func_name": func_name, "params": ps};
        let ret = this.Request(method, path, data);
        if (ret.code == 0 && ret.result.return) {
            ret.result = JSON.parse(ret.result.return);
        }
        return ret;
    }
    this.paojiaoyun = new PJYSDK();
})();

1
paojiaoyun.init();

banhua_ui.init({
    title : "抖音直播助手"
}, ["首页", "设置", "用户"]);


//////////////////////////////////////////////////////////////////////////////////////

var softTitle="抖音直播助手"
var color = "#FFC0CB";          //主题颜色
var roomID= "roomID"
var f = null;//通讯线程
var storage = storages.create("qq467780985");

var myDate=new Date()
var logpath = "/sdcard/efenlog/"+myDate.toLocaleDateString()+myDate.getHours()+'时'+myDate.getMinutes()+'分'+myDate.getSeconds()+'秒'+".txt";
const W = device.width;
const H = device.height;

const DY_PACKAGE_NAME = "com.ss.android.ugc.aweme";

files.createWithDirs(logpath);
files.write(logpath, "0xFEFF");
console.setGlobalLogConfig({
    "file": logpath
});




//监听say事件
events.on("floatEmitter", function(floatEmitter){
    f = floatEmitter;
    main();
});

events.on("gather", function(){
    gatherPosition();
})

/***
 * 视图日志显示
 */
function vlog($msg){
    try {
        
        toastLog($msg)
        
    } catch (e) {
        log("出现异常");
        log(e);
    }
    
}

var datamofang = true;
var datazidingyi = false;


banhua_ui.add_view(
    <vertical>
        <scroll w='*'>
            <vertical>

                <vertical h="auto" padding="5 0" gravity="center_vertical">
                    <text  h="auto" textSize="12sp" text="无障碍每次从新打开软件都要开启。" gravity="center"/>
                </vertical>
                <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
                    <horizontal padding="15 15 15">
                        <vertical h="*" layout_weight="1" gravity="center">
                            <text textSize="16sp" textColor="#333333" text="主播uid" />
                        </vertical>
                        <vertical h="*" layout_weight="100" gravity="center">
                            <input id="roomID" w="*" text="" hint="" textColor="#333333" textColorHint="#999999" inputType="number"  />
                        </vertical>
                    </horizontal>
                </card>

                <vertical h="auto" padding="5 0" gravity="center_vertical">
                    <text  h="auto" textSize="12sp" text="主播uid：UID可以不填，不填的话请运行后手动进入主播间" gravity="center"/>
                </vertical>

                <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
                    <horizontal padding="15 15 15">
                        <vertical h="*" layout_weight="1" gravity="center">
                            <text textSize="16sp" textColor="#333333" text="运行时长(分钟)" />
                        </vertical>
                        <vertical h="*" layout_weight="100" gravity="center">
                            <input id="provide_runtime" w="*" text="60" hint="" textColor="#333333" textColorHint="#999999" inputType="number" gravity="center" />
                        </vertical>
                    </horizontal>
                </card>

                <vertical h="auto" padding="5 0" gravity="center_vertical">
                    <text h="auto" textSize="12sp" text="运行时长：运行的时间，到时间退出抖音。" gravity="center"/>
                </vertical>


                <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
                    <horizontal padding="15 15 15 ">
                        <vertical h="*" layout_weight="1" gravity="center">
                            <text textSize="16sp" textColor="#333333" text="点赞速度(毫秒)" />
                        </vertical>
                        <vertical h="*" layout_weight="100" gravity="center">
                            <input textSize="16sp" id="输入框1" hint="" text="1-20" inputType="number" gravity="center" />
                        </vertical>
                    </horizontal>
                </card>

                <vertical h="auto" padding="5 0" gravity="center_vertical">
                    <text  h="auto" textSize="12sp" text="点赞速度：1秒为1000毫秒，1-20就是随机1-20毫秒" gravity="center"/>
                </vertical>

                <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
                    <horizontal padding="15 15 15 ">
                        <vertical h="*" layout_weight="1" gravity="center">
                            <text textSize="16sp" textColor="#333333" text="点赞次数" />
                        </vertical>
                        <vertical h="*" layout_weight="100" gravity="center">
                            <input textSize="16sp" id="输入框2" hint="" text="100" inputType="number" gravity="center" />
                        </vertical>
                    </horizontal>
                </card>
                
                <vertical h="auto" padding="5 0" gravity="center_vertical">
                    <text  h="auto" textSize="12sp" text="点赞次数：点赞多少次发送一次评论" gravity="center"/>
                </vertical>
                
                <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
                    <horizontal marginTop="10"marginBottom="10"gravity="center">
                        <checkbox id="mofang" text="模仿公屏弹幕" checked="{{ datamofang }}" />
                        <checkbox id="zidingyi" text="自定义弹幕" checked="{{ datazidingyi }}" />
                    </horizontal>
                </card>

                <vertical h="auto" padding="5 0" gravity="center_vertical">
                    <text  h="auto" textSize="12sp" text="模仿公屏:全自动，公屏上在发什么，就跟随着发什么。" gravity="center"/>
                    <text  h="auto" textSize="12sp" text="自定义:在设置页面设置保存。" gravity="center"/>
                </vertical>
            </vertical>
        </scroll>
    </vertical>, ui.首页, true
);

//添加话术设置界面

banhua_ui.add_view(

        <vertical h="*">
            <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical">
                <horizontal padding="18 8" h="auto"gravity="center">
                <button id="xuanfu" text="开启悬浮窗" layout_gravity="center_vertical" layout_alignParentRight="true" w="120" h="45" textColor="#222222" textSize="12sp" maxLines="1" />
                </horizontal>
            </card>
        <ScrollView>
            <vertical>
                <vertical paddingLeft="20" paddingRight="20" paddingBottom="80" marginTop="10" layout_weight="1" >
                    <card w="*" cardCornerRadius="30dp" cardElevation="1dp" gravity="center_vertical" marginTop="10" >
                        <vertical h="*" gravity="center" padding="10">
                        <text text="自定义弹幕设置" textSize="21sp" gravity="center" textColor="#000000"></text>
                        <input id="hs1" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[1]}}" />
                        <input id="hs2" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[2]}}" />
                        <input id="hs3" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[3]}}" />
                        <input id="hs4" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[4]}}" />
                        <input id="hs5" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[5]}}" />
                        <input id="hs6" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[6]}}" />
                        <input id="hs7" paddingLeft="10" paddingRight="10" textSize="14sp" text="{{this.storage.get('huashu_array')[7]}}" />
                        </vertical>
                    </card>
                    <vertical h="auto" padding="5 0" gravity="center_vertical">
                        <text  h="auto" textSize="12sp" text="每一行为一条，可自行修改保存，系统会随机选一条发送。" gravity="center"/>
                    </vertical>
                
                    <button id="save" bg="#FFC0CB" textColor="#000000" text="保存话术" h="40" layout_gravity="bottom"></button>
                </vertical> 
                
                
                
            </vertical>
        </ScrollView>
        
    </vertical>, ui.设置, true
);
var storage = storages.create("qq467780985");

ui.save.click(function () {
    var storage = storages.create("qq467780985");
    var huashu_array = [];
    huashu_array[1] = ui.hs1.getText().toString();
    huashu_array[2] = ui.hs2.getText().toString();
    huashu_array[3] = ui.hs3.getText().toString();
    huashu_array[4] = ui.hs4.getText().toString();
    huashu_array[5] = ui.hs5.getText().toString();
    huashu_array[6] = ui.hs6.getText().toString();
    huashu_array[7] = ui.hs6.getText().toString();
    storage.put("huashu_array", huashu_array)
    toast("保存成功")
});

if (!storage.get("huashu_array")) {
    var storage = storages.create("qq467780985");
    var huashu_array = [];
    //评论话术
    huashu_array[1] = "为主播点赞哦";
    huashu_array[2] = "主播666";
    huashu_array[3] = "1111111111111";
    huashu_array[4] = "主播真漂亮";
    huashu_array[5] = "我又来了";
    huashu_array[6] = "加油！我无时无刻都在关注您哦";
    huashu_array[7] = "22222222222222222222";
    storage.put("huashu_array", huashu_array);
}







ui.xuanfu.on("click", function () {
    if (floaty.checkPermission()) {
        toastLog('悬浮窗权限已打开');
    } else {
        // 用户勾选悬浮窗权限的选项时，跳转到页面让用户去开启
        if (auto.service != null) {
            int = app.startActivity({
                packageName: "com.android.settings",
                className: "com.android.settings.Settings$AppDrawOverlaySettingsActivity",
                data: "package:" + auto.service.getPackageName().toString()
            });
        } else {
            toastLog('请先打开无障碍');
        }
    };
});


ui.mofang.on("click", () => {
    datamofang = ui.mofang.isChecked()
    datazidingyi = !ui.zidingyi.isChecked()
    ui.mofang.setChecked(datamofang)
    ui.zidingyi.setChecked(datazidingyi)
});
ui.zidingyi.on("click", () => {
    datamofang = !ui.mofang.isChecked()
    datazidingyi = ui.zidingyi.isChecked()
    ui.mofang.setChecked(datamofang)
    ui.zidingyi.setChecked(datazidingyi)
});


var storage = storages.create("点赞");
for (i = 0; i < 1; i++) {
    var content = storage.get("输入框" + (i + 1));

    if (content) {
        ui["输入框" + (i + 1)].setText(content);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////


//插入网络验证
banhua_ui.mod_userSystem("c1c0h4co6itet39eprv0", "v64B98iZ7unzIHOHNFaMGNSfHMpY2He4", "用户");

//启动脚本
ui.start.click(function () {
    if (paojiaoyun.isMember) {
        goto_Room();
        start_observeKey();
        toast("点击启动")
        arr = new Array();
        for (i = 0; i < 1; i++) {
            var content = ui["输入框" + (i + 1)].getText() + "";
            storage.put("输入框" + (i + 1), content);
            arr.push(content);
        } log(arr);
        threads.start(脚本)   
    } else {
        toastLog("您还不是会员，请前往用户页面登录");
    }
});

ui.end.on('click', ()=> {
    toastLog("退出");
    ui.finish();
});



///////////////////////////函数都在下面/////////////////////////




function start_observeKey() {
    if (auto.service !== null) {
        //启用按键监听
        events.observeKey();

        //监听音量上键按下
        events.onKeyDown("volume_up", function (event) {
            toastLog("强制停止当前脚本");
            engines.myEngine().forceStop();
        });
    };
};

//跳转到指定的直播房间
function goto_Room() {
    var roomID = ui.roomID.text();
    app.startActivity({
        data: "snssdk1128://live?room_id="+ roomID
    });
};


//悬浮窗
function 脚本(){

    floatEmitter = events.emitter(threads.currentThread());
    pageView = "float_window";

    importClass(android.widget.TextView)
    threads.start(function () {
        var window = floaty.window(
            <card cardCornerRadius="30" cardElevation="0" contentPadding="5" cardBackgroundColor="#FFFFFF" alpha="0.8">
        <vertical h="auto" w="auto" id="fr" >

            <frame  h="auto" >
                <horizontal w="auto">
                    <vertical w="auto" h="40" gravity="center" layout_gravity="left|center" marginLeft="30" marginRight="30">
                        <text id="stateText" w="auto" textStyle="bold" textSize="12sp" textColor="red" gravity="center" text="未运行" ></text>
                    </vertical>

                    <vertical id="start" w="40" h="40" gravity="center" visibility="gone">
                        <img id="start_icon" tint="green" w="30" h="30" src="@drawable/ic_play_circle_filled_black_48dp"></img>
                    </vertical>

                    <vertical id="quit" w="40" h="40" gravity="center" visibility="gone">
                        <img id="quit_icon" tint="red" w="30" h="30" src="@drawable/ic_cancel_black_48dp"></img>
                    </vertical>
                </horizontal>
                <img id="action" tint="green" layout_gravity="right|center" w="30" h="30" src="@drawable/ic_redo_black_48dp"></img>
            </frame>

            <vertical id="ava"  h="auto" w="*"  visibility="gone">
                <horizontal>
                    <text text="总内存:" h="20" textColor="#000000" textSize="10" textStyle="bold"></text>
                    <text id = "TotalMem" h="20" text="" marginRight="5"  textColor="#000000"  textSize="10" textStyle="bold"></text>

                    <text text="可用内存:" h="20"  textColor="#000000"  textSize="10" textStyle="bold"></text>
                    <text id = "AvailMem" h="20" text="" marginRight="5"  textColor="#000000" textSize="10" textStyle="bold"></text>

                    <text text="剩余电量:" h="20"  textColor="#000000" textSize="10" textStyle="bold"></text>
                    <text id = "quantity" h="20" text=""  textColor="#000000" textSize="10" textStyle="bold"></text>

                </horizontal>
            </vertical>
        </vertical>
    </card>
        );

        window.setPosition(0.2*device.width, device.height - (device.height * 0.85))



        ui.run(function(){
            let myVar = setInterval(function(){
                let a =parseInt((device.getTotalMem())/(1024*1024)).toString(); //内存总量
                let u =parseInt((device.getAvailMem())/(1024*1024)).toString(); //当前可用内存
                let d = device.getBattery().toString();
                window.AvailMem.setTextColor(colors.parseColor("#000000"));

                window.TotalMem.setText(a + 'M');
                window.AvailMem.setText(u + 'M');
                window.quantity.setText(d + '%');

                if(parseInt(u) <= 400){
                    window.AvailMem.setTextColor(colors.parseColor("#FF0000"));
                    log("总内存为:"+a + 'M');
                    log('当前可用内存:'+u + 'M');
                    log("当前电量:"+d + '%');
                }

                if(parseInt(u) <= 100){
                    window.AvailMem.setTextColor(colors.parseColor("#FF0000"));
                    toastLog("内存不足警告!即将发生闪退危险!");
                    log("总内存为:"+a + 'M');
                    toastLog('当前可用内存:'+u + 'M');
                    log("当前电量:"+d + '%');
                    events.broadcast.emit("任务结束", "内存不足");
                    clearInterval(myVar);
                }
            },500)
        })

        window.stateText.on("click", () => {
            if(window.start.getVisibility() == 8 && window.quit.getVisibility() == 8){

                window.start.setVisibility(0);
                window.quit.setVisibility(0);
                window.ava.setVisibility(0);
            }else{

                window.start.setVisibility(8);
                window.quit.setVisibility(8);
                window.ava.setVisibility(8);

            }
            
        })

        //退出
        window.quit.click(function () {
            toast("程序已退出");
            engines.stopAll()
        });

        //点开始或者暂停按钮
        window.start.click(function () {
            //点开始按钮修改
            if (window.stateText.getText() == '未运行') {
                //开始运行
                update_view("image", window.start_icon, "@drawable/ic_pause_circle_filled_black_48dp");
                update_view("text", window.stateText, "运行中");
                update_view("color", window.stateText, "#000000");
                var 线程2 = threads.start(主脚本)
                线程2
            } else {
                update_view("image", window.start_icon, "@drawable/ic_play_circle_filled_black_48dp")
                update_view("text", window.stateText, "未运行");
                update_view("color", window.stateText, "#000000");
                if (线程2 && 线程2.isAlive()) {
                    线程2.interrupt();
                }

            }
        });

        //更新视图
        function update_view(type, id, str) {
            ui.run(function () {
                if (type == "text") {
                    id.setText(str);
                }
                if (type == "image") {
                    id.setSource(str);
                }
                if (type == "color") {
                    id.setTextColor(colors.parseColor(str));
                }
            });
        }

    try{
        floatEmitter.on("stop", function(s){
            if(s){
                ui.run(function(){
                    log("状态改为待机");
                    update_view("image", window.start_icon, "@drawable/ic_play_circle_filled_black_48dp")
                    update_view("text", window.stateText, "任务结束");
                    update_view("color", window.stateText, "#FF0000");
                    线程2.getEngine().forceStop();
                })
            }
        })
    }
    catch(e){
        log("线程通讯出错"+e)
    }


    
    });
}


function suijidanmu() {
    mainThread.interrupt();
    var target = text("说点什么...").visibleToUser(true).findOne().bounds();
    if (target != null) {
    click(target.centerX(), target.centerY())
    }

    sleep(3000)
      setText(content[random(0, content.length-1)]);
    sleep(3000)

    
    var target = desc("发送").visibleToUser(true).findOne().bounds();
     if (target != null) {
        click(target.centerX(), target.centerY())
        sleep(1000)
       }
}

function mofangdanmu() {
    var jihe = [];
    var uc = textMatches(".+：.+").visibleToUser().find();
    var a = uc[2].text();
    str1 = a;
    jihe.push(str1);//加入数组
    dm=str1.split('：')[1]
    
    var target = text("说点什么...").visibleToUser(true).findOne().bounds();
    if (target != null) {
        click(target.centerX(), target.centerY());
    }

    sleep(3000)
    setText(dm)
    sleep(3000)

    var target = desc("发送").visibleToUser(true).findOne().bounds();
    if (target != null) {
        click(target.centerX(), target.centerY())
        sleep(1000)
    }
}


function 主脚本() {
    var X1 = device.height / 3.5
    var Y1 = device.width / 7
    var dzcishu = ui.输入框2.getText()
    var yxshijian = ui.provide_runtime.getText()
    var huashuArray = storage.get("huashu_array");


    threads.start(function(){
        sleep(60 * 1000 * parseInt(yxshijian));
        back();
        sleep(500)
        back();
        sleep(100)
        back();
        sleep(100)
        back();
        sleep(3000)
        back();
        sleep(100)
        
        vlog("运行已到达指定时间，程序已退出");
        try{
            f.emit("stop",true);
        }catch(e){
            log("停止出错"+e);
        }
        exit();
    });

    sleep(2000);



    let mainThread = threads.start(function(){
        主脚本();
    });

    let message = threads.start(function(){
    while (true) {
        mainThread.interrupt();
    for (var i = 0; i < dzcishu; i++) {
        mainThread.interrupt();
        setScreenMetrics(1080, 1920);
        var 分割 = String(ui.输入框1.getText()).split("-")
        var 速度 = random(Number(分割[0]), Number(分割[1]))
        var 随机1 = random(X1 - 50, X1 + 50)
        var 随机2 = random(Y1 - 50, Y1 + 50)
        click(随机2, 随机1)
        sleep(速度)
    }
        if(datamofang){

            var jihe = [];
            var uc = textMatches(".+：.+").visibleToUser().find();
            var jscad = uc[2].text();
            str1 = jscad;
            jihe.push(str1);//加入数组
            dm = str1.split('：')[1]

            var target = text("说点什么...").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
            }

            sleep(random(2000,3000))
            setText(dm)
            sleep(random(2000,3000))

            var target = desc("发送").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
                sleep(1000)
            }
        }
        
        if(datazidingyi){

            mainThread.interrupt();
            var target = text("说点什么...").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
            }

            sleep(random(2000,3000))
            setText(huashuArray[random(1, 6)]);
            sleep(random(2000,3000))


            var target = desc("发送").visibleToUser(true).findOne().bounds();
            if (target != null) {
                click(target.centerX(), target.centerY())
                sleep(1000)
            }
        }
     
    
        sleep(3000);
        mainThread = threads.start(function(){
            主脚本();
        });
    
    }

  });
}
