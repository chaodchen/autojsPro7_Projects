while (1) {
    _i = id('img_qq').findOnce()
    _t = text('QQ登录').findOnce()

    if (_i) {
        log('找到了qq登录图标')

        _i.click()
        
        break
    } else if (_t) {
        log('找到了qq登录文本')
        _t.parent().click()
        break
    } else {
        log('等待进入陌陌主页')
    }
}

text('申请获取你的QQ头像、昵称、地区和性别信息').waitFor()
log('申请获取你的QQ头像、昵称、地区和性别信息')
