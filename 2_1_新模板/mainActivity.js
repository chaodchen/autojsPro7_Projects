importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);

//加载UI框架
bh.drawUiFrame();

bh.addUiContent(
    <frame>
        <vertical>
            {/* 脚本公告配置区域 */}
            <vertical>
                <text gravity='center' text='公告' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
                <text padding='8dp' text='{{bh.公告}}'></text>
            </vertical>
        </vertical>
    </frame>, "home"
);

if (bh.pjy) {
    pjyUser = null;
    bh.addUiContent(
        <frame>
            <vertical>
                <text gravity='center' text='用户' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
                <vertical padding='8dp'>
                    <horizontal>
                        <text text='到期时间：'></text>
                        <text id='endTime'></text>
                    </horizontal>
                    <horizontal>
                        <text text='设置卡密：'></text>
                        <input id='bh_kami' w='*'></input>
                    </horizontal>
                    <horizontal>
                        <button id='denglu' text='登陆' layout_weight='1'></button>
                        <button id='jiebang' text='解绑' layout_weight='1'></button>
                        <button id='chongzhi' text='充值' layout_weight='1'></button>
                        <button id='tuichu' text='退出' layout_weight='1'></button>
                    </horizontal>
                </vertical>
            </vertical>
        </frame>, "home"
    );

    //创建按键的点击事件
    ui.denglu.on('click', () => {
        bh.storage.put("bh_kami", ui.bh_kami.text());
        threads.start(bh.pjyLoginFun);
    });

    ui.jiebang.on('click', () => {
        threads.start(bh.pjyJiebangFun);
    });

    ui.chongzhi.on('click', ()=> {
        threads.start(bh.pjyChongzhiFun);
    });

    ui.tuichu.on('click', ()=> {
        threads.start(bh.pjyTuichuFun);
    });
    
    threads.start(bh.pjyLoginFun);

    // 监听心跳失败事件
    pjysdk.event.on("heartbeat_failed", function(hret) {
        log("心跳失败，尝试重登...")
        sleep(2000);
        let login_ret = pjysdk.CardLogin();
        if (login_ret.code == 0) {
            log("重登成功");
        } else {
            toastLog(login_ret.message);  // 重登失败
            sleep(200);
            exit();  // 退出脚本
        }
    });

    // 当脚本正常或者异常退出时会触发exit事件
    events.on("exit", function(){
        pjysdk.CardLogout(); // 调用退出登录
        log("结束运行");
    });
}

bh.addUiContent(
    <frame>
        <vertical>
            <text gravity='center' text='权限服务' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
            <Switch id='autoService' text='*无障碍服务' padding='8dp' textSize='15sp' checked='{{auto.service != null}}'></Switch>
            <Switch id='windowService' text='悬浮窗服务' padding='8dp' textSize='15sp'></Switch>
            <Switch id='rootService' text='Root服务' padding='8dp' textSize='15sp' checked='{{bh.isSuEnable()}}'></Switch>
            <Switch visibility='gone' id='deBugService' text='调试服务' padding='8dp' textSize='15sp'></Switch>
        </vertical>
    </frame>, "setTing"
);

bh.addUiContent(
    <frame>
        <vertical>
            <text gravity='center' text='手机配置' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
            <text id='deviceConfig' padding='8dp' text='{{bh.getDeviceConfig()}}'></text>
        </vertical>
    </frame>, "setTing"
);

