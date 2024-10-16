/*
 * @Author: BanHua
 * @Date: 2020-12-28 16:59:57
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-05 23:30:28
 * @Description: file content
 */
let coorMod = {};

//寻找一个文本控件  如果找到了就用坐标去点击
coorMod.clickText = (content, delay) => {
    delay = delay || 1;
    let r = text(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());

    } else {
        return null
    }
}

coorMod.clickDesc = (content, delay) => {
    delay = delay || 1;
    let r = desc(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());
    } else {
        return null
    }
}

coorMod.clickId = (content, delay) => {
    delay = delay || 1;

    let r = id(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());

    } else {
        return null
    }
}

coorMod.clickClassName = (content, delay) => {
    delay = delay || 1;

    let r = className(content).findOne(delay * 1000);
    if (r) {
        click(r.bounds().centerX(), r.bounds().centerY());

    } else {
        return null
    }
}

//利用坐标去点击一个已有的控件
coorMod.clickView = (content) => {
    click(content.bounds().centerX(), content.bounds().centerY());
}

//兼容安卓5以上所有的点击动作
coorMod.clickTapCoor = (_x, _y, _d) => {
    _x = Number(_x);
    _y = Number(_y);


    if (_d != null) {
        _d = random(-_d, _d);

    } else {
        _d = 0;
    }
    
    _x = _x + _d;
    _y = _y + _d;


    if (device.sdkInt > 23) {
        click(_x, _y);
    } else {
        Tap(_x, _y);
    } 
}


module.exports = coorMod;
