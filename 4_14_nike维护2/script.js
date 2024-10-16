/**最后修订与2020年12月23日0点40分 */


var 运行时间 = storage.get('viewDataArr')['yxsj'];
log("运行时间：%d", 运行时间);
// let 运行时间  = 1;

// 脚本包名：com.snkrsllspnote4x.jb
let re = shell('', true);
log(re.code);
home();

setInterval(() => {
    log("------");
    if (text('确定').exists()) {
        toastLog('确定！');
        click('确定');
    }
    停止应用('com.snkrsllspnote4x.jb');
    停止应用('com.nike.snkrs');
    // log("停止");
    // VolumeDown();
    启动应用();
    sleep(2000);
    text('启动').waitFor();
    打开无障碍();
    sleep(1000);
    // log('启动脚本'+app.launchApp('snkrs浏览商品Note4X'));
    启动应用();
    text('启动').waitFor();
    sleep(2000);
    click('启动');
    toastLog('启动');
    
}, 运行时间 * 60 * 1000);



function 停止应用 (_appName) {
    log("要停止%s", _appName);
    shell('am force-stop ' + _appName,true);
    log("停止成功");
}

function 启动应用 () {
    log('启动');
    shell('am start com.snkrsllspnote4x.jb/com.stardust.auojs.inrt.SplashActivity', true);
}

function 打开无障碍 () {
    toastLog('打开无障碍');
    // var intent = new Intent();
    // intent.setAction("android.settings.ACCESSIBILITY_SETTINGS"); //打开无障碍设置界面
    // app.startActivity(intent);
    // click('无障碍服务: 关闭');
    className("android.widget.Switch").findOne().click();
    if (text('无障碍').findOne(2000)) {
        sleep(2000);
        if (!text('snkrs浏览商品Note4X').exists()) {
            scrollDown(0);
            sleep(1000);
        }
        click('snkrs浏览商品Note4X');
        sleep(1000);
    }
    click('开启服务');
    sleep(1000);
    click('确定');
}