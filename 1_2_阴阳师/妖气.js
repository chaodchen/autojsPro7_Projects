if(!requestScreenCapture()){
    toast("请求截图失败");
    stop();
}

auto.waitFor();
toastLog('开始运行');

let 准备 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/zhunbei.png');
let 福 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/fu.png');
let 组队 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/zudui.png');
let 匹配 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/zidongpipei.png');
let 卷轴 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/juanzhou.png');
let 拒绝 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/jvjue.png');
let 胜利 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/shengli.png');
let 排队 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/paidui.png');
let 失败 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/720p/shibai.png');

let 原始分辨率 = {
    w : 720,
    h : 1280
}

let 点击偏移 = 10;

function 自适应 (img, res) {
    return images.scale(img, device.width/Number(res.w), device.height/Number(res.h));
}

while (1) {
    let jt = captureScreen();
    let tapobj = null;

    if (images.findImage(jt, 自适应(排队, 原始分辨率))) {
        log("排队");
        continue;
    }

    
    if (tapobj = images.findImage(jt, 自适应(准备, 原始分辨率))) {
        log("准备");
        点击图片(tapobj, 点击偏移);
    } else if (tapobj = images.findImage(jt, 自适应(福, 原始分辨率))) {
        log("福");
        点击图片(tapobj, 点击偏移);
        
    } else if (tapobj = images.findImage(jt, 自适应(组队, 原始分辨率))) {
        log("组队");
        点击图片(tapobj, 点击偏移);

    } else if (tapobj = images.findImage(jt, 自适应(匹配, 原始分辨率))) {
        log("匹配");
        点击图片(tapobj, 点击偏移);

    } else if (tapobj = images.findImage(jt, 自适应(卷轴, 原始分辨率))) {
        log("卷轴");
        点击图片(tapobj, 点击偏移);

    } else if (tapobj = images.findImage(jt, 自适应(拒绝, 原始分辨率))) {
        log("拒绝");
        点击图片(tapobj, 点击偏移);

    } else if (tapobj = images.findImage(jt, 自适应(胜利, 原始分辨率))) {
        log("胜利");
        点击图片(tapobj, 点击偏移);

    } else if (tapobj = images.findImage(jt, 自适应(失败, 原始分辨率))) {
        log("失败");
        点击图片(tapobj, 点击偏移);

    } else {
        log("---------");
    }

    sleep(1000);
}

function 点击图片 (point, z) {

    if (!z) z = 0;
    let x = point.x + random(-z, z), y = point.y + random(-z, z)
    log('本次点击坐标x：%d，坐标y:%d', x, y);
    press(x, y, random(50, 100));
}

