"ui";
var 配置 = storages.create("DSJL");
//     包名：com.17kan.dsjl
var version = "1.8"
//脚本破解,源码提取,还原.合作微信:zxkj6898 或zx033245 或QQ168196007
ui.layout(
    <vertical>
        <appbar>
            <toolbar id="bt" title="抖音养号【聚福网络科技】" />
        </appbar>
        <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" />
        <horizontal>
            <text text="  抖音客户端：" gravity="left" />
            <spinner id="khd" entries="抖音短视频|抖音极速版" />
        </horizontal>
        <horizontal>
            <text text="  养号总时间：" gravity="left" />
            <input id="yhsc" hint="时间(分钟)" textSize="15sp" inputType="number" gravity="center" />
            <text text="    喜欢概率：" gravity="left" />
            <input id="xhgl" hint="喜欢概率" textSize="15sp" inputType="number" gravity="center" />
        </horizontal>
        <horizontal>
            <text text="  浏览作品时间：" gravity="left" />
            <input id="jg" hint="最小值" textSize="15sp" inputType="number" gravity="center" />
            <text text="----" gravity="center" />
            <input id="jg1" hint="最大值" textSize="15sp" inputType="number" gravity="center" />
            <text text="   秒" gravity="left" />
        </horizontal>
        {/* <horizontal>
            <text text="  垂直领域：" gravity="left" />
            <spinner id="领域" entries="影视剪辑|教育|母婴|拍摄技巧|其它" />
        </horizontal> */}
        <horizontal>
            <text text="  作品关键词：" gravity="left" />
            <input id="key" hint="务必填写，不填写无法养号！" textSize="15sp" />
        </horizontal>
        <text text="   温馨提示：" gravity="left" />
        <text text="   1.软件根据关键词识别作品是否浏览；" gravity="left" />
        <text text="   2.关键词尽量精准，才能使账号更加垂直；" gravity="left" />
        <text text="   3.可设置多个关键词，分隔符“,”；" gravity="left" />
        <text text="   4.例如：剪辑,影视,观影,60帧等；" gravity="left" />
        <text text="   5.关键词尽可能多而精准；" gravity="left" />
        <text text="   6.垂直养号更容易上热门；" gravity="left" />
        <horizontal>
            <text text="   系统提示：" gravity="left" />
            <checkbox id="支持" text="本软件无需root权限。" checked="true" />
        </horizontal>

        <horizontal>
            <text id="ver" text="   当前软件版本：1.6.0   " gravity="left" />
            <text id="安卓版本" textSize="15sp" />
        </horizontal>

        <button id="start" text="开始运行" />
    </vertical>
);
ui.安卓版本.text("   本机安卓版本：" + device.release + "");
ui.ver.text("   当前软件版本：" + version + "     ");
ui.bt.title = "抖音养号【聚福网络科技】 V" + version;
ui.autoService.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.emitter.on("resume", function () {
    ui.autoService.checked = auto.service != null;
});


readconfig()

ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

var 悬块 = function (window, view) {
    if (!window || !view) {
        throw "缺参数";
    };
    this.x = 0, this.y = 0;
    this.windowX, this.windowY;
    this.downTime = 500;
    this.Timeout = 0;
    this.Click = function () { };
    this.LongClick = function () { };
    this.setClick = function (fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };
    this.setLongClick = function (fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
            //移动事件。
            case event.ACTION_MOVE:
                //移动距离过大则判断为移动状态
                // if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                //     //移动状态清除定时器
                //     if (this.Timeout) {
                //         //定时器存在则清除定时器。
                //         clearTimeout(this.Timeout);
                //         this.Timeout = 0;
                //     };
                //     //移动手指时调整悬浮窗位置
                //     window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
                // };
                return true;
            //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    this.Click();
                };
                return true;
        };
        return true;
    }));
};


var startime = Date.parse(new Date());
var 点赞数量 = 0;
var 浏览数量 = 0;
ui.start.on("click", function () {
    //程序开始运行之前判断无障碍服务
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    saveconfig();
    xf();
    抖音();
});

function 抖音() {
    主线程 = threads.start(function 抖音ll() {
        console.show();
        // 检测更新(version)
        //强制更新(version)
        ts("执行操作：脚本开始运行");
        //app.launchApp("抖音短视频");
        //app.launchPackage("com.ss.android.ugc.aweme.lite");
        返回首页(); 
        sleep(1000);
        // if (_判断是否登录()) {
        _养号()
        //}
        // else {
        //     ts("操作提示：运行结束，请登录后重试");
        //     exit();
        // }

    })
}

