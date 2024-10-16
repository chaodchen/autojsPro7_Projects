toastLog('开始陌陌兼容线程')
while (1) {
    if (text('帮你找到了一位最佳配对').exists()) {
        log('帮你找到了一位最佳配对')
        sleep(1000)
        id('reback_dialog_close').findOne().click()
    } else if (textContains('打个卡').exists()) {
        log('打个卡')
        sleep(1000)
        let 立即打卡 = text('立即打卡').findOnce()
        if (立即打卡) {
            let 关闭按钮 = 立即打卡.parent().parent().child(1)
            if (关闭按钮) {
                console.warn('找到了关闭按钮')
                if (关闭按钮.click()) log('点击关闭按钮成功') 
            }
        }
    } else if (textContains('陌陌想访问你的通讯录').exists()) {
        log('陌陌想访问你的通讯录')
        click('跳过')
    } else if (text('绑定手机').exists()) {
        log('绑定手机')
        sleep(1000)
        xx = id('auth_module_dialog_iv_close').findOnce()
        if (xx) {
            xx.click()
        } else {
            click('跳过')
        }
    } else if (text('MOMO陌陌已停止运行').exists()) {
        log('momo崩溃')
        sleep(1000)
        click('重新打开应用')
        waitForPackage('com.immomo.momo', 200)

    } else if (text('MOMO陌陌屡次停止运行').exists()) {
        log('momo崩溃')
        sleep(1000)
        click('重新打开应用')
        waitForPackage('com.immomo.momo', 200)
    } else if (text('附近高颜值小姐姐').exists()) {
        log('附近高颜值小姐姐')
        sleep(10 * 1000)
        if (text('附近高颜值小姐姐').exists()) {
            recents()
            text('MOMO陌陌').findOne().parent().child(3).click()
            sleep(1000)
            app.launchApp('MOMO陌陌')
        } else {
            toastLog('附近高颜值没有卡住')
            click('跳过')
        }
    } else if (text('她们在附近').exists()) {
        log('他们在附近')
        click('跳过')
        sleep(1000)
    } else if (textContains('获取此设备的位置信息吗').exists()) {
        toast('弹出位置信息')
        sleep(1000)
        click('允许')
        sleep(20 * 1000)
    } else if (text('位置权限申请').exists()) {
        log('位置权限申请')
        sleep(1000)
        click('去开启')
        sleep(1000)
    } else {
        //log('其他界面不兼容')
    }
}