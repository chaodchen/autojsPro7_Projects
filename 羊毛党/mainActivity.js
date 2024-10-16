/*

 * @Author: BanHua
 * @Date: 2021-01-06 14:05:14
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-19 15:26:11
 * @Description: file content
 */
//开始运行mainActivity
"ui";
// 初始化
importClass(android.view.View);
importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);
// AppKey 和 AppSecret 在泡椒云开发者后台获取
var pjysdk = new PJYSDK("bvpb6pso6itf6809nh0g", "92Uvn3hYLZSu6CuEX3y15sHbrqudBTG4"); 
pjysdk.debug = false; // 开发时建议开启debug，有详细输出

// 监听心跳失败事件
pjysdk.event.on("heartbeat_failed", function(hret) {
    toast(hret.message);  // 心跳失败提示信息
    console.error('心跳停止！！！');
    exit();  // 退出脚本
})

//设置常量
const MEMBER = true;

//读取本地储存
var storage = storages.create('YangMaoShan');

//读取首页UI配置
var homeData = storage.get('homeData') || {
    JHcode : ""
}

//读取脚本商店UI配置 
var scriptShopData = storage.get('scriptShopData') || [
    {
        title:"快手极速版",
        time:"120",
        shuaTime:"0",
        idName:"ksjsb"
    },
    {
        title:"刷宝短视频",
        time:"80",
        shuaTime:"0",
        idName:'sbdsp'
    },
    {
        title:"抖音极速版",
        time:"90",
        shuaTime:"0",
        idName:"dyjsb"
    }
];

//

var color = "#009688";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="羊毛衫"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame id='home'>

                </frame>
                <frame id='scriptShop'>

                </frame>
                <frame id='seting'>
                    
                </frame>
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

//绘制首页
ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
            <vertical>
                <horizontal w='*' padding='5dp'>
                    <text text='激活码：' w='auto'></text>
                    <input text='{{homeData.JHcode}}' id='JHcode' layout_weight='10' hint='请输入激活码'></input>
                </horizontal>
                <horizontal w='*' padding='5dp'>
                    <text text='到期时间：'></text>
                    <text id='dueTime'></text>
                </horizontal>
            </vertical>
        </card>
    </vertical>, ui.home, true
);


//绘制脚本商店界面
ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
            <vertical>
                <list id='scriptShopList' padding='5dp'>
                    <vertical w='*'>
                        <horizontal>
                            <text w='auto' text='{{this.title}}：'></text>
                            <input id='{{this.idName}}' layout_weight='0' text='{{this.time}}'></input>
                            <text layout_weight='1' text='分，已刷：{{this.shuaTime}}分'></text>
                            <button text='重置' id='reset' layout_gravity='right'></button>
                        </horizontal>
                        <text w='*' h='2dp' text='' bg='{{color}}'></text>
                    </vertical>
                </list>
            </vertical>
        </card>
    </vertical>, ui.scriptShop, true
);

//绘制设置界面
ui.inflate(
    <vertical>
        <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
            <vertical>
                <Switch id='autoService' text='无障碍服务' checked='{{auto.service != null}}' padding='8 8 8 8' textSize='15sp'></Switch>
                <Switch id='windowService' text='悬浮窗服务' padding='8 8 8 8' textSize='15sp'></Switch>
                <Switch id='deBugService' text='调试服务' padding='8 8 8 8' textSize='15sp'></Switch>
            </vertical>
        </card>
    </vertical>, ui.seting, true
)

//导入list数据
ui.scriptShopList.setDataSource(scriptShopData);

//创建重置事件
ui.scriptShopList.on("item_bind", function (itemView, itemHolder){
    itemView.reset.on("click", function () {
        let item = itemHolder.item;
        scriptShopData.splice(itemHolder.position, 1,     {
            title:item.title,
            time:item.time,
            shuaTime:"0",
            idName:item.idName
        });
        // toast(item.shuaTime);
        // item.shuaTime = 0;
    });
});

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("运行");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "运行":
            toastLog('开始运行');
            startScript();
            break;
        case "关于":
            alert("关于", "Auto.js界面模板 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["首页", "脚本", "设置"]);
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
});

