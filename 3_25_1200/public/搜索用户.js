用户 = 配置.其他.留痕账号
toastLog('要留痕的账号为：'+用户)

text('消息').findOne().parent().parent().click()
log('点击消息')

desc('忽略未读').waitFor()
log('找到了忽略未读')

text('搜索').findOne().parent().parent().click()
log('点击搜索')

text('聊天记录').waitFor()
log('聊天记录')
text('联系人').waitFor()
log('联系人')
text('附近群组').waitFor()
log('附近群组')

className('EditText').waitFor()
log('编辑框')


className('EditText').findOne().setText(用户)
log('搜索用户')

_搜索用户 = text('搜索用户：'+用户).findOne(5000)

if (!_搜索用户) {
    back()
}

_搜索用户.parent().click()
log('搜索用户')

desc('设置').waitFor()

if (device.width == 1080) {
    swipe(500, 550, 611, 111, 1000)

} else if (device.width == 720) {
    swipe(322, 974, 295, 251, 1000)

} else {

}

sleep(1111)

//这里应该可以加一个模拟滑动

while (1) {

    if (!desc('忽略未读').exists()) {
        back()
        sleep(1500)
    } else {
        break
    }

}