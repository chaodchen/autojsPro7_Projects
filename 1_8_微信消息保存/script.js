console.show();

// log("不给维护费用你妈脚本？傻逼东西");
main();

function main () {
    /**
     * 
     * @param {年} year 
     * @param {月} month 
     * @param {日} day 
     * @param {需要加的天数} diff 
     * 时间数据相加函数
     */
    this.DayAddDiff = function (year, month, day, diff) {
        var numDays = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
        var isLeap = false;
        var newyear = year;
        var newmonth = month - 1;
        var n = numDays[newmonth];
        var newday = day;
        var newdiff = diff;
        var ln;
        if (newmonth == 0)
            ln = 31;
        else if(newmonth == 11)
            ln = 31;
        else
            ln = numDays[newmonth + 1];
        if (diff != 0){
            //判断是否润年
            if (year % 4 == 0){
                if (year % 100 != 0)
                    isLeap = true;
                else{
                    if (year % 400 == 0)
                        isLeap = true;
                }
            }
            if (newmonth == 1 && isLeap)
                ++n;
                
            if (newmonth  == 0 && isLeap) 
                ++ln;
            //加值
            var newday = day + newdiff;
            if (newday > 0){
                if (newday > n){
                    newday = newday - n;
                    if (newmonth == 11)
                    {
                        newmonth = 0;
                        newyear += 1;
                        newdiff = newday - 1;
                        return DayAddDiff(newyear, newmonth + 1, 1, newdiff);
                    }
                    else{
                        newmonth += 1
                        newdiff = newday - 1;
                        return DayAddDiff(newyear, newmonth + 1, 1, newdiff);
                    }
                }
            }
            else if (newday == 0){
                if (newmonth == 0)
                {
                    newmonth = 11
                    newyear += -1;
                    newday = 31;
                }
                else{
                    newmonth += -1
                    newday = ln;
                }
            }
            else{
                if (newmonth == 0)
                {
                    newmonth = 11
                    newyear += -1;
                    newdiff = newday;
                    newday = 31;
                    return DayAddDiff(newyear, newmonth + 1, newday, newdiff);
                }
                else{
                    newmonth += -1;
                    newdiff = newday;
                    newday = ln;
                    return DayAddDiff(newyear, newmonth + 1, newday, newdiff);
                }
            }
        }
        //输出字符串
        var daystring = "";
        daystring += year;
        newmonth += 1;
        if (newmonth < 10)
            daystring += "/0" + newmonth;
        else
            daystring += "/" + newmonth;
        if (newday < 10)
            daystring += "/0" + newday;
        else
            daystring += "/" + newday;
        return daystring;
    }

    /**
     * 
     * @param {x月x日的文本日期转化为可读取对象} str 
     */
    this.getRiqi = function (str) {
        str = str.replace(/[年月日]/g, '/');

        if (str.charAt(str.length-1) == "/") {
            str = str.substr(0, str.length - 1);
            
        }
        return str;
    }


    /**
     * 
     * @param {把微信的聊天记录日期转化为正常格式} userTime 
     */
    this.wxTimeToNewTime = function (userTime) {
        userTime = userTime.trim();
        let date = new Date();
        let 年 = date.getFullYear();
        let 月 = date.getMonth();
        let 日 = date.getDate();
        let 时 = date.getHours();
        let 周 = date.getDay();
        if (周 == 0) {
            周 = 7
        }
        // log('%d年%d月%d日', 年,月,日)
        // log('今天是周%d', 周);

        if (userTime.indexOf("晚上") > -1) {
            userTime = userTime.replace(/[晚上]/g, "");
        }

        if (/\d{1,2}:\d{1,2}/.exec(userTime)) {
            log('24小时内');
            userTime = 年 + '/' + (月+1) + '/' + 日 + '/' + userTime.split(':')[0];  
        } else if (userTime.length >= 4 && userTime.length <= 6) {
            log('x月x日');
            userTime = getRiqi(年+'年'+userTime);
        } else if (/\d{4}年\d{1,2}月\d{1,2}日/.exec(userTime)) {
            log('xxxx年xx月xx日');
            userTime = getRiqi(userTime);
        } else if (userTime == '昨天') {
            log('昨天');
            userTime = DayAddDiff(年, (月+1), 日, -1);
            
        } else if (userTime == '周一') {
            log('周一');
            let 回退天数 = 周-1;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);
            
            
        } else if (userTime == '周二') {
            log('周二');
            let 回退天数 = 周-2;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);

        } else if (userTime == '周三') {
            log('周三');
            let 回退天数 = 周-3;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);
            
        } else if (userTime == '周四') {
            log('周四');
            let 回退天数 = 周-4;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);
        } else if (userTime == '周五') {
            log('周五');
            let 回退天数 = 周-5;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);

            
            
        } else if (userTime == '周六') {
            log('周六');
            let 回退天数 = 周-6;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);

            
        } else if (userTime == '周日') {
            log('周日');
            let 回退天数 = 周-7;
            log('回退天数：%d', 回退天数);
            userTime = DayAddDiff(年, (月+1), 日, -回退天数);
            
        } else if (/\d{4}\/\d{1,2}\/\d{1,2}/.exec(userTime)) {
            log("xxxx/xx/xx");
            userTime = userTime;
        } else {
            toastLog('您输入的时间格式不正确！'+userTime);
            exit();
            return null;
        }
        log("wxTimeToNewTime输出【%s】",userTime);
        return userTime;
    }


    /**
     * 
     * @param {目标日期} userTime 
     * @param {开始日期} startTime 
     * @param {结束日期} endTime 
     */
    this.isTimeInRight = function (userTime, startTime, endTime) {
        log("userTime-->> "+userTime);
        log("startTime-->> "+startTime);
        log("endTime-->> "+endTime);

        userTime = userTime.split('/');
        startTime = startTime.split('/');
        endTime = endTime.split('/');

        //开始转化
        let _userTime = new Date();
        _userTime.setFullYear(userTime[0], userTime[1], userTime[2]);
        _userTime.setHours(userTime[3] || 0);

        let _startTime = new Date();
        _startTime.setFullYear(startTime[0], startTime[1], startTime[2]);
        _startTime.setHours(startTime[3]);

        let _endTime = new Date();
        _endTime.setFullYear(endTime[0], endTime[1], endTime[2]);
        _endTime.setHours(endTime[3]);
        
        log('开始进行日期比较！');
        log("_userTim"+_userTime);
        log("_startTime"+_startTime);
        log("_endTime"+_endTime);
        if (_userTime >= _startTime && _userTime <= _endTime) {
            log('日期符合要求！');

            return true
        } else {
            log('日期不符合要求！');
            return false;
        }
    }


    /**
     * 
     * @param {要代入的字符串} $s_str_0 
     * 字符串用分隔符分割成随机范围的数字
     */
    this.Fn_n_RandomStrToNum = function ($s_str_0) {
        //以str_1分割，取一个随机数
        let str_1 = $s_str_0.replace(/\d/g, '');
        switch (typeof($s_str_0)) {
            case 'number':
                return $s_str_0
            case 'string':
                if ($s_str_0.indexOf(str_1) > -1) {
                    num_min = $s_str_0.split(str_1)[0]
                    num_max = $s_str_0.split(str_1)[1]
                    return random(Number(num_min), Number(num_max))
                } else {
                    return Number($s_str_0)
                }
            default:
                return 0;
        }
    }

    /**
     * 
     * @param {要代入的数字} $n_num 
     * @param {要取的范围} $n_num2 
     * 一般用于生成随机坐标
     */
    this.Fn_n_NumberToRundomNum = function ($n_num, $n_num2) {
        $n_num = Number($n_num),$n_num2 = $n_num2 || 10;
        return random($n_num - $n_num2 / 2, $n_num + $n_num2 / 2);
    }
    
    this.Fn_v_初始化 = function () {
        if (device.sdkInt <= 23) {
            toastLog("安卓版本不支持！");
            exit();
        }
        // home();
        sleep(2000);
        // while(!click("微信"));
        
        // log(shell("am start -n com.tencent.mm/com.tencent.mm.ui.LauncherUI", true).code);
        

        log("打开微信：", app.launchApp("微信"));
        
        text('通讯录').waitFor();
        desc("搜索").waitFor();
        toastLog('打开微信成功！');
        do {
            console.info("开始点击搜索");
            desc("搜索").findOne().click();
            sleep(2000);
        } while (!text("搜索指定内容").exists());

        log("搜索指定内容");
    }

    /**
     * 
     * @param {采集内容} s_dvh 
     * @param {采集范围} n_renge 
     * @param {聊天记录的时间} s_g8g 
     * 
     */
    this.Fn_v_采集聊天记录 = function (s_dvh, n_renge, s_g8g, s初始日期, s结束日期, s_path, s_采集对象, 返回标记) {
        s_path = s_path + "wx.txt"
        console.warn("开始【Fn_v_采集聊天记录】函数");
        console.info("采集条数【%d】", this.采集条数);
        log("s_g8g【%s】", s_g8g);
        let o_an3 = id("an3").findOne();
        //开始遍历桌面所有聊天记录
        try {
            o_an3.children().forEach((o_ala, n_index) => {
                if (!o_ala) return false;
                // log("o_ala:"+o_ala);
                //尝试提取时间
                let s_time = o_ala.findOne(id("ao5"));
                log("s_time【%s】", s_time);
                if (s_time && s_g8g.split("/") == 3) s_g8g = s_g8g + "/" + s_time.text();
                console.info("提取到的时间【%s】", s_g8g);
                
                //开始进行二次时间判断
                if (isTimeInRight(getRiqi(wxTimeToNewTime(s_g8g)), s初始日期, s结束日期) == false) {
                    log("时间不在范围中，跳出");
                    // throw new Error("breakForEach");
                    return false;
                }
    
                console.log("开始采集!");
                log("采集到的lt有%s个子控件", o_ala.childCount());
                let o_lt = o_ala.child(o_ala.childCount() - 1).child(1);
                if (o_lt.className() != "android.widget.LinearLayout") {
                    console.warn("类名不正确！");
                    return false;
                }
                if (o_lt.findOne(className("TextView"))) {
                    console.warn("这不是正常的微信消息!");
                    return false;
                }
                if (!o_lt) return false;
                do {
                    click(o_lt.bounds().centerX(), o_lt.bounds().centerY());
                    sleep(random(50, 100));
                    click(o_lt.bounds().centerX(), o_lt.bounds().centerY());
                    sleep(2 * 1000);
                } while (!desc("分享").exists());
                
                console.log("开始提取");
                let s_c9a = id("c9a").findOne().text();
                console.info("提取到的聊天记录内容【%s】", s_c9a);
                //开始查找有没有要找的关键字
                let s_匹配内容 = null;
                if (s_c9a.indexOf(s_dvh) > -1) {
                    console.log("是这条聊天记录没错！");
                    //开始选择范围
                    let n_关键字坐标 = s_c9a.lastIndexOf(s_dvh);
                    console.info("关键字坐标【%d】", n_关键字坐标);
                    let 开始坐标 = n_renge.split("|")[0],结束坐标 = n_renge.split("|")[1];
                    console.info("开始坐标【%d】", 开始坐标);
                    console.info("结束坐标【%d】", 结束坐标);
    
                    s_匹配内容 = s_c9a.slice(n_关键字坐标+Number(开始坐标), n_关键字坐标+Number(结束坐标));
                    console.info("匹配后的内容【%s】", s_匹配内容);
                    
                    //开始保存
                    log("s_path:【%s】", s_path);
                    log("匹配内容:【%s】", s_匹配内容);
                    let s_saveStr = "【"+this.采集条数+"】"+"【"+s_采集对象+"】【"+s_g8g+"】【"+s_dvh+"】【"+s_匹配内容+"】\n-----分割线-----\n"
                    this.采集条数++;
                    log("要保存的内容【%s】", s_saveStr);
                    files.createWithDirs(s_path);

                    //开始去重
                    s_pathFileStr = files.read(s_path);
                    log("已保存的内容【%s】", s_pathFileStr);
                    
                    // if (s_pathFileStr.indexOf(s_匹配内容) == -1) {
                    //     files.append(s_path, s_saveStr);
                    // } else {
                    //     console.warn("内容重复了！");
                    // }

                    files.append(s_path, s_saveStr);
                    
                } else {
                    console.warn("不是这条聊天记录!");
                }
                //开始返回
                do {
                    back();
                    sleep(2000);
                } while (!desc('表情').exists() && !desc('更多功能按钮，已折叠').exists());
                console.log("返回到聊天界面成功");
                if (s_匹配内容) {
                    log("要的内容已采集完毕！");
                    throw "完毕";
                }
            });
        } catch (_err) {
            log("报错信息："+_err);
        }

        //开始返回
        log("所有聊天内容采集完毕");
        //这个地方需要大改

        do {
            back();
            sleep(2000);
        } while (!id("dvh").exists() && id('dvh').text(返回标记).exists());
        // toastLog('返回标记成功');
        // className('EditText').text(s_dvh).waitFor();
        // sleep(2000);
        toastLog('返回标记成功');
        
        console.log("结束【Fn_v_采集聊天记录】函数");
    }

    this.采集条数 = 0;

    this.Fn_v_主体 = function (o_config) {
        log("Fn_v_主体");
        if (files.isFile(o_config.存储路径+"wx.txt")) {
            toastLog("初始化文件夹");
            files.remove(o_config.存储路径+"wx.txt");
        }

        log("初始化文件夹完成");
        o_config.采集关键字.indexOf("|") == -1 ? o_config.采集关键字+"|" : console.log("采集关键字【%s】", o_config.采集关键字);
        //定义局部变量
        o_config.采集关键字.split("|").forEach((s_crux, n_index_1) => {

            log("这次采集关键字:"+s_crux);
            if (!s_crux) return false;

            if (s_crux == "") return false;
            
            console.info("开始采集【%s】关键字", s_crux);

            if (o_editView = className("EditText").findOne()) console.info("开始输入关键字-->>",o_editView.setText(s_crux));
            
            // log("开始失去焦点-->>", o_editView.focused(false));sleep(1000);
            
            while(text("搜索指定内容").exists());
            log("搜索指定内容");
            sleep(3000);

            //如果有更多聊天记录，就点更多聊天记录
            if (text("更多聊天记录").exists()) {
                toastLog("更多聊天记录");
                click("更多聊天记录");
                sleep(3000);
            }
            
            //如果没有出现聊天记录就下一个
            if (!text("聊天记录").exists()) return false;
            log("找到了聊天记录");
            loop2 = true;
            //采集条数
            //定义主聊天记录防重复数组
            let a_ltjl = [];
            let 二层对象 = false;
            while (loop2) {
                log("开始采集聊天记录组");
                sleep(1000);
                //开始遍历出现的主聊天记录列表控件
                try {
                    id("dvh").find().forEach((o_dvh, n_index_2, a_arr) => {
                        console.warn("----forEach----头部");
        
                        if (!o_dvh) return false;
        
                        //开始声明定义用户列表项控件

                        let o_user = o_dvh.parent().parent().parent().parent().parent();

                        if (!o_user) return false;
                        
        
                        //开始采集用户昵称、聊天记录内容、聊天记录时间并声明
                        let s_userName = o_user.findOne(id("e3x")).text(), s_userContent = o_user.findOne(id("dvh")).text(), o_userTime = o_user.findOne(id("g9g"));
                        console.info("用户昵称【%s】\n聊天内容【%s】", s_userName, s_userContent);

                        if (二层对象) {
                            log('二层对象');
                        } else {
                            //判断是否为采集对象
                            log("判断采集对象");

                            if (o_config.采集对象 != "" && o_config.采集对象.indexOf(s_userName) == -1) {
                                toastLog(s_userName+"不是采集对象!");
                                return false;
                            }
                        }

                        toastLog(s_userName+"是采集对象");
                        //如果聊天记录内容重复就跳过
                        if (a_ltjl.indexOf(s_userName + s_userContent) > -1) return false;

                        log("采集信息没有重复，写入到a_ltjl");
                        a_ltjl.push(s_userName + s_userContent);
                        //开始区别对待单条聊天记录和多条聊天记录
                        log("开始区别对待单条聊天记录和多条聊天记录");
                        if (!o_userTime) {
                            log("第二层聊天记录");
                            do {
                                o_user.click();
                                sleep(2 * 1000);
                            } while (!text("取消").exists());
                            //开始第二遍采集聊天记录
                            log("强制跳出");
                            二层对象 = true;
                            throw new Error("第二层聊天记录i 强制跳出");

                        } else {
                            二层对象 = false;
                        }

                        console.info("聊天记录时间【%s】", o_userTime.text());
                        //开始校对时间------------------
                        let s_转化后的时间 = getRiqi(wxTimeToNewTime(o_userTime.text()))
                        log("转化后的时间："+s_转化后的时间);
                        if (isTimeInRight(s_转化后的时间, o_config.初始日期, o_config.结束日期) == false) {
                            //时间不在范围中，跳出
                            log("时间不在范围中，跳出");
                            return false;
                        }
        
                        log("开始点击该聊天记录");
                        do {
                            o_user.click();
                            sleep(2 * 1000);
                        } while (!desc("表情").exists());
        
                        //开始采集----------------------------
                        Fn_v_采集聊天记录(s_crux, o_config.匹配范围, s_转化后的时间, o_config.初始日期, o_config.结束日期, o_config.存储路径, s_userName, s_userContent);
                        if (二层对象) {
                            sleep(1000);
                            toastLog('多返回一次')
                            back();
                        }
                        console.warn("----forEach----尾部");
                    });
                    //开始下滑

                    if (!id("f9l").findOne().scrollForward()) {
                        console.warn("下滑失败！");
                        while (!id("cj9").text("聊天记录").exists()) {
                            back();
                            sleep(2000);
                        }
                        break;
                    }
                    sleep(2000);
                } catch (s_err) {
                    console.error(s_err);
                }
            }
            //准备下滑
            if (o_list = id("f9l").findOnce()) {
                if (!o_list.scrollForward()) return;
            } else {
                console.error("没有找到list控件！");
                exit();
            }
            sleep(2000);
        });
    }

    return (function(){
        //兼容线程
        let storage = storages.create("WeiXin");
        let o_con = {
            存储路径 : storage.get('viewDataArr')['bh_cclj'] || "/sdcard/wxxx/",
            采集对象 : storage.get('viewDataArr')['bh_cjdx'] || "",
            采集关键字 : storage.get('viewDataArr')['bh_cjgjz'],
            匹配范围 : storage.get('viewDataArr')['bh_ppfw'] || "0|2",
            初始日期 : storage.get('viewDataArr')['bh_csrq'] || "2000/1/1/1",
            结束日期 : storage.get('viewDataArr')['bh_jsrq'] || "2999/1/1/1"
        }
        log(o_con);
        //脚本初始化
        Fn_v_初始化();
        //脚本主体
        Fn_v_主体(o_con);
        //运行完成
        toastLog("运行完成！");
        console.show();
        app.viewFile(o_con.存储路径+"wx.txt");
    })();
}