//绑定无障碍服务单机事件
ui.autoService.on('click', () => {
    ui.autoService.isChecked() ? auto.service == null ? app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
});

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

//回到本界面时，触发resume事件
ui.emitter.on('resume', ()=> {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
});

//登陆泡椒云后台线程！
let loginPaoJiao = threads.start(function(){
    let _到期时间 = loginPaojiaoFun(ui.JHcode.text()).到期时间;
     //设置主页的到期时间
    ui.run(function(){
        ui.dueTime.setText(_到期时间);
    });
});


//登陆泡椒云函数
function loginPaojiaoFun (cardStr) {
    let 返回值 = {
        登陆状态:"",
        到期时间:""
    }
    if (cardStr) {
        pjysdk.SetCard(cardStr);
        //正式登陆
        let login_ret = pjysdk.CardLogin();
        //试用登陆
        let testlogin_ret = pjysdk.TrialLogin();
        if (login_ret.code == 0 || testlogin_ret.code == 0) {
            // 登录成功，后面写你的业务代码
            if (login_ret.code == 0) {
                toastLog('自动登陆成功!');
                返回值.到期时间 = login_ret.result.expires;
                返回值.登陆状态 = login_ret.code;
            } else {
                toastLog('试用登陆成功!')
                返回值.到期时间 = testlogin_ret.result.expires;
                返回值.登陆状态 = testlogin_ret.code;
            }
        } else {
            toastLog('自动登陆失败\n');  // 登录失败的提示信息
            返回值.到期时间 = login_ret.message + ' | ' + testlogin_ret.message;
            返回值.登陆状态 = 1;
        }
    }
    //设置到期时间
    ui.run(function(){
        ui.dueTime.setText(返回值.到期时间);
    });
    //保存到本地配置
    homeData.JHcode = cardStr;
    storage.put('homeData', homeData);
    return 返回值;
}




function startScript () {
    //首先获取配置
    scriptShopData.map((vue, index) => {
        if (vue) {
            scriptShopData[index].time = ui[vue.idName].text();
        }
    });

    //然后保存配置
    storage.put('scriptShopData', scriptShopData);
    log('保存配置为：'+JSON.stringify(scriptShopData));
    //然后检测基础脚本运行环境
    ifPower();
    ifMember();
    log("访问路径："+CONFIG.jgyPath+"script.js")
    let _jgyStr = null;
    let _getScriptFile = threads.start(function(){
        _jgyStr = oFuns.GetJgyFile(CONFIG.jgyUser, CONFIG.jgyKey, CONFIG.jgyPath+"script.js");
    });
    
    //然后开始调用script
    let _scriptRun = threads.start(function(){
        while(_getScriptFile.isAlive());
        log('开始运行script文件');
        eval(_jgyStr);
    });
}

//检测软件权限
function ifPower () {

}

//检测是否为会员用户
function ifMember() {
    if (MEMBER) {
        //获取激活码
        log('获取激活码');
        if (loginPaojiaoFun(ui.JHcode.text()) == 0) {
            return true;
        } else {
            return false;
        }
    } else {
        log('软件目前免费开放！');
        return true;
    }
}



function 获取设备码 () {
    let $sDeviceCode = device.getIMEI() || device.getAndroidId();
    if ($sDeviceCode != null) {
        return $sDeviceCode;
    } else {
        return null;
    }
}
/**
 * 
 * @param {随机字符串的内容} strs 
 * @param {要随机的字符串数量} num 
 */
function 随机字符串 (strs, num) {
    strs = strs || 'qwertyuiopasdfghjklzcbnm1234567890';
    let strArr = strs.split('');
    let r = ''
    for (let i = 0; i < num; i++) {
        r = r + strArr[random(0, strArr.length - 1)];
    }
    return r;
}


