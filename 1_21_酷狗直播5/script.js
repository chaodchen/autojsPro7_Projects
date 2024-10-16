/*
 * @Author: BanHua
 * @Date: 2021-01-15 13:38:55
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-23 00:54:26
 * @Description: file content
 */
//开始脚本
let storage = storages.create('KuGou5');
let 操作次数 = storage.get('viewDataArr')['bh_czcs'] || 30;
console.show();

/////////////////////////////////////


this.下滑 = function () {
    var x1 = random(device.width/4,(device.width/4)*3);
    var y1 = random((device.height/4)*3.5,(device.height/4)*3.75);
    var x2 = random(device.width/4,(device.width/4)*3);
    var y2 = random((device.height/4)*0.25,(device.height/4)*0.5);
    swipe(x1, y1, x2, y2, random(500, 1000));
}

//访问用户主页函数,默认操作10个用户
this.v_visitUserHomepage = function (n_operNum) {
    let a_userData = [], n_iNum = 1, n_operNum = n_operNum || 10;
    console.info("本次需要操作【%d】个用户！", n_operNum);
    try {
        loop2:
        while (1) {
            log("开始while【loop2】循环");
            //准备遍历列表
            let n_length = id("ca7").find().length; o_list = id("ca7").find()[n_length-1];
            o_list.children().forEach((o_view, n_index) => {
                //判断操作次数是否达到上限
                console.info("正在对第%d个用户进行操作！", n_iNum);
                if (n_iNum > n_operNum) throw "已经操作完成";
                if (o_view != null && o_view.className() == "android.widget.RelativeLayout" && o_view.clickable() == true) {
                    //读用户昵称
                    let s_userName = o_view.findOne(id("de3")).text();console.info("正在操作的用户为【%s】", s_userName);
                    //判断重复
                    if (a_userData.indexOf(s_userName) > -1) return false;
                    a_userData.push(s_userName);
                    //如果n_v超过指定次数就判定为神秘人
                    let n_v = 0;
                    do {
                        console.info("开始点击用户【%s】", s_userName, o_view.click());log("延迟1秒");sleep(1000);n_v++;
                        if (n_v >= 5) {
                            console.log("【%s】可能是神秘人", s_userName);
                            return false;
                        }
                    } while (!text("动态").exists() && !text("资料").exists());
                    
                    log("进入用户资料界面成功！等待三秒钟");
                    if (text('关注').exists()) {
                        click('关注');

                    }
                    sleep(3*1000);n_iNum++;
                    //开始返回
                    do {
                        if (text("动态").exists() && text("资料").exists()) back();
                        log("等待一秒钟");sleep(1000);
                    } while (!text("7天").exists() && !text("本场").exists());

                } else {console.info("-----1-----")}
            });
            //下滑列表
            log("开始下滑操作列表！");if (!o_list.scrollForward()) break;
            log("延迟一秒钟");sleep(1*1000);
            log("结束while【loop2】循环");
        }
    } catch (_err) {
        
    }
}

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
        } else if (text('我知道了').exists()) {
            log('我知道了');
            click('我知道了');
        } else if (text('允许').exists()) {
            log('允许');
            click('允许');

        } else if (id('dn8').exists()) {
            log('关闭一起玩')
            id('dn8').findOne().click();
            
        }
    }
});

(function(){
    //初始化局部变量
    loop1:
    while (1) {
        log("开始while【loop1】循环");

        //判断是否在直播界面
        console.verbose("开始等待id【b5l】出现！");id("b5l").waitFor();
        //点击更多
        do {
            log('点击id【b5l】');id('b5l').findOne().click();sleep(2000);
        } while (id('b5l').exists());
        console.verbose("开始等待text【亲密榜】出现！");text("亲密榜").waitFor();
        
        //进入操作列表
        do {
            log("点击text【贡献榜】");click("贡献榜");log("延迟1-2秒");sleep(random(1000, 2000));log("点击text【7天】");click("7天")
        } while(id("ca7").find().length < 1);

        //进入主体循环
        v_visitUserHomepage(操作次数);

        //开始返回到主页
        do {
            log("返回");back();log("延迟一秒");sleep(1*1000);
        } while (!id("b5l").exists());
        log("开始while【loop1】循环");

        log("开始下滑到下一个主播");下滑();log("延迟五秒钟");sleep(5*1000);
    }
})();


// //两个数组去重，前面小数组，后面大数组
// function array_diff(a, b) {
//     let c = [];
//     b.forEach((_b, _index) => {
//         if (a.indexOf(_b) == -1) {
//             c.push(_b);
//         }
//     });
//     return c;
// }


// function 返回直播 () {
//     while (!id('b5l').exists()) {
//         back();
//         sleep(1500);
//     }
// }

// function 访问主页 () {
//     let _主页按钮 = text('主页').findOnce();
//     if (_主页按钮) {
//         log('找到了主页按钮');
//         if (_主页按钮.click()) {
//             log('点击主页按钮成功');
//             _返回按钮 = id('fz0').findOne(3 * 1000);
//             if (_返回按钮) {
//                 log('找到了返回按钮');
//                 sleep(random(500, 1000))
//                 _返回按钮.click();
//                 log('点击返回按钮成功')
//             } else {
//                 log('没有找到返回按钮');
//             }
//         }
//     } else {
//         log('没有找到主页按钮');
//         return false;
//     }
// }



