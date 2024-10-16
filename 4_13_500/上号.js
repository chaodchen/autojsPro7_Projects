const UPATH = '/sdcard/160.txt',TXTSP = '----', USERINDEX = 0, PASSINDEX = 1;
var findex = 1

if (!files.isFile(UPATH)) {
    console.error('UPATH路径不存在')
    exit()
}



var un_arr = files.read(UPATH).split('\n')
// log(un_arr)
toastLog('一共读取到'+(un_arr.length - 1)+'个微博帐号！')
for (let i = 0; i < (un_arr.length - 1); i++) {

    launchApp('双开助手')
    waitForActivity('com.excelliance.kxqp.ui.MainActivity', 1000)
    console.info('已进入双开助手\n延迟三秒钟')
    sleep(3000)

    let wb_view
    loop_3:
    while (1) {
        wb_view = id('icon_category_type_use_outer').indexInParent(findex).findOnce()
        if (wb_view) {
            console.info('找到了wb_view')
            break loop_3
        }
        console.info('准备下滑')
        id("main_scroller").findOne().scrollForward()
        console.info('延迟一秒钟')
        sleep(1000)
    }
    // log(wb_view)
    console.info('进入第%d个分身', findex)
    while(!wb_view.click());
    console.info('点击微博分身成功,等待进入微博登录界面')
    text('其他登录方式').waitFor()
    console.info('进入微博登录界面成功')
    console.info('用帐号密码登录')
    while(!click('用帐号密码登录'));
    text('用短信验证码登录').waitFor()
    text('手机号或者邮箱').findOne().setText(un_arr[i].split(TXTSP)[USERINDEX])
    sleep(1000)
    id('et_pwd').findOne().setText(un_arr[i].split(TXTSP)[PASSINDEX])
    sleep(1000)
    // while(!click('登录'));
    id('bn_pws_Login').findOne().click()
    loop_2:
    while (1) {
        if (text('请先验证身份').exists()) {
            console.info('请先验证身份')
            while(!text('点击按钮进行验证').findOnce());
            console.info('验证码加载完成')
            console.info('点击验证码')
            click(random(194, 400), random(395, 405))
            console.info('延迟十秒钟')
            sleep(1000 * 10)
        } else if (text('关注').exists()) {
            console.info('关注')
            break loop_2

        } else {
            console.log('等待中...')
            sleep(1000)
        }
    }
    console.info('上号成功,打开双开助手')
    findex++
}

