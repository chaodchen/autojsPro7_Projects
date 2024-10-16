进入主页()
toastLog('延迟两两秒')
sleep(2000)
log('没有找到点赞按钮')
while (!id('feed_like_view').findOnce());
log('找到了点赞按钮')

log('准备下滑')
for (let i = 0; i < 5; i++) {
    if (!text('绑定手机').findOne(3000)) {
        模拟下滑()
    } else {
        toastLog('出现了绑定手机')
        // let 绑定手机 = text('绑定手机').findOne()
        // let 关闭按钮 = 绑定手机.parent().child(0)
        // if (关闭按钮.click()) {
        //     console.infO('关闭绑定手机弹窗成功')
        // }
        break
    }
}

toastLog('刷新成功,延迟三秒钟')
sleep(3000)


function 进入主页 () {
    while (1) {
        if (text('附近动态').exists() && text('附近的人').exists()) {
            toastLog('进入陌陌主页成功')
            break
        } else {
            sleep(1000)
        }
    }
}



function 模拟下滑 () {
    swipe(random(400, 500), random(400, 500), random(400, 500), random(800, 900), random(500, 1000))
    sleep(1111)
}

