log('开始查找领红包控件')

_红包控件 = id('rlredpacketSave').findOne()
log('找到了领红包控件')
_判断下滑 = 2
if (_红包控件) {
    log('_红包控件 = true')
    if (_红包控件.click()) {
        log('_红包控件.click() = true')
        //等待进入红包界面
        新手任务()
        if (textContains('连续签到第').findOne(5000) || descContains('连续签到第').findOne(5000)) {
            sleep(1000)
            log('找到了连续签到弹窗')
            toastLog('关闭弹窗')
            tap点击(534, 1427)
        }
        while (1) {
            log('开始找领红包按钮')
            _领取控件组 = textMatches(/领(.*?)元/).find()
            if (_领取控件组.length == 0) {
                _领取控件组 = descMatches(/领(.*?)元/).find()
            }
            _领取控件组数量 = _领取控件组.length
            log('领取控件组数量'+_领取控件组数量)
            if (_领取控件组数量 > 0) {
                for (let i = 0; i < _判断下滑; i++) {
                    toastLog('下滑')
                    兼容下滑()
                }
                log('开始点击领取')
                _领取控件组[0].click()
                log('点击领取按钮成功')
                sleep(1000)
                while (1) {
                    log('开始检测领取数量')
                    _新领取控件组 = descMatches(/领(.*?)元/).find() || textMatches(/领(.*?)元/).find()
                    _新领取控件组数量 = _新领取控件组.length
                    if (_新领取控件组数量 != _领取控件组数量) {
                        toastLog('领取成功！！！')
                        sleep(3000, 6000)
                        break
                    }
                    sleep(500)
                }
                sleep(random(2000, 3000))
            } else {
                log('已经没有领取控件了')
                break
            }
        }
        log('跳出找领红包按钮的循环')
    } else {
        log('_红包控件.click() = false')
    }
} else {
    log('_红包控件 = false')
}

function 新手任务 () {
    log('开始新手任务函数')
    while (1) {
        if (text('新手任务').exists() || desc('新手任务').exists() || desc('限时福利').exists() || text('限时福利').exists() || desc('日常任务').exists() || text('日常任务').exists()) {
            break
        }
    }
    log('结束新手任务函数')
}

function 兼容下滑 () {
    if (device.sdkInt > 23) {
        swipe(555, 1344, 555, 850, 1000)
    } else {
        Swipe(555, 1344, 555, 850, 1000)
        sleep(3000)
    }
}

function tap点击 (x, y) {
    log('tap点击')
    if (device.sdkInt > 23) {
        click(x, y)

    } else {
        Tap(x, y)
        sleep(3000)
    }
}