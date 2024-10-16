账号 = 配置.用户.斑马api
密码 = 配置.用户.斑马密码

log('账号:'+账号)
log('密码:'+密码)

text('更多').findOne().parent().parent().click()
log('更多')
text('我的动态').waitFor()
id('setting_layout').findOne().click()
log('修改资料')

text('设置').waitFor()
text('帐号与安全').findOne().parent().click()
log('账号与安全')
text('密码修改').waitFor()

text('手机绑定').findOne().parent().click()
log('手机绑定')
text('为了你的帐号安全，请先绑定手机号').waitFor()
log('为了你的账号安全')
text('绑定手机号').findOne().click()
log('绑定手机号')
text('手机绑定').waitFor()

token = 登陆(账号, 密码)
log('token-->>  '+token)
验证码 = ''


while (1) {

    手机号 = 获取手机号(258, token)
    log('输入手机号-->>  '+手机号)

    if (手机号!= null && 手机号.length != 11) {
        log('手机号码获取错误')
        continue
    }

    id('edit_phone').findOne().setText(手机号)

    log('获取验证码')
    text('获取验证码').findOne().click()

    for (let i = 0; i < 11; i++) {

        验证码str = 获取验证码(258, token, 手机号)
        log(验证码str)
        if (验证码str.code == -1) {
            log('sms:'+验证码str.msg)
        } else if (验证码str.code == 0) {
            验证码 = 验证码str.sms.match(/\d{6}/)
            log('输入验证码：'+验证码)
            text('请输入六位数验证码').findOne().setText(验证码)
            log('提交')
            text('提交').findOne().click()
            log('提交成功')
            log('手机号-->>  '+手机号)
            files.append(配置.路径.账号数据+'.m.txt', 手机号+'---')
            _loop = false
            break
        } else {
            log('获取验证码失败：'+验证码.msg)
        }
        sleep(5 * 1000)
    }

    if (验证码 == '') {
        log('重新获取一次')
    } else {
        break
    }
}


log('释放-->>  '+释放(258, 手机号, token))

// log('释放-->>  '+拉黑(2, 手机号, token))

while (1) {

    if (text('我的动态').exists() && text('谁看过我').exists()) {
        log('返回主页成功')
        break
    } else {
        back()
        sleep(random(1000, 2000))
    }

}

//functionfunctionfunctionfunctionfunctionfunctionfunctionfunctionfunction
function 获取验证码 (项目id, _token, _手机号) {
    _api = "http://xiangjiuer.cn/sms/api/getMessage?token="+_token+"&sid="+项目id+"&phone="+_手机号
    while (1) {
        try {
            _res = http.get(_api)
            if (_res.statusCode == 200) {
                log('获取验证码api请求成功')
                _接码返回 = JSON.parse(_res.body.string())
                break
            }
        } catch (err) {
            log('获取验证码报错')
        }
    }

    return _接码返回

}

function 获取手机号 (项目id, _token) {

    _api = 'http://xiangjiuer.cn/sms/api/getPhone?token='+_token+'&sid='+项目id
    while (1) {

        try {
            _res = http.get(_api)
            if (_res.statusCode >= 200 || _res.statusCode < 300) {
                log('获取手机号api请求成功') 
                _res = JSON.parse(_res.body.string())
                return _res.phone
            }
        } catch (_err) {
            console.error('获取手机号报错：'+_err+'\n'+_res)
            exit()
        }
    }

}

function 登陆 (_账号, _密码) {

    _api = 'http://xiangjiuer.cn/sms/api/login?username='+_账号+'&password='+_密码
    while (1) {

        try {
            _res = http.get(_api)
            if (_res.statusCode >= 200 || _res.statusCode < 300) {
                log('登陆api请求成功') 
                return _res.body.json().token
            }
        } catch (_err) {

        }

    }
}
function 释放 (项目id, _手机号, _token) {
    _api = "http://xiangjiuer.cn/sms/api/cancelRecv?token="+_token+"&sid="+项目id+"&phone="+_手机号
    while (1) {
        try {
            _res = http.get(_api)
            if (_res.statusCode >= 200 || _res.statusCode < 300) {
                log('释放api请求成功') 
                _res = JSON.parse(_res.body.string())
                return _res
            }
        } catch (_err) {
            console.info('释放号码报错')
        }
    }
}

function 拉黑 (项目id, _手机号, _token) {
    _api = 'http://to.banma1024.com/api/do.php?action=addBlacklist&sid='+项目id+'&phone='+_手机号+'&token='+_token
    while (1) {

        try {
            _res = http.get(_api)
            if (_res.statusCode >= 200 || _res.statusCode < 300) {
                log('拉黑api请求成功') 
                return _res.body.string().split('|')[1]
            }
        } catch (_err) {
    
        }
    
    }
}