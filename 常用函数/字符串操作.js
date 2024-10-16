/*
 * @Author: BanHua
 * @Date: 2021-01-14 12:13:23
 * @LastEditors: BanHua
 * @LastEditTime: 2021-01-18 15:05:50
 * @Description: file content
 */


/**
 * 
 * @param {要代入的字符串} $s_str_0 
 * 字符串用分隔符分割成随机范围的数字
 */
this.Fn_n_RandomStrToNum = function ($s_str_0) {
    //以str_1分割，取一个随机数
    let str_1 = $s_str_0.replace(/\d/g, '');
    switch (typeof($s_str_0)) {
        case 'number':
            return $s_str_0
        case 'string':
            if ($s_str_0.indexOf(str_1) > -1) {
                num_min = $s_str_0.split(str_1)[0]
                num_max = $s_str_0.split(str_1)[1]
                return random(Number(num_min), Number(num_max))
            } else {
                return Number($s_str_0)
            }
        default:
            return 0;
    }
}

/**
 * 
 * @param {要代入的数字} $n_num 
 * @param {要取的范围} $n_num2 
 * 一般用于生成随机坐标
 */
this.Fn_n_NumberToRundomNum = function ($n_num, $n_num2) {
    $n_num = Number($n_num),$n_num2 = $n_num2 || 10;
    return random($n_num - $n_num2 / 2, $n_num + $n_num2 / 2);
}

/**
 * 下滑函数
 */
this.Fn_v_SwipeDown = function () {
    let x1 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
    let y1 = this.Fn_n_NumberToRundomNum (device.height * 0.75, 50);
    let x2 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
    let y2 = this.Fn_n_NumberToRundomNum (device.width * 0.25, 50);
    let r1 = random(600, 1200);
    device.sdkInt > 23 ? swipe(x1, y1, x2, y2, r1) : shell("input swipe "+x1+" "+y1+" "+x2+" "+y2+" "+r1, true);
}

/**
 * 上滑
 */
this.Fn_v_SwipeUp = function () {
    let x1 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
    let y1 = this.Fn_n_NumberToRundomNum (device.width * 0.25, 50);
    let x2 = this.Fn_n_NumberToRundomNum (device.width / 2, 50);
    let y2 = this.Fn_n_NumberToRundomNum (device.height * 0.75, 50);
    let r1 = random(600, 1200);
    device.sdkInt > 23 ? swipe(x1, y1, x2, y2, r1) : shell("input swipe "+x1+" "+y1+" "+x2+" "+y2+" "+r1, true);
}
function 随机字符 (strs,num) {
    strs = strs || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    let strArr = strs.split('');
    let r = ''
    for (let i = 0; i < num; i++) {
        r = r + strArr[random(0, strArr.length - 1)];
    }
    return r;
}














