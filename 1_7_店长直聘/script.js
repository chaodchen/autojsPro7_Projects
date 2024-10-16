/*
 * @Author: BanHua
 * @Date: 2021-01-07 18:08:49
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-10 00:12:51
 * @Description: file content
 */
/**最后修订与2020年12月23日0点40分 */



var 回复延迟 = storage.get('viewDataArr')['hfyc'];
var 招聘岗位 = storage.get('viewDataArr')['zpgw'];

var 招聘软件 = storage.get('viewDataArr')['zprj'];

log('招聘软件：'+招聘软件);
sleep(1000);
// 招聘软件 = 1;

if (招聘软件 == 0) {
    店长直聘();
} else {
    同城兼职();
    // log(id('recyclerView').find().length)
}

function 同城兼职 () {
    app.launch("com.ying.tcjz");
    toastLog('同城兼职');
    text("首页").waitFor();
    toastLog('延迟十秒钟');
    sleep(10 * 1000);
    
    列表遍历框架(id('recyclerView'), (v) => {
        if (v) {
            log('------');
            v.click();
            // log('000000');
            
            while(id('loadingView').findOne(1000));
            log("加载完成！");
            let 报名按钮 = id('btSubmit').text('立即报名').findOne(1000);
            if (!报名按钮) 报名按钮 = text('立即报名').findOne(1000);
            
            if (报名按钮) {
                click(报名按钮.bounds().centerX(), 报名按钮.bounds().centerY());
                let 关闭按钮 = id('btn_close').findOne();
                click(关闭按钮.bounds().centerX(), 关闭按钮.bounds().centerY());
                text('已报名').waitFor();
            }
            do {
                let 返回按钮 = id('ivBack').findOne(1000);
                if (!返回按钮) {
                    console.error('没有找到返回按钮');
                    back();
                } else {
                    click(返回按钮.bounds().centerX(), 返回按钮.bounds().centerY());
                }
            } while(!text('首页').findOne(1000));
        }
    });
    
}

function 列表遍历框架(listAtt, fun) {
    while (1) {
        let listView = listAtt.findOne(10 * 1000);
        if (!listView) break;

        listView.children().forEach((view, index, arrs) => {
            fun(view, index, arrs);
        });

        if (listView.scrollForward()) {
            log("下滑成功！!");
            sleep(random(1000, 3000));
        } else {
            log("下滑失败！！");
            break;
        }
    }

    log("结束 列表遍历框架");

}

