/**最后修订与2020年12月23日0点40分 */


var 回复延迟 = storage.get('viewDataArr')['hfyc'];
var 全局延迟 = storage.get('viewDataArr')['qjyc'];

//导入自定义函数
var strMods = importMods('mod/string.js');

// console.show();
var userDataArray = storage.get('userDataArray') || [];

sleep(2000);

log('userDataArray -->>  '+userDataArray);

toastLog('一共储存了'+userDataArray.length+'条用户数据！');

//###############班花模板脚本云端

while (1) {

    sleep(strMods.randomNumOfSing(全局延迟, '-') * 1000);
    var userList = id('recycle_view').findOne(3 * 1000);
    if (!userList) {
        toastLog('没有找到用户列表');
        exit();
    }
    log('开始遍历');

    userList.children().forEach((user, index) => {
        log('开始遍历第%d次', index);
        if (user && user.childCount() > 1 && user.findOne(id('user_name')) != null) {
            //采集客户信息
            var userName = user.findOne(id('user_name')).text();
            log('1');
            var userOtherInfo = user.findOne(id('user_other_info')).text();
            log('2');
            log('userName  -->>  '+userName);
            log('userOtherInfo  -->>  '+userOtherInfo);

            var userData = userName + userOtherInfo;
            log('userData  -->>  '+userData);

            //判断是否重复
            if (userDataArray.indexOf(userData) > -1) {
                log('数据重复了！');
            } else {
                log('数据没有重复！');
                //录入数组
                userDataArray.push(userData);
                //保存到内部储存
                storage.put('userDataArray', userDataArray);
                while(!user.click());
                log('等待  -->>  立即沟通');

                if (text('立即沟通').findOne(5 * 1000)) {
                    log('找到  -->>  立即沟通');

                    className('Button').text('立即沟通').findOne().click();
    
                    text('请输入消息内容').waitFor();

                    //开始点击常用语
                    log('点击常用语');
                    id('btn_voice_or_text').findOne().click();
                    text('添加常用语').waitFor();
                    sleep(strMods.randomNumOfSing(全局延迟, '-') * 1000);

                    var recycler = id('recycler_view').findOne();

                    recycler.children().forEach((view) => {

                        if (view) {
                            view.click();
                            //开始延迟一定时间
                            delay = strMods.randomNumOfSing(回复延迟, '-');
                            toastLog('延迟'+delay+'秒！');
                            sleep(delay * 1000);
                        }
                    });
    
                    //开始返回
                    log('开始返回');
                    id('chat_left_group').findOne().click();
                    text('继续沟通').waitFor();
                    log('返回成功');
                } else {
                    log('没有找到  -->>  立即沟通');
                }

                sleep(strMods.randomNumOfSing(全局延迟, '-') * 1000);
                log('再次返回');
                id('ib_menu_back').findOne().click();
                log('再次返回成功');

                text('推荐').waitFor();
                sleep(strMods.randomNumOfSing(全局延迟, '-') * 1000);
            }
        } else {
            toastLog('客户信息为空');
        }
    });
    //下滑
    if (userList.scrollForward()) {
        toastLog('下滑成功！');
    } else {
        toastLog('下滑失败！');
    }
    sleep(strMods.randomNumOfSing(全局延迟, '-') * 1000);

}