function xf() {
    var thread = threads.start(function op() {
        var window = floaty.window(
            <button id="but" w="auto" h="auto" text="stop" />
            // <button id="but" text="stop" />
        );
        window.setPosition(10, device.height / 2)
        setInterval(() => { }, 500);
        var ad = new 悬块(window, window.but);
        ad.setLongClick(function () {
            var yxtime = (Date.parse(new Date()) - startime) / 1000;
            yxtime = formatSeconds(yxtime);
            log("提示：用户停止运行");
            log("时间提示：运行" + yxtime);
            log("浏览作品：" + 浏览数量);
            log("点赞作品：" + 点赞数量);
            exit();
        });
        ad.setClick(function () {
            var yxtime = (Date.parse(new Date()) - startime) / 1000;
            yxtime = formatSeconds(yxtime);
            log("提示：用户停止运行");
            log("时间提示：运行" + yxtime);
            log("浏览作品：" + 浏览数量);
            log("点赞作品：" + 点赞数量);
            exit();
        })
    })
    //创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。

}


function saveconfig() {
    配置.put("xhgl", ui.xhgl.text());
    配置.put("jg", ui.jg.text());
    配置.put("jg1", ui.jg1.text());
    配置.put("key", ui.key.text());
    配置.put("yhsc", ui.yhsc.text());
    // 配置.put("gzsl", ui.gzsl.text());
    // 配置.put("gzjg", ui.gzjg.text());
    // 配置.put("养号", ui.养号.checked);
    配置.put("支持", ui.支持.checked);
    // 配置.put("私信", ui.私信.checked);
    配置.put("khd", ui.khd.getSelectedItemPosition());
    // 配置.put("sx1", ui.sx1.text());
    // 配置.put("sx2", ui.sx2.text());
    // 配置.put("随机表情", ui.随机表情.checked);

}

function readconfig() {
    if (配置.get("xhgl", "") == "") {
        ui.xhgl.text("60");
    } else {
        ui.xhgl.text(配置.get("xhgl", ""));
    }

    if (配置.get("jg", "") == "") {
        ui.jg.text("20");
    }
    else {
        ui.jg.text(配置.get("jg", ""));
    }

    if (配置.get("jg1", "") == "") {
        ui.jg1.text("45");
    }
    else {
        ui.jg1.text(配置.get("jg1", ""));
    }

    if (配置.get("yhsc", "") == "") {
        ui.yhsc.text("30");
    }
    else {
        ui.yhsc.text(配置.get("yhsc", ""));
    }
    if (配置.get("支持", "") == "") {
        ui.支持.checked = true;
    }
    else {
        ui.支持.checked = Boolean(配置.get("支持", ""));
    }
    ui.key.text(配置.get("key", ""));
    // ui.gzsl.text(配置.get("gzsl", ""));
    // ui.gzjg.text(配置.get("gzjg", ""));
    // ui.关注.checked = Boolean(配置.get("关注", ""));
    // ui.私信.checked = Boolean(配置.get("私信", ""));
    if (parseInt(配置.get("khd", ""))) {
        ui.khd.setSelection(parseInt(配置.get("khd", "")));
    };
    // ui.sx1.text(配置.get("sx1", ""));
    // ui.sx2.text(配置.get("sx2", ""));
    // ui.随机表情.checked = Boolean(配置.get("随机表情", ""));

}

function _视频检测() {
    var h = device.height;
    var keyword = ui.key.text();
    var uc = textMatches(".......*+").find()
    for (i = 0; i < uc.length; i++) {
        if (uc[i].bounds().top > h * 2 / 3 && uc[i].bounds().bottom < h) {
            // log(uc[i].text());
            //log(uc[i].bounds());
            if (uc[i].text().indexOf("[t]") > 0) {
                log("广告作品，自动跳过");
                return false;
            }
            var str = keyword.split(',');
            for (k = 0; k < str.length; k++) {
                if (uc[i].text().indexOf(str[k]) > 0) {
                    log("检测成功，视频符合");
                    浏览数量 = 浏览数量 + 1;
                    log("关键词：" + str[k]);
                    return true;
                }
            }
        }

    }
    return false;
}