//脚本功能在这里编辑
bh.addUiContent(
    <vertical>
        <text gravity='center' text='脚本列表' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
        <linear>
            <input layout_weight='1' hint='搜索脚本名称' id='searchContent'></input>
            <button id='search' text='搜索' style='Widget.AppCompat.Button.Borderless.Colored'></button>
        </linear>
        <list id='listView'>
            <horizontal w='*' padding='8dp'>
                <vertical padding='5dp'>
                    <img circle='true' w='45dp' h='45dp' scaleType="centerCrop" src="{{this.icon}}"></img>
                </vertical>
                <vertical w='*'>
                    <text text="{{this.title}}" textSize="18sp" textStyle="bold" textColor="#000000"></text>
                    <text text="{{this.desc}}" textSize="15sp"></text>
                    <text visibility="gone" text="{{this.path}}"></text>
                </vertical>
            </horizontal>
        </list>
    </vertical>, "home"
);ui.listView.setDataSource(bh._json.script);

ui.search.on('click', ()=> {
    toastLog("搜索");
    let text = ui.searchContent.text();
    if (text.length == 0) {
        toastLog("请输入脚本关键字");
        return;
    }
    bh.searchFun(text);
});

//开始监听脚本列表点击事件
let listScriptTh = null;
ui.listView.on("item_click", item => {
    //保存控件信息
    bh.putUiConfig(bh.getXmlOfId(bh.home));

    if (listScriptTh != null && listScriptTh.isAlive()) {
        listScriptTh.interrupt();
    }
    listScriptTh = threads.start(function(){
        //开始判断是否要开会员
        
        if (bh.pjy) {
            if (pjyUser.code == 0) {
                log("尊敬的会员用户，欢迎您！");
                let scriptFile = bh.getJgy(item.path);
                if (scriptFile.code == 0) {
                    toastLog("开始运行【"+item.title+"】")
                    eval(scriptFile.str());
                } else {
                    toastLog("获取【"+item.title+"】出错！");
                }
            } else {
                toastLog(pjyUser.message);
            }
        } else {
            //不需要网络验证
            let scriptFile = bh.getJgy(item.path);
            if (scriptFile.code == 0) {
                toastLog("开始运行【"+item.title+"】")
                eval(scriptFile.str());
            } else {
                toastLog("获取【"+item.title+"】出错！");
            }
        }
    });
});

//开始设置UI内容
bh.getUiConfig(bh.getXmlOfId(bh.home));

//无障碍服务单击事件
ui.autoService.on('click', () => {
    ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
});

//悬浮窗服务单击事件
ui.windowService.on('click', () => {
    if (ui.windowService.isChecked()) {
        log("打开悬浮窗服务");
        var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
            Uri.parse("package:" + context.getPackageName()));
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        app.startActivity(intent);
    } else {
        log("关闭悬浮窗服务");
    }
});

//Root权限单击事件
ui.rootService.on('click', () => {
    if (ui.rootService.isChecked()) {
        log("打开Root权限");
        shell("", true);
    } else {
        log("关闭Root权限");
    }
});

//调试服务单击事件
ui.deBugService.on('click', () => {
    if (ui.deBugService.isChecked()) {
        log("开启调试窗口");
        console.show();
    } else {
        log("关闭调试窗口");
        console.hide();
    }
});

//回到本界面时，触发resume事件
ui.emitter.on('resume', ()=> {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
});

//监听fab的点击事件
ui.fab.on('click', ()=> {
    //保存控件信息
    bh.putUiConfig(bh.getXmlOfId(bh.home));
    if (bh.scriptTh == null || !bh.scriptTh.isAlive()) {
        //开始判断需要会员吗
        if (bh.pjy) {
            if (pjyUser.code == 0) {
                log("尊敬的会员用户，欢迎您！");
                bh.scriptTh = threads.start(function() {
                    let script = bh.getJgy("script.js").str();
                    eval(script);
                });
            } else {
                // log("失败~请使用卡密激活此软件！");
                toastLog(pjyUser.message);
            }
        } else {
            //不需要网络验证
            bh.scriptTh = threads.start(function() {
                let script = bh.getJgy("script.js").str();
                eval(script);
            });
        }
    } else {
        toastLog("哎呀，疼~");
    }
});

ui.fab2.on('click', ()=> {
    toastLog("退出软件");
    ui.finish();
});