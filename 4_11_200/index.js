"ui";

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>脚本重要参数配置>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
颜色 = '#EEB4B4'
标题 = '连信脚本'
代号 = 配置.代号
开发者id = 'admin'
日志路径 = '/sdcard/'+代号+'_rizhi.txt'
公告 = '大家好，欢迎使用AutoJs Pro7模板'
//开发者后台user.8-0000.com/deve/login.php

本地储存 = storages.create(代号)
UI配置 = 本地储存.get('UI配置') || {}

编辑框控件组 = [
    [{
        text:'操作延迟：'
    }, {textSize:'16sp'}],

]

多选框控件组 = [

]


单选框控件组 = [

]

下拉菜单控件组 = [

]

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>脚本初始化>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

console.setGlobalLogConfig({
    "file": 日志路径
});

mods = require('mods.js')
设备id = mods.tool.md5(device.getIMEI()+device.getAndroidId())
//设备id = 'asdaslkdasd0asd8as09809808sa0d98asd8as'
//设备id = device.getIMEI()
console.info('当前设备id：%s', 设备id)
//开始登录，
登录返回值 = mods.internet.登录(设备id, '888888', 开发者id)
console.info('登录返回值：')
console.info(登录返回值)
if (登录返回值.code == -1) {
    console.log('登录失败')
    if (登录返回值.msg.indexOf('用户不存在') > -1) {
        log('用户不存在')
        注册返回值 = mods.internet.注册(设备id, '888888', 开发者id)
        console.info(注册返回值)
        if (注册返回值.code == 1) {
            登录返回值 = mods.internet.登录(设备id, '888888', 开发者id)
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
会员状态 = mods.tool.bjTime(会员到期时间)
if (会员状态) {
    会员颜色 = '#FF0000'
} else {
    会员颜色 = '#000000'
}

编辑框控件组.map(function(编辑框,i){
    编辑框[1].id = 编辑框.id || 'input_'+i
    编辑框[1].hint = 编辑框.hint || ''
    编辑框[1].textSize = 编辑框.textSize || '16sp'
    if (UI配置.index != null) {
        编辑框[1].text = UI配置.index[i] || ''
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
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{颜色}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>UI界面初始化>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//设置状态栏颜色
ui.statusBarColor(颜色)

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("开始");
    menu.add("关于");
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

//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "配置", "我的"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "选项一",
      icon: "@drawable/ic_android_black_48dp"
  },
  {
      title: "选项二",
      icon: "@drawable/ic_settings_black_48dp"
  },
  {
      title: "选项三",
      icon: "@drawable/ic_favorite_black_48dp"
  },
  {
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);

ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
            ui.finish();
            break;
    }
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>渲染首页>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <horizontal bg='#ffffff' margin='5dp' weightSum="2">
                <Switch layout_weight='1' id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                <Switch layout_weight='1' id="windowService" text="悬浮窗服务" checked="{{floaty.checkPermission()}}" padding="8 8 8 8"textSize="15sp"/>
            </horizontal>
        </card>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
            <vertical padding='5dp'>
                <text text='{{公告}}' layout_gravity="center"></text>
            </vertical>
        </card>
    </vertical>,ui.v_0,true
)

//当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
    ui.windowService.checked = floaty.checkPermission()
})

//用户勾选无障碍服务的选项时，跳转到页面让用户去开启
ui.autoService.on("check", (checked) => {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
})

//悬浮窗按钮单击事件
ui.windowService.on('check', (checked) => {
    if (checked && !floaty.checkPermission() && device.sdkInt > 23) {
        log('打开悬浮窗权限')
        var intent = new Intent();
        intent.setAction("android.settings.action.MANAGE_OVERLAY_PERMISSION")
        app.startActivity(intent);
        toast('选择此软件')
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
    编辑框控件组.forEach((编辑框控件, i) => {
        this.编辑框控件 = 编辑框控件
        ui.inflate(
            <horizontal padding='5dp'>
                <text text='{{编辑框控件[0].text}}'></text>
                <input w='*' text='{{编辑框控件[1].text}}' id='{{编辑框控件[1].id}}' hint='{{编辑框控件[1].hint}}' textSize='{{编辑框控件[1].textSize}}'></input>
            </horizontal>, ui.card_1_0, true
        )
    })
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

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>渲染我的界面>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

ui.inflate(
    <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
        <vertical id='card_2_0'>

        </vertical>
    </card>,ui.v_2,true
)

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
            <button id='充值' w='*' bg='{{this.颜色}}' text='充 值' textColor='#ffffff'></button>
        </horizontal>
    </vertical>, ui.card_2_0, true
)

ui.充值.on('click', ()=> {
    threads.start(function(){
        充值()
    })
})

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function 开始 () {
    UI配置.index = []
    编辑框控件组.forEach((编辑框, i) => {
        UI配置.index.push(ui[编辑框[1].id].text())
    })
    UI配置.checkbox = []
    多选框控件组.forEach((多选框) => {
        UI配置.checkbox.push(ui[多选框.id].isChecked())
    })
    本地储存.put('UI配置', UI配置)
    new Function('配置', mods.internet.getCloudFiles(配置.路径+'window.js', 配置.密钥))(配置)
}

function 日志 () {
    setClip(files.read(日志路径) || '')
    toastLog('复制成功')
}

function 充值 () {
    dialogs.rawInput('请输入激活码', '', (卡密) => {
        if (卡密) {
            充值返回 = mods.internet.充值(设备id, '888888', 开发者id, 卡密)
            alert(充值返回.msg+充值返回.time)
        } else {
            toastLog('请输入卡密')
        }
    })

    登录返回值 = mods.internet.登录(设备id, '888888', 开发者id)
    
    会员到期时间 = 登录返回值.kami_end_time

    ui.vipTime.setText(会员到期时间)
}