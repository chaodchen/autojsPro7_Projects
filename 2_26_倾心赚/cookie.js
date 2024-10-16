

function 获取cookie () {
    let url = "http://m.vipbuyu.cn:80/api/m-sys-uniapp-update-app-download";

    let res = http.post(url, {
        "version":"1.34",
        "name":"Android&type=1"
    });

    return res.headers["Set-Cookie"];
}

// log(获取cookie());

function 注册倾心赚 (手机号, 验证码, 密码, imeis, 邀请码, cookie) {
    let api = "http://m.vipbuyu.cn:80/api/p-wkrw-register";
    
    let res = http.post(api, {
        "phone" : 手机号,
        "vertifyCode" : 验证码,
        "password" : 密码,
        "facilityCode" : imeis,
        "invitation" : 邀请码,
        "comeFrom" : "member",
        "machineCode" : imeis
        
    }, {
        headers : {
            "User-Agent":"ONEPLUS A3010(Android/9) (com.xinchidao.yxrw) UniApp/0.28.0 1080x1920",
            "Cookie":cookie
        }
    });

    return res.body.string();
}

function 发验证码 (手机号, cookie) {
    let api = "http://m.vipbuyu.cn:80/api/xcd-module-sms-vertificationcode";
    let res = http.post(api, {
        "phone" : 手机号,
        "comeFrom" : "member"
    }, {
        headers : {
            "User-Agent":"ONEPLUS A3010(Android/9) (com.xinchidao.yxrw) UniApp/0.28.0 1080x1920",
            "Cookie":cookie
        }
    });
    return res.body.string();
}

function 获取手机号 (sid, token) {
    let api = "http://qvvccb3.cn/api/do.php?action=getPhone&sid="+sid+"&token="+token;
    let res = http.get(api).body.string()
    if (res) {
        return res.split("|")[1];
    }
}

function 登录接码平台 (user, pass) {
    let api = "http://qvvccb3.cn/api/do.php?action=loginIn&name="+user+"&password="+pass;
    let res = http.get(api).body.string()
    if (res) {
        return res.split("|")[1];
    }
}

function 释放所有号码 (token) {
    let api = "http://qvvccb3.cn/api/do.php?action=cancelAllRecv&token="+token
    let res = http.get(api).body.string()
    if (res) {
        return res.split("|")[1];
    }
}

function 获取验证码 (sid, phone, token) {
    let api = "http://qvvccb3.cn/api/do.php?action=getMessage&sid="+sid+"&phone="+phone+"&token="+token
    let res = http.get(api).body.string()
    if (res) {
        return res.split("|")[1];
    }
}

function 加黑名单 (sid, phone, token) {
    let api = "http://qvvccb3.cn/api/do.php?action=addBlacklist&sid="+sid+"&phone="+phone+"&token="+token
    let res = http.get(api).body.string()
    if (res) {
        return res.split("|")[1];
    }
}

function 随机字符 (strs,num) {
    strs = strs || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let strArr = strs.split('');
    let r = ''
    for (let i = 0; i < num; i++) {
        r = r + strArr[random(0, strArr.length - 1)];
    }
    return r;
}

let token = 登录接码平台("api-28903-sofOhtn", "DUshuailei11");

let phone = 获取手机号("7049", token);

function 注册倾心赚_模块() {
    
    //获取cookie
    log("获取cookie");
    let cookie = 获取cookie();
    log("登录接码平台");
    let token = 登录接码平台("api-28903-sofOhtn", "DUshuailei11");
    log("获取手机号");
    let phone = 获取手机号("7049", token);
    log(phone);
    let pass = 随机字符(null, random(8,10));

    let 验证码 = null;
    log("发送验证码:%s", 发验证码(phone, cookie));

    while (1) {
        sleep(5 * 1000);
        验证码 = 获取验证码("7049", phone, token)
        log(验证码);
        验证码 = 验证码.match(/\d{6}/);
        if (验证码) {
            break;
        }
    }

    log("释放手机号:%s", 释放所有号码(token));
    log("拉黑手机号:%s", 加黑名单("7049", phone, token));
    log("注册倾心赚:%s", 注册倾心赚(phone, 验证码, pass, "352075060705114", "129706", cookie));

    return {
        "帐号" : phone,
        "密码" : pass,
        "cookie" : cookie
    }
}

function 登录倾心赚_模块 (user, pass, cookie) {
    let api = "http://m.vipbuyu.cn:80/api/p-tuizan-login?phone="+user+"&password="+pass;
    let res = http.get(api, {
        headers : {
            "User-Agent":"ONEPLUS A3010(Android/9) (com.xinchidao.yxrw) UniApp/0.28.0 1080x1920",
            "Cookie":cookie
        }
    });

    return res.body.json();
    
}

let config = 注册倾心赚_模块();
let cookie = 获取cookie();

let x_token = 登录倾心赚_模块(phone, "3838438", cookie).data["x-token"];

做任务(x_token, cookie);


function 做任务(token, cookie) {
    
    //获取任务列表
    log("获取任务列表");
    let api = "http://m.vipbuyu.cn:80/api/p-wkrw-task-query-for-list-front-end";
    let res = http.post(api, {
        "taskType" : "" ,
        "page" : 1,
        "pageSize": 40
    }, {
        headers : {
            "User-Agent":"ONEPLUS A3010(Android/9) (com.xinchidao.yxrw) UniApp/0.28.0 1080x1920",
            "Cookie":cookie,
            "x-token":token
        }
    });
    let data = res.body.json()

    if (!data) {
        throw "获取data失败";
    }

    dataList = data.data.dataList;

    log("dataList:"+dataList);

    dataList.forEach((o, index) => {
        if (o) {
            // log(JSON.stringify(o));
            if (o.price >= 2) {
                log(o.taskName+"的佣金>=2");
                log("开始接【%s】任务", o.taskName);
                log("接任务："+接任务(o.id, cookie, token));
                log("等待五分钟");
                sleep(5 * 60 * 1000);
                log("等待五秒钟");
                sleep(5 * 1000);
                log("提交任务:%s", 提交任务(o.id, cookie, token).code);
                
            } else {
                log(o.taskName+"的佣金<2");

            }
        }
    });
}

function 接任务 (kid, cookie, token) {
    let api = "http://m.vipbuyu.cn:80/api/p-wkrw-task-detail-insert-front-end";
    let res = http.post(api, {
        "taskId" : kid
    }, {
        headers : {
            "User-Agent":"ONEPLUS A3010(Android/9) (com.xinchidao.yxrw) UniApp/0.28.0 1080x1920",
            "Cookie":cookie,
            "x-token":token
        }
    });
    return res.body.string();
}

function 提交任务 (kid, cookie, token) {
    let api = "http://m.vipbuyu.cn/api/p-wkrw-task-detail-submission-front-end"
    let res = http.post(api, {
        "id" : kid,
        "imageUrl" : 1
    }, {
        headers : {
            "User-Agent":"ONEPLUS A3010(Android/9) (com.xinchidao.yxrw) UniApp/0.28.0 1080x1920",
            "Cookie":cookie,
            "x-token":token
        }
    });

    if (res) {
        return res.body.json();
    }
}



// log(发验证码(13316470568));

// log(获取手机号("7049" , 登录接码平台("api-28903-sofOhtn", "DUshuailei11")));

// log(释放所有号码(登录接码平台("api-28903-sofOhtn", "DUshuailei11")))


