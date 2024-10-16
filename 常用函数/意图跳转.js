/*
 * @Author: BanHua
 * @Date: 2021-01-14 12:08:25
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-14 13:19:53
 * @Description: file content
 */
//群入口意图，如果已加该群，会显示发送消息入口，未加该群，会显示加入该群，指定群入口
// 打开QQ群窗口(4607221);



切换帐号(2);

function 切换帐号(_index) {
    id('ba1').findOne().click();
    text('设置').waitFor();
    id('settings').findOne().click();
    text('帐号管理').waitFor();
    id("account_switch").findOne().click();
    id('check').waitFor();
    
    let _帐号控件 = id('dq8').drawingOrder(_index).findOne(3 * 1000);

    if (!_帐号控件) {
        console.error('没有找到帐号控件@');
    }

    if (_帐号控件.click()) {
        console.info('点击帐号控件成功！');
        
    }

    while (1) {
        if (text('消息').exists()) {
            break;
        } else {
            back();
        }
        sleep(3 * 1000)
    }

}









function 打开QQ群窗口 (_qun) {
    app.startActivity({ 
        data: "mqqapi://card/show_pslcard?card_type=group&uin="+_qun
    });
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqwpa://im/chat?chat_type=group&version=1&src_type=web&uin="+_qun ,
        packageName: "com.tencent.mobileqq",
    });
}


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


function 随机字符 (strs,num) {
    strs = strs || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let strArr = strs.split('');
    let r = ''
    for (let i = 0; i < num; i++) {
        r = r + strArr[random(0, strArr.length - 1)];
    }
    return r;
}