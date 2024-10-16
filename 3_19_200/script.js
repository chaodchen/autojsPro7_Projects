//常量定义
console.show()
/*

微博点赞
微博转发
微博转发不屏蔽
微博评论指定内容
微博评论随机图片
微博评论GIF图
微博点赞布屏蔽
微博直发
微博关注
//https://huli.weibot.cn/grab-task?task_type=
1_2_6
1_3_1
1_3_3
1_3_4
1_1_6
1_9_0
1_5_0
1_1_0
1_2_0
*/
//变量定义
Tap = null
var storage = storages.create('3_19_200').get('config')

//函数定义

//定义函数
Tap = function (x, y, z) {
    if (z) {
        if (random(0,1) == 0) {
            x = x-z
        } else {
            x = x+z
        }

        if (random(0,1) == 0) {
            y = y-z
        } else {
            y = y+z
        }
    }
    if (device.sdkInt > 23) {
        click(x, y)
    } else {
        shell("input tap "+x+' '+y, true)
    }
}

function openWeiBoUrl(url) {
    app.startActivity({
        packageName: "com.sina.weibo",
        className: "com.sina.weibo.browser.WeiboBrowser",
        data: url,
        type: "Uri"
    });
}

getRandomNumOfSing = function (str_0, str_1) {

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

function GetTaskUrl() {
    var res = "https://huli.weibot.cn/grab-task?task_type=";
  
    var taskStr = "";
  
    if (storage.che[0]) {
      taskStr = taskStr + "wb_like";
    }
    if (storage.che[2]) {
      taskStr = taskStr + "-wb_forward";
    }
    if (storage.che[1]) {
      taskStr = taskStr + "-wb_forward_visible";
    }
    if (storage.che[3]) {
      taskStr = taskStr + "-defined_comment";
    }
  
    // //去掉链接第一个"-" 横杠
    var taskStrLen = taskStr.length;
    if (taskStrLen > 0) {
      var oneIndexStr = taskStr.substring(0, 1);
      if (oneIndexStr == "-") {
        taskStr = taskStr.substring(1, taskStrLen);
      }
      res = res + taskStr;
    } else {
      cw("没有获取到 任何任务类型\n请检查辅助页面是否勾选任务类型");
        return 'http://baidu.com'
    }
  
    return res;
  }

function descTextWiatFor (_str) {
    while (1) {
        if (descContains(_str).exists() || textContains(_str).exists()) {
            break;
        }
    }
}

/**
 * 判断是否存在满足text的控件
 * @param {string} content 控件 Text 内容
 */
function IsExistText(content) {
    return text(content).exists();
}

function IsExistDesc(content){
    return desc(content).exists();
    
}

/**
 * 判断任务类型
 * @param {string}} taskName
 */

function JudgeTaskDesc (taskName) {
    return (
        IsExistDesc(taskName) && !IsExistDesc("需求墙") && !IsExistDesc("微博正文")
    );
}

function JudgeTaskType(taskName) {
    return (
        IsExistText(taskName) && !IsExistText("需求墙") && !IsExistText("微博正文")
    );
}

//脚本开始
openWeiBoUrl('https://huli.weibot.cn/home/2')

//开始判断是否进入互利互助主页
descTextWiatFor('未领取')

console.show()


task = ''
if (storage.che[0]) {
    log('微博点赞')
    task = task+'1_2_6'
}
if (storage.che[1]) {
    log('微博转发不屏蔽')
    task = task+'-1_3_3'
}
if (storage.che[2]) {
    log('微博转发')
    task = task+'-1_3_1'
}
if (storage.che[3]) {
    log('指定评论')
    task = task+'-1_3_4'
}
if (storage.che[4]) {
    log('微博点赞不屏蔽')
    task = task+'-1_5_0'
}

// 1_1_6

//去掉参数第一个-

if (task.split('')[0] == '-') {
    log('有-')
    task = task.replace(/-/, '')
}

task = task.trim()

task = 'https://huli.weibot.cn/grab-task?task_type='+'1_2_6-1_3_3-1_3_1-1_3_4-1_5_0'

log(task)

评论_草稿箱次数 = 0
转发_草稿箱次数 = 0

loop = true
do {
    log('重新抢单成功')
    openWeiBoUrl(task)
    抢单时间 = 0

    do {
        if (JudgeTaskType("微博点赞") || JudgeTaskDesc("微博点赞") || JudgeTaskType("微博点赞不屏蔽") || JudgeTaskDesc("微博点赞不屏蔽")) {
            sleep(2000)
            点赞任务();
            提交审核();
            break;
        } else if (JudgeTaskType("微博转发") || JudgeTaskDesc("微博转发")) {
            转发任务();
            转发_草稿箱次数 = 转发_草稿箱次数 + 草稿箱();

            if (转发_草稿箱次数 > storage.inp[2]) {
                log('取消转发任务')
                task = task.replace(/1_2_0/, "")
                task = task.replace(/-{2}/, "-")

            }
            提交审核();
            break;
        } else if (JudgeTaskType("微博转发不屏蔽") || JudgeTaskDesc("微博转发不屏蔽")) {
            转发任务();
            转发_草稿箱次数 = 转发_草稿箱次数 + 草稿箱();
            if (转发_草稿箱次数 > storage.inp[2]) {
                log('取消转发不屏蔽任务')
                task = task.replace(/1_2_6/, "")
                task = task.replace(/-{2}/, "-")
            }
            提交审核();

            break;
        } else if (JudgeTaskType("微博评论指定内容") || JudgeTaskDesc("微博评论指定内容")) {

           if (device.sdkInt < 24) {

                plnr = className('android.webkit.WebView').desc('互利互助 · 互利互助').findOne().child(6)
                log('评论内容desc -->>  '+plnr.desc())
                log('评论内容text -->>  '+plnr.text())
    
                if (plnr.desc() != '') {
                    setClip(plnr.desc())
                } else {
                    setClip(plnr.text())
                }
           } else {
                复制内容 = text('复制内容').findOnce() || desc('复制内容').findOnce()
                if (!复制内容) {
                    toastLog('没有找到复制内容')
                } else {
                    复制内容.click()
                }
           }

            评论任务();

            评论_草稿箱次数 = 评论_草稿箱次数 + 草稿箱();
            if (评论_草稿箱次数 > storage.inp[1]) {
                log('取消评论任务')
                task = task.replace(/1_3_1/, "")
                task = task.replace(/-{2}/, "-")
            }

            提交审核();

            break;
        } else {
            sleep(1000);
            抢单时间++
            log('抢单中')
            if (抢单时间 > storage.inp[3]) {
                log('重新抢单！！！')
                id('titleLeft').findOne().click()
                sleep(1000)
                break
            }
        }

    } while (1)

} while(loop)

function 微博正文 () {
    _判断 = false
    oTime = 0
    do {
        //desc = 互利互助 · 互利互助
        if (IsExistText('微博不存在或暂无查看权限!')) {
            log('微博不存在或暂无查看权限')
            _判断 = false
            break 
        }

        if (IsExistText("微博正文")) {
            log('微博正文')
            _判断 = true
            break
        }

        oTime++

        if (oTime > 30) {
            log('微博打开超时')

            break
        }

        sleep(1000)

    } while (1)

    return _判断
}

function 点赞任务 () {

    if (微博正文()) {
        sleep(2000)
        text('赞').indexInParent(1).findOne().parent().parent().click()
        log('点赞')
        sleep(getRandomNumOfSing(storage.inp[0], '-') * 1000)

    } else {
        log('没有找到微博正文')
    }

    desc('返回').findOne().click()

}

function 转发任务 () {

    if (微博正文()) {

        text('转发').findOne().parent().parent().click()
        log('点击转发成功')
        text('转发微博').waitFor()
        log('转发微博')
        sleep(getRandomNumOfSing(storage.inp[0], '-') * 1000)
        text('发送').indexInParent(0).findOne().parent().parent().click()
        log('发送')
        sleep(getRandomNumOfSing(storage.inp[0], '-') * 1000)
        desc('返回').findOne().click()

    } else {
        log('没有找到微博正文')
    }
}

function 评论任务 () {

    if (微博正文()) {

        text('评论').indexInParent(1).findOne().parent().parent().click()
        log('点击评论')
        sleep(1000)
        if (text('发送').findOne(2000)) {
            className('EditText').findOne().setText(getClip())
            sleep(getRandomNumOfSing(storage.inp[0], '-') * 1000)
            text('发送').indexInParent(2).findOne().click()
            sleep(getRandomNumOfSing(storage.inp[0], '-') * 1000)
        } else {
            log('没有找到编辑矿')
        }

    } else {
        log('没有找到微博正文')
    }
}

function 提交审核 () {
    openWeiBoUrl('http://huli.weibot.cn/home/2')
    descTextWiatFor('进行中')
    log('进行中')
    进行中 = text('进行中').findOnce() || desc('进行中').findOnce()

    if (进行中) {
        if (进行中.click()) {
            log('点击进行中成功')
        }
    } else {
        log('没有找到进行中')
    }

    sleep(2000)

    提交审核次数 = 0

    while (1) {
        _提交审核 = text('提交审核').findOnce() || descContains('提交审核').findOnce()
        _没有更多了 = text('没有更多了').findOnce() || descContains('没有更多了').findOnce()
        _暂无数据 = text('暂无数据').findOnce() || descContains('暂无数据').findOnce()
        if (_提交审核) {
            log('提交审核')
            if (_提交审核.click()) log('提交审核成功');
            sleep(getRandomNumOfSing(storage.inp[0], '-') * 1000)

        } else if (_没有更多了) {
            log('没有更多了')
            break
        } else if (_暂无数据) {
            log('暂无数据')
            break
        } else {
            log('等待进入进行中')
        }

        提交审核次数++
        if (提交审核次数 > 5) {
            break
        }

    }

    sleep(1000)

}

function 草稿箱 () {
    app.startActivity({
        packageName: "com.sina.weibo",
        className: "com.sina.weibo.composerinde.appendix.draft.DraftBox",
    });

    sleep(1000)

    while (1) {
        _重发 = text('重发').findOne(1000)
        if (_重发) {
            log('找到了重发')
            _重发.parent().parent().parent().longClick()
            sleep(1000)
            text('清空草稿箱').findOne().click()
            text('是否要清空草稿箱？').waitFor()
            sleep(1000)
            text('确定').findOne().click()

            //群发
            return 1
        } else {
            log('没有找到重发')

            return 0
        }

    }

}


for (let i = 0; i < ) {

}