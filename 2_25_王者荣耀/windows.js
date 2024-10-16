setScreenMetrics(1080, 1920);
//图标颜色
var imgColor = '#FFD700';
//QQ群
var qun = "191763234";
//主线任务
var task = 0;
//是否显示body
var icon_able = false;
//是否显示日志
var logs_able = false;
//脚本是否开始
var run_able = false;

var window = floaty.window(
    <relative>
        <img id='icon' layout_centerVertical='true' scaleType='centerCrop' src='http://aj.8888-8.cn/appImg/2_25_王者荣耀/window.png' w='35dp' h='35dp'></img>
        
        <vertical id='body' layout_toRightOf='icon' visibility='gone' marginLeft='10dp' layout_toRightOf='icon' alpha='0.9'>
            <card cardCornerRadius='10dp' cardElevation='5dp'>
                <horizontal padding='5dp'>
                    <img id='start' tint='{{imgColor}}' circle='true' scaleType='centerCrop' src='@drawable/ic_play_circle_outline_black_48dp' w='35dp' h='35dp'></img>
                    <img id='logs' tint='{{imgColor}}' circle='true' marginLeft='10dp' scaleType='centerCrop' src='@drawable/ic_visibility_black_48dp' w='35dp' h='35dp'></img>
                    <img id='group' tint='{{imgColor}}' circle='true' marginLeft='10dp' scaleType='centerCrop' src='@drawable/ic_group_add_black_48dp' w='35dp' h='35dp'></img>
                    <img id='end' tint='{{imgColor}}' circle='true' marginLeft='10dp' scaleType='centerCrop' src='@drawable/ic_power_settings_new_black_48dp' w='35dp' h='35dp'></img>
                </horizontal>
            </card>
        </vertical>
    </relative>
);

// log(window.getWidth());

window.setPosition(0, device.width * 0.5);

window.icon.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            log("调用到了")
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) <= 10 && Math.abs(event.getRawX() - x) <= 10) {
                icon_click();
            }
            return true;
    }
    return true;
});


window.start.on("click", start_click);

window.logs.on("click", logs_click);

window.group.on("click", group_click);

window.end.on("click", end_click);



/**点击图标 */
function icon_click() {
    if (icon_able) {
        ui.run(() => {
            log("隐藏");
            window.body.setVisibility(android.view.View.INVISIBLE);
            icon_able = false;
        });
    } else {
        ui.run(() => {
            log("显示");
            window.body.setVisibility(android.view.View.VISIBLE);
            icon_able = true;
        });
    }
}

function run_script () {

    /**随机点击坐标函数 */
    this.while_click_coor_array = function (coorArr, delayTime, coorRange) {
        if (!coorArr) throw "请输入coorArr坐标数组";
        //点击之后延迟时间
        delayTime = delayTime || "1-2";
        //点击的随机范围
        coorRange = coorRange || 12;
    
        this.click_coor_random_delay_sec = function (numStr, ide) {
            if (!ide) throw "【click_coor_random_num】请输入参数ide用来分割随机数字";
            if (!numStr) throw "【click_coor_random_num】请输入numStr参数";
            let s = numStr.split(ide);
            return random(s[0] * 1000, s[1] * 1000) / 1000;
        }
    
        this.click_coor_random_coor = function (coorStr, range) {
            if (!coorStr) throw "【click_coor_random_coor】请输入coorStr参数";
            if (!range) throw "【click_coor_random_coor】请输入range参数";
            range = Number(range);
            coorStr = Number(coorStr);
            coorStr_start = coorStr - range;
            coorStr_end = coorStr + range;
            
            // console.info("开始随机在%d和%d之间随机", coorStr_start, coorStr_end);
            return random(coorStr_start, coorStr_end);
        }
    
        this.click_coor_adap_coor = function (coorStr, reso) {
            if (!coorStr) throw "【click_coor_adap_coor】请输入关键参数coorStr";
            
            reso = reso || {
                w : 1080,
                h : 1920
            }
    
            return {
                x : coorStr.x / (reso.w / device.width),
                y : coorStr.y / (reso.h / device.height)
            }
        }
    
        this.click_coor = function (coor) {
            
            if (!coor) throw "【click_coor】请输入坐标";
            if (coor.indexOf("|") == -1) throw "【click_coor】坐标格式不正确，需要加入|字符";
    
            let x = coor.split("|")[0];
            let y = coor.split("|")[1];
            console.info("x坐标为：%s，y坐标为：%s", x, y);
    
    
            //开始适配分辨率
            if (coorRange != 0) {
                x = click_coor_random_coor(x, coorRange);
                y = click_coor_random_coor(y, coorRange);
                console.info("随机转化后x坐标为：%s，y坐标为：%s", x, y);
            }
    
            //开始点击
            press(x, y, random(50, 99));
    
            let sec = click_coor_random_delay_sec(delayTime, "-");
            console.info("开始随机延迟%d秒", sec);
            sleep(sec * 1000);
        }
    
        while (1) {
            coorArr.forEach((c) => {
                if (c) {
                    click_coor(c);
                }
            });
            // console.info("延迟5秒钟！");
            // sleep(5 * 1000);
        }
    }
    

    switch (task) {
        case 0:
            log("冒险模式");
            var coorArr = ["1533|988", "1473|900"];
            while_click_coor_array(coorArr);
            break;
        case 1:
            log("武道大会");
            var coorArr = ["1558|757", "1184|466", "1746|1000", "946|1011"];
            while_click_coor_array(coorArr);
            break;
        case 2:
            log("六国远征");
            break;
        default:
            toastLog("未知任务!");
    }
}

/**开始脚本 */
function start_click () {
    if (run_able) {
        ui.run(() => {
            log("暂停");
            window.start.setSource("@drawable/ic_play_circle_outline_black_48dp");
            run_able = false;
        });
        if (th.isAlive()) {
            log("停止脚本运行线程");
            th.interrupt();
        }
        
    } else {
        ui.run(() => {
            log("启动");
            window.start.setSource("@drawable/ic_pause_circle_outline_black_48dp");
            run_able = true;

            log("隐藏");
            window.body.setVisibility(android.view.View.INVISIBLE);
            icon_able = false;
        });

        th = threads.start(function () {
            run_script();
        });


    }
}

/**显示日志 */
function logs_click () {
    if (logs_able) {
        ui.run(() => {
            log("隐藏");
            window.logs.setSource("@drawable/ic_visibility_black_48dp");
            console.hide();
            logs_able = false;
        });
    } else {
        ui.run(() => {
            log("显示");
            window.logs.setSource("@drawable/ic_visibility_off_black_48dp");
            console.show();
            logs_able = true;
        });

    }
}

/**加群 */
function group_click() {
    try {
        app.startActivity({
            action: "android.intent.action.VIEW",
            data:   "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=" + qun + "&card_type=group&source=qrcode"
        });
    } catch (e) {
        toast("加入 " + qun + " QQ群失败,手动加吧");
    }
}

/**退出 */
function end_click() {
    toastLog("退出");
    console.hide();
    engines.stopAll();
}


setInterval(()=>{}, 1000);

