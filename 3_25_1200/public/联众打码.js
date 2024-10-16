// if(!requestScreenCapture()){
//     toast("请求截图失败");
//     exit()
// }

联众账号 = 配置.用户.联众账号
联众密码 = 配置.用户.联众密码
应用ID = 配置.用户.应用id
应用密钥 = 配置.用户.应用key

log('联众账号：'+联众账号)
log('联众密码：'+联众密码)
log('应用ID：'+应用ID)
log('应用密钥：'+应用密钥)

返回值 = false

while (1) {
    截屏 = captureScreen()
    if (截屏) {
        log('剪切图片')
        if (device.width == 1080) {
            log('1080分辨率')
            二维码图片 = images.clip(截屏, 330, 230, 400, 200)
        } else if (device.width == 720) {
            log('720分辨率')
            二维码图片 = images.clip(截屏, 215, 159, 285, 100)
        }
        images.save(二维码图片, '/sdcard/.934082222/验证码.png')
    }

    try {
        打码结果 = getCode(联众账号, 联众密码, 应用ID, 应用密钥, 二维码图片)
        if (打码结果.code == 0) {
            log('打码成功')
            打码结果 = 打码结果.data.res
            log('打码结果为：'+打码结果)
            className('EditText').findOne().setText(打码结果)
            text('完成').findOne().click()
    
            //判断验证码是否正确
            qq授权登陆 = text('QQ授权登录').findOne(15 * 1000)
            if (qq授权登陆) {
                log('验证码正确')
                返回值 = true
                break
            } else {
                log('验证码错误')
                返回值 = false
                break
            }
        } else {
            log('打码失败')
        }
    } catch (_err) {
        log('打码报错')
    }
}

return 返回值

function getCode(username, password, sid, key, img) {
    http.__okhttp__.setTimeout(3e4);
    var r = images.toBase64(img, format = "png"), i = device.release, c = device.model, s = device.buildId;
    try {
        var n = http.postJson("https://v2-api.jsdama.com/upload", {
            softwareId: sid,
            softwareSecret: key,
            username: username,
            password: password,
            captchaData: r,
            captchaType: 1001,
            captchaMinLength: 0,
            captchaMaxLength: 0,
            workerTipsId: 0
        }, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android " + i + "; " + c + " Build/" + s + "; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 Mobile Safari/537.36",
            }
        });
    } catch (e) {
        return {
            code: "-1",
            msg: "网络链接超时...",
            data: {}
        };
    }
    var d = n.body.json(), p = d.code, m = d.message;
    log('打码返回-->>  '+d)
    if ("10079009" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142004" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10142005" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("10079006" == p) return {
        code: p,
        msg: m,
        data: {}
    };
    if ("0" == p) {
        return {
            code: p,
            msg: m,
            data: {
                res: d.data.recognition
            }
        };
    }
    return d;
}