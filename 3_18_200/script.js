head = {
    "accept": "application/json, text/plain, */*",
    "token": "3339c1cb0828d38807775ada48080a5d",
    "phone-imei": "c9f6e1483e06da2a",
    "phone-platform": "android",
    "phone-modle": "ATH-AL00",
    "phone-version": "6.0.1",
    "phone-language": "",
    "phone-mac": "undefined",
    "app-version": "5.2.3",
    "app-agent": "Xlm-app|5.2.3|Android",
    "token-imei": "c9f6e1483e06da2a",
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0.1; ATH-AL00 Build/HONORATH-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/55.0.2883.91 Mobile Safari/537.36 RNAPP/0.55.4 Suixingpay-Xlm/5.2.3",
    "Host": "xlm-gateway.suixingpay.com",
    "Connection": "Keep-Alive",
    "Accept-Encoding": "gzip",
    "Cookie": "sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22S0000000000002175112%22%2C%22first_id%22%3A%221710fac4690113-0606a5b4fe82ba-132101a-230400-1710fac469511c%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%7D%2C%22%24device_id%22%3A%221710fac4690113-0606a5b4fe82ba-132101a-230400-1710fac469511c%22%7D"
}

url = "https://xlm-gateway.suixingpay.com/xlm-refactor/system/v1/message/selectDealRobMessage?pageLimit=20&pageNum=1"

res = http.get(url, {
    headers : head
})

log(res.body.json())