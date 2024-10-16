toastLog('开始运行')

while (1) {
    接单 = text('接').findOne()
    //接单坐标 = [接单.bounds().centerX(), 接单.bounds().centerY()]
    时长 = 接单.parent().child(0).child(1).text().split('"')[0]
    log('时长-->>  '+时长+'秒')
    延迟时间 = (时长 * 1000) - 10
    toastLog('本次延迟时间为:'+延迟时间)
    sleep(延迟时间)
    toastLog('开始抢单')

    while (1) {
        if (text('接').exists()) {
            click('接')
            log('接单')
            sleep(0)
        } else {
            toastLog('跳出循环')
            break
        }
    }

    for (let i = 0; i < 100; i++) {
        click('接')
    }

}