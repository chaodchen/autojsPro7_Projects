/**
 * @AuThor 叁玖
 * @Principle 是否存在su命令，并且有执行权限；
 * @return true==root；fales!=root
 */

 
function isSuEnable() {
    var file = null;
    var paths = ["/system/bin/", "/system/xbin/", "/system/sbin/", "/sbin/", "/vendor/bin/", "/su/bin/"];
    try {
        for (let path in paths) {
            let file = new java.io.File(paths[path] + "su");
            if (file.exists() && file.canExecute()) return true;
        }
    } catch (x) {
        toast("错误" + x)
    }
    return false;
}