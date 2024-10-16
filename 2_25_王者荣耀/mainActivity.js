importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);
importClass(android.view.View);

//这里的项目自己进行配置
bh.主题颜色 = "#FFC0CB";
bh.标题 = "黄金矿工";
bh.副标题 = "解放各位的双手！！！";
bh.公告 = "建议每天2～3小时 毕竟是辅助 不要狂刷。\n可以刷1小时自己玩一会排位或者匹配\n私聊都是骗子！！！\n记得进售后群！！！\n2.1 音量键暂停\n2.7修复个别机型无法使用\n3.1优化冒险模式‘跳过’ 节省5～10秒\n3.6增加六道 武道 秒换装\n3.7优化六国 秒换装（内部测试，等通知使用）\n适配大部分分辨率，如果有不能运行的私聊\n公告更新一下：3.15正式上线秒换装 ";
bh.pjy = true;
bh.悬浮窗 = false;

//加载UI框架
bh.drawUiFrame();

//添加公告卡片
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

//添加设置权限卡片
bh.addUiContent(
    <frame>
        <vertical>
            <text gravity='center' text='权限服务' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
            <Switch id='autoService' text='*无障碍服务' padding='8dp' textSize='15sp' checked='{{auto.service != null}}'></Switch>
            <Switch id='windowService' text='悬浮窗服务' padding='8dp' textSize='15sp'></Switch>
            <Switch id='rootService' text='Root服务' padding='8dp' textSize='15sp' checked='{{bh.isSuEnable()}}'></Switch>
            <Switch id='deBugService' text='调试服务' padding='8dp' textSize='15sp'></Switch>
        </vertical>
    </frame>, "setTing"
);

//如果泡椒云开启，就添加会员卡片
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
        </frame>, "setTing"
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

//添加手机设置卡片
bh.addUiContent(
    <frame>
        <vertical>
            <text gravity='center' text='手机配置' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
            <text id='deviceConfig' padding='8dp' text='{{bh.getDeviceConfig()}}'></text>
        </vertical>
    </frame>, "setTing"
);

//最后再添加脚本内容卡片
bh.addUiContent(
    <vertical>
        <text gravity='center' text='脚本功能' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{bh.主题颜色}}'></text>
        <vertical padding='8dp'>
            <horizontal>
                <text text='模式：'></text>
                <spinner w='*' id='bh_zhuxian' entries='冒险|武道大会|六国征战(开发中)|名字秒换装（虐泉水5秒）'></spinner>
            </horizontal>
            <horizontal>
                <text text='运行时间：'></text>
                <input w='*' inputType="number" id='bh_yunxing' hint='运行多少分钟结束60'></input>
            </horizontal>
            <horizontal>
                <text text='采集坐标：'></text>
                <input id='bh_zb' layout_weight='1' hint='坐标点数据' ellipsize='end' scrollHorizontally='true' singleLine='true'></input>
                <button id='caiji' style='Widget.AppCompat.Button.Borderless' textColor='red' w='auto' text='采集'></button>
            </horizontal>
        </vertical>
    </vertical>, "home"
);

//开始读取并设置UI内容
bh.getUiConfig(bh.getXmlOfId(bh.home));
bh.getUiConfig(bh.getXmlOfId(bh.setTing));

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
    toastLog("欢迎回来！");
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
});

ui.caiji.on('click', ()=> {
    toastLog("开始采集坐标")
    threads.start(function(){
        坐标采集();
    });
})

//监听开始事件
ui.fab.on('click', ()=> {
    
    //保存控件信息
    bh.putUiConfig(bh.getXmlOfId(bh.home));
    bh.putUiConfig(bh.getXmlOfId(bh.setTing));

    if (bh.scriptTh == null || !bh.scriptTh.isAlive()) {
        //开始判断需要会员吗
        if (bh.pjy) {
            if (pjyUser.code == 0) {
                log("尊敬的会员用户，欢迎您！");
                bh.runScript();
            } else {
                // log("失败~请使用卡密激活此软件！");
                toastLog(pjyUser.message);
            }
        } else {
            //不需要网络验证
            bh.runScript();
        }
    } else {
        toastLog("哎呀，疼~");
    }
});

//监听退出事件
ui.fab2.on('click', ()=> {
    toastLog("退出软件");
    ui.finish();
});




