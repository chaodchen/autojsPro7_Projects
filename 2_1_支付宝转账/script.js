
app.launchApp("支付宝");
console.show();
toastLog("十秒后启动脚本，请自行前往转账界面");

// sleep(10 * 1000);
text('钱将实时转入对方账户，无法退款').waitFor();
toastLog("进入转账界面成功！");
sleep(2000);
// let 手机号 = "13594461817|13933101158|13983821466|13670759002|13902549435|13836433087|13676954528|13755142535|13683416280|13729845834|13912649850|13983275330|13903513511|13594202044|13695321869|13963006455|13807911302|13592173046|13684921289|13774615663|13816143944|13925831184|13571082125|13519345904|13700785808|13931991191|13586597202|13951238524|13530194662|13778414516|13728106005|13950923385|13681818994|13698483663|13898802335|13805029159|13548781071|13636004532|13840346107|13571965392|13625978246|13702626004|13758543031|13649705879|13794456467|13590256834|13747918572|13780397961|13877501160|13585938967|13634636187|13713001209|13928198909|13808879737|13971566049|13926532363|13571469559|13722838516|13803645965|13610385516|13860515179|13541822363|13938447834|13782894922|13734427673|13525567017|13918362871|13641154603|13590688489|13842984743|13906423828|13514719604|13752299306|13772546205|13698409728|13687182324|13661045104|13705815983|13816569541|13500242383|13763255140|13574423059|13573572677|13877114533|13761367812|13863485554|13692523148|13529012571|13652068945|13563617999|13672325124|13987992131|13645368597|13967915149|13702977190|13979663787|13634221172|13600273687|13854938308|13643029771";
let 手机号路径 = bh.getViewContent("bh_phone") || "/sdcard/手机号.txt";
let 路径 = bh.getViewContent("bh_path");

if (!files.isFile(手机号路径)) {
    toastLog("手机号路径不存在！");
    exit();
}

let 手机号 = files.read(手机号路径).split('\n');

mainScript(手机号, 路径);


function mainScript (phoneArr, path) {

    let path = path || "/sdcard/phoneNumber.txt"

    if (!files.isFile(path)) {
        files.createWithDirs(path);
    }
    
    this.返回 = function () {
        do {
            back();
            log("返回");
            sleep(1000);
        } while (!text("钱将实时转入对方账户，无法退款").exists());
    }

    phoneArr.forEach((phone) => {
        text('钱将实时转入对方账户，无法退款').waitFor();
        log("延迟1-2秒");
        sleep(random(1000, 2000));
        
        if (phone) {
            console.info("输入手机号：%s", phone);
            className('EditText').setText(phone);
            
            sleep(random(500, 1000));
            log("下一步");
            while(!click("下一步"));
            let 状态 = (function(){
                while (1) {
                    if (text("转账记录").exists()) {
                        return {
                            code : 0,
                            message : "ok"
                        }
                    }
                    if (text("账号不存在，或对方关闭了“通过手机号找到我”隐私开关").exists()) {
                        return {
                            code : 1,
                            message : "帐号不存在"
                        }
                    }

                    if (text('账户不存在或对方设置了隐私保护').exists()) {
                        return {
                            code : 1,
                            message : "帐号不存在"
                        }

                    }

                    if (text("该手机号对应多个支付宝账户，请核实后选择").exists()) {
                        return {
                            code : 2,
                            message : "多个账户"
                        }
                    }

                    if (text("操作太频繁了，请稍后再试").exists()) {
                        return {
                            code : 3,
                            message : "操作太频繁了，请稍后再试"
                        }

                    }
                }
            })();
            console.info("状态【%s】", 状态.message);

            if (状态.code == 0) {
                log("开始采集身份信息");

                userName = id('tf_receiveNameTextView').findOne(3 * 1000);
                if (!userName) {
                    console.error("没有找到该用户身份信息");
                } else {
                    userName = userName.text();
                    console.info("采集到的信息为【%s】", userName);
                    userNameAndPhone = userName + "|" + phone;
                    if (files.read(path).indexOf(userNameAndPhone) == -1) {
                        files.append(path, userNameAndPhone);
                    }
                }
                返回();
            } else {
                log("返回，跳过该用户");
                if (状态.code == 1) {
                    while(!click("确定"));
                } else if (状态.code == 2) {
                    返回();
                } else if (状态.code == 3) {
                    toastLog("操作太频繁了，请稍后再试");
                    while(!click("确定"));
                    let delay = random(10 * 1000, 20 * 1000);
                    console.info("延迟【%d】秒", delay / 1000);sleep(delay);
                }
            }
        }
    });
}

