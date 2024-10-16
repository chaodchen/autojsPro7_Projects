/*
 * @Author: your name
 * @Date: 2020-03-24 16:34:33
 * @LastEditTime: 2020-03-30 09:25:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /TaoBaoProjcet/3_23_200/script.js
 */
var storage = storages.create('3_23_200')
console.show()
config = storage.get('config')
log('config-->>  ', config)

while (1) {

    if (text('预约').exists()) {
        text('预约').findOne().click()
        
        log('预约')
        break
        
    } else if (desc('更多').exists()) {
        log('更多')
        desc('更多').findOne().click()
    } else if (text('刷新').exists()) {
        waitUiSelector(['浮窗', '全文翻译'], 'text')
        log('刷新')
        text('刷新').findOne().parent().click()
        waitUiSelector(['九价HPV接种门诊-绍兴市柯桥区妇幼保健院', '绍兴市柯桥区妇幼保健院'], 'text')
    }

    sleep(config.inputViewArray[0])
    
}

log('出循环了')

log('预约时段已刷新')
waitUiSelector(['就诊卡', '就诊人', '确认提交', config.inputViewArray[1]], 'text')
while(text('请选择预约时段').exists());

text('确认提交').findOne().click()
log('进入预约界面成功')
waitUiSelector(['预约成功', '详情'], 'text')

log('预约成功')
exit()

//等待很多个控件同时出现的函数
function waitUiSelector (_arr, _selector, _time) {

    _arr = _arr || []
    _time = _time || 0
    if (_arr.length > 0) {
        log(_arr.length)
        while (1) {

            if ((function(){
                log('_arr -->> '+_arr)
                _存在否 = true
                _arr.forEach((_arr_content) => {
                    switch (_selector) {
                        case 'className':
                            if (className(_arr_content).exists()) {
                                log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                            } else {
                                log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')
                                _存在否 = false
                            }
                            break
                        case 'desc':
                            if (desc(_arr_content).exists()) {
                                log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                            } else {
                                log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                                _存在否 = false
                            }
                            break
                        case 'text':
                            if (text(_arr_content).exists()) {
                                log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                            } else {
                                log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                                _存在否 = false
                            }
                            break
                        case 'id':
                            if (id(_arr_content).exists()) {
                                log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                            } else {
                                log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                                _存在否 = false
                            }
                        default:
                            if (text(_arr_content).exists()) {
                                log('当前屏幕存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                            } else {
                                log('当前屏幕不存在属性为:\"'+_selector+'\"、内容为:\"'+_arr_content+'\"的控件')

                                _存在否 = false
                            }
                    }
                })
                return _存在否
            })()) {
                log(_arr.toString()+'>>>都存在')
                break
            } else {
                log(_arr.toString()+'>>>不存在')

            }
            sleep(_time)
        }

    }

}