function 坐标采集 () {
    let coorArr = [];
    try {
        runControl();
        auto.waitFor();
        toasts("按下 音量- 可以切换");
        events.observeKey();
        events.on("key", function(k, e) {
            let ek = k * 10 + e.getAction();
            switch (ek) {
                case 30:
                    log("menu down");
                    break

                case 31:
                    log("menu up");
                    break

                case 40:
                    log("back down");
                    break

                case 41:
                    log("back up");
                    break

                case 240:
                    log("volume_up down");
                    coorArr = coorArr.toString();
                    coorArr = coorArr.replace(/,/g, "-");
                    bh.storage.put("bh_zb", coorArr);
                    log(coorArr);
                    //音量键上
                    break

                case 241:
                    log("volume_up up");
                    break

                case 250:
                    // log("volume_down down");
                    event.emit("touchable");
                    break

                case 251:
                    log("volume_down up");
                    break

                case 820:
                    log("menu down");
                    break

                case 821:
                    log("menu up");
                    break
            }
            ek = 0;
        });

        var event = events.emitter();
        event.on("touchable", function() {
                touchable_state = !touchable_state;
                x.setTouchable(touchable_state);
                if (touchable_state) {
                    toasts("禁止 触摸屏幕");
                } else {
                    toasts("允许 触摸屏幕");
                }
        });

        var x = floaty.rawWindow(
            <frame id="but" bg="#00000000"/>
        ),
        touchable_state = false;
        x.setSize(-1, -1);
        x.setTouchable(touchable_state);
        x.but.setOnTouchListener(function(v, e) {
            switch (e.getAction()) {
                case e.ACTION_DOWN:
                    toasts(e.getRawX().toFixed(0) + " , " + e.getRawY().toFixed(0));
                    break

                case e.ACTION_MOVE:
                    toasts(e.getRawX().toFixed(0) + " , " +  e.getRawY().toFixed(0));
                    break

                case e.ACTION_UP:
                    log("弹起");
                    coorArr.push(e.getRawX().toFixed(0) + "|" + e.getRawY().toFixed(0));
                    toasts(e.getRawX().toFixed(0) + " , " + e.getRawY().toFixed(0));
                    device.vibrate(500);
                    break;
            }
            return true;
        });

    } catch (e) {
        log(e);
    }
    // 脚本引擎运行控制函数
    // runControl(true) 重新启动本脚本
    // runControl(false) 保留本脚本已经在运行的脚本引擎，停止本次脚本引擎运行
    // runControl() 若本脚本已经在运行，则停止本脚本所有正在运行的脚本引擎
    function runControl(stop) {
        let arr = engines.all(),
            me = engines.myEngine(),
            run = true;
        for (i in arr) {
            if (arr[i].getSource().toString() == me.getSource().toString() && arr[i] != me) {
                if (stop != false) arr[i].forceStop();
                run = stop == true;
            }
        }
        if (!run) exit();
    }


    // toast通知代替函数
    function toasts(text, time) {
        text = text || null;
        time = time || 5000;
        if (isNaN(time)) return;
        let arr = engines.all(),
            run = false;
        for (i in arr) {
            if (files.getName(arr[i].getSource()) == "toast.js") {
                run = true;
                break;
            }
        }
        if (!run) {
            let tex = "var t = toasts();\nevents.broadcast.on(\"toast\", (arr) => {\nif (arr.length != 2) return;\nlet time = new Number(arr[1][1]),text = arr[1][0];\nif(isNaN(time)) time = 5000;\nif(!text) return;\nt(text, time);});\nsetInterval(() => {}, 10000);\nfunction toasts() {\nvar th = \"\",Y = device.width / 4,X = Y,x = Y * 2;\nvar flo = floaty.rawWindow(\n<frame gravity=\"center\" bg=\"#00000000\">\n<text id=\"message\"  bg=\"#70000000\" textColor=\"#ffffff\" textSize=\"15sp\" gravity=\"center\" w=\"auto\" padding=\"1\"/>\n</frame>);\nflo.setTouchable(false);\nflo.setSize(0, 0);\nreturn doflo;\nfunction doflo(mes, time) {\nmes = \" \" + mes.toString().split(\"\\n\").join(\" \\n \") + \" \";\nif (th != \"\") {\nth.interrupt();\nth = \"\";}\nui.run(function() {\nflo.message.setText(mes);});\nflo.setPosition(X, Y);\nflo.setSize(x, -2);\nth = threads.start(function() {\nsleep(time);\nui.run(function() {\nflo.message.setText(\"\");});\nflo.setSize(0, 0);\nth = \"\";});}}";
            engines.execScript("toast", tex);
            sleep(500);
        }
    // log(text);
        events.broadcast.emit("toast", [
            [engines.myEngine(), [text, time]]
        ]);
    }
}