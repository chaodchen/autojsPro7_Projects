var fsNum = 73, fsNum_i = 0;
toastLog('请打开双开助手')
waitForActivity('com.excelliance.kxqp.ui.MainActivity', 1000)
console.info('已进入双开助手\n延迟三秒钟')
sleep(3000)

for (let i = 0;i < fsNum; i++) {
    let add_but = id('add_but').findOnce()
    if (add_but) {
        if (!add_but.click()) {
            console.warn('点击add_but失败')
            continue
        }
        waitForActivity('com.excelliance.kxqp.platforms.AddGameActivity', 1000)
        console.info('已进入添加分身界面')
        let wb_title = text('微博').findOne(10 * 1000)
        if (!wb_title) {
            console.error('没有找到微博应用')
            exit()
        }

        let tian_jia = wb_title.parent().findOne(text('添加'))
        if (!tian_jia) {
            console.error('没有找到tian_jia:', tian_jia)
            exit()
        }

        while(!tian_jia.parent().parent().click());
        console.info('添加微博分身')
        loop_0:
        while (1) {
            let top_title = id('menu_top_title').findOne()
            if (top_title.text() == '正在添加...') {
                console.verbose('正在添加...')
                sleep(1000)
            } else {
                break loop_0
            }
        }
        fsNum_i++
        toastLog('已添加'+fsNum_i+'个分身!')

    } else {
        console.warn('没有找到add_but')
        continue
    }

}

console.info('所有分身添加完成，一共添加%d个分身', fsNum_i)