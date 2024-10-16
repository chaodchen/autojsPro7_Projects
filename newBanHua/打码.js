
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
log('11111')


滑动(打码());
function 打码 () {
    log('开始打码');
    let 截屏 = captureScreen();
    if (截屏) {
        log('开始剪切图片');
        图片 = images.clip(截屏, 170, 725, 748, 405);
        images.save(图片, '/sdcard/验证码.png')
        let 打码结果 = getCode('a17685034710', '340822chen...', '20864', 'rIBSLfoRFOr2PZqq3xrK6bbp1Wt7hjmQk3l8gqGf', 图片);
        if (打码结果.code == 0) {
            log('打码成功!');
            码 = 打码结果.data.res;
            console.info('码为：'+码)
            return 码;
        } else {
            log('打码失败');
            return null;
        }

    } else {
        log('截屏失败');
    }
}

function 滑动 (码) {
    let 坐标a = Number(码.split(',')[0]) + 170 + 80;
    let 坐标b = Number(码.split(',')[1]) + 725 + 245;

    // for (let i = 0; i < 4; i++) {
    //     let ss = ''

    // }
    gesture(random(500, 1000), [350, 1200], [444, 1111], [490, 1201], [坐标a, 坐标b]);

    // swipe(350, 1200, 坐标a, 坐标b, random(500, 1000));
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
    log('打码返回-->>  '+JSON.stringify(d))
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
