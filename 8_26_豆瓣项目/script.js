// let 刷新延迟 = storage.get('viewDataArr')['delay']
let 回复延迟 = '310-400'
console.show();
//设置回复延迟
let 回复次数 = 0;

var randomStr = (strs,num) => {
    strs = strs || 'qwertyuiopasdfghjklzcbnm是的士大夫鬼地方好地方去微软绕太阳从更何况';

    let strArr = strs.split('');
    let r = ''
    for (let i = 0; i < num; i++) {
        r = r + strArr[random(0, strArr.length - 1)];
    }
    return r;
}

var getRandomOfSing = (str_0, str_1) => {
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

while (1) {
    console.info('第%d次回复', 回复次数)
    //首先判断是否在回复界面
    text('写回复...').waitFor();
    log('在回复界面')
    //判断是否有已顶回复
    id('overflow_menu').find().forEach((view) => {
        if (view) {
            log('开始点击三个点');
            view.click();
            sleep(1000);
            if (text('删除回复').exists()) {
                // text('删除回复').waitFor();
                log('点击删除回复');
                text('删除回复').findOne().parent().parent().click();
                text('确定删除这条回复吗？').waitFor();
                log('删除');
                sleep(1000);
                while(!id("confirmLayout").findOne().click());
                sleep(1000);
                log('删除成功');
            }

        }
    });

    sleep(2000);
    //开始回复
    log('开始回复');
    id('input_comment_fake_bg').findOne().click();
    log('点击回复');
    text('发布').waitFor();
    log('输入回复内容');
    id('reply_content').findOne().setText(randomStr(null, 2));
    sleep(random(500, 1000));
    log('点击发布');
    click('发布');
    回复次数++;
    let 本次延迟 = getRandomOfSing(回复延迟, '-');
    console.info('本次延迟'+本次延迟+'秒！');
    sleep(Number(本次延迟) * 1000);
}

