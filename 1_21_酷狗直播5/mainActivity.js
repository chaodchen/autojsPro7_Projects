"ui";
/*
 * @Author: BanHua
 * @Date: 2021-01-05 14:06:06
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-22 00:10:59
 * @Description: file content
 */
/**
 * 1.如果需要自定保存控件的值，需要将控件ID以bh_开口进行命名，如bh_delay
 * 
 */
 const CONFIG = {
    "jgyPath": "TaoBao/1_21_酷狗直播5/",
    "jgyUser": "17685034710@163.com",
    "jgyKey": "agyzwck2dymzcxtk",
    "storageName": "KuGou5"
}

//定义模板系统函数
/**
 * 
 * @param {要保存的本地储存名称} $sStoName 
 * @param {要保存的本地储存键值名称} $sPutName 
 * @param {要保存的变量} $_o 
 */
this.SaveStorage = function ($sStoName, $sPutName, $_o) {
    let $oStorage = storages.create($sStoName);
    $oStorage.put($sPutName, $_o);
}

/**
 * 
 * @param {要保存的本地储存名称} $sStoName 
 * @param {要获取的本地储存键值} $sPutName 
 */
this.getStorage = function ($sStoName, $sGetName) {
    let $oStorage = storages.create($sStoName);
    return $oStorage.get($sGetName);
}




//变量定义结束，开始运行脚本

this.SaveStorage(CONFIG.storageName, "CONFIG", CONFIG);
// console.log('保存CONFIG配置信息到本地储存成功');

//绘制加载界面
ui.layout(
    <frame bg='#000000' w='*' h='*'>
        <text id='loading' text='' w='auto' h='auto' layout_gravity='center' textColor='#ffffff' textSize='22sp'></text>
    </frame>
);


// console.log('sJgyFile:'+sJgyFile);

/**
 * 
 * @param {需要进行操作的XML文本} _xmlStr 
 * @param {需要提取的ID前缀名} _idSign 
 */
