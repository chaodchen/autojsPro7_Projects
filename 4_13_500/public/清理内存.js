/*
 * @Author: your name
 * @Date: 2020-04-20 07:55:56
 * @LastEditTime: 2020-04-20 16:09:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project\TaoBaoProjcet\4_13_500\public\清理内存.js
 */

//后台白名单
var whitePackage=["org.autojs.autojs","org.autojs.autojspro", "org.wuji"]

var temp = []; 
var list = []; 
var lastMem=parseInt(device.getAvailMem()/1024/1024)
var result = shell("pm list package -3", true);
if(result.code == 0){
    appPackage = result.result.replace(/\n/g,'').split("package:")
    for (var i = 0; i < whitePackage.length; i++) {  
        temp[whitePackage[i]] = true;
    };
    for (var i = 0; i < appPackage.length; i++) {   
        if (!temp[appPackage[i]]) {    
            list.push(appPackage[i]);
        };   
    }; 
    list.forEach(p => {
        temp = "am force-stop "+p
            result = shell(temp,true) 
    });
}else{
    log("error.code");
}

var nowMem=parseInt(device.getAvailMem()/1024/1024)
toastLog(("优化了")+(nowMem-lastMem)+"M内存")
