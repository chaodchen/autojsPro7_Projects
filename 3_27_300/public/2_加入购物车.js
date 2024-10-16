textContains('加入购物车').findOne().click()
选项 = mods.view.waitViews(['确定'], 'text', 1000, 5)

if (选项) {

    taosku = id('taosku_sku').findOne()
    if (taosku) {
        分类列表 = taosku.child(0).child(0)
        log('该商品一共有%d个分类', 分类列表.childCount())

        分类列表.children().forEach((分类项目列表) => {

            if (分类项目列表) {
                log('该商品一共有%d个分类项目', 分类项目列表.child(1).childCount())
                if (分类项目列表.child(1).childCount() > 1) {
                    分类项目列表数组 = 分类项目列表.child(1).children()
                    while (1) {
                        本次分类控件 = 分类项目列表数组[random(0, 分类项目列表数组.length - 1)]
                        if (本次分类控件.desc().indexOf('不可选择') == -1) {
                            log('本次控件可以点击')
                            本次分类控件.click()
                            break
                        } else {
                            log('本次控件无法点击，换一个')
                        }
                    }
                } else {
                    log('分类项目列表等于1')
                }
            }
        })

        for (let i = 1; i < Number(getInput[1]); i++) {
            desc('增加购买数量').findOne().click()
            sleep(200)
        }

        log('开始点击确定')
        确定 = 控件组.确定.findOne(5000)
        if (确定) {
            log("点击确定-->>  "+确定.parent().parent().click())
        } else {
            log('没有找到购物车的确定按钮')
            exit()
        }
        sleep(1000)
    } else {
        log('没有找到分类列表')
        exit()
    }
}



function tapIfView (_view, _arr, _uiselect, _time, _num) {
    log('要点击的控件bounds为：'+_view.bounds())
    taps(_view.bounds().centerX(), _view.bounds().centerY(), 10)
    log('模拟点击该控件')
    return mods.view.waitViews(_arr, _uiselect, _time, _num)

}
