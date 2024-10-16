_url = '127.0.0.1:1990/setWhiteList?'
_data = 'path='+'%2fsdcard%2f.934082222%2f'
_res = http.get(_url+_data)
if (_res.statusCode == 200) {
    log(_res.body.json())
}