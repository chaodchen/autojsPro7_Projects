"ui";

配置.颜色 = '#DDC700'
配置.名称 = '#快手极速版'
配置.公告 = 'QQ：934082222'
配置.日志 = '/sdcard/'+配置.代号+'_log.txt'

//新建本地储存
var storage = storages.create(配置.代号)

//绘制UI
ui.layout(
<vertical>
    <appbar>
        <toolbar id="toolbar" title="{{this.配置.名称}}" bg='{{this.配置.颜色}}'/>
        <tabs id="tabs" bg='{{this.配置.颜色}}'/>
    </appbar>
    <viewpager id="viewpager">
        <frame>
            <vertical>
                <horizontal gravity='center_vertical'>
                    <text text='' margin='5dp' bg='{{this.配置.颜色}}' w='8dp' h='35dp'></text>
                    <text text='软件权限' textSize='16sp' textColor='{{this.配置.颜色}}'></text>
                </horizontal>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                    <vertical bg='#ffffff' margin='5dp'>
                        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                        <Switch id="windowService" text="悬浮窗服务" checked="{{floaty.checkPermission()}}" padding="8 8 8 8"textSize="15sp"/>
                    </vertical>
                </card>
                <horizontal gravity='center_vertical'>
                    <text text='' margin='5dp' bg='{{this.配置.颜色}}' w='8dp' h='35dp'></text>
                    <text text='必读公告' textSize='16sp' textColor='{{this.配置.颜色}}'></text>
                </horizontal>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                    <text padding='10dp' text='{{this.配置.公告}}'></text>
                </card>
            </vertical>
        </frame>
        <frame>
            <vertical bg='#ffffff'>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                    <vertical>
                        <horizontal>


                        </horizontal>
                        <horizontal>

                        </horizontal>
                    </vertical>
                </card>
            </vertical>
        </frame>
        <frame>
            <vertical>

            </vertical>
        </frame>
    </viewpager>
</vertical>
);

//日志保存
console.setGlobalLogConfig({
    "file": 配置.日志
});

//修改状态栏颜色
ui.statusBarColor(配置.颜色)

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("开始");
    menu.add("日志");
});

//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "开始":
            threads.start(function(){
                开始()
            })
            break;
        case "日志":
            threads.start(function(){
                日志内容 = files.read(配置.日志)
                setClip(日志内容)
                toastLog('复制成功')
            })
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "配置", "其他"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

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

function 开始 () {
    log('开始函数')
    new Function('配置', 配置.getCloudFiles(配置.路径+'window.js', 配置.密钥))(配置)
}