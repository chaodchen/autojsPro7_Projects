function 清理内存 () {
    app.launch('com.excelliance.dualaid')
    // console.show()

    id('menu_top_title').text('双开助手').waitFor()
    id('iv_task_clean').findOne().click()
    text('微信专清').waitFor()
    for (let i = 0; i < 10; i++) {
        sleep(1000)
        let 清理Button = id('btn_sure').findOne()

        if (清理Button) {
            log('清理Button get!!!')
            if (清理Button.text() != '清理选中文件0.00 B') {
                if (清理Button.text() != '深度清理') {
                    log('等待两秒钟')
                    sleep(2000)
                    if (清理Button.click()) {
                        log('点击清理Button成功')
                        text('深度清理').waitFor()
                        log('清理完成')
                        break
                    }
                } else {
                    log('手机很干净')
                    break
                }
            } else {
                log('扫描垃圾中...')
            }
        }
    }

    log('开始返回')
    while (1) {
        let 返回按钮 = id('iv_back').findOnce()
        if (返回按钮.click()) {
            log('点击返回按钮成功')
            if (id('menu_top_title').text('双开助手').findOne(5 * 1000)) {
                log('返回到双开助手成功')
                break
            } else {
                log('返回到双开助手失败')
            }
        } else {
            console.error('没有找到返回按钮')
        }
    }
    log('返回成功')

}

清理内存()