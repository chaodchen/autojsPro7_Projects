"ui";
var Config = new Object();
Config.s_jgyPath = "TaoBao/1_6_羊毛衫/";
Config.s_jgyUser = "17685034710@163.com";FLgKGnLJ8haj75FUV4gi
Config.s_jgyKey = "ac5vbskzgd8esva7";
Config.o_storage = storages.create(Config.s_jgyPath.replace(/\//g, ""));
Config.f_getJgyFile = function (user, key, path, name) {
    name = name || "";
    let o_res = http.get("http://dav.jianguoyun.com/dav/"+path+name, {
        headers: {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(user+':'+key).getBytes(), 2)),
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    if (o_res!= null && o_res.statusCode >=200 && o_res.statusCode <= 300) return o_res.body.string();
    return null;
}
//读取本地储存UI配置
Config.getUiContent = function (str) {
    if (Config.o_storage.get("viewDataArr")) {
        return Config.o_storage.get("viewDataArr")[str] || null;
    } else {
        return null;
    }
}
//开始加载脚本
let o_loadingMainActivity = threads.start(function(){
    Config.s_mainActivity = Config.f_getJgyFile(Config.s_jgyUser, Config.s_jgyKey, Config.s_jgyPath, "mainActivity.js");
    if (!Config.s_mainActivity) return null;
});while(o_loadingMainActivity.isAlive());if (!Config.s_mainActivity) {
    toastLog("加载【mainActivity】失败!");
    exit();
};
//开始运行脚本
eval(Config.s_mainActivity);