function _养号() {
    var W = device.width;
    var H = device.height;
    var mt = Date.parse(new Date());
    返回首页();
    if (配置.get("key", "") == "") {
        ts("系统提示：没有添加关键词。");
        ts("系统提示：请添加后重试！");
        exit();
    }
    while (true) {
        if (_视频检测()) {
            var sj = random(parseInt(ui.jg.text()), parseInt(ui.jg1.text()));
            if (!isNaN(sj)) {
                ts("浏览时间：" + sj + "秒");
                sleep(sj * 1000);
            } else {
                ts("浏览时间：15秒");
                sleep(15 * 1000);
            }
            var sjs = random(1, 100);
            if (parseInt(ui.xhgl.text()) > sjs) {
                // console.log("执行操作：双击点赞");
                click(W / 2, H / 2);
                sleep(50);
                click(W / 2, H / 2);
                sleep(1000);
                点赞数量 = 点赞数量 + 1;
                log("系统提示：点赞数量：" + 点赞数量);
            }
        };
        swipe(W / 2, H * 4 / 5, W / 2, H / 6, random(300, 1000));
        sleep(100);
        if (text("编辑资料").exists()) {
            返回首页();
        };
        if (Date.parse(new Date()) - mt > 1000 * 60 * parseInt(配置.get("yhsc", ""))) {
            ts("系统提示：养号结束。");
            var yxtime = (Date.parse(new Date()) - startime) / 1000;
            yxtime = formatSeconds(yxtime);
            log("时间提示：运行" + yxtime);
            log("浏览作品：" + 浏览数量);
            log("点赞作品：" + 点赞数量);
            return;
        }
        _弹窗();
        sleep(100);
    }
};
//脚本破解,源码提取,还原.合作微信:zxkj6898 或zx033245 或QQ168196007
function _弹窗() {
    if (text("我知道了").exists()) {
        text("我知道了").findOne().click();
    }
    if (text("允许").exists()) {
        text("允许").findOne().click();
    }
    if (text("取消").exists()) {
        text("取消").findOne().click();
    }
    if (text("以后再说").exists()) {
        text("以后再说").findOne().click();
    }
    if (text("继续播放").exists()) {
        text("继续播放").findOne().click();
    }
}

function _判断是否登录() {
    返回首页()
    while (true) {
        _弹窗()
        if (text("我").exists()) {
            var b = text("我").findOne().bounds();
            if (b) {
                click(b.centerX(), b.centerY());
                sleep(1000);
            };
        };
        if (text("编辑资料").exists() || text("分享主页").exists() || text("编辑企业资料").exists()) {
            ts("操作提示：账号已登录")
            return true;
        };
        if (text("密码登录").exists()) {
            ts("操作提示：账号未登录")
            return false;
        };
        if (text("您的收藏在这里").exists()) {
            back();
            sleep(1000);
        };
        sleep(100);
    }
};


function 返回首页() {
    if (parseInt(配置.get("khd", "")) == 1) {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "snssdk2329://feed"
        });
    } else {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data: "snssdk1128://feed"
        });
    }
    sleep(100);
}

function ts(text) {
    log(text)
}


function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if (secondTime > 60) {
        minuteTime = parseInt(secondTime / 60);
        secondTime = parseInt(secondTime % 60);
        if (minuteTime > 60) {
            hourTime = parseInt(minuteTime / 60);
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    var result = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
        result = "" + parseInt(minuteTime) + "分" + result;
    }
    if (hourTime > 0) {
        result = "" + parseInt(hourTime) + "小时" + result;
    }
    return result;
}

function 检测更新(version) {
    var baseUrl = "http://49.232.50.82/";
    var res = http.get(baseUrl + "/soft/ver.html");
    var ver = res.body.string();
    if (ver > version) {
        //log("发现新版本：\n当前版本：" + version + "\n最新版本：" + ver);
        res = http.get(baseUrl + "/soft/up.html");
        res = res.body.string();
        confirm("有新版本可以更新", "当前版本：" + version + "\n\n最新版本： " + ver + "\n\n更新内容： " + res, (value) => {
            if (value) {
                threads.start(function () {
                    toast("正在更新…");
                    codePath = engines.myEngine().cwd() + "/抖商精灵.js";
                    files.write(codePath, http.get(baseUrl + "/soft/dy.html").body.string())
                    engines.execScriptFile(codePath);
                    toast("更新完成\n\n请重新打开软件");
                    exit();
                })
            } else {
                toastLog("已取消更新。\n下次打开将再次提示")
            }
        })
    } else {
        log("版本检测：当前为最新版。");
    };
}


function 强制更新(version) {
    var baseUrl = "http://49.232.50.82/";
    threads.start(function () {
        codePath = engines.myEngine().cwd() + "/抖商精灵.js";
        files.write(codePath, http.get(baseUrl + "/soft/dy.html").body.string())
        engines.execScriptFile(codePath);
    })
}

