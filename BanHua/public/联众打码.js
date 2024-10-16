function 打码 (lz_user, lz_pass, lz_id, lz_key) {
    let 左上角 = {
        x:259,
        y:740
    }

    let 宽高 = {
        宽:561,
        高:341
    }

    let 截图 = images.captureScreen()

    log('开始裁剪图片')

    let 滑块图 = images.clip(截图, 左上角.x, 左上角.y, 宽高.宽, 宽高.高)

    log('保存滑块图片')

    images.save(滑块图, '/sdcard/yanzhengma.png')

    try {
        let 打码结果 = getCode(lz_user, lz_pass, lz_id, lz_key, 滑块图).data.res
        log(打码结果)
        return 打码结果
    } catch (_err) {
        console.error('打码错误：'+_err)
        return null
    }

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
                captchaType: 1318,
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
}

try {
    if(!requestScreenCapture()){
        toast("请求截图失败");
        exit()
    }
} catch (_err) {
    console.error('申请截屏权限报错：'+_err)

}

打码('a17685034710', '340822chen...', '19936', 'afBTzNEJ8oCcdq198g7wvCVNb3DAO17gG1mXg9az')