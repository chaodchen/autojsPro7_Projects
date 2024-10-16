//定义坐标数组
let coorArr = ["1558|757", "1184|466", "1746|1000", "946|1011"];




/**
 * 随机点击坐标函数
 */
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


while_click_coor_array(coorArr);
