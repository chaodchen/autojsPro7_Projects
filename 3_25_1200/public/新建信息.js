var storage = storages.create('3_25_1200')

imgsPath = 配置.路径.头像包
log('头像包-->>  '+imgsPath)

//qq昵称保存路径
qqNamePath = 配置.路径.qq昵称
qqName = files.read(qqNamePath)

//可以追加qq和密码了
files.create(配置.路径.qq号+'.ini')
// if (!files.isFile(配置.路径.qq号+'.ini')) {

// }
qq账号密码 = files.read(配置.路径.qq号+'.ini')
qq账号密码 = qq账号密码.replace(/,/, '---')
log('qq账号密码-->>  '+qq账号密码)
files.append(配置.路径.账号数据+'.m.txt', storage.get('qq账号')+'---')
files.append(配置.路径.账号数据+'.m.txt', storage.get('qq密码')+'---')

Tap = null
Tap = function (_x, _y, _r) {

    if (_r) {

        if (random(0,1)) {
            _x = _x + _r
        } else {
            _x = _x - _r
        }

    }

    if (device.sdkInt < 24) {
        log('小于安卓7.0')
        shell('input tap '+_x+' '+_y, true)
    } else {
        log('大于或等于安卓7.0')
        click(_x, _y)
    }

}



text('新建个人信息').findOne().parent().click()
log('新建个人信息')
text('头像').waitFor()
log('找到了 头像')
昵称数组 = qqName.split('\n')
本次昵称 = 昵称数组.shift()
log('本次昵称：'+本次昵称)

昵称数组 = 昵称数组.toString().replace(/,/g, '\n')
log('保存昵称数组:'+昵称数组)

files.write(配置.路径.qq昵称, 昵称数组)

className('EditText').findOne().setText(本次昵称)
log('设置昵称完成')

log('选择头像文件')
头像文件列表 = files.listDir(imgsPath, function(name){
    return name.endsWith('.jpg') || name.endsWith('.png')
})
log(头像文件列表)

头像文件 = 头像文件列表[random(0, 头像文件列表.length - 1)]

log('移动头像')
files.move(imgsPath+头像文件, '/sdcard/'+头像文件)
media.scanFile("/sdcard/" + 头像文件)

text('头像').findOne().parent().click()
log('点击头像')
sleep(random(500, 1000))
text('从相册选择图片').findOne().parent().click()
log('从相册选择图片')
text('最近照片').waitFor()
sleep(random(1000, 2000))
第一张图片 = id('photo_list_gv').findOne().child(0)

Tap(第一张图片.bounds().centerX(), 第一张图片.bounds().centerY())

text('移动和缩放').waitFor()
sleep(2000, 3000)
text('完成').findOne().click()

//删除照片
text('新建个人信息').waitFor()
log('新建个人信息')
sleep(1000)
text('保存').findOne().click()
log('保存')
sleep(2000)
text(本次昵称).waitFor()
log('本次昵称出现了')

if (text('申请获取你的QQ头像、昵称、地区和性别信息').findOne(30 * 1000)) {

    log('保存成功')
    sleep(2000)

} else {
    log('保存失败')
    return false
}



while (1) {
    if (textContains('填写资料').findOne(3000)) {
        log('找到了填写资料')
        break
    } else {
        qq授权登录按钮 = id("fds").findOnce()
        if (qq授权登录按钮) {
            log('点击qq授权登录：'+qq授权登录按钮.click())
        } else {
            log('没有找到qq授权登录按钮')
        }
    }
}

return true

function getRandomStr (_str, _sign) {

    _arr = _str.split(_sign)

    return _arr[random(0, _arr.length - 1)]
    
}