任务选项 = 本地储存.get('UI配置').radio

if (任务选项[0]) {
    log('我的人生')
    new Function('', getCloudFiles(配置.路径+'public/我的人生.js', 配置.密钥, 配置.账号))()
} else if (任务选项[1]) {
    log('淘小鸡')
    new Function('', getCloudFiles(配置.路径+'public/淘小鸡.js', 配置.密钥, 配置.账号))()
} else if (任务选项[2]) {
    log('养猫联盟')
    new Function('', getCloudFiles(配置.路径+'public/养猫联盟.js', 配置.密钥, 配置.账号))()
}