function 店长直聘 () {
    //导入自定义函数
    var strMods = require('./string.js');

    launchApp('店长直聘');

    id('iv_tab_contacts').waitFor();
    toastLog('进入店长直聘成功！');
    
    招聘岗位.split('-').forEach((岗位) => {
        
        if (岗位 == '营业员') {
            var userDataArray = storage.get('userDataArray') || [];
            // log('userDataArray -->>  '+userDataArray);
            toastLog(岗位+'一共储存了'+userDataArray.length+'条用户数据！');
        } else {
            var userDataArray = storage.get(岗位) || [];
            toastLog(岗位+'一共储存了'+userDataArray.length+'条用户数据！');
        }
    
        if (岗位) {
            toastLog('本次招聘岗位:'+岗位);
            // click(岗位);
            let 岗位控件 = text(岗位).findOne(3 * 1000);
    
            if (!岗位控件) {
                toastLog('没有找到岗位控件！')
                exit();
            }
    
            岗位控件.click();
            toastLog('延迟5秒钟！');
            sleep(5000);
            while (1) {
                id('iv_tab_contacts').waitFor();
                // log('进入主页');
            
                var userList = id('recycler_view').findOne(3 * 1000);
                if (!userList) {
                    toastLog('没有找到用户列表');
                    exit();
                }
                log('开始遍历');
            
                userList.children().forEach((user, index) => {
                    log('开始遍历第%d次', index);
                    if (user && user.childCount() > 1 && user.findOne(id('tv_name')) != null) {
                        //采集客户信息
            
                        var userName = user.findOne(id('tv_name')).text();
                        log('采集性别');
                        var userGender = user.findOne(id('tv_gender')).text();
            
                        log('采集年龄')
                        var userAge = user.findOne(id('tv_age')).text();
            
                        log('2');
                        log('userName  -->>  '+userName);
                        log('性别:'+userGender);
                        log('年龄:'+userAge);
            
                        var userData = userName + userGender + userAge;
            
                        log('userData  -->>  '+userData);
            
                        //判断是否重复
                        if (userDataArray.indexOf(userData) > -1) {
                            log('数据重复了！');
                        } else {
                            log('数据没有重复！');
                            //录入数组
                            userDataArray.push(userData);
                            //保存到内部储存
                            if (岗位 == '营业员') {
                                storage.put('userDataArray', userDataArray);
    
                            } else {
                                storage.put(岗位, userDataArray);
    
                            }
    
                            if (user.childCount() > 2) {
                                log('正常用户！');
                                while(!user.click());
                                sleep(2000);
            
                                log('等待  -->>  跟TA聊聊');
            
                                if (text('跟TA聊聊').findOne(5 * 1000)) {
                                    log('找到  -->>  跟TA聊聊');
                
                                    text('跟TA聊聊').findOne().parent().parent().parent().click();
                                    sleep(2000);
                                    log('准备进入聊天界面')
                                    text('获取电话').waitFor();
                                    sleep(2000);
            
                                    log('找到了获取电话  进入聊天界面');
    
                                    //开始找常用语控件
                                    // console.show();
                                    let 常用语控件 = className('ImageView').id('iv_common_words').findOnce() || text('常用语').findOnce();
    
                                    if (!常用语控件) {
                                        toastLog('没有找到常用语控件！')
                                        exit();
                                    }
                                    
                                    log('点击常用语');
                                    常用语控件.click();
                                    text('＋ 设置常用语').waitFor();
                                    
                                    sleep(1000);
                                    log('进入常用语界面');
                                    var recycler = className('android.widget.ListView').id('lv_common_words').findOne();
            
                                    for (let i = 0; i < recycler.childCount(); i++) {
                                        toastLog('第'+(i+1)+'次发话术@');
                                        let newListView = className('android.widget.ListView').id('lv_common_words').findOne();
                                        newListView.child(i).click();
                                        sleep(1000);
                                        log('点击发送');
                                        id('tv_send').text('发送').findOne().click();
                                        //开始延迟一定时间
                                        delay = strMods.randomNumOfSing(回复延迟, '-');
                                        toastLog('延迟'+delay+'秒！');
                                        sleep(delay * 1000);
            
                                        常用语控件 = className('ImageView').id('iv_common_words').findOnce() || text('常用语').findOnce();
    
                                        if (!常用语控件) {
                                            toastLog('没有找到常用语控件！')
                                            exit();
                                        }
                                        
                                        log('点击常用语');
                                        常用语控件.click();
                                        text('＋ 设置常用语').waitFor();
                                        sleep(1000);
                                        log('进入常用语界面');
                                    }
                                    //开始返回
                                    log('开始返回');
                                    text('更多').findOne().parent().parent().child(0).click();
                                    text('继续开聊').waitFor();
                                    sleep(2000);
                                    log('返回成功');
                                } else {
                                    log('没有找到  -->>  立即沟通');
                                }
                                log('再次返回');
                                id('tv_collect').findOne().parent().parent().child(0).click();
                                log('再次返回成功');
                                id('iv_tab_contacts').waitFor();
            
                                sleep(2000);
            
                            } else {
                                log('广告');
                            }
                        }
                    } else {
                        toastLog('这是广告！');
                    }
                });
                //下滑
    
                // log('手动滑动')
                // swipe(random(400, 500), random(1500, 1600), random(500, 600), random(400, 500), random(600, 1100));
                let 旧名字组 = id('tv_name').find();
                let 旧名字 = 旧名字组[旧名字组.length - 1].text();
                log('旧名字:'+旧名字);
    
                if (device.sdkInt > 23) {
                    log('手动下滑');
                    swipe(random(400, 500), random(1500, 1600), random(500, 600), random(400, 500), random(600, 1100));
                } else {
                    log('自动下滑');
                    if (userList.scrollForward()) {
                        toastLog('下滑成功！');
                    } else {
                        toastLog('下滑失败！');
                        break;
                    }
                }
    
                sleep(2000);
    
                // if (random(0,1) == 0) {
                //     if (userList.scrollForward()) {
                //         toastLog('下滑成功！');
                //     } else {
                //         toastLog('下滑失败！');
                //         break;
                //     }
                // } else {
                //     log('手动滑动');
                //     swipe(random(400, 500), random(1500, 1600), random(500, 600), random(400, 500), random(600, 1100));
                //     // sleep(2000);
                // }
    
                let 新名字组 = id('tv_name').find();
                let 新名字 = 新名字组[新名字组.length - 1].text();
                if (新名字 == 旧名字) {
                    toastLog('到底了，break');
                    break;
                }
                
    
                // if (userList.scrollForward()) {
                //     toastLog('下滑成功！');
                // } else {
                //     toastLog('下滑失败！');
                //     // break;
                //     log('手动滑动')
                //     swipe(random(400, 500), random(1500, 1600), random(500, 600), random(400, 500), random(600, 1100));
                //     sleep(2000);
    
                //     if (!userList.scrollForward()) {
                //         toastLog('还是下滑失败！！！');
                //         break;
                //     }
                // }
                sleep(2000);
            }
    
        }
    });
}

//###############班花模板脚本云端

