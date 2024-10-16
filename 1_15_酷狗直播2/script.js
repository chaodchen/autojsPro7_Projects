/*
 * @Author: BanHua
 * @Date: 2021-01-15 13:38:55
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-21 21:22:23
 * @Description: file content
 */
//开始脚本
let storage = storages.create('KuGou2');
let 操作次数 = storage.get('viewDataArr')['bh_czcs'] || 100;
let _已操作次数 = 0;
let _userArr = storage.get('userArr') || [];
console.show();
this.下滑 = function () {
    var x1 = random(device.width/4,(device.width/4)*3);
    var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
    var x2 = random(device.width/4,(device.width/4)*3);
    var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
    swipe(x1, y1, x2, y2, random(500, 1000));
}

//兼容线程
threads.start(function(){
    while (1) {
        if (text('fx_icon_H5-close-w_68x68@3x_eca8c7').exists()) {
            log("活动弹窗");
            text('fx_icon_H5-close-w_68x68@3x_eca8c7').findOne().click();
            sleep(1000);
        } else if (text('+关注').exists()) {
            sleep(5 * 1000);
            if (text('+关注').exists()) {
                back();
            }
        } else if (text('开启宝箱').exists()) {
            log('开启宝箱！');
            back();
            sleep(1000);
        } else if (text('确定').exists()) {
            click("确定");
            sleep(1000);
        } else if (text("重新加载").exists()) {
            back();
        } else if (text('该用户已被封禁').exists()) {
            sleep(5*1000);
            click('确定');
        }
    }
});

while (1) {
    //判断是否在直播界面
    let _更多 = id("b5l").findOne();
    if (_更多) {
        log('点击更多按钮')

        while (id('b5l').exists()) {
            id('b5l').findOne().click();
            sleep(2000);
        }

        console.info("点击更多成功");
        text("亲密榜").waitFor();
        console.info('点击贡献榜');
        text("贡献榜").findOne().click();
        text('本场').waitFor();
        text('7天').waitFor();
        sleep(1000);
        log("点击7天");
        text('7天').findOne().click();
        sleep(3*1000);
        loop:
        while (1) {
            console.info("已经操作%d次", _已操作次数);
            text('本场').waitFor();
            text('7天').waitFor();
            let _用户名称控件组 = []
            let _listViews = id('ca7').find();
            _listViews[_listViews.length -1].children().forEach((_view) => {
                if (_view) {
                    _用户名称控件组.push(_view.findOne(id('de3')).text());
                }
            });

            console.info("一共找到了%d个用户名称控件", _用户名称控件组.length);
            _用户 = array_diff(_userArr, _用户名称控件组)[0];
            if (_用户 == '' || _用户 == null || _用户 == undefined) {
                log('用户全部都已重复了,开始下滑');
                if (!_listViews[_listViews.length - 1].scrollForward()) {
                    console.error('所有的用户访问完毕！');
                    while (!id('b5l').exists()) {
                        back();
                        sleep(1500);
                    }
                    sleep(2000);
                    while (1) {
                        _主播名字 = id('d0n').findOne().text();
                        console.info('滑动前主播名字：%s', _主播名字);
                        下滑();
                        toastLog('开始下滑');

                        sleep(5000);
                        _主播名字2 = id('d0n').findOne().text();
                        console.info('滑动后主播名字：%s', _主播名字2);
                        if (_主播名字 != _主播名字2) {
                            toastLog('滑动成功');
                            break;
                        }
                    }
                    break;
                }
                sleep(2000);
            } else {
                console.info('本次需要点击的用户为：%s', _用户);
                _userArr.push(_用户);
                storage.put('userArr', _userArr);
                //开始点击这个用户
                text(_用户).findOne();
                // while(!click(_用户));
                let _ii = 0;
                while (!id('fz0').exists()) {
                    click(_用户);
                    sleep(2000);
                    _ii++;
                    if (_ii >= 3) {
                        console.error('可能是神秘用户');
                        break;
                    }
                }
                if (_ii < 3) {
                    //判断是否进入主页
                    log("判断是否进入主页");
                    text('动态').waitFor();
                    text('资料').waitFor();
                    log("进入该用户主页成功");
                    _已操作次数++;
                    while (!text('7天').exists()) {
                        // sleep(2000);
                        let _返回按钮 = id('fz0').findOnce();
                        let _关注 = text('+关注').findOnce()
                        if (_返回按钮) {
                            log("找到了返回按钮!");
                            sleep(2000);
                            _返回按钮.click();
                        } else if (_关注) {
                            log("找到了关注按钮,开始执行返回直播函数");
                            返回直播();
                            break loop;
                        } else {
                            log("没有找到返回按钮！");
                        }
                        sleep(2000);
                    }
                }
            }
        }
    } else {
        console.error("没有找到_更多按钮");
    }
}


//两个数组去重，前面小数组，后面大数组
function array_diff(a, b) {
    let c = [];
    b.forEach((_b, _index) => {
        if (a.indexOf(_b) == -1) {
            c.push(_b);
        }
    });
    return c;
}


function 返回直播 () {
    while (!id('b5l').exists()) {
        back();
        sleep(1500);
    }
}

function 访问主页 () {
    let _主页按钮 = text('主页').findOnce();
    if (_主页按钮) {
        log('找到了主页按钮');
        if (_主页按钮.click()) {
            log('点击主页按钮成功');
            _返回按钮 = id('fz0').findOne(3 * 1000);
            if (_返回按钮) {
                log('找到了返回按钮');
                sleep(random(500, 1000))
                _返回按钮.click();
                log('点击返回按钮成功')
            } else {
                log('没有找到返回按钮');
            }
        }
    } else {
        log('没有找到主页按钮');
        return false;
    }
}