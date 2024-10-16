"auto";

/*

微信关注公众号：柯桥区妇幼保健院 > 就诊服务 > 挂号预约 > 妇产科 > 九价HPV接种门诊 > 普通号

*/

//定义常量

//定义变量
var 刷新时间 = 500

while (1) {

    预约按钮 = text('预约').findOnce()

    if (预约按钮) {
        预约按钮.click()
        预约()
    } else {
        刷新()
        sleep(刷新时间)
    }
    
}

function 刷新() {
    log('开始刷新')
}

function 预约 () {

    //等待进入预约界面

    text('确认提交').findOne().click()

}