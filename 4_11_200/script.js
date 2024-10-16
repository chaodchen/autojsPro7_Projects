//导入函数库
mods = require('mods.js')

//读取本地储存
本地储存 = storages.create(配置.代号)

//初始化变量

全局数组 = 本地储存.get('UI配置').index

_脚本延迟 = 全局数组[0]

log('全局数组：'+全局数组)


while (1) {

    主页()
    附近的人()
    toastLog("延迟"+_脚本延迟+'秒！')
    sleep(_脚本延迟 * 1000)
}

//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>函数库>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function 附近的人 () {
    if (mods.view.waitViews(['nick_name', 'signature'], 'id', 1000, 2)) {
        log('进入附近的人成功')
    } else {
        log('进入附近的人失败')
        text('附近的人').findOne().parent().click()
    }
}

function 主页 () {
    while (1) {
        if (mods.view.waitViews(['扫一扫', '找朋友', '好友圈'], 'text', 1000, 2)) {
            log('进入主页成功')
            break
        } else {
            toastLog('没有找到主页')
            back()
        }
    }
}