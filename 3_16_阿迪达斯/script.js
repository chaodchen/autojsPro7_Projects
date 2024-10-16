let 尺码 = bh.getViewContent("bh_xzms");

console.show();
// let 尺码 = "UK7";
// sleep(2000);
toast('您选择的尺码是'+尺码);

// app.launchApp("微信");

function taps (view) {
    if (!view) throw "请输入关键参数view"; 

    if (view.click()) {
        return true;
    } else {
        let x = view.bounds().centerX(), y = view.bounds().centerY()
        if (device.sdkInt > 23) {
            press(x, y, random(50, 99));
            return true;
        } else {
            if (shell("input tap "+x+" "+y, true).code == 0) {
                return true;
            } else {
                return false;
            }
        }
    }
}

function main () {
    while (1) {
        let yy = textMatches(/距离.+还有\d{2}:\d{2}:\d{2}/).findOnce();
        if (yy) {
            log(yy.text());
        } else {
            log("预约结束！");
            break;
        }
    }

    let x = text("adidas").findOne().parent().parent().parent().child(1).child(1).child(0).child(0);
    log(x.text());
    if (x) {
        log("找到了预约按钮");
        taps(x);
    }

    //开始判断是否要输入尺码
    if (尺码 != 0 && 尺码 != "") {
        log("需要输入尺码");
        text(尺码).findOne();

        if (taps(text(尺码).findOne())) {
            toastLog("选择尺码成功");
        } else {
            toastLog("选择尺码失败");
        }

    }
    
    //开始提交
    taps(text("提交").findOne());
    
    toastLog("程序执行完毕");
}

main();