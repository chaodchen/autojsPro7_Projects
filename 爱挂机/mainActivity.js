//开始定义局部变量
importClass(android.provider.Settings);
importClass(android.content.Intent);
importClass(android.net.Uri);
let color = "#FFC0CB",title = "爱挂机";
let pjysdk = new PJYSDK("bvpb6pso6itf6809nh0g", "92Uvn3hYLZSu6CuEX3y15sHbrqudBTG4");
pjysdk._protocol = "https";
pjysdk.debug = true;
let scriptListData = JSON.parse(Config.s_scripts);
//读取卡密内容
let kami = null,pjy = null;

//登陆线程
this.getExpirationTime = function () {
    kami = Config.o_storage.get("kami"),pjy = null;

    let getTime = threads.start(function(){
        if (!kami) {
            //卡密不存在
            //开启试用登陆
            pjy = pjysdk.TrialLogin();
        } else {
            //卡密存在
            pjysdk.SetCard(kami);
            pjy = pjysdk.CardLogin();
        }
        log("登陆返回【%s】", JSON.stringify(pjy));
    });
    while(getTime.isAlive());
    if (pjy.code == 0) {
        return pjy.result.expires;
    } else {
        return pjy.message;
    }
}

//我的列表数据
let myListData = [
    {
        icon : "@drawable/ic_phone_iphone_black_48dp",
        name : "设备号码：",
        content : pjysdk.getDeviceID()
    },
    {
        icon : "@drawable/ic_security_black_48dp",
        name : "我的卡密：",
        content : Config.o_storage.get("kami") || "点击设置卡密！"
    },
    {
        icon : "@drawable/ic_alarm_black_48dp",
        name : "剩余时间：",
        content : getExpirationTime()
    },
];
let menuListData = [
    {
        title: "联系作者",
        icon: "@drawable/ic_person_add_black_48dp"
    },
    {
        title: "加入Q群",
        icon: "@drawable/ic_supervisor_account_black_48dp"
    },
    {
        title: "分享软件",
        icon: "@drawable/ic_share_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]

//绘制首页
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg="{{color}}">
                <toolbar subtitle="解放的你双手！" id="toolbar" title="{{title}}"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <scroll>
                        <vertical id='script'></vertical>
                    </scroll>
                </frame>
                <frame id='home'>
                    <webview id='webview' margin="5dp"></webview>
                </frame>
                <frame id='my'></frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);
//设置状态栏颜色
ui.statusBarColor(color);

//载入论坛
ui.webview.loadUrl("http://bbs.8888-8.cn");

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["脚本", "HOME", "我的"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

//设置侧边列表数据
ui.menu.setDataSource(menuListData);

//加载首页
ui.inflate(
    <card h='auto' w='*' cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5dp'>
        <vertical>
            <Switch id='autoService' text='无障碍权限' padding='8 8 8 8' textSize='15sp' checked='{{auto.service != null}}' ></Switch>
            <Switch id='windowService' text='悬浮窗权限' padding='8 8 8 8' textSize='15sp'></Switch>
            <Switch id='deBugService' text='调试服务' padding='8 8 8 8' textSize='15sp'></Switch>
        </vertical>
    </card>, ui.script, true
);

//绑定悬浮窗权限单机事件
ui.windowService.on('click', () => {
    var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
        Uri.parse("package:" + context.getPackageName()));
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        app.startActivity(intent);
});

//绑定调试服务单机事件
ui.deBugService.on('click', ()=> {
    if (ui.deBugService.isChecked()) {
        toastLog('开启调试模式');
        console.show();
    } else {
        toastLog('关闭调试模式');
        console.hide();
    }
});

//绑定无障碍服务单机事件
ui.autoService.on('click', () => {
    ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
});

//回到本界面时，触发resume事件
ui.emitter.on('resume', ()=> {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);

});

