log('测试文件')
api = 'http://api.mgsco.cn/wlapi.asmx/SetServerVerify'
postData = {
    "verifyid":"2zD0yKoi0N00020100i29jtFUiuef6ZZ",
    "token":"c48fc79d00104496b85782d7adeca009",
    "userid":"125126",
    "cymxid":"1001196641",
    "carid":"晋AU5801"

}

res = http.post('http://api.mgsco.cn/wlapi.asmx/SetServerVerify', postData)
log(res.body.string())