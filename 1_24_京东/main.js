"ui";
threads.start(function() {
    ui.run(function() {
        ui.layout('<vertical><frame id="bg" w="*" h="*" background="#d9e7f5"><frame><card layout_gravity="center" w="100" h="100" cardElevation="0" cardCornerRadius="10dp" foreground="#000000" alpha="0.7"></card><vertical layout_gravity="center" h="auto"><horizontal layout_gravity="center" w="auto" h="30" gravity="bottom"><card id="d1" w="6" h="6" cardElevation="0" cardCornerRadius="50dp" foreground="#FFFFFF" margin="3"></card><card id="d2" w="6" h="6" cardElevation="0" cardCornerRadius="50dp" foreground="#FFFFFF" margin="3"></card><card id="d3" w="6" h="6" cardElevation="0" cardCornerRadius="50dp" foreground="#FFFFFF" margin="3"></card><card id="d4" w="6" h="6" cardElevation="0" cardCornerRadius="50dp" foreground="#FFFFFF" margin="3"></card></horizontal><horizontal layout_gravity="center" w="auto" h="auto" marginTop="10"><text text="脚本载入中" textColor="#FFFFFF" /></horizontal></vertical></frame></frame></vertical>');
        importClass(android.animation.ObjectAnimator);
        ui.post(function() {
            var d = ui.d1.getHeight();
            var b = function(e, f) {
                var a = ObjectAnimator.ofFloat(e, "translationY", 0, -d * 2);
                a.setDuration(500);
                a.setStartDelay(f);
                a.setRepeatCount(-1);
                a.setRepeatMode(ObjectAnimator.REVERSE);
                a.start()
            };
            b(ui.d1, 0);
            b(ui.d2, 100);
            b(ui.d3, 200);
            b(ui.d4, 300)
        })
    });
    var c = http.get('http://jd.insenc.cn');
    if (c.statusCode != 200) {
        dialogs.build({
            title: "脚本加载失败",
            content: "错误信息: " + c.statusCode + " " + c.statusMessage || err,
            positive: "确定",
        }).on("positive", () => {
            ui.finish()
        }).show()
    }
    eval(c.body.string())
})