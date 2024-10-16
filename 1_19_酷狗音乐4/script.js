/*
 * @Author: BanHua
 * @Date: 2021-01-19 15:59:35
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-22 02:26:54
 * @Description: file content
 */
//开始脚本

let storage = storages.create('KuGou4');
let 操作次数 = storage.get('viewDataArr')['bh_czcs'] || 100;
let _已操作次数 = 0;
let _userArr = storage.get('userArr') || [];
log("需要操作的次数【%d】", 操作次数);

//兼容线程
threads.start(function(){
    //酷狗直播兼容线程v1.1.3
    while (1) {
        if (text('fx_icon_H5-close-w_68x68@3x_eca8c7').exists()) {
            log("活动弹窗");text('fx_icon_H5-close-w_68x68@3x_eca8c7').findOne().click();sleep(1000);
        } else if (text('+关注').exists()) {
            log("关注");sleep(5 * 1000);if (text('+关注').exists()) back();sleep(1000);
        } else if (text('开启宝箱').exists()) {
            log('开启宝箱！');back();sleep(1000);
        } else if (id('ajt').exists()) {
            log("一元活动");id('ajt').findOne().click();sleep(1000);
        } else if (text("重新加载").exists()) {
            log("重新加载");back();sleep(1000);
        } else if (text('该用户已被封禁').exists()) {
            log("该用户已被封禁");log("点击确定");click("确定");
        } else if (text("酷狗安全验证").exists() || text("酷狗音乐").exists()) {
            log("酷狗安全验证||酷狗音乐");log("返回");back();log("延迟一秒");sleep(1000);
        } else if (text("直播已结束").exists() || text("为你推荐").exists()) {
            log("直播已结束||为你推荐");log("返回");back();log("延迟一秒");sleep(1000);
        } else if (id("b4d").exists()) {
            log("二次元弹窗");log("点击关闭");id("b4d").findOne().click();log("延迟一秒");sleep(1000);
        }
    }
});




(function(){
    this.下滑 = function () {
        var x1 = random(device.width/4,(device.width/4)*3);
        var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
        var x2 = random(device.width/4,(device.width/4)*3);
        var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
        swipe(x1, y1, x2, y2, random(500, 1000));
    }
    
    //两个数组去重，前面小数组，后面大数组
    this.array_diff = function (a, b) {
        let c = [];
        b.forEach((_b, _index) => {
            if (a.indexOf(_b) == -1) {
                c.push(_b);
            }
        });
        return c;
    }
    
    
    this.返回直播 = function() {
        while (!id('b5l').exists()) {
            back();
            sleep(1500);
        }
    }
    
    this.访问主页 = function () {
        let _主页按钮 = text('主页').findOnce();
        if (_主页按钮) {
            log('找到了主页按钮');
            if (_主页按钮.click()) {
                log('点击主页按钮成功');
                _返回按钮 = id('fz0').findOne(3 * 1000);
                if (_返回按钮) {
                    log('找到了返回按钮');
                    sleep(2000);
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
    
    while (1) {
        while (1) {
            //判断是否在直播界面
            let _更多 = id("b5l").findOne();
            toastLog("已操作【"+_已操作次数+"】次！");
            if (_已操作次数 >= 操作次数) {
                toastLog("操作完成");
                break;
            }
            if (_更多) {
                log('点击更多按钮')
                if (_更多.click()) {
                    console.info("点击更多成功");
                    text("亲密榜").waitFor();
                    console.info('点击亲密棒');
                    text("亲密榜").findOne().click();
                    text('按累计亲密度排序(超过30天未进房的用户不展示)').waitFor();
                    let 用户 = null;
                    while (1) {
         
                        let _用户名称控件组 = id('dbc').find().map(function(_view){
                            return _view.text();
                        });
            
                        console.info("一共找到了%d个用户名称控件", _用户名称控件组.length);
                        _用户 = array_diff(_userArr, _用户名称控件组)[0];
                        if (_用户 == '' || _用户 == null || _用户 == undefined) {
                            toastLog('用户全部都已重复了,开始下滑');
                            if (!id("ca7").findOne().scrollForward()) {
                                console.error('下滑失败！');
                                exit();
                            }
                            sleep(1000);
                        } else {
                            log('--->>>>');
                            break;
                        }
                    }
                    console.info('本次需要点击的用户为：%s', _用户);
                    _userArr.push(_用户);
                    storage.put('userArr', _userArr);
                    _已操作次数++;
        
                    //开始点击这个用户
                    if (!text(_用户).findOne().parent().parent().click()) {
                        console.error('点击该用户失败！');
                        exit();
                    }
                    //开始找主页
                    if (!text('主页').findOne(3 * 1000)) {
                        console.error('没有找到主页,可能是神秘嘉宾');
                    } else {
                        访问主页();
                    }
        
                    返回直播();
        
                } else {
                    console.error('点击更多失败！');
                    exit();
                }
            } else {
                console.error("没有找到_更多按钮");
            }
        }
        返回直播();
        //开始下滑
        log("下拉到下一个主播！");
        _主播名字 = id('d0n').findOne().text();
        console.info('滑动前主播名字：%s', _主播名字);
        下滑();
        toastLog('开始下滑');
        let _查找次数 = 0;
        while (1) {
            sleep(5000);
            _主播名字2 = id('d0n').findOnce();
            _酷狗安全验证 = text("酷狗安全验证").findOnce();
            _酷狗音乐 = text("酷狗音乐").findOnce();
            if (_主播名字2) {
                log("下滑后主播名字【%s】", _主播名字2.text());
                if (_主播名字 == _主播名字2) {
                    下滑();
                } else {
                    log("主播切换成功");
                    if (_查找次数 > 3) {
                        log("查找次数大于3");
                        break;
                    }
                }
            } else if (_酷狗安全验证 || _酷狗音乐) {
                log("酷狗安全验证！！");
                back();
                break;
            } else {
    
            }
            _查找次数++
        }
        _已操作次数 = 0;
    }
})();