
var 数据 = bh.getViewContent("bh_data") || "nihao";

main();

function main () {
    //打开微信
    this.打开微信 = function () {
        //
        shell("am start com.tencent.mm/com.tencent.mm.ui.LauncherUI", true);
        waitForPackage("com.tencent.mm", 500);
        toastLog("打开微信成功！");
        sleep(3000);
    }
    //停止微信
    this.停止微信 = function () {
        shell("am force-stop com.tencent.mm", true);
        sleep(3 * 1000);
        toastLog("停止微信成功");
    }
    //修改数据
    this.修改数据 = function (data_str) {
        data_str = data_str || "";
        let data_path = "/data/data/com.tencent.mm/.auth_cache/2510c390-11c5-3e70-8182-423e3a695e91/"
        let sd_path = "/sdcard/"
        for (let i = 0; i < 5; i++) {
            
            files.write(sd_path+i, data_str);
            log(sd_path+i+"  -->>  \n"+data_str);
            
            let sh = shell("cp "+sd_path+i+" "+data_path+i, true);
            if (sh.code == 0) {
                log("成功");

            } else {
                log("失败");
            }
        }
    }
    打开微信();
    停止微信();
    修改数据(数据);
}