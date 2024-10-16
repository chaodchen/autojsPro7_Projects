"ui";

const SCRIPT_CONFIG = {
    颜色 : '#DDC700',
    名称 : 'test 0.1',
    公告 : '陌陌版本：8.23\nQQ版本：8.3.0',
    密钥 : 'as4ybe2a3fcs5xz8',
    代号 : '3_25_1200',
    日志 : '/sdcard/rizhi.txt',
    路径 : 'TaoBaoProjcet/3_25_1200/script.js'
}
var storage = storages.create(SCRIPT_CONFIG.代号)

//保存界面配置的对象
config_input = storage.get('config_input') || {}
config_spinner = storage.get('config_spinner') || {}
if (!config_spinner) {
    config_spinner[0] = 0
}

ui.layout(
    <vertical>
        <appbar>
            <toolbar id="toolbar" title="{{this.SCRIPT_CONFIG.名称}}" bg='{{this.SCRIPT_CONFIG.颜色}}'/>
            <tabs id="tabs" bg='{{this.SCRIPT_CONFIG.颜色}}'/>
        </appbar>
        <viewpager id="viewpager">
            <frame>
                <vertical>
                    <horizontal gravity='center_vertical'>
                        <text text='' margin='5dp' bg='{{this.SCRIPT_CONFIG.颜色}}' w='8dp' h='35dp'></text>
                        <text text='软件权限' textSize='16sp' textColor='{{this.SCRIPT_CONFIG.颜色}}'></text>
                    </horizontal>
                    <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                        <vertical bg='#ffffff' margin='5dp'>
                            <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp"/>
                            <Switch id="windowService" text="悬浮窗服务" checked="{{floaty.checkPermission()}}" padding="8 8 8 8"textSize="15sp"/>
                        </vertical>
                    </card>
                    <horizontal gravity='center_vertical'>
                        <text text='' margin='5dp' bg='{{this.SCRIPT_CONFIG.颜色}}' w='8dp' h='35dp'></text>
                        <text text='必读公告' textSize='16sp' textColor='{{this.SCRIPT_CONFIG.颜色}}'></text>
                    </horizontal>
                    <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                        <text padding='10dp' text='{{this.SCRIPT_CONFIG.公告}}'></text>
                    </card>
                </vertical>
            </frame>
            <frame>
                <vertical bg='#ffffff'>
                    <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp'>
                        <vertical>
                            <button w='*' text='清理账号数据' id='button_0'></button>
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



//修改状态栏颜色
ui.statusBarColor(SCRIPT_CONFIG.颜色)

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
                new Function('', getCloudFiles(SCRIPT_CONFIG.路径, SCRIPT_CONFIG.密钥))()
            })
            break;
        case "日志":
            alert("关于", "Auto.js界面模板 v1.0.0");
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

ui.button_0.on('click', ()=> {
    threads.start(function(){
        if (files.remove('/sdcard/.934082222/账号数据.txt')) {
            toastLog('删除成功')
        }
    })
})

/*
//下拉菜单监听
var isFirst = true
var myAdapterListener = new android.widget.AdapterView.OnItemSelectedListener({
    onItemSelected: function (parent, view, position, id) {
        if (isFirst) {
            isFirst = false
        } else {
            log('选中了第' + id + '项')
            config_spinner[0] = id
            storage.put('config_spinner', config_spinner)
        }
    }
})
ui.spinner_0.setOnItemSelectedListener(myAdapterListener)
*/
//functionfunctionfunctionfunctionfunctionfunctionfunctionfunction

/*
function getStorageInput (_i) {
    if (storage.contains('config_input')) {
        return storage.get('config_input')[_i] || ""

    } else {
        return ''
    }
 
}
*/
function getCloudFiles (_path,_key) {

    _url = 'http://dav.jianguoyun.com/dav/'
    _name = '17685034710@163.com'
    _code = base64(_name + ":" + _key)
    
    _res = http.get(_url+_path ,{
        headers : {
            "Authorization": "Basic " + _code,
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    })

    if (_res != null) {
        _res = _res.body.string()
        return _res
    }

}

function base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}


