var storage = storages.create('3_25_1200')

text('使用其他QQ帐号登录').findOne().click()
log('使用其他QQ账号登录')
text('添加帐号').findOne().parent().click()
log('添加账号')
text('添加用于QQ一键登录的QQ帐号').waitFor()

log('读取qq号')

qqnum = files.read(配置.路径.qq号)
log('qq-->>  \n'+qqnum)
log('把QQ文本列表分割为数组')
qqnum = qqnum.split('\n')
log('一共有'+qqnum.length+'个qq号数据')
log('取第一行')
qqnum1 = qqnum.shift().split('----')

log('qqnum1  -->>  '+qqnum1)

log('删除后的数组为-->>  \n'+qqnum)
sleep(2000)

text('QQ号').findOne().setText(qqnum1[0].trim())

storage.put('qq账号', qqnum1[0].trim())
sleep(random(200, 1000))
log('qqnum-1  :  '+qqnum1[1])
className('EditText').find()[2].setText(qqnum1[1].trim())
storage.put('qq密码', qqnum1[1].trim())

//写入qq账号密码到本地储存

跳转登录()
log('点击取消')
click('取消')
跳转登录()

qqstr = qqnum.toString().replace(/,/g, '\n')
log(qqstr)

files.write(配置.路径.qq号, qqstr)

text('输入验证码').waitFor()
sleep(3000)

function 跳转登录 () {
    log('开始跳转登录函数')
    tzdl:
    while (1) {
        _登录str = text('登录').findOnce()
        if (_登录str) {
            log('找到了_登录str')
            if (_登录str.click()) {
                log('点击登录成功')
                log('进入检测循环')
                nb:
                while (1) {
                    if (text('取消').exists()) {
                        log('找到了取消')
                        log('跳出外部循环')
                        break tzdl
                    } else if (textContains('登录失败').exists()) {
                        log('找到了登录失败')
                        log('点击确定')
                        click('确定')
                        sleep(1000)
                        log('跳出检测循环')
                        break nb
                    } else {
                        // log('没有找到取消或者登录失败')
                    }
                }
            } else {
                log('点击登录失败')
            }
        } else {
            log('没有找到_登录str')
        }
    }
    log('结束跳转登录函数')
}