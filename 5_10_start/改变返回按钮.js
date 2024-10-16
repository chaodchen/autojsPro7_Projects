/*
 * @Author: 大柒
 * @QQ: 531310591@qq.com
 * @Date: 2021-04-21 17:26:39
 * @Version: Auto.Js Pro
 * @Description: 
 * @LastEditors: 大柒
 * @LastEditTime: 2021-04-21 18:25:28
 */
'ui';
//图标
let mIcon = 'ic_close_white_24dp';
//大小
let mSize = 30;
//颜色
let mColor = colors.parseColor('#FFFFFF');
//Drawable工具
let mUtil = new MyDrawableUtil();
ui.layout(
    <vertical>
        <appbar>
            <toolbar id='toolbar' title='Toolbar' />
        </appbar>
        <button id='icon' text='随机图标' />
        <button id='size' text='随机大小' />
        <button id='color' text='随机颜色' />
    </vertical>
);
/**
 * 开启Toolbar Navigation
 */
activity.setSupportActionBar(ui.toolbar);
//要在 setSupportActionBar 之后开启
activity.getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//监听返回键点击
ui.toolbar.setNavigationOnClickListener({
    onClick: function () {
        toast('点击了左上角按钮');
    }
});

//创建指定大小的Drawable
let mDrawable = mUtil.create(mIcon, mSize);
//改变颜色
mDrawable.setTint(mColor);
//更改返回键图标
// activity.getSupportActionBar().setHomeAsUpIndicator(mDrawable);


//随机图标
ui.icon.on('click', () => {
    let dr = mDrawable;
    //随机一个内置图标名称
    mIcon = icons[random(0, icons.length - 1)];
    //创建新的Drawable
    mDrawable = mUtil.create(mIcon, mSize);
    mDrawable.setTint(mColor);
    //更改返回键图标
    activity.getSupportActionBar().setHomeAsUpIndicator(mDrawable);
    //释放之前的Drawable
    dr.getBitmap().recycle();
    dr.setCallback(null);
});
//随机大小
ui.size.on('click', () => {
    let dr = mDrawable;
    //随机一个大小
    mSize = random(16, 44);
    //创建新的Drawable
    mDrawable = mUtil.create(mIcon, mSize);
    //设置颜色
    mDrawable.setTint(mColor);
    //更改返回键图标
    activity.getSupportActionBar().setHomeAsUpIndicator(mDrawable);
    //释放之前的Drawable
    dr.getBitmap().recycle();
    dr.setCallback(null);
});
//随机颜色
ui.color.on('click', () => {
    //随机一个颜色
    mColor = colors.rgb(random(0, 255), random(0, 255), random(0, 255));
    mDrawable.setTint(mColor);
});
/**
 * Drawable 工具
 */
function MyDrawableUtil() {
    importClass(android.graphics.Bitmap);
    importClass(android.graphics.BitmapFactory);
    importClass(android.graphics.drawable.BitmapDrawable);
    const resources = context.getResources();
    /** dp2px 互转 */
    const scale = resources.getDisplayMetrics().density;
    let dp2px = dp => parseInt(Math.floor(dp * scale + 0.5));
    let px2dp = px => parseInt(Math.floor(px / scale + 0.5));
    this.create = function (name, size) {
        return zoomImage(getResID(name), dp2px(size))
    }
    function getResID(name) {
        return resources.getIdentifier(name, "drawable", context.getPackageName())
    }
    function zoomImage(resId, size) {
        let oldBmp = BitmapFactory.decodeResource(resources, resId);
        let newBmp = Bitmap.createScaledBitmap(oldBmp, size, size, true);
        let drawable = new BitmapDrawable(resources, newBmp);
        oldBmp.recycle();
        return drawable;
    }
}
//部分内置图标名称
var icons = ['ic_3d_rotation_black_48dp', 'ic_accessibility_black_48dp', 'ic_accessible_black_48dp', 'ic_account_balance_black_48dp', 'ic_account_balance_wallet_black_48dp', 'ic_account_box_black_48dp', 'ic_account_circle_black_48dp', 'ic_add_shopping_cart_black_48dp', 'ic_alarm_add_black_48dp', 'ic_alarm_black_48dp', 'ic_alarm_off_black_48dp', 'ic_alarm_on_black_48dp', 'ic_all_out_black_48dp', 'ic_android_black_48dp', 'ic_announcement_black_48dp', 'ic_aspect_ratio_black_48dp', 'ic_assessment_black_48dp', 'ic_assignment_black_48dp', 'ic_assignment_ind_black_48dp', 'ic_assignment_late_black_48dp', 'ic_assignment_returned_black_48dp', 'ic_assignment_return_black_48dp', 'ic_assignment_turned_in_black_48dp', 'ic_autorenew_black_48dp', 'ic_backup_black_48dp', 'ic_bookmark_black_48dp', 'ic_bookmark_border_black_48dp', 'ic_book_black_48dp', 'ic_bug_report_black_48dp'];
