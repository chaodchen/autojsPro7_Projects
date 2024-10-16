/*
 * @Author: BanHua
 * @Date: 2021-01-12 23:10:12
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-19 14:28:13
 * @Description: file content
 */

/**
 * 1.scipt.js的变量不与main.js mainActivity.js共享
 */
let storage = storages.create('Nike');
console.show();
let jb名称 = storage.get('viewDataArr')['bh_jbName'] || 'NIKE注册';
let xzApkName  = storage.get('viewDataArr')['bh_xzApkName'] || 'SNKRS';
let delay = storage.get('viewDataArr')['bh_delay'] || 2400
let apkPath = storage.get('viewDataArr')['bh_apkPath'] || "/sdcard/Pictures/com.nike.snkrs_3.1.2_2020121112.apk"
delay = Number(delay);
log(jb名称);
log(xzApkName);
log(delay);
log(apkPath);

//定义用户变量
while (1) {
    log('-----while-------');
    console.info('开始延迟%d秒', delay);
    sleep(delay * 1000);
    log('延迟完毕');
    停止应用(jb名称);
    sleep(5 * 1000);
    停止应用('无极');
    sleep(5 * 1000);
    // 卸载应用(xzApkName);
    // sleep(5 * 1000);
    // 安装应用(apkPath);
    停止应用("SNKRS");
    sleep(5 * 1000);
    关闭飞行();
    log("等待十秒钟！");
    sleep(10 * 1000);
    启动脚本(jb名称);
    sleep(5 * 1000);
    console.info('准备就绪');
}

function 启动脚本 (_apk) {
    log("启动："+_apk);

    // app.launch(getPackageName(_apk));
    while(!click(_apk));
    text('启动功能').waitFor();
    log('找到了启动功能！');
    text('启动功能').findOne().click();
    sleep(2000)
    click(1014, 625);
    sleep(1000);
    click(417, 614);
}

function 停止应用 (_appName) {
    log("要停止%s", _appName);
    shell('am force-stop ' + getPackageName(_appName),true);
    log("停止成功");
}

function 卸载应用 (_appName) {
    log("要卸载%s", _appName);
    shell('pm uninstall ' + getPackageName(_appName),true);
    log('卸载成功');
}

function 安装应用 (_path) {
    log("要安装"+_path);
    shell('pm install -r ' + _path,true);
    log("安装成功");
}


function 关闭飞行 () {
    log("要关闭飞行");
    new Shell().exec("su -c 'settings put global airplane_mode_on 0; am broadcast -a android.intent.action.AIRPLANE_MODE --ez state false'");
    log("关闭成功！");
}