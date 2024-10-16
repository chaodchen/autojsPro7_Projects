/*
 * @Author: BanHua
 * @Date: 2021-01-02 22:01:44
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-19 12:42:34
 * @Description: file content
 */
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}

const 体力预算 = 500;

let 福 = images.load('http://8888-8.cn/appImg/1_2_阴阳师/fu.jpg')
let 挑战 = images.load('http://8888-8.cn/appImg/1_2_阴阳师/tiaozhan.jpg')
let 挑战次数 = 0

while (1) {
    let 截图 = captureScreen();

    let 福控件 = images.findImage(截图, 福);
    let 挑战控件 = images.findImage(截图, 挑战);


    if (挑战次数 * 6 >= 体力预算) {
        toastLog('没体力了！');
        exit();

    }

    if (福控件) {
        点击随机坐标(福控件.x, 福控件.y, 40);
    } else if (挑战控件) {
        挑战次数++;
        点击随机坐标(挑战控件.x, 挑战控件.y, 20);
    } else {
        log('战斗中...');
        sleep(random(5, 12) * 1000);
    }

    toastLog('已挑战'+挑战次数+'次，已消耗'+(挑战次数 * 6)+'体力');
    
}



function 点击随机坐标 (_x, _y, _z) {
    _z = random(-_z, _z) || 0;

    _x = _x+_z, _y = _y+_z;
    log('本次点击坐标x：%d，坐标y:%d', _x, _y);

    click(_x, _y);
    
}