this.xmlStringFindIdAddArray = function (_xmlStr, _idSign) {
    let _arr = [], re = new RegExp("[\'\"]"+_idSign+".+[\'\"]", "g");
    _arr = _xmlStr.match(re);
    return  _arr.map(function(_currentValue, _index, _arr){
        return _currentValue.replace(/[\"\']/g, "");
    });
}

/**
 * 
 * @param {要进行操作的控件ID数组} _viewArr 
 * @param {保存控件数据的本地储存名称} _srotageName 
 * @param {保存控件数据的本地储存键值} _storageKey 
 */
this.setViewContent = function (_viewArr, _srotageName, _storageKey) {
    _viewArr = _viewArr || [];
    _srotageName = _srotageName || CONFIG.storageName;
    _storageKey = _storageKey || "viewDataArr";

    // let _storage = storages.create(_srotageName);
    let _viewDataArr = getStorage(_srotageName, _storageKey);
    if (!_viewDataArr) {
        console.error("本地储存没有找到键值为:%s的数据", _storageKey);
        return;
    }
    
    //开始遍历所有的UI控件
    _viewArr.forEach((_view) => {
        if (_viewDataArr[_view]) {
            switch (ui.findView(_view).getAccessibilityClassName()) {
                case 'android.widget.EditText':
                    ui[_view].setText(_viewDataArr[_view]);
                    break;
                case 'android.widget.CheckBox':
                    ui[_view].checked = _viewDataArr[_view];
                    break;
                case 'android.widget.RadioButton':
                    ui[_view].checked = _viewDataArr[_view];
                    break;
                case 'android.widget.Spinner':
                    ui[_view].setSelection(_viewDataArr[_view]);
                    break;
                case 'android.widget.Switch':
                    ui[_view].checked = _viewDataArr[_view];
                    break;
                default:
                    console.error('暂未收录%s类型的控件!', ui.findView(_view).getAccessibilityClassName());
            }
        } else {
            console.error('没有找到ID为:%s的控件数据', _view);
        }
    });
}

/**
 * 
 * @param {要进行操作的控件ID数组} _viewArr 
 * @param {保存控件数据的本地储存名称} _srotageName 
 * @param {保存控件数据的本地储存键值} _storageKey 
 */
this.getViewContent = function (_viewArr, _srotageName, _storageKey) {
    _viewArr = _viewArr || [];
    _srotageName = _srotageName || CONFIG.storageName;
    _storageKey = _storageKey || "viewDataArr";

    // _storage = storages.create(_srotageName);
    //开始遍历ID数组
    let _viewDataArr = {};
    _viewArr.forEach((_view) => {
        switch (ui.findView(_view).getAccessibilityClassName()) {
            case 'android.widget.EditText':
                // log('文本控件');
                _viewDataArr[_view] = ui[_view].text();
                break;
            case 'android.widget.CheckBox':
                // log('多选框控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            case 'android.widget.RadioButton':
                // log('单选框控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            case 'android.widget.Spinner':
                // log('下拉菜单控件');
                _viewDataArr[_view] = ui[_view].getSelectedItemPosition();
                break;
            case 'android.widget.Switch':
                log('开关控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            default:
                console.error('暂未收录%s类型的控件!', ui.findView(_view).getAccessibilityClassName());
        }
    });
    //遍历完成
    SaveStorage(_srotageName, _storageKey, _viewDataArr);
}

this.drawUI = (function(){
    return (
        <frame>
            <vertical>
                <appbar bg='#696969'>
                    <toolbar title='默认标题'></toolbar>
                </appbar>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
                    <vertical>
                        <Switch id='autoService' text='无障碍服务' checked='{{auto.service != null}}' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='windowService' text='悬浮窗服务' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='deBugService' text='调试服务' padding='8 8 8 8' textSize='15sp'></Switch>
                        <horizontal>
                            <button id='start' gravity='center' layout_weight='1' text='开始运行' textSize='16sp' textColor='#000000'></button>
                            <button id='quit' gravity='center' layout_weight='1' text='退出软件' textSize='16sp' textColor='#000000'></button>
                        </horizontal>
                    </vertical>
                </card>
                <ScrollView>
                    <vertical id='body' w='*' h='*' padding='5dp'>

                    </vertical>
                </ScrollView>
            </vertical>
        </frame>
    );
})();

importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);
//声明主体颜色
const COLOR = '#FFC0CB';
//声明脚本标题
const TITLE = '酷狗直播5';

//开始加载UI框架
ui.layout(this.drawUI.toString().replace(/#696969/g, COLOR).replace(/默认标题/g, TITLE));

//定义用户界面
var userUI = (function(){
    return (
        <vertical>
            <horizontal>
                <text text='操作次数:'></text>
                <input inputType='number' hint='' w='*' id='bh_czcs'></input>
            </horizontal>
        </vertical>
    )
})();


//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖镇楼                 BUG辟易
//          佛曰:
//                  写字楼里写字间，写字间里程序员；
//                  程序人员写程序，又拿程序换酒钱。
//                  酒醒只在网上坐，酒醉还来网下眠；
//                  酒醉酒醒日复日，网上网下年复年。
//                  但愿老死电脑间，不愿鞠躬老板前；
//                  奔驰宝马贵者趣，公交自行程序员。
//                  别人笑我忒疯癫，我笑自己命太贱；
//                  不见满街漂亮妹，哪个归得程序员？

//设置状态栏颜色
ui.statusBarColor(COLOR);

//把用户UI添加进UI模板
ui.inflate(userUI, ui.body, true);

//开始设置所有控件的值
setViewContent(xmlStringFindIdAddArray(userUI.toString(), 'bh_'));

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

//创建脚本进程变量
var execution = null;
var window = null
//绑定开始按钮单机事件
ui.start.on('click', ()=> {
    if (!window) {
            scriptThreads = threads.start(function(){
            auto.waitFor();
    
            //开始保存内容到本地储存
            getViewContent(xmlStringFindIdAddArray(userUI.toString(), 'bh_'));
            console.info('保存UI配置数据到本地储存成功！');
            home();
            
            window = floaty.window(
                <frame>
                    <img w="auto" h="auto" src="@drawable/ic_play_circle_outline_black_48dp" id='windowButton'/>
                    <text id='scriptState' text='开始' visibility='gone'></text>
                </frame>
            );
    
            //设置悬浮窗位置
            window.setPosition(0, device.height/2);
    
            //记录按键被按下时的触摸坐标
            var x = 0, y = 0;
            //记录按键被按下时的悬浮窗位置
            var windowX, windowY;
            //记录按键被按下的时间以便判断长按等动作
            var downTime;
    
            //监听滑动悬浮窗事件
            window.windowButton.setOnTouchListener(function(view, event){
                switch(event.getAction()){
                    case event.ACTION_DOWN:
                        x = event.getRawX();
                        y = event.getRawY();
                        windowX = window.getX();
                        windowY = window.getY();
                        downTime = new Date().getTime();
                        return true;
                    case event.ACTION_MOVE:
                        //移动手指时调整悬浮窗位置
                        window.setPosition(windowX + (event.getRawX() - x),
                            windowY + (event.getRawY() - y));
                        //如果按下的时间超过1.5秒判断为长按，退出脚本
                        if(new Date().getTime() - downTime > 1500){
                            toastLog('长按退出脚本！');
                            exit();
                        }
                        return true;
                    case event.ACTION_UP:
                        //手指弹起时如果偏移很小则判断为点击
                        if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                            // toastLog('点击了按钮');
                            windowButtonClick();
                        }
                        return true;
                }
                return true;
            });
    
            function windowButtonClick () {
                if (window.scriptState.getText() == '开始') {
                    log('execution:' + execution);
                    //开始获取云端的脚本资源

                    log("开始运行script脚本");
                    // log(_scriptFile);
                    execution = engines.execScriptFile('./script.js', {
                        path : engines.myEngine().cwd()
                    });
                    window.windowButton.setSource('@drawable/ic_pause_circle_outline_black_48dp');
                    ui.run(function(){
                        window.scriptState.setText('停止');
                    })
    
                } else {
                    if (execution) {
                        execution.getEngine().forceStop();
                    }
                    window.windowButton.setSource('@drawable/ic_play_circle_outline_black_48dp');
                    window.scriptState.setText('开始');
                }
            }
        });
    } else {
        toastLog('哎呀，不要戳我!!!');
        home();
    }
});

//绑定退出按钮单机事件
ui.quit.on('click', () => {
    exit();
});


//回到本界面时，触发resume事件
ui.emitter.on('resume', ()=> {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
});