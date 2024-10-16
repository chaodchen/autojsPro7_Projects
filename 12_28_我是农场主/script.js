/*
 * @Author: BanHua
 * @Date: 2020-12-28 16:58:18
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-10 21:48:49
 * @Description: file content
 */

if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

var 生产次数 = storage.get('viewDataArr')['sccs'];
var 加速次数 = storage.get('viewDataArr')['jscs'];
var 点击坐标 = storage.get('viewDataArr')['djzb'];

// log('点击坐标-->>  '+点击坐标);

// 导入自定义函数
var strMods = importMods('mod/string.js');
var coorMods = importMods('mod/coor.js');

//加载图片
if (device.width == 1080) {
    toastLog('这个设备是1080p');
    var 云 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/yun.jpg');
    var 看 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/jiasu.jpg');
    var 叉 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/x.jpg');
    var 知道 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/zhidao.jpg');
    var 杀虫 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/shachong.jpg');
    var 金币 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/jinbi.jpg');
    var 仓库 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/cangku.jpg');
    var 取消 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/quxiao.jpg');

} else {
    toastLog('这个设备是540p');
    var 云 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/yun.jpg');
    var 看 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/jiasu.jpg');
    var 叉 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/x.jpg');
    var 知道 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/zhidao.jpg');
    var 杀虫 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/shachong.jpg');
    var 金币 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/jinbi.jpg');
    var 仓库 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/cangku.jpg');
    var 取消 = images.load('http://ajvip.pro/appImg/12_28_我是农场主/540p/quxiao.jpg');

}

let 已生产次数 = 0;
let 已加速次数 = 0;
生产次数 = strMods.randomNumOfSing(生产次数, '-');
加速次数 = strMods.randomNumOfSing(加速次数, '-');
log('打开软件-0---');
//打开软件
launchApp('我是农场主');
log('打开软件！');

sleep(3000);

while (1) {

    初始化主页();

    toastLog('已经生产'+已生产次数+'次，加速'+已加速次数+'次');
    if (已加速次数 > 加速次数) {
        toastLog('加速任务完成！！！');
        exit();
    }

    coorMods.clickTapCoor(点击坐标.split('-')[0], 点击坐标.split('-')[1]);

    sleep(3000);

    let 看控件 = images.findImage(captureScreen(), 看, {
        threshold: 0.8
    });
    let 金币控件 = images.findImage(captureScreen(), 金币, {
        threshold: 0.8
    });
    let 杀虫控件 = images.findImage(captureScreen(), 杀虫, {
        threshold: 0.8
    });
    let 知道控件 = images.findImage(captureScreen(), 知道, {
        threshold: 0.8
    });

    log('开始找控件');
    if (看控件 && 金币控件) {
        log('准备生产农作物');
        if (已生产次数 <= 生产次数) {
            log('看广告生产');
            coorMods.clickTapCoor(看控件.x, 看控件.y, 5);
            sleep(15 * 1000);
            if (images.findImage(captureScreen(), 看, {
                threshold: 0.8
            })) {
                log('看视频生产次数已上限！');
                已生产次数 = 已生产次数 + 5;
                continue;
            } else {
                log('正常进入看视频生产！');
            }
        } else {
            log('花金币生产');
            coorMods.clickTapCoor(金币控件.x, 金币控件.y, 5);
            sleep(3000);
            if (images.findImage(captureScreen(), 金币, {
                threshold : 0.8
            })) {
                log('花金币生产失败！');
            } else {
                log('花金币生产成功！');
            }
            continue;
        }

        //看视频或者花金币生产农作物都能使生产次数+1
        已生产次数++;

    } else if (杀虫控件) {
        toastLog('需要杀虫');
        coorMods.clickTapCoor(杀虫控件.x,杀虫控件.y, 10);
        sleep(15 * 1000);

    } else if (看控件) {
        log('只找到了看控件，开始加速');
        coorMods.clickTapCoor(看控件.x, 看控件.y, 10);
        sleep(15* 1000);
        已加速次数++;

        // if (images.findImage(captureScreen(), 看, {
            
        //     threshold : 0.8
        // })) {
        //     log('点击看控件失败！');
        //     continue;
        // } else {
        //     log('点击看控件成功');
        //     已加速次数++;
        // }
    } else if (知道控件) {
        coorMods.clickTapCoor(知道控件.x, 知道控件.y, 6);
        continue;
    } else {
        log('点击坐标后啥也没发生');
        continue;
    }


    //开始处理广告-----------------------------------
    log('开始等待广告！！');
    等待广告();


    // if (杀虫控件) {
    //     sleep(3000);
    //     for (let i = 0; i < 5; i++) {
    //         log('第%d次关闭杀虫界面！！', i);
    //         let 叉控件 = images.findImage(captureScreen(), 叉, {
    //             threshold: 0.8
    //         });
    //         if (叉控件) {
    //             coorMods.clickTapCoor(叉控件.x, 叉控件.y, 5);
    //             break;
    //         } else {
    //             log('没有找到叉控件！！！');
    //             // exit();
    //         } 
    //         sleep(2000);
    //     }
    // }
}

