log('打开双开助手：'+launch('com.excelliance.dualaid'))
log('等待进入双开助手')
text('双开助手').waitFor()
log('进入双开助手成功')
_微博分身列表 = id("main_scroller").findOne()
log('找到了微博分身列表')
_微博分身数组 = [[], []]

log('要找的微博分身号：'+微博分身号)

id('iv_task_clean').findOne().click()
sleep(5000 * 4)
while (1) {
    qingli = textContains('清理选中文件').findOnce()
    ganjing = text('很干净,未扫到任何可以清理的文件').findOnce()
    if (qingli) {
        log('点击清理')
        qingli.click()
        log('等待清理完成')
        text('已清理内存').waitFor()
        log('清理完成')
        break
    }

    if (ganjing) {
        log('很干净,未扫到任何可以清理的文件')
        break
    }
    sleep(1000)
}

if (files.isDir('/sdcard/sina/')) {
    log('找到了微博缓存文件')
    files.removeDir('/sdcard/sina/')
    toastLog('删除sign文件夹')
}

log('点击返回')
id("iv_back").findOne().click()

log('点击返回到双开助手')
text('双开助手').waitFor()
log('进入双开助手首页成功')

while (1) {
    _微博分身 = id('icon_category_type_use_outer').indexInParent(微博分身号 - 1).findOne(2000)
    if (_微博分身) {
        log('开始点击微博分身：'+_微博分身.click())
        break
    } else {
        log('没有找到微博分身')
        if (!_微博分身列表.scrollForward()) {
            log('下滑失败')
            exit()
        }
        sleep(2000)
    }
}

// mods.view.waitViews(['首页', '我'], 'desc', 1000, 0)
while (1) {
    if (desc('首页').exists() && desc('我').exists()) {
        break
    }
}

log('进入微博主页成功')
sleep(全局延迟 * 1000)
微博分身号++

log('结束双开助手函数')