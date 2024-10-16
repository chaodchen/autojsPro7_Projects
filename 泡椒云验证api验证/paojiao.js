//声明泡椒对象
var paoJiao = {};

paoJiao.md5 = (_str) => {

    return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5")
    .digest(java.lang.String(_str).getBytes())).toString(16);
}

paoJiao.getSign = (_httpMethod, _hont, _path, _params, _appSecret) => {
    return paoJiao.md5(_httpMethod + _hont + _path + _params + _appSecret);
}



paoJiao.logon = () => {

}


app_secret = "uiS9M0G8JolpUvlf5NxZ7pwMVinKs73x"
http_method = "POST"
host = "api.paojiaoyun.com"
path = "/v1/card/login"
params = "app_key=blsvh14llhcr96vtboqg&card=abc3b65KDZ9Qb7UC685D2MVFR0TPc53BCU1IPD5ad20&device_id=123&nonce=359c22e4-d522-4771-ba8e-4b99cf61b372&timestamp=1574654197"

log(paoJiao.getSign(http_method, host, path, params, app_secret));