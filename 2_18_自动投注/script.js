// toast("我他妈的开始了");
// console.show();
// while (1) {
//     log('1');
//     sleep(1000);
//     log(bh.getViewContent("bh_old"));
// }


console.show();
auto.waitFor();
toastLog("获取无障碍权限成功！");
log("v_1.1.2");
let 初始投注 = bh.getViewContent("bh_cstz");
log("初始投注：%s", 初始投注);

let 上次开奖 = null, 本次投注 = null, 中奖 = false;

while (1) {
    text("投注").findOne().click();
    toastLog("等待投注界面出来")
    text("大").waitFor();
    text("小").waitFor();
    text("单").waitFor();
    text("双").waitFor();

    toastLog("准备投注");

    if (上次开奖 == null) {
        toastLog("第一次投注，初始投注");
        本次投注 = 初始投注;
        click(初始投注, 1);
        
        toastLog("第一次投注，投最小")
        text("最小投注").findOne().click();
    } else {
        if (上次开奖.indexOf("大") > -1) {
            toastLog("这次投大");
            本次投注 = "大";
            click("大", 1);
    
        } else if (上次开奖.indexOf("小") > -1) {
            toastLog("这次投小");
            本次投注 = "小";
            click("小", 1);
        } else {
            toastLog("不大不小，初始投注")
            本次投注 = 初始投注;
            click(初始投注, 1);
        }

        if (中奖) {
            toastLog("这次最小");
            text("最小投注").findOne().click();
        } else {
            toastLog("这次双倍");
            text("双倍投注").findOne().click();
        }
    }
    

    while (text("最小投注").exists());
    sleep(3 * 1000);
    
    toastLog("等待开奖");
    while (1) {
        sleep(1000);
        let time_view = id('end_time_tv').findOne(1*1000);
        if (time_view) {
            time_text = time_view.text();
            log(time_text);
            if (time_text == "已封盘") {
                toastLog("已封盘");
                break;
            }
        }
    }

    toastLog("等待三秒钟");
    sleep(3*1000);
    log("等待【请稍等】");

    while(text("请稍等..").exists());
    
    toastLog("等待三秒钟");
    sleep(3*1000);

    while (1) {
        sleep(1000);
        let pre_view = id("pre_qishu_periods_tv").findOne(1000);
        
        if (pre_view) {
            let pre_view_text = pre_view.text();
            log("pre_view_text：%s",pre_view_text);

            if (pre_view_text.indexOf("?") > -1) {
                log("等待开奖");
            } else {
                上次开奖 = pre_view_text.replace(/[()]/g, "");
                break;
            }
        }
    }

    toastLog("开奖啦");
    log("我投注的是：%s\n上次开奖：%s", 本次投注, 上次开奖);
    if (上次开奖.indexOf(本次投注) > -1) {
        toastLog("恭喜您中奖啦");
        中奖 = true;
    } else {
        toastLog("很遗憾没有中奖");
        中奖 = false;
    }
    
    sleep(3 * 1000);
}