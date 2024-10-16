/*
 * @Author: your name
 * @Date: 2020-04-20 23:34:24
 * @LastEditTime: 2020-04-21 01:02:38
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Project\TaoBaoProjcet\4_20_200\第十四次课程代码.js
 */
// threads.start(购买)
// threads.start(监控确定)

//合成
while(true){
    var 排序=id('tv_level').depth(12).find();
    var 新排序=new Array()
    for(i=0;i<排序.length;i++){
        新排序[i]=Number(排序[i].text())
    }
    function s(a,b){return a-b}
    新排序.sort(s)

    var 最大数=新排序[新排序.length-1];
    var 最小数=新排序[0]

    
    for(g=最小数;g<=最大数;g++){
        
        var a=text(g).depth(12).find();
        if(a.length<2){
            continue;
        }
        for(i=0;i<Math.floor(a.length/2);i++){    
            gesture(400,坐标(i),坐标(i+0.5))
            sleep(1000)
    }
    }
}

function 购买(){
    var a=id("l9").depth(16).find();
    while(a.length<=8){
        id("aq").findOne().click()
        sleep(500);
    }
}


function 监控确定(){
    while(true){
        var a=text("确定").findOnce();
        if(a!=null){

            a.click()
        }

    }
}
function 坐标(i){
    return [a[2*i].bounds().centerX(),a[2*i].bounds().centerY()]
}