function 初始化主页 () {
    while (1) {
        let 知道控件 = images.findImage(captureScreen(), 知道, {
            threshold: 0.8
        });

        let 叉控件 = images.findImage(captureScreen(), 叉, {
            threshold: 0.8
        });
        let 仓库控件 = images.findImage(captureScreen(), 仓库, {
            threshold: 0.8
        });

        let 取消控件 = images.findImage(captureScreen(), 取消, {
            threshold: 0.8
        });

        if (仓库控件) {
            log('找到了仓库，识别现在为主页@');
            break;
        } else if (叉控件) {
            log('点击叉控件！')
            coorMods.clickTapCoor(叉控件.x, 叉控件.y, 5);
            
        } else if (知道控件) {
            coorMods.clickTapCoor(知道控件.x, 知道控件.y, 5);
        } else if (取消控件) {
            coorMods.clickTapCoor(取消控件.x, 取消控件.y, 5);
        } else {
            log('没有找到 知道控件 叉控件 仓库控件！');
        }
        sleep(3 * 1000);
    }
}

function 等待广告 () {
    let 延迟次数 = 0;
    toastLog('延迟五秒钟！');
    sleep(5 * 1000);
    while (1) {

        let 右广告 = id('tt_video_ad_close_layout').findOnce();
        let 左广告 = className("android.widget.ImageView").drawingOrder(2).depth(5).clickable(true).findOnce() || className("android.widget.ImageView").drawingOrder(1).depth(6).clickable(true).findOnce();
        let 浏览器广告 = className("android.view.View").clickable(true).depth(6).findOnce();
        let 仓库控件 = images.findImage(captureScreen(), 仓库, {
            threshold: 0.8
        });
        let 叉控件 = images.findImage(captureScreen(), 叉, {
            threshold: 0.8
        });

        if (仓库控件) {
            sleep(3000);
            if (images.findImage(captureScreen(), 仓库, {
                threshold: 0.8
            })) {
                log('找到了仓库，所有广告关闭成功！！！');
                break;
            } else {
                log('没有找到仓库！');
            }
            
        }

        if (右广告) {
            log('右广告');
            右广告.click();
            // sleep(2000);

            // if (id('tt_video_ad_close_layout').findOnce()) {
            //     log('右广告关闭失败！');
            // } else {
            //     log('右广告关闭成功');
            //     break;
            // }
        } else if (左广告) {
            log('左广告');
            左广告.click();
            // sleep(2000);
            // if (className("android.widget.ImageView").drawingOrder(2).depth(5).clickable(true).findOnce()) {
            //     log('左广告关闭失败！');
            // } else {
            //     log('左广告关闭成功');
            //     break;
            // }
        } else if (textMatches(/奖励将于\d+秒后发放/).exists()) {
            log('等待奖励');
            while (textMatches(/奖励将于\d+秒后发放/).exists()) {
                let logStr = textMatches(/奖励将于\d+秒后发放/).findOnce();
                if (logStr) {
                    log(logStr.text());
                }
                sleep(1000);
            }
            log('恭喜获得奖励');
            let 恭喜获得奖励 = text('恭喜获得奖励').findOne(1000);
            if (恭喜获得奖励) {
                let 提前关闭按钮 = 恭喜获得奖励.parent().child(恭喜获得奖励.indexInParent() - 1);
                if (提前关闭按钮.click()) {
                    toastLog('提前关闭广告成功');
                } else {
                    toastLog('提前关闭广告失败');
                }
            }
        } else if (浏览器广告) {
            log('浏览器广告');
            浏览器广告.click();
            // sleep(2000);
            // if (className("android.view.View").clickable(true).depth(6).findOnce()) {
            //     log('浏览器广告关闭失败！');
            // } else {
            //     log('浏览器广告关闭成功');
            //     break;
            // }
        } else if (叉控件) {
            log('点击叉控件！');
            coorMods.clickTapCoor(叉控件.x, 叉控件.y, 5);
            // sleep(2000);
            
        }  else {
            log('延迟中...');
        }
        sleep(3 * 1000);
        延迟次数++
        if (延迟次数 > 20) {
            log('延迟次数过多，开始按返回键，强制返回');
            back();
        }
    }
}