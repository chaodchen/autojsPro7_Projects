app.openAppSetting('com.immomo.momo')
text('应用信息').waitFor()
log('打开陌陌应用信息成功')
text('权限').findOne().parent().parent().click()
log('点击权限')
text('应用权限').waitFor()

_权限arr = [
    '相机','麦克风'
]

_权限arr.forEach((_r) => {
    log('打开'+_r)
    text(_r).findOne().parent().parent().click()
    sleep(random(200, 1000))

})
sleep(1000)
back()
sleep(1000)
back()
sleep(1000)