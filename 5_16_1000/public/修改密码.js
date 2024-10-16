text('更多').findOne().parent().parent().click()
log('更多')
text('我的动态').waitFor()
id('setting_layout').findOne().click()
log('修改密码')
text('设置').waitFor()
text('帐号与安全').findOne().parent().click()
log('账号与安全')
text('密码修改').waitFor()

while (1) {
  text('密码修改').findOne().parent().click()
  log('修改密码')
  sleep(random(2222, 4444))
  while (1) {
    if (text('返回').findOnce() && text('修改').findOnce()) {
      log('进入修改密码成功')
      break
    } else {
      text('密码修改').findOne().parent().click()
    }
    sleep(1000)
  }

  log('延迟2-4秒')
  sleep(random(2222, 4444))

if (text('忘记密码').findOnce()) {
  log('找到了忘记密码')
  className("android.widget.ImageButton").clickable(true).depth(10).findOne().click()
  log('延迟2-4秒')
  sleep(random(2222, 4444))
  text('密码修改').waitFor()
} else {
  log('没有找到忘记密码')
  break
}
}

密码 = randomPassword(8)

className('EditText').find().forEach((_editView) => {

  _editView.setText(密码)
  sleep(999)

})

text('修改').findOne().click()
log('等待三秒钟')
sleep(3000)
log('修改')
files.append(配置.路径.账号数据+'.m.txt', 密码+'---')

陌陌号 = ''

_immomo_path = '/sdcard/immomo/users/'

files.listDir(_immomo_path, function (_name) {

    return files.isDir(files.join(_immomo_path, _name))

}).forEach((_name) => {

    if (Number(_name)) {
        陌陌号 = _name
    }
})

log('陌陌号-->>  '+陌陌号)
files.append(配置.路径.账号数据+'.m.txt', 陌陌号+'\n')


/*

//取陌陌号
sleep(5000)
while (1) {
  if (text('手机号登录注册').exists()) {
    log('手机登录注册')
    sleep(2000)

    text('帐号密码登录').findOne().click()
    sleep(2000)

  } else if (text('帐号登录').exists()) {
    log('账号登录')
    break
  } else {

  }
}

sleep(2000)

text('帐号登录').waitFor()

_陌陌号 = id('login_et_momoid').findOne()

if (_陌陌号) {
  log('陌陌号-->>  '+_陌陌号.text())
  _陌陌号 = _陌陌号.text().trim()
} else {
  log('没有找到陌陌号')
  exit()
}

files.append(配置.路径.账号数据+'.m.txt', _陌陌号+'\n')

*/

function randomPassword(size)
{
  var seed = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z',
  'a','b','c','d','e','f','g','h','i','j','k','m','n','p','Q','r','s','t','u','v','w','x','y','z',
  '2','3','4','5','6','7','8','9'
  );//数组
  seedlength = seed.length;//数组长度
  var createPassword = '';
  for (i=0;i<size;i++) {
    j = Math.floor(Math.random()*seedlength);
    createPassword += seed[j];
  }
  if (createPassword.search(/\d/) == -1) {
    createPassword = createPassword+random(1,9)
  }
  return createPassword;
}