//加载脚本列表
ui.inflate(
    <card h='auto' w='*' cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5dp'>
        <list id='scriptList' w='*'>
            <vertical w='*' padding='5dp'>
                <horizontal w='*'>
                    <vertical padding='10dp'>
                        <img w='50dp' h='50dp' scaleType="centerCrop" src="{{this.icon}}"></img>
                    </vertical>
                    <vertical w='*'>
                        <text text="{{this.name}}" textSize="18sp" textStyle="bold" textColor="#000000"></text>
                        <text text="{{this.desc}}" textSize="15sp"></text>
                        <text visibility="gone" text="{{this.path}}"></text>
                    </vertical>
                </horizontal>
                <text w='*' margin='10 0 10 0' h='2dp' bg='{{color}}'></text>
            </vertical>
        </list>
    </card>, ui.script, true
);ui.scriptList.setDataSource(scriptListData);

//加载首页脚本
ui.scriptList.on("item_click", item => {
    threads.start(function(){
        let s_scriptFile = Config.f_getJgyFile(Config.s_jgyUser, Config.s_jgyKey, item.path);
        if (s_scriptFile) {
            toastLog("获取脚本成功！");
            engines.execScript(item.path.replace(/\//g, ""), s_scriptFile);
        } else {
            toastLog("获取脚本失败！");
        }
    });
});

//加载我的
ui.inflate(
    <card h='auto' w='*' cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5dp'>
        <list w='*' id='myList'>
            <vertical w='*' padding='5dp'>
                <horizontal w='*' margin='5dp'>
                    <img layout_gravity="center_vertical" tint='{{color}}' src="{{this.icon}}" w='25dp' h='25dp'></img>
                    <text margin="5 0 0 0" textSize='16sp' textColor='#000000' layout_gravity="center_vertical" text="{{this.name}}" ></text>
                    <text layout_gravity="center_vertical" text="{{this.content}}"></text>
                </horizontal>
            </vertical>
        </list>
    </card>, ui.my, true
);ui.myList.setDataSource(myListData);

//设置我的列表点击事件
ui.myList.on("item_click", item => {
    switch(item.name){
        case "设备号码：":
            toastLog("设备号码！");
            myListData[0].content = pjysdk.getDeviceID();
            break;
        case "我的卡密：":
            let kami = rawInput("请输入卡密");
            if (kami.length == 20) {
                Config.o_storage.put("kami", kami);
                myListData[1].content = kami;
                myListData[2].content = getExpirationTime();
                ui.myList.setDataSource(myListData);
            } else {toastLog("卡密格式不正确")}
            break;
        case "剩余时间：":
            toastLog("剩余时间！");
            myListData[2].content = getExpirationTime();
            ui.myList.setDataSource(myListData);
            break;
    }
});

//设置抽屉栏点击事件
ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
            ui.finish();
            break;
        case "联系作者":
            (function(){
                app.startActivity({
                    action: "android.intent.action.VIEW",
                    data: "mqqapi://card/show_pslcard?src_type=internal&source=sharecard&version=1&uin=1947180472",
                });
            })();
            break;
        case "加入Q群":
            (function(){
                _qun = "27521835";
                app.startActivity({ 
                    data: "mqqapi://card/show_pslcard?card_type=group&uin="+_qun
                });
                app.startActivity({
                    action: "android.intent.action.VIEW",
                    data: "mqqwpa://im/chat?chat_type=group&version=1&src_type=web&uin="+_qun ,
                    packageName: "com.tencent.mobileqq",
                });
            })();
            break;
        case "分享软件":
            (function(){
                app.startActivity({
                    action: "android.intent.action.SEND",
                    type: "text/*",
                    extras: {
                      "android.intent.extra.TEXT": "[QQ红包]恭喜发财\n欢迎使用【爱挂机】APP，想要体验睡后收入吗？赶紧加群27521835下载吧，全面支持所有安卓手机。"
                    },
                    packageName: "com.tencent.mobileqq",
                    className: "com.tencent.mobileqq.activity.JumpActivity"
                });
            })();
            break;
    }
});


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

