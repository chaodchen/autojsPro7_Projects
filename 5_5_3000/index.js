"ui";

/**
 * 获取悬浮窗权限那边有点问题，第二次点击会报错，如有需要请自行修改。
 */


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>AJ网络科技：班花模板-v0.8.2>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>班花喜欢粉色，还有白色，还有橄榄绿色>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>淘宝搜索：AJ网络科技>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>招店铺运营一名，提成10%>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>招店铺售前客服一名，提成10%(已有)>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>招店软件、游戏脚本、协议开发、反编译技术，提成70%>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>联系QQ：934082222>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>相比与给客户实现需求，我更倾向于造轮子这种事情>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>脚本重要参数配置>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


颜色 = '#EEB4B4'
标题 = '西瓜视频脚本'
开发者id = 'admin'
公告 = '欢迎使用西瓜视频脚本'
卡密系统 = false
//开发者后台user.8-0000.com/

//可留空
函数库路径 = ''

//本地储存 = storages.create(代号)
UI配置 = 本地储存.get('UI配置') || {}

编辑框控件组 = [
    [{text:'栏目：'}, {}],
    [{text:'下滑次数：'}, {}],
    [{text:'屏幕亮度：'}, {}]
]

多选框控件组 = [

]

单选框控件组 = [

]

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>脚本初始化>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


console.setGlobalLogConfig({
    "file": 配置.日志
});



