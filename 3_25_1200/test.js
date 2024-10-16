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

function 获取手机号 (项目id, _token) {

    _api = 'http://xiangjiuer.cn/sms/api/getPhone?token='+_token+'&sid='+项目id
    while (1) {

        try {
            _res = http.get(_api)
            if (_res.statusCode >= 200 || _res.statusCode < 300) {
                log('获取手机号api请求成功') 
                _res = JSON.parse(_res.body.string())
                return _res
            }
        } catch (_err) {
    
        }
    }

}

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

token_str = 登陆('api-hQSfIHqk', '112233zx')
phoneNum = 获取手机号(258, token_str)
code = 获取验证码(258, token_str, phoneNum)
log(code)