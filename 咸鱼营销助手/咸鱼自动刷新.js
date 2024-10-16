

let 刷新次数 = 0;

// click('管理')
// sleep(3000)
// click('更多')



while (1) {
    text('管理').waitFor();
    sleep(5000);
    click('管理');
    log('管理');
    text('自动回复设置').waitFor();
    sleep(3000);
    log('管理宝贝');
    click('编辑');
    text('出租房子').waitFor();
    sleep(3000);

    log('出租房子');
    click('发布');
    刷新次数++;
    toastLog('第'+刷新次数+'次刷新');
    log('发布');
    sleep(random(3, 4) * 1000);
}