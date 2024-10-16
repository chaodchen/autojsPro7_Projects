/*
 * @Author: BanHua
 * @Date: 2021-01-12 23:10:12
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-15 13:52:33
 * @Description: file content
 */

/**
 * 1.scipt.js的变量不与main.js mainActivity.js共享
 */
let storage = storages.create('AiJianZhi');
let 操作延迟 = storage.get('viewDataArr')['bh_delay'];
let 操作平台 = storage.get('viewDataArr')['bh_czpt'];
let 操作次数 = storage.get('viewDataArr')['bh_czcs'];
console.info('操作次数：'+操作次数);
console.show();
console.setPosition(50, 200);
// // let 操作平台 = '爱兼职';
this.tap = function (_x, _y) {
    if (device.sdkInt > 23) {
        //设备7。0或者以上
        click(_x ,_y);
    } else {
        let _tapStr = "input tap "+_x+" "+_y;
        shell(_tapStr, true);
    }
}

this.xiahua = function (_x1, _y1, _x2, _y2) {
    if (device.sdkInt > 23) {
        //设备7。0或者以上
        swipe(_x1, _y1, _x2, _y2, random(500, 1000));
    } else {
        let _tapStr = "input swipe "+_x1+" "+_y1+" "+_x2+" "+_y2+" "+random(500, 1000)
        shell(_tapStr, true);
    }
}

let userArr;
if (操作平台 == '爱兼职') {
    let _pt = '爱兼职'+random(1, 10000);
    userArr = storage.get(_pt) || [];
    爱兼职();
} else if (操作平台 == '58兼职') {
    let _pt = '58兼职'+random(1, 10000);

    userArr = storage.get(_pt) || [];
    _58兼职();
} else if (操作平台 == '58兼职2') {
    let _pt = '58兼职'+random(1, 10000);

    userArr = storage.get(_pt) || [];
    _58兼职2();
} else {

}

// launchApp("爱兼职");



function 爱兼职 () {
    let 已操作次数 = 0;
    loop:
    while (1) {
        let _list = id('recyclerView').findOne();
        if (_list) {
            //开始遍历子控件
            _list.children().forEach((_view, _index) => {
                if (_view != null && _view.childCount() > 3) {
                    console.log("forEach-----------------------");
                    log('已操作%d次', 已操作次数);
                    if (已操作次数 >= 操作次数) {
                        toastLog('操作完成');
                        return;
                    }
                    // waitForActivity('com.ying.ajz.page.home.HomePageActivity');
                    text('首页').waitFor();
                    //开始采集用户信息
                    let _userStr = '';
                    let _工作名称 = _view.findOne(id('tvJobName'));
                    let _工作薪资 = _view.findOne(id('tvPriceInfo'));
                    if (_工作名称 != null && _工作薪资 != null) {
                        //开始结合
                        _工作名称 = _工作名称.text();
                        _工作薪资 = _工作薪资.text();

                        _userStr = _工作名称 + _工作薪资;
                        log('_suerStr:'+_userStr);
                        if (userArr.indexOf(_userStr) == -1) {
                            userArr.push(_userStr);
                            storage.put('爱兼职', userArr);
                            //没有重复，准备点击进入
                            console.info('点击该职位');
                            _view.click();
                            if (text('职位详情').findOne(3 * 1000)) {
                                log('职位详情');
                                let 报名按钮 = id('btSubmit').findOne();
                                if (报名按钮.text() == '已报名') {
                                    toastLog('已报名');
                                } else if (报名按钮.text() == '立即报名') {
                                    toastLog('立即报名');
                                    //开始获取坐标然后点击
                                    tap(报名按钮.bounds().centerX(), 报名按钮.bounds().centerY());
                                    let _关闭窗口按钮 = id('btn_close').findOne();
                                    tap(_关闭窗口按钮.bounds().centerX(), _关闭窗口按钮.bounds().centerY())
                                    text('已报名').waitFor();
                                    log('已报名');
                                    已操作次数++;
                                } else {
                                    log("错误!!!");
                                }
                            }
    
                            let _返回按钮 = id('ivBack').findOne(3 * 1000);
                            if (_返回按钮) {
                                log('点击返回');
                                tap(_返回按钮.bounds().centerX(), _返回按钮.bounds().centerY());
                            } else {
                                console.info("没有找到返回按钮！");
                                back();
                            }
    
                            // waitForActivity('com.ying.ajz.page.home.HomePageActivity');
                            text('首页').waitFor();
                            console.info("返回主页面成功！");
                            
                        } else {
                            log('重复了：'+_userStr);
                        }
                    } else {
                        console.info('没有找到工作名字和工作薪资');
                    }
                }
            });
    
            //开始下滑
            if (!_list.scrollForward()) {
                console.error("下滑失败!");
                break loop;
            }
            
            sleep(randomNumOfSing(操作延迟, '-') * 1000);
        }
        
    }
}

