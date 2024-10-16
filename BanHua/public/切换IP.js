let wuji_user = 'js88', wuji_pass = '123123'

while (1) {
    log('打开无极app')
    app.launch('org.wuji')
    log('等待三秒钟')
    sleep(3000)
    let 更换IP_str = text('更换IP').findOne(5 * 1000)
    if (更换IP_str) {
        log('找到了更换IP文本按钮')
        if (更换IP_str.click()) {
            log('点击更换IP按钮成功，等待五秒钟')
            sleep(5 * 1000)
            let IP = id('ip').findOnce()
            if (IP) {
                if (IP.text() == '已断开') {
                    toastLog('已断开，重新连接')
                    sleep(10 * 1000)
                } else {
                    toastLog('已连接到IP：'+IP.text())
                    break
                }
            } else {
                console.error('没有找到IPid的控件')
            }
        } else {
            console.error('点击更换IP失败')
        }
    } else {
        console.error('没有找到更换IP文本')
        if (text('登录').exists()) {
            if (text('登录').findOne().click()) {
                log('点击登录按钮')
                let 账号Edit = id('account').findOne()
                log('账号Edit get!!!')
                let 密码Edit = id('password').findOne()
                log('密码Edit get!!!')
                let 登录Button = id('login').text('登录').findOne()
                log('登录Button get!!!')
                账号Edit.setText(wuji_user)
                sleep(1000)
                密码Edit.setText(wuji_pass)
                if (登录Button.click()) {
                    log('点击登录成功')
                    sleep(5 * 1000)
                    let IP = id('ip').findOnce()
                    if (IP) {
                        if (IP.text() == '已断开') {
                            toastLog('已断开，重新连接')
                            sleep(10 * 1000)
                        } else {
                            toastLog('已连接到IP：'+IP.text())
                            break
                        }
                    } else {
                        console.error('没有找到IPid的控件')
                    }
                    break
                } else {
                    log('点击登录失败2')
                }
            } else {
                log('点击登录失败')
            }

        }
    }
}