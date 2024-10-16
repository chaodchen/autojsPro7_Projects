/*
 * @Author: your name
 * @Date: 2021-01-03 21:18:07
 * @LastEditTime: 2021-01-20 12:46:39
 * @LastEditors: BanHua
 * @Description: In User Settings Edit
 * @FilePath: /TaoBao/1_2_阴阳师/斗技.jsd
 */
if(!requestScreenCapture()){
    toast("请求截图失败");
    stop();
}


let 斗 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/斗技/dou.jpg');
let 手动 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/斗技/shoudong.jpg');
let 战 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/斗技/zhan.jpg');
let 准备 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/斗技/zhunbei.jpg');
let 福 = images.load('http://aj.8888-8.cn/appImg/1_2_阴阳师/斗技/fu.jpg');

let 挑战次数 = 0

while (1) {
    let 截图 = captureScreen();

    let 斗控件 = images.findImage(截图, 斗, {
        threshold : 0.8
    });
    let 手动控件 = images.findImage(截图, 手动, {
        threshold : 0.8
    });
    let 战控件 = images.findImage(截图, 战, {
        threshold : 0.8
    });
    let 准备控件 = images.findImage(截图, 准备, {
        threshold : 0.8
    });
    let 福控件 = images.findImage(截图, 福, {
        threshold : 0.8
    });

    if (福控件) {
        log('福');
        点击随机坐标(福控件.x, 福控件.y, 40);
    } else if (斗控件) {
        log('斗');
        点击随机坐标(斗控件.x, 斗控件.y, 20);
        sleep(3000);
    } else if (手动控件) {
        log('手动');
        点击随机坐标(手动控件.x, 手动控件.y, 20);
    } else if (战控件) {
        log('战');
        点击随机坐标(战控件.x, 战控件.y, 20);
        挑战次数++;
    } else if (准备控件) {
        log('准备');
        点击随机坐标(准备控件.x, 准备控件.y, 20);
    } else {
        log('战斗中...');
        sleep(random(3, 8) * 1000);
    }
    sleep(3000);

    toastLog('已挑战'+挑战次数+'次');
}



function 点击随机坐标 (_x, _y, _z) {
    _z = random(-_z, _z) || 0;

    _x = _x+_z, _y = _y+_z;
    log('本次点击坐标x：%d，坐标y:%d', _x, _y);

    click(_x, _y);
    
}