function _58兼职2 () {
    let 已操作次数 = 0;
    loop:
    while (1) {
        log('-----');
        id('contentBgView').find().forEach((_用户) => {
            if (_用户) {
                _用户 = _用户.parent();
                log('已操作%d次', 已操作次数);
                if (已操作次数 >= 操作次数) {
                    toastLog('操作完成');
                    return;
                }

                
                let _兼职名称 = _用户.findOne(id('tvJobName'));
                let _兼职薪资 = _用户.findOne(id('tvPriceInfo'));
                if (_兼职名称 && _兼职薪资) {
                    _兼职名称 = _兼职名称.text();
                    _兼职薪资 = _兼职薪资.text();

                    _userStr = _兼职名称 + _兼职薪资;

                    if (userArr.indexOf(_userStr) == -1) {
                        //用户数据没有重复
                        userArr.push(_userStr);
                        storage.put('58兼职', userArr);
                        
                        console.info('点击该职位');
                        _用户.click();
                        sleep(randomNumOfSing(操作延迟, '-') * 1000);
                        text('职位描述').waitFor();
                        log('职位描述');
                        let _报名按钮 = id('btSubmit').findOne();
                        log('找到了报名按钮');
                        if (_报名按钮.text() == '立即报名') {
                            // _报名按钮.click();
                            click(_报名按钮.bounds().centerX(), _报名按钮.bounds().centerY());
                            text('报名成功!').waitFor();
                            log('报名成功！');
                            sleep(randomNumOfSing(操作延迟, '-') * 1000);

                            let _关闭窗口按钮 = id('btn_close').findOne();
                            click(_关闭窗口按钮.bounds().centerX(), _关闭窗口按钮.bounds().centerY());
                            sleep(randomNumOfSing(操作延迟, '-') * 1000);

                            text('已报名').waitFor();
                            已操作次数++;
                        } else if (_报名按钮.text() == '已报名') {
                            log('已报名');
                        } else {
                            log('未知错误');
                        }

                        log('开始返回');
                        let 返回按钮 = id('ivBack').findOne();
                        click(返回按钮.bounds().centerX(), 返回按钮.bounds().centerY());
                        text('首页').waitFor();
                    } else {
                        log('用户数据重复了');
                    }
                }
            } else {
                log('用户不存在');
            }
        });

        log('下滑！');
        var x1 = random(device.width/4,(device.width/4)*3);
        var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
        var x2 = random(device.width/4,(device.width/4)*3);
        var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
        xiahua(x1, y1, x2, y2);
        sleep(randomNumOfSing(操作延迟, '-') * 1000);
        
    }
}

function _58兼职 () {
    let 已操作次数 = 0;
    loop:
    while (1) {
        log('-----');
        id('line_click').find().forEach((_用户) => {
            if (_用户) {
                log('已操作%d次', 已操作次数);
                if (已操作次数 >= 操作次数) {
                    toastLog('操作完成');
                    return;
                }

                
                let _兼职名称 = _用户.findOne(id('title'));
                let _兼职薪资 = _用户.findOne(id('title_number'));
                if (_兼职名称 && _兼职薪资) {
                    _兼职名称 = _兼职名称.text();
                    _兼职薪资 = _兼职薪资.text();

                    _userStr = _兼职名称 + _兼职薪资;

                    if (userArr.indexOf(_userStr) == -1) {
                        //用户数据没有重复
                        userArr.push(_userStr);
                        storage.put('58兼职', userArr);
                        
                        console.info('点击该职位');
                        _用户.click();
                        sleep(randomNumOfSing(操作延迟, '-') * 1000);

                        if (text('职位详情').findOne(3 * 1000)) {
                            log('职位详情');
                            let _报名按钮 = id('goapply').findOne();
                            if (_报名按钮.text() == '立即报名') {
                                _报名按钮.click();
                                text('取消').waitFor();
                                sleep(randomNumOfSing(操作延迟, '-') * 1000);

                                text('立即报名').findOne().click();
                                sleep(randomNumOfSing(操作延迟, '-') * 1000);

                                let _关闭窗口按钮 = id('detele').findOne();
                                _关闭窗口按钮.click();
                                sleep(randomNumOfSing(操作延迟, '-') * 1000);

                                text('已报名').waitFor();
                                已操作次数++;
                            } else if (_报名按钮.text() == '已报名') {
                                log('已报名');
                            } else {
                                log('未知错误');
                            }

                            log('开始返回');
                            id('back').findOne().click();
                            text('首页').waitFor();
                        } else {
                            log('没有找到职位详情@');
                        }
                    } else {
                        log('用户数据重复了');
                    }
                }
            } else {
                log('用户不存在');
            }
        });

        log('下滑！');
        var x1 = random(device.width/4,(device.width/4)*3);
        var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
        var x2 = random(device.width/4,(device.width/4)*3);
        var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
        xiahua(x1, y1, x2, y2);
        sleep(randomNumOfSing(操作延迟, '-') * 1000);
        
    }
}



//随机分割函数
function randomNumOfSing (str_0, str_1) {
    //以str_1分割，取一个随机数
    switch (typeof(str_0)) {
        case 'number':
            //是数字
            return str_0
        case 'string':
            //是字符串
            if (str_0.indexOf(str_1) > -1) {
                num_min = str_0.split(str_1)[0]
                num_max = str_0.split(str_1)[1]
                return random(Number(num_min), Number(num_max))
            } else {
                return Number(str_0)
            }
        default:

            return 0;
    }
}