auto = {
    code: 10002,
    intent: function() {
        let intent = new Intent("android.settings.ACCESSIBILITY_SETTINGS");
        activity.startActivityForResult(intent, 10002);
    },
    check: function() {
        return context.getSystemService(android.content.Context.ACCESSIBILITY_SERVICE).isEnabled();
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>自动登录>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if (卡密系统) {
    设备id = md5(device.getIMEI()+device.getAndroidId())
    console.info('当前设备id：%s', 设备id)
    //开始登录，
    登录返回值 = 登录(设备id, '888888', 开发者id)
    console.info('登录返回值：')
    console.info(登录返回值)
    if (登录返回值.code == -1) {
        console.log('登录失败')
        if (登录返回值.msg.indexOf('用户不存在') > -1) {
            log('用户不存在')
            注册返回值 = 注册(设备id, '888888', 开发者id)
            console.info(注册返回值)
            if (注册返回值.code == 1) {
                登录返回值 = 登录(设备id, '888888', 开发者id)
            } else {
                toastLog('注册失败：')
                exit()
            }
        } else {
            toastLog('错误！')
        }
    } else {
        console.log('登录成功')
    }

    会员到期时间 = 登录返回值.kami_end_time
    会员状态 = bjTime(会员到期时间)
    if (会员状态) {
        会员颜色 = '#FF0000'
    } else {
        会员颜色 = '#000000'
    }
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>完善UI控件组>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

编辑框控件组.map(function(编辑框,i){
    编辑框[1].id = 编辑框[1].id || 'input_'+i
    编辑框[1].hint = 编辑框[1].hint || ''
    编辑框[1].textSize = 编辑框[1].textSize || '16sp'
    编辑框[1].inputType = 编辑框[1].inputType || 'text'
    if (UI配置.input != null) {
        编辑框[1].text = UI配置.input[i] || ''
    } else {
        编辑框[1].text = ''
    }
})

多选框控件组.map(function(多选框, i){
    多选框.id = 多选框.id || 'checkbox_'+i
    if (UI配置.checkbox != null) {
        多选框.checked = UI配置.checkbox[i]
    } else {
        多选框.checked = false
    }
})

单选框控件组.map(function(单选框, i){
    单选框.id = 单选框.id || 'radio'+i
    if (UI配置.radio != null) {
        单选框.checked = UI配置.radio[i]
    } else {
        单选框.checked = false
    }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UI界面绘制>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg="{{颜色}}">
                <toolbar id="toolbar" title="{{标题}}"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                    <vertical>
                        <ScrollView>
                            <vertical id='v_0'>

                            </vertical>
                        </ScrollView>
                    </vertical>
                </frame>
                    <vertical>
                        <ScrollView>
                            <vertical id='v_1'>

                            </vertical>
                        </ScrollView>
                    </vertical>
                <frame>
                    <vertical>
                        <ScrollView>
                            <vertical id='v_2'>

                            </vertical>
                        </ScrollView>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
        <vertical id='v_3' layout_gravity="left" bg="#ffffff" w="280">

        </vertical>
    </drawer>
);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UI界面初始化>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//设置状态栏颜色
ui.statusBarColor(颜色)

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("开始");
    menu.add("日志");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "开始":
            开始线程 = threads.start(function(){
                开始()
            })
            break;
        case "日志":
            threads.start(function(){
                日志()
            })
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

// //设置滑动页面的标题
// ui.viewpager.setTitles(["首页", "配置", "我的"]);
// //让滑动页面和标签栏联动
// ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>渲染首页>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <horizontal bg='#ffffff' margin='5dp' weightSum="2">
                <Switch layout_weight='1' id="auto" text="无障碍服务" checked="{{auto.check()}}" padding="8 8 8 8" textSize="15sp"/>
                <Switch layout_weight='1' id="window" text="悬浮窗服务" padding="8 8 8 8" textSize="15sp"/>
            </horizontal>
        </card>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <vertical padding='5dp'>
                <text text='{{公告}}' layout_gravity="center"></text>
            </vertical>
        </card>
    </vertical>,ui.v_0,true
)

// //当用户回到本界面时，resume事件会被触发
// ui.emitter.on("resume", function () {
//     // 此时根据无障碍服务的开启情况，同步开关的状态
//     ui.autoService.checked = auto.check();
//     //ui.windowService.checked = floaty.checkPermission()
// })

//用户勾选无障碍服务的选项时，跳转到页面让用户去开启
ui.auto.on("check", function(checked) {
    if (!auto.check()) {
        auto.intent();
        ui.auto.checked = false;
    } else {
        ui.auto.checked = true;
    };
});

//悬浮窗按钮单击事件
ui.window.on("check", function(checked){
    if (checked) {
        log('开')
        log('打开悬浮窗权限')
        var intent = new Intent();
        intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION")
        app.startActivity(intent);
        toast('选择此软件')
    } else {
        log('关')
    }
});

//界面从intent回到前台
activity.getEventEmitter().on("activity_result", (requestCode, resultCode, data) => {
    switch (requestCode) {
        case auto.code:
            if (auto.check()) {
                toastLog("开启了无障碍服务");
                ui.auto.checked = true;
            } else {
                toastLog("无障碍服务未开启");
                ui.auto.checked = false;
            };
            break;
    }
})


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>渲染配置界面>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if (编辑框控件组.length > 0) {
    ui.inflate(
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <vertical id='card_1_0'>

            </vertical>
        </card>,ui.v_1,true
    )
    log('编辑框控件组-->>  '+编辑框控件组)

    for (v in 编辑框控件组) {
        编辑框控件 = 编辑框控件组[v]
        //log('编辑框控件-->>  '+编辑框控件)
        log(编辑框控件[1].hint)
        
        ui.inflate(
            <horizontal padding='5dp'>
                <text text='{{编辑框控件[0].text}}'></text>
                <input w='*' text='{{编辑框控件[1].text}}' inputType='{{编辑框控件[1].inputType}}' id='{{编辑框控件[1].id}}' hint='{{编辑框控件[1].hint}}' textSize='{{编辑框控件[1].textSize}}'></input>
            </horizontal>, ui.card_1_0, true
        )
    }

}

if (多选框控件组.length > 0) {
    ui.inflate(
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <vertical id='card_1_1'>

            </vertical>
        </card>,ui.v_1,true
    )
    多选框控件组.forEach((多选框控件, i) => {
        this.多选框控件 = 多选框控件

        ui.inflate(
            <horizontal>
                <checkbox checked='{{多选框控件.checked}}' text='{{多选框控件.text}}' id='{{多选框控件.id}}'></checkbox>
            </horizontal>, ui.card_1_1, true
        )
    })
}

if (单选框控件组.length > 0) {
    ui.inflate(
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <radiogroup id='card_1_2'>

            </radiogroup>
        </card>,ui.v_1,true
    )
    单选框控件组.forEach((单选框控件, i) => {
        this.单选框控件 = 单选框控件

        ui.inflate(
                <radio checked='{{单选框控件.checked}}' text='{{单选框控件.text}}' id='{{单选框控件.id}}'></radio>
                , ui.card_1_2, true
        )
    })
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>渲染我的界面>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ui.inflate(
    <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
        <vertical id='card_2_0'>

        </vertical>
    </card>,ui.v_2,true
)
if (卡密系统) {
    
    ui.inflate(
        <vertical padding='5dp'>
            <vertical padding='5dp'>
                <text text='设备ID：'></text>
                <text text='{{this.设备id}}' textColor='#000000'></text>
                <text w='*' h='2dp' bg='#b2b2b2'></text>
            </vertical>
            <vertical padding='5dp'>
                <text text='会员到期时间：'></text>
                <text text='{{this.会员到期时间}}' id='vipTime' textColor='{{this.会员颜色}}'></text>
                <text w='*' h='2dp' bg='#b2b2b2'></text>
            </vertical>
            <horizontal padding='10dp'>
                <button id='激活' w='*' bg='{{this.颜色}}' text='充 值' textColor='#ffffff'></button>
            </horizontal>
        </vertical>, ui.card_2_0, true
    )
    
    ui.激活.on('click', ()=> {
        threads.start(function(){
            激活()
        })
    })

    //设置滑动页面的标题
    ui.viewpager.setTitles(["首页", "配置", "我的"]);
    //让滑动页面和标签栏联动
    ui.tabs.setupWithViewPager(ui.viewpager);
} else {
    
    ui.inflate(
        <vertical padding='5dp'>
            <horizontal padding='5dp'>
                <text text='本软件由JavaScript脚本语言开发，仅供测试，大家不要拿来干坏事哦！！！'></text>
            </horizontal>
        </vertical>, ui.card_2_0, true
    )
    //设置滑动页面的标题
    ui.viewpager.setTitles(["首页", "配置", "其他"]);
    //让滑动页面和标签栏联动
    ui.tabs.setupWithViewPager(ui.viewpager);
}


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>渲染侧滑界面>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ui.inflate(
    <vertical h='*' bg='#000000'>
        <com.stardust.autojs.core.console.ConsoleView id="console" h="*"/>
    </vertical>, ui.v_3, true
)
ui.console.setConsole(runtime.console);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function 开始 () {
    if (编辑框控件组.length > 0) {
        UI配置.input = []
        编辑框控件组.forEach((编辑框, i) => {
            UI配置.input.push(ui[编辑框[1].id].text())
        })
    }

    if (多选框控件组.length > 0) {
        UI配置.checkbox = []
        多选框控件组.forEach((多选框) => {
            UI配置.checkbox.push(ui[多选框.id].isChecked())
        })
    }

    if (单选框控件组.length > 0) {
        UI配置.radio = []
        单选框控件组.forEach((单选框) => {
            UI配置.radio.push(ui[单选框.id].isChecked())
        })
    }


    本地储存.put('UI配置', UI配置)
    if (卡密系统) {
        if (会员状态) {
            new Function('', getCloudFiles(配置.路径+'script.js', 配置.密钥, 配置.账号))()
        } else {
            toastLog('您还不是会员用户')
        }
    } else {
        new Function('', getCloudFiles(配置.路径+'script.js', 配置.密钥, 配置.账号))()
    }

}

function 日志 () {
    setClip(files.read(配置.日志) || '')
    toastLog('复制成功')
}

function 激活 () {
    dialogs.rawInput('请输入激活码', '', (卡密) => {
        if (卡密) {
            激活返回 = 充值(设备id, '888888', 开发者id, 卡密)
            alert(激活返回.msg+激活返回.time)
        } else {
            toastLog('请输入卡密')
        }
    })

    登录返回值 = 登录(设备id, '888888', 开发者id)
    
    会员到期时间 = 登录返回值.kami_end_time

    ui.vipTime.setText(会员到期时间)
}
