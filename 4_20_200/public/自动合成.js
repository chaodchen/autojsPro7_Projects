log('开始自动合成')

views = {
    合成容器 : id('lyt_merge'),
    合成主体 : className('android.widget.FrameLayout'),
    等级文本 : id('tv_level').depth(12),
    购买函数 : function () {
        _v = desc('成长').findOnce()
        console.verbose('_v:'+_v)
        if (_v) {
            if (_v.click()) {
                log('点击_v成功')
                return true
            } else {
                log('点击_v失败')
                return false
            }
        } else {
            log('没有找到_v')
            return null
        }
    },
}

合成()

function 合成 () {
    等级控件组 = views.等级文本.find()
    新排序等级控件组 = []
    for (let i = 0;i < 等级控件组.length; i++) {
        新排序等级控件组.push(Number(等级控件组[i].text()))
    }
    function s(a,b){return a-b}
    log(新排序等级控件组.sort(s))
}

log('结束自动合成')