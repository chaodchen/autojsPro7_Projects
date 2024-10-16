
text('消息').findOne().parent().parent().click()
log('消息')
desc('忽略未读').waitFor()
id('icon').findOne().parent().click()
log('好友')
text('粉丝').waitFor()
log('粉丝')

text('查看通讯录好友').findOne().click()
log('查看通讯录好友')

text('\"通讯录\"权限申请').waitFor()
log('通讯录权限申请')
sleep(1000)
text('开启').findOne().click()
log('开启')
sleep(random(3000, 5000))
click('允许')
log('允许')

while (1) {

    if (text('邀请').findOne(5000)) {
        log('找到了邀请')
        break
    } else {
        sleep(1000)
        className("android.widget.ImageButton").findOne().click()
        text('关注').waitFor()
        log('关注')
        text('粉丝').waitFor()
        log('粉丝')
        sleep(1000)
        text('查看通讯录好友').findOne().click()
        sleep(1000)
    }
 
}

sleep(2000, 4000)
while (1) {

    if (text('首页').exists() && text('直播').exists()) {
        log('返回主页成功')
        break
    } else {
        back()
        sleep(random(1000, 2000))
    }

}