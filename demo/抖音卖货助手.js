// 精英群禁止倒卖源码，发现无条件踢出！ 
"ui";
var bgcolor = "#666666";
var color = "#009688";
ui.statusBarColor(color);
ui.layout(
    <drawer id="drawer">
     <vertical>
            <appbar background="#AB82FF">
                <toolbar id="toolbar" h="50" title="             卖货助手" />
                <tabs id="tabs" h="37" />
            </appbar>
            <viewpager id="viewpager"> 
            <frame>
                    <scroll>
                        <vertical>
                            <Switch textSize="15sp" id="autoService" text="无障碍服务" checked="{{auto.service != null}}" />
                            <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="1 1" h="auto">
                                    <radiogroup orientation="horizontal" padding="5">
                                        <input id="jihuoma" text="" hint="请输入您的授权激活码 !" textColorHint="#9F79EE" inputType="textLongMessage" w="240" />
                                        <button id="hqjhm" text="点击获取机器码" textColor="#FF0000" style="Widget.AppCompat.Button.Colored" gravity="center" textSize="10sp" w="100" h="40" />
                                    </radiogroup>
                                </vertical>
                            </card>
                            <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="1 1" h="auto">
                                <button text="↓↓↓↓♡细分垂直养号♡↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />        
                                <radiogroup orientation="horizontal">
                                    <checkbox id="xbb1" text="单号完毕切换账号           " textColor="#9A32CD" textStyle="bold" />
                                    <checkbox id="xbb2" checked="true" text="模拟键盘打字输入" textColor="#9A32CD" textStyle="bold" />
                                </radiogroup>
                                <horizontal>
                                <text text="  垂直视频识别热词：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb3" hint="多个关键词用-隔开   " textSize="15sp"  marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                                <horizontal>
                                <text text="  单号运行养号时长：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb4" hint="时间(分钟)" textSize="15sp" inputType="number" text="" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  匹配视频浏览时间：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb5" hint="起始值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="----" gravity="left" />
                                <input id="xbb6" hint="结束值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="秒" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                            </horizontal>
                            <horizontal>
                                <text text="  匹配视频关注概率：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb7" hint="输入50为2分之1概率   " textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  匹配视频点赞概率：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb8" hint="输入50为2分之1概率   " textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  匹配视频评论概率：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb9" hint="输入50为2分之1概率   " textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  浏览评论滑动次数：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xbb10" hint="最小值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="----" gravity="left" />
                                <input id="xbb11" hint="最大值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="次" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                            </horizontal>                          
                            <radiogroup orientation="horizontal">
                                    <text text="  评论话术1：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="" hint="输入要发送的评论话术1" id="xbb20" inputType="textLongMessage" textSize="16sp"textColor="#5a651f" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  评论话术2：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="" hint="输入要发送的评论话术2" id="xbb21" inputType="textLongMessage" textSize="16sp"textColor="#0dd353" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  评论话术3：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="" hint="输入要发送的评论话术3" id="xbb22" inputType="textLongMessage" textSize="16sp"textColor="#0d4bd3" marginTop="1" w="*" />
                                </radiogroup>
                                <button text="点击启动" textStyle="bold" id="xbb12" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                                </vertical>
                                {/* <View bg="#E51400" h="*" w="3" /> */}
                            </card>
                            <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="1 1" h="auto">
                                <button text="↓↓↓↓↓♡普通养号功能♡↓↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />        
                                <radiogroup mariginTop="16" orientation="horizontal" >
                                    <radio id="cb1" text="随机评论" textSize="15sp" textColor="#9A32CD" textStyle="bold" checked="true" />
                                    <radio id="cb2" text="全部评论" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                    <checkbox id="cb3" checked="true" text="后加随机表情" textColor="#9A32CD" textStyle="bold" />                             
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <checkbox id="dzhqh1" text="单号完毕切换账号           " textColor="#9A32CD" textStyle="bold" />
                                    <checkbox id="dzhqh81" checked="true" text="模拟键盘打字输入" textColor="#9A32CD" textStyle="bold" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  观看次数  ：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input inputType="number" text="50" hint="输入视频观看次数" id="shurukuang1" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  评论话术1：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="我家的石榴熟了有想吃的吗？" hint="输入要发送的评论话术1" id="shurukuang2" inputType="textLongMessage" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  评论话术2：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="老家的甜石榴便宜了哈哈" hint="输入要发送的评论话术2" id="shurukuang3" inputType="textLongMessage" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  评论话术3：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="朋友们卖水果找我啊" hint="输入要发送的评论话术3" id="shurukuang4" inputType="textLongMessage" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <button text="点击启动视频评论产品推广" textStyle="bold" id="cspyh" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>
                            <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" >
                                <vertical padding="1 1" h="auto">
                                <button text="↓↓↓↓♡账号设置♡↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />        
                                <radiogroup orientation="horizontal">
                                    <text text="  账号路径：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="/sdcard/AT/账号.txt" hint="/sdcard/dy/AT/账号.txt" id="xbb23" inputType="textLongMessage" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <button text="点击自动登录测试" textStyle="bold" id="zddlcs" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>
                            <text padding="10" text=" 本页功能可代替手工用来对新号进行养号 以达到提升账号的活跃度及权重。精细垂直养号可以打造账号的垂直度  比如你要做个美妆领域的抖音号 那就设置关键词 软件刷到美妆的视频会点赞评论 关注 让平台算法把此账号在这个领域打上标签！以便于我们日后发布作品 打造抖音粉丝。       ^_^ 仅供交流学习 哈哈。请勿破坏抖音平台健康秩序！
                                   禁止用于非法行业！非法用途！作者QQ：934082222" textColor="#280bc1" textSize="15sp" />
                            </vertical>
                    </scroll>
                    );
                </frame>

                            <frame>
                    <scroll>
                        <vertical>
                        <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" >
                                <vertical padding="1 1" h="auto">    
                        <button text="↓↓↓↓♡精准UID数据推广♡↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />     
                                <radiogroup mariginTop="16" orientation="horizontal" >
                                    <radio id="cb5" text="只关注  " textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                    <radio id="cb6" text="只私信  " textSize="15sp" checked="true" textColor="#9A32CD" textStyle="bold" />
                                    <radio id="cb7" text="私信+关注" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <checkbox id="dzhqh1" text="私信完毕切换账号       " textColor="#9A32CD" textStyle="bold" />
                                    <checkbox id="dzhqh80" checked="true" text="模拟键盘打字输入" textColor="#9A32CD" textStyle="bold" />
                                </radiogroup>
                                <checkbox id="dnicc" text="私信话术前加用户昵称" textColor="#f81f0d" textStyle="bold" checked="true" />
                                <radiogroup orientation="horizontal">
                                    <text text="  私信次数  ：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input inputType="number" text="50" id="shurukuang5" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal" >
                                    <text text="  间隔时间  ：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input inputType="number" inputType="numberDecimal" text="10" hint="输入间隔时间 1为1秒 60为1分钟" id="shurukuang6" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <checkbox id="hsxz93" text="" textColor="#9A32CD" textStyle="bold" textSize="16sp" checked="true" />
                                    <text text="  私信话术1：" textColor="black" textSize="16sp" />
                                    <input text="嗨-你好-哈喽-在吗" hint="第一句话术 多条随机发送用-分隔" id="shurukuang7" textColor="#5a651f" inputType="textLongMessage" textSize="16sp" w="300" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <checkbox id="hsxz94" text="" textColor="#9A32CD" textStyle="bold" textSize="16sp" checked="true" />
                                    <text text="  私信话术2：" textColor="black" textSize="16sp" />
                                    <input text="亲喜欢吃水果吗" hint="第二句话术 多条随机发送用-分隔" id="shurukuang8" textColor="#0dd353" inputType="textLongMessage" textSize="16sp" w="300" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <checkbox id="hsxz95" text="" textColor="#9A32CD" textStyle="bold" textSize="16sp" checked="true" />
                                    <text text="  私信话术3：" textColor="black" textSize="16sp" />
                                    <input text="老家的甜石榴便宜了哈哈" hint="第三句话术 多条随机发送用-分隔" id="shurukuang9" textColor="#0d4bd3" inputType="textLongMessage" textSize="16sp" w="300" />
                                </radiogroup>
                                <radiogroup orientation="horizontal">
                                    <text text="  UID号路径：" textColor="black" textSize="16sp" marginTop="1" />
                                    <input text="/sdcard/UID.txt" hint="/sdcard/UID打招呼.txt" id="shurukuang10" inputType="textLongMessage" textSize="16sp" marginTop="1" w="*" />
                                </radiogroup>
                                <button text="点击启动UID精准产品推广" textStyle="bold" id="UIDtz" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                                </vertical>
                                {/* <View bg="#E51400" h="*" w="3" /> */}
                            </card>

                            <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" >
                                <vertical padding="1 1" h="auto">    
                            <button text="↓↓↓↓♡私信及回复功能♡↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />     
                            <radiogroup mariginTop="16"  >
                                <radio id="cb8" text="发自己粉丝  " textSize="15sp" textColor="#9A32CD" textStyle="bold" checked="true" />
                                <radio id="cb10" text="发自己关注" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb9" text="私信指定人粉丝列表" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb11" text="回复未读的私信消息" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb12" text="机器人值守消息回复(完善词库中。。。)" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb13" text="发送全部消息列表" textSize="15sp" textColor="#9A32CD" textStyle="bold" />
                            </radiogroup>

                            <checkbox id="dnic" text="私信话术1前加用户昵称" textColor="#f81f0d" textStyle="bold" checked="true" />
                            <radiogroup orientation="horizontal">
                                <text text="    次数设置：" textColor="black" textSize="16sp" marginTop="1" />
                                <input inputType="number" hint="输入私信人数" text="20" id="shurukuang29" textSize="16sp" marginTop="1" w="40" />
                                <text text="(本次数设置适用于本列部分功能)" textColor="#f81f0d" textSize="13sp" marginTop="1" />
                            </radiogroup>
                            <radiogroup orientation="horizontal" >
                                <text text="    间隔时间：" textColor="black" textSize="16sp" marginTop="1" />
                                <input inputType="number" inputType="numberDecimal" text="" hint="输入间隔时间 1为1秒 60为1分钟" id="shurukuang12" textSize="16sp" marginTop="1" w="*" />
                            </radiogroup>
                            <radiogroup orientation="horizontal">
                                <checkbox id="hsxz1" text="" textColor="#9A32CD" textStyle="bold" textSize="16sp" checked="true" />
                                <text text="  私信话术1：" textColor="black" textSize="16sp" />
                                <input text="嗨-你好-哈喽-在吗" hint="第一句话术 多条随机发送用-分隔" id="shurukuang13" textColor="#5a651f" inputType="textLongMessage" textSize="16sp" w="300" />
                            </radiogroup>
                            <radiogroup orientation="horizontal">
                                <checkbox id="hsxz2" text="" textColor="#9A32CD" textStyle="bold" textSize="16sp"  />
                                <text text="  私信话术2：" textColor="black" textSize="16sp" />
                                <input text="亲喜欢吃水果吗" hint="第二句话术 多条随机发送用-分隔" id="shurukuang16" textColor="#0dd353" inputType="textLongMessage" textSize="16sp" w="300" />
                            </radiogroup>
                            <radiogroup orientation="horizontal">
                                <checkbox id="hsxz3" text="" textColor="#9A32CD" textStyle="bold" textSize="16sp"  />
                                <text text="  私信话术3：" textColor="black" textSize="16sp" />
                                <input text="给你推荐我老家的甜石榴，便宜了哈哈" hint="第三句话术 多条随机发送用-分隔" id="shurukuang19" textColor="#0d4bd3" inputType="textLongMessage" textSize="16sp" w="300" />
                            </radiogroup>                          
                            <button text="点击启动私信产品推广" textStyle="bold" id="qdyl" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                            </vertical>
                                {/* <View bg="#E51400" h="*" w="3" /> */}
                            </card>
                            <text padding="10" text=" 本页功能可代替手工用来给自己的粉丝发消息推广自己产品 比如衣服，水果， 护肤品  等等合法的产品。让卖货推广更简单 ^_^ 仅供交流学习 哈哈。请勿频繁发送以免骚扰他人 破坏抖音平台健康秩序！
                                   禁止用于非法行业！非法用途！" textColor="#280bc1" textSize="15sp" />
                        </vertical>
                    </scroll>
                    );
                </frame>
                <frame>
                    <scroll>
                        <vertical padding="5" >
                        <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" >
                                <vertical padding="1 1" h="auto">  

                            <button text="评论区私信功能设置" textStyle="bold" margin="-15" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="20sp" h="50" />
                            <radiogroup orientation="horizontal">
                                <text text=" 进入评论不低于多少的视频：" textColor="black" textSize="20sp" marginTop="1" textColor="black" />
                                <input inputType="number" hint="3000" text="3000" id="shurukuang24" textSize="16sp" marginTop="1" w="50" textColor="#0d4bd3" />
                            </radiogroup>
                            <radiogroup orientation="horizontal">
                                <text text=" 只找多少分钟内的评论用户：" textColor="black" textSize="20sp" marginTop="1" textColor="black" />
                                <input inputType="number" hint="10" text="15" id="shurukuang25" textSize="16sp" marginTop="1" w="50" textColor="#0d4bd3" />
                            </radiogroup>

                            <radiogroup orientation="horizontal">
                                <text text="关注数：" textColor="black" textSize="20sp" marginTop="1" textColor="black" />
                                <input inputType="number" hint="200" text="200" id="shurukuang26" textSize="16sp" marginTop="1" w="40" textColor="#0d4bd3" />
                                <text text="私信数：" textColor="black" textSize="20sp" marginTop="1" textColor="black" />
                                <input inputType="number" hint="200" text="200" id="shurukuang27" textSize="16sp" marginTop="1" w="40" textColor="#0d4bd3" />
                                <text text="点心数:" textColor="black" textSize="20sp" marginTop="1" textColor="black" />
                                <input inputType="number" hint="200" text="200" id="shurukuang28" textSize="16sp" marginTop="1" w="40" textColor="#0d4bd3" />
                            </radiogroup>
                            <horizontal>
                                <text textSize="20sp" textColor="black" textColor="#f40b92"    > 性别选择：  </text>
                                <spinner id="sp2" entries="男            |女|全部" textColor="#280bc1" spinnerMode="dialog" />
                            </horizontal>
                            <radiogroup mariginTop="16"  >
                                <radio id="cb30" text="只关注" textSize="20sp" textColor="#9A32CD" textStyle="bold" checked="true" />
                                <radio id="cb31" text="只私信" textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb38" text="只点心" textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb34" text="关注+私信 " textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb32" text="评论点心+关注" textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb33" text="评论点心+私信" textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb35" text="评论点心+关注+私信  " textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb36" text="评论页内私信         " textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                                <radio id="cb37" text="评论页内点心+私信" textSize="20sp" textColor="#9A32CD" textStyle="bold" />
                            </radiogroup>

                            <radiogroup orientation="horizontal">
                                <checkbox id="dzhqh1" text="私信完毕切换账号       " textColor="#9A32CD" textStyle="bold" />
                                <checkbox id="dzhqh80" checked="true" text="模拟键盘打字输入" textColor="#9A32CD" textStyle="bold" />
                            </radiogroup>
                            <text text="   注：私信话术均调用第一页内容！" textColor="#280bc1" textSize="15sp" />
                            <button text="点击启动自动找视频产品推广" textStyle="bold" id="plplyl" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                            <button text="点击启动手动找视频产品推广" textStyle="bold" id="plply22" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                            </vertical>
                            </card>                          
                            <text padding="10" text=" 本页功能可放飞双手 关注抖音热门视频下几分钟内时时评论的活跃粉丝 用来推广自己产品 比如衣服，水果， 护肤品  等等合法的产品。让卖货推广更简单 ^_^ 仅供交流学习 哈哈。
禁止用于非法行业！非法用途！" textColor="#280bc1" textSize="15sp" />
                        </vertical>
                    </scroll>
                </frame>

                <frame>
                    <scroll>
                        <vertical  >
                        <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" >
                                <vertical padding="1 1" h="auto">    
                                <button text="↓↓↓↓♡指定人粉丝关注♡↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />        
                            <horizontal>
                                <text text="  随机养号时长：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="yhsc" hint="时间(分钟)" textSize="15sp" inputType="number" text="" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  视频喜欢概率：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xhgl" hint="输入50为2分之1概率   " textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  视频浏览间隔：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="jg" hint="起始值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="----" gravity="left" />
                                <input id="jg1" hint="结束值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="秒" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                            </horizontal>
                            <horizontal>
                                <text text="  此号关注总数：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="gzsl" hint="关注总数" textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  关注间隔秒数：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="gzjg" hint="间隔秒数" textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  关注多少养号：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="dgzsl" hint="单轮关注多少切换养号" textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  跳转打开主页：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="uid" hint="输入主页链接或UID      " textSize="15sp" inputType="textUri" marginTop="1" w="155" textColor="#0d4bd3" />
                            </horizontal>                         
                            <horizontal>
                                <text text="  打开方式：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <spinner id="fsdk" entries="UID打开主页     |链接打开主页     " marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                           <horizontal>
                                <text text="  关注性别：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <spinner id="性别" entries="男|女|全部" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <checkbox id="dzdygzp2" text="  点赞第一个作品           " textColor="#f81f0d" textStyle="bold" />
                            <button id="startyy" textStyle="bold" text="点击启动指定关注" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                            <text text="    复制链接不用删除文字直接粘贴,多个链接 或者 UID 可用         “+” 号隔开可随机打开" gravity="left" textColor="black" textSize="13sp" textColor="#f81f0d" marginTop="1" />
                            </vertical>
                                {/* <View bg="#E51400" h="*" w="3" /> */}
                            </card>
                            <text text=" " gravity="left" textColor="black" textSize="13sp" textColor="#f81f0d" marginTop="1" />
                            <card w="*" h="auto" margin="8 1" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical" >
                                <vertical padding="1 1" h="auto">    
                                <button text="↓↓↓↓♡热门随机粉丝关注♡↓↓↓↓" id="lxzz3" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" />      
                         <horizontal>
                                <text text="  判定热门下限：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="dxszxx" hint="点心不小于多少" textSize="15sp" inputType="number" text="" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  视频喜欢概率：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="xhgl2" hint="输入50为2分之1概率   " textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  视频浏览间隔：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="jg2" hint="起始值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="----" gravity="left" />
                                <input id="jg11" hint="结束值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                <text text="秒" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                            </horizontal>
                            <horizontal>
                                <text text="  此号关注总数：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="gzsl1" hint="关注总数" textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  关注间隔秒数：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="gzjg1" hint="间隔秒数" textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <horizontal>
                                <text text="  单主页关注数：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <input id="dgzsl1" hint="单主页关注多少个" textSize="15sp" inputType="number" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <checkbox id="dzdygzp3" text="  点赞第一个作品           " textColor="#f81f0d" textStyle="bold" />
                            <horizontal>
                                <text text="  关注性别：" gravity="left" textColor="black" textSize="20sp" marginTop="1" />
                                <spinner id="性别1" entries="男|女|全部" marginTop="1" w="150" textColor="#0d4bd3" />
                            </horizontal>
                            <button id="startyy1" textStyle="bold" text="点击启动热门关注" style="Widget.AppCompat.Button.Colored" textColor="#d931ed" gravity="center" textSize="15sp" h="40" />
                            <text padding="10" text=" 本功能可放飞双手 关注抖音他人2分钟内时时增长的活跃粉丝  高回关，高效率 用来推广自己产品 比如衣服，水果， 护肤品  等等合法的产品。让卖货推广更简单 ^_^ 仅供交流学习 哈哈。
禁止用于非法行业！非法用途！" textColor="#280bc1" textSize="15sp" />
                            </vertical>
                                {/* <View bg="#E51400" h="*" w="3" /> */}
                            </card>
                        </vertical>
                    </scroll>
                </frame>
                {/* <frame>
                <vertical>
            <vertical>
               <webview id="webview" h="*" />
            </vertical>
    </vertical>
             </frame> */}
          <frame>
                <scroll>
                        <vertical>
                        <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <radiogroup orientation="horizontal">
                                        <text text="  评论进入下限：" gravity="left" textColor="#9A32CD" textSize="15sp" textStyle="bold" marginTop="1" />
                                        <input id="gg009" text="100" hint="最小值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                        <text text="个" gravity="left" textColor="black" textSize="15sp" marginTop="1" textColor="#9A32CD" textStyle="bold" />
                                    </radiogroup>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>

                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <radiogroup orientation="horizontal">
                                        <text text="  点赞运行时长：" gravity="left" textColor="#9A32CD" textSize="15sp" textStyle="bold" marginTop="1" />
                                        <input id="gg001" text="100" hint="起始值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                        <text text="分钟" gravity="left" textColor="black" textSize="15sp" marginTop="1" textColor="#9A32CD" textStyle="bold" />
                                    </radiogroup>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>

                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <radiogroup orientation="horizontal">
                                        <text text="  评论滑动次数：" gravity="left" textColor="#9A32CD" textSize="15sp" textStyle="bold" marginTop="1" />
                                        <input id="gg002" text="5" hint="起始值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                        <text text="次" gravity="left" textColor="black" textSize="15sp" marginTop="1" textColor="#9A32CD" textStyle="bold" />
                                    </radiogroup>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>

                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <radiogroup orientation="horizontal">
                                        <text text=" 点心次数上限：" gravity="left" textColor="#9A32CD" textSize="15sp" textStyle="bold" marginTop="1" />
                                        <input id="gg003" text="500" hint="最大值" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                        <text text="个" gravity="left" textColor="black" textSize="15sp" marginTop="1" textColor="#9A32CD" textStyle="bold" />
                                    </radiogroup>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>


                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <radiogroup orientation="horizontal">
                                        <text text="  评论时间匹配：" gravity="left" textColor="#9A32CD" textSize="15sp" textStyle="bold" marginTop="1" />
                                        <input id="gg004" hint="最小" text="0" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                        <text text="----" gravity="left" />
                                        <input id="gg005" hint="最大" text="59" textSize="15sp" inputType="number" textColor="#0d4bd3" />
                                        <text text="分钟" gravity="left" textColor="black" textSize="15sp" marginTop="1" textColor="#9A32CD" textStyle="bold" />
                                    </radiogroup>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>

                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <horizontal>
                                        <text text=" 指定视频链接1：" gravity="left" textColor="black" textColor="#9A32CD" textStyle="bold" textSize="15sp" marginTop="1" />
                                        <input id="gg006" hint="   " textSize="15sp" marginTop="1" w="*" textColor="#0d4bd3" />
                                    </horizontal>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>
                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <horizontal>
                                        <text text=" 指定视频链接2：" gravity="left" textColor="black" textColor="#9A32CD" textStyle="bold" textSize="15sp" marginTop="1" />
                                        <input id="gg007" hint="   " textSize="15sp" marginTop="1" w="*" textColor="#0d4bd3" />
                                    </horizontal>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>
                            <card w="*" h="auto" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                                <vertical padding="18 1" h="auto">
                                    <horizontal>
                                        <text text=" 指定视频链接3：" gravity="left" textColor="black" textColor="#9A32CD" textSize="15sp" textStyle="bold" marginTop="1" />
                                        <input id="gg008" hint="   " textSize="15sp" marginTop="1" w="*" textColor="#0d4bd3" />
                                    </horizontal>
                                </vertical>
                                <View bg="#E51400" h="*" w="3" />
                            </card>
                            <button marginTop="10" id="save12" text="开始运行随机视频点赞" h="50" w="*" textStyle="bold|italic" style="Widget.AppCompat.Button.Colored"    >      </button>
                            <button marginTop="10" id="save13" text="开始运行指定视频点赞" h="50" w="*" textStyle="bold|italic" style="Widget.AppCompat.Button.Colored"    >      </button>
                            <text text="" textColor="black" textSize="16sp" marginTop="1" />



                        </vertical>
                    </scroll>
               </frame>
             
                <frame>
                    <scroll>
                       <vertical padding="10" >
                            <text text="一.安装须知： " textColor="#000000" textSize="20sp" />
                            <text id="手机型号" textColor="#f81f0d" textSize="15sp" />
                            <text id="安卓版本" textColor="#f81f0d" textSize="15sp" />
                            <text id="wb1" textColor="#280bc1" textSize="15sp" />
                            <text text="二.操作须知： " textColor="#000000" textSize="20sp" />
                            <text id="wb2" textColor="#280bc1" textSize="15sp" />
                            <text text="三.购买须知： " textColor="#000000" textSize="20sp" />
                            <text id="wb3" textColor="#280bc1" textSize="15sp" />
                            {/* <button text="♡♡♡♡♡♡打赏下可怜的作者♡♡♡♡♡♡" id="click_me" textStyle="bold" style="Widget.AppCompat.Button.Colored" textColor="#7FFF00" gravity="center" textSize="15sp" h="40" /> */}
                        </vertical>
                    </scroll>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img src="http://pic1.zhimg.com/50/v2-2103d2bf1adc0e0a68bb0f42033b6a9e_hd.jpg" h="200" scaleType="centerCrop" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);
ui.手机型号.text("   ※软件检测本机设备型号为： " + device.model);
ui.安卓版本.text("   ※软件检测本机安卓版本为：" + device.release);
ui.wb1.text("1. 软件适用于安卓7.0 以上所有手机 无须root  \n2. 软件使用必须打开无障碍服务 以及给所有权限   \n3. 必须使用抖音最新版本（10.2.0） 才可以运行  \n4. 手机进入系统设置给与相关权限主要有：\n  悬浮窗,系统设置,桌面快捷方式,后台弹出界面 \n5. 如果启动异常 请看有没有给软件相应的权限  \n6. 可以点击左上角菜单进入官网和交流论坛\n");
ui.wb2.text("1. 启动软件必须打开无障碍服务   \n2. 评论推广操作中 三句评论会随机发送   \n3. UID私信 要将采集好的UID做成txt格式存\n入手机供软件读取  \n4. 必须写对相应的文本路径 否则无法读取账号  \n5. 启动软件必须退出抖音后台软件会自启抖音  \n6.  软件启动就请不要人工再去操作 \n7. 软件启动 每一步都会自动化 不需要人工操作\n8. 软件界面必须写好所有的参数及话术 \n9. 音量上键可以停止软件运行");
ui.wb3.text("1. 本软件意在技术交流和学习 切勿用于非法用途  \n2. 本软件需要激活码才可激活使用" );

ui.autoService.on("check", function (checked) {
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});
ui.emitter.on("resume", function () {
    ui.autoService.checked = auto.service != null;
});
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("关于软件");
    menu.add("下载多闪脚本");
});
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {

        case "关于软件":
            alert("注：本软件开发仅供于交流学习,禁止用于商业活动、灰黑产业 以及违法犯罪行为, 一切因使用本软件而引致的任何违法违规、意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其所造成的损失，概不负责，亦不承担任何法律责任。   ");
            break;

    }   
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["精细养号","UID私信", "评论关注", "指定关注", "无限点赞","相关说明"]);


//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([{
    title: "软件官网",
    icon: "@drawable/ic_android_black_48dp"
},
{
    title: "营销论坛",
    icon: "@drawable/ic_add_black_48dp"
},
{
    title: "检测更新",
    icon: "@drawable/ic_settings_black_48dp"
},
{
    title: "作者交流",
    icon: "@drawable/ic_favorite_black_48dp"
},
{
    title: "退出",
    icon: "@drawable/ic_exit_to_app_black_48dp"
},
]);
ui.menu.on("item_click", item => {
    switch (item.title) {
        case "软件官网":
            // url = "www.baidu.com"
            // app.openUrl(url)
            break;
        case "营销论坛":
            // url = "www.baidu.com"
            // app.openUrl(url)
            break;

        case "检测更新":
            alert(null, "当前已是最新版本！\n软件版本为10.2.0\n匹配抖音10.2.0版本");
            break;

        case "作者交流":               
            break;
        case "退出":
            ui.finish();
            break;
    }
});
// ui.click_me.on("click", ()=>{
//     toast("多少打赏一下嘛！(ಥ﹏ಥ) ")
//             alipay();
//     toast("多少打赏一下嘛！(ಥ﹏ಥ) ")
//     toast("多少打赏一下嘛！(ಥ﹏ಥ) ")
//     toast("多少打赏一下嘛！(ಥ﹏ಥ) ")
//     toast("多少打赏一下嘛！(ಥ﹏ಥ) ")
//      });
// ui.webview.loadUrl("https://www.kuafo.com/");        
/*******************************daima***********************************************************************************************************************************/
var 配置 = storages.create("抖音辅助")
var storage = storages.create("抖音辅助");
ui.gg001.text(配置.get("gg001", ""));
ui.gg002.text(配置.get("gg002", ""));
ui.gg003.text(配置.get("gg003", ""));
ui.gg004.text(配置.get("gg004", ""));
ui.gg005.text(配置.get("gg005", ""));
ui.gg006.text(配置.get("gg006", ""));
ui.gg007.text(配置.get("gg007", ""));
ui.gg008.text(配置.get("gg008", ""));
ui.gg009.text(配置.get("gg009", ""));
ui.xhgl.text(配置.get("xhgl", ""));
ui.jg.text(配置.get("jg", ""));
ui.jg1.text(配置.get("jg1", ""));
ui.gzsl.text(配置.get("gzsl", ""));
ui.gzjg.text(配置.get("gzjg", ""));
ui.dgzsl.text(配置.get("dgzsl", ""))
ui.uid.text(配置.get("uid", ""))
ui.yhsc.text(配置.get("yhsc", ""));
ui.xhgl2.text(配置.get("xhgl2", ""));
ui.dxszxx.text(配置.get("dxszxx", ""));
ui.jg2.text(配置.get("jg2", ""));
ui.jg11.text(配置.get("jg11", ""));
ui.gzsl1.text(配置.get("gzsl1", ""));
ui.gzjg1.text(配置.get("gzjg1", ""));
ui.dgzsl1.text(配置.get("dgzsl1", ""))
var jihuoma = storage.get("jihuoma");
ui.xbb3.text(配置.get("xbb3", ""));
ui.xbb4.text(配置.get("xbb4", ""));
ui.xbb5.text(配置.get("xbb5", ""));
ui.xbb6.text(配置.get("xbb6", ""));
ui.xbb7.text(配置.get("xbb7", ""));
ui.xbb8.text(配置.get("xbb8", ""));
ui.xbb9.text(配置.get("xbb9", ""));
ui.xbb10.text(配置.get("xbb10", ""));
ui.xbb11.text(配置.get("xbb11", ""));
ui.xbb20.text(配置.get("xbb20", ""));
ui.xbb21.text(配置.get("xbb21", ""));
ui.xbb22.text(配置.get("xbb22", ""));
if (jihuoma != null) {
    ui.jihuoma.setText(jihuoma);
}
var shurukuang1 = storage.get("shurukuang1");
if (shurukuang1 != null) {
    ui.shurukuang1.setText(shurukuang1);
}
var shurukuang2 = storage.get("shurukuang2");
if (shurukuang2 != null) {
    ui.shurukuang2.setText(shurukuang2);
}
var shurukuang3 = storage.get("shurukuang3");
if (shurukuang3 != null) {
    ui.shurukuang3.setText(shurukuang3);
}
var shurukuang4 = storage.get("shurukuang4");
if (shurukuang4 != null) {
    ui.shurukuang4.setText(shurukuang4);
}
var shurukuang5 = storage.get("shurukuang5");
if (shurukuang5 != null) {
    ui.shurukuang5.setText(shurukuang5);
}
var shurukuang6 = storage.get("shurukuang6");
if (shurukuang6 != null) {
    ui.shurukuang6.setText(shurukuang6);
}
var shurukuang7 = storage.get("shurukuang7");
if (shurukuang7 != null) {
    ui.shurukuang7.setText(shurukuang7);
}
var shurukuang8 = storage.get("shurukuang8");
if (shurukuang8 != null) {
    ui.shurukuang8.setText(shurukuang8);
}
var shurukuang9 = storage.get("shurukuang9");
if (shurukuang9 != null) {
    ui.shurukuang9.setText(shurukuang9);
}
var shurukuang10 = storage.get("shurukuang10");
if (shurukuang10 != null) {
    ui.shurukuang10.setText(shurukuang10);
}

var shurukuang12 = storage.get("shurukuang12");
if (shurukuang12 != null) {
    ui.shurukuang12.setText(shurukuang12);
}
var shurukuang13 = storage.get("shurukuang13");
if (shurukuang13 != null) {
    ui.shurukuang13.setText(shurukuang13);
}
var shurukuang16 = storage.get("shurukuang16");
if (shurukuang16 != null) {
    ui.shurukuang16.setText(shurukuang16);
}
var shurukuang19 = storage.get("shurukuang19");
if (shurukuang19 != null) {
    ui.shurukuang19.setText(shurukuang19);
}
var shurukuang24 = storage.get("shurukuang24");
if (shurukuang24 != null) {
    ui.shurukuang24.setText(shurukuang24);
}
var shurukuang24 = storage.get("shurukuang24");
if (shurukuang24 != null) {
    ui.shurukuang24.setText(shurukuang24);
}
var shurukuang25 = storage.get("shurukuang25");
if (shurukuang25 != null) {
    ui.shurukuang25.setText(shurukuang25);
}
var shurukuang26 = storage.get("shurukuang26");
if (shurukuang26 != null) {
    ui.shurukuang26.setText(shurukuang26);
}
var shurukuang27 = storage.get("shurukuang27");
if (shurukuang27 != null) {
    ui.shurukuang27.setText(shurukuang27);
}
var shurukuang28 = storage.get("shurukuang28");
if (shurukuang28 != null) {
    ui.shurukuang28.setText(shurukuang28);
}
var shurukuang29 = storage.get("shurukuang29");
if (shurukuang29 != null) {
    ui.shurukuang29.setText(shurukuang29);
}
/*******************************daima***********************************************************************************************************************************/
function zzyyytt() {
    var i = ui.jihuoma.getText()
   var id = device.getIMEI() + "0826"
   function md5(string) {
       return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5")
           .digest(java.lang.String(string).getBytes())).toString(16);
   }
   var pw = md5(id)
   if (i == pw) {
       toast("激活码正确")
       return 1;
   } else {
       return 0;
   }
}
var day2 = new Date();
day2.setTime(day2.getTime());
var s2 = day2.getFullYear()+"-" + (day2.getMonth()+1) + "-" + day2.getDate();
threads.start(function () {
    var test
    var d = dialogs.build({
        title: "声明",
        content: "本软件开发仅供于交流学习,禁止用于商业活动、灰黑产业 以及违法犯罪行为, 一切因使用本软件而引致的任何违法违规、意外、疏忽、合约毁坏、诽谤、版权或知识产权侵犯及其所造成的损失，概不负责，亦不承担任何法律责任。",
        positive: "我接受",
        negative: "不使用"
    }).on("dismiss", (dialog) => {
        if (!test) {
            toast("停止使用")
            exit()
        }
    }).show()
    d.on("negative", (dialog) => {
        toast("停止使用")
        exit()
    })
    d.on("positive", (dialog) => {
        test = true
        alert(s2+"日：  \n 更新dy最新版10.2.0  \n 请卸载旧版APP  ");
        toast("开始使用！软件已关闭手机音量")
        device.setMusicVolume(0)
        ui.cspyh.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(抖音看视频养号随机评论)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
        });

        ui.xbb12.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start( _垂直养号)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
        });

        ui.UIDtz.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(抖音只关注)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
        });
        ui.qdyl.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                if (ui.cb8.checked == true) {
                    threads.start(发自己粉丝)
                }   
                
                if (ui.cb10.checked == true) {
                    threads.start(发自己关注)
                }   

                if (ui.cb9.checked == true) {
                    home()
                    alert("软件已启动！！！ \n将软件放在后台运行，\n打开抖音粉丝页点击开始");
                    toast("软件已启动！！！ \n将软件放在后台运行，\n打开抖音粉丝页点击开始");
                    threads.start(私信他人粉丝列表)
                }   
                if (ui.cb11.checked == true) {
                    threads.start(私信回复)
                }    
                // if (ui.cb12.checked == true) {
                //     threads.start(机器人值守())
                // }   
                if (ui.cb13.checked == true) {
                    threads.start(发送全部消息列表)
                }
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
        });
        ui.plplyl.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(评论里只关注)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
        });
        ui.startyy1.on("click", function () {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(热门关注)
                threads.start(悬浮显示数)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }     
        });    
        ui.startyy.on("click", function () {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(循环关注)
                threads.start(悬浮显示数)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    newFunction(id);
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }     
        });
        ui.hqjhm.on("click", function () {
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }     
        })
        ui.plply22.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }   
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                home()
                alert("软件已启动！！！ \n将软件放在后台运行，\n打开抖音评论页点击开始");
                toast("软件已启动！！！ \n将软件放在后台运行，\n打开抖音评论页点击开始");
                threads.start(dspsgzc)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }                       
        });

        ui.save12.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(随机点心)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
            

        })
        ui.save13.on("click", () => {
            if (auto.service == null) {
                toast("请先开启无障碍服务！");
                return;
            }
            if (zzyyytt() == 1) {
                toast("激活码正确")
                保存配置()           
                threads.start(指定点心)
            }else {
             保存配置()
                    toast("激活码错误")
                    var id = device.getIMEI()
                    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
                    var clear = confirm("你的机器码为:", id);
                    setClip(id)
            }        
        })
        ui.lxzz3.on("click", function (){
            threads.start (alipay);
 });
    })
}) 
function dspsgzc() {
    var window = floaty.window(
        <frame>
            <button id="action" text="开始运行" textColor="#FF0000" />
        </frame>
    );
    setInterval(() => { }, 1000);
    var execution = null;
    var x = 0,
        y = 0;
    var windowX, windowY;
    var downTime;
    window.action.setOnTouchListener(function (view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                windowX = window.getX();
                windowY = window.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                return true;
            case event.ACTION_UP:
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    onClick();
                }
                return true;
        }
        return true;
    });
    function onClick() {
        if (window.action.getText() == '开始运行') {
            window.action.setText('停止运行');
            threads.start(urjgkrbnl)

        } else {
            window.action.setText('开始运行');

        }
    }   
}
var fsgztx ="bp6"   
var trfsgz = "fst"  
var fszan = "fu"  
var wdxx = "el8"  
var gerxx = "dp1"    
var xxhfxm = "enz"      
var lbgzj = "bp6"    
var pszyzw = "a8z"    
var W = device.width;
var H = device.height;

function newFunction(id) {
    alert("机器码已复制" + id + "                     请用注册机生成激活码 ");
}
function 抖音看视频养号随机评论() {
    console.show();
    var i = 0
    var t = random(1, 5)
    var d = random(1, 5)
    打开抖音()
    _弹窗();
    var e = id(pingl).depth("22").findOne().bounds();
    var x = e.centerX()
    var y = e.centerY()
    var g = 1
    for (var 次数 = ui.shurukuang1.getText(); 次数 > 0; 次数--) {
        var t = random(2, 6)
        for (var i = 3 * t; i > 0; i--) {
            console.info("随机观看视频   倒计时 " + i)
            sleep(1000)
        }
        var t = random(0, 5)
        var d = random(0, 5)
        if (ui.cb1.checked == true) {

            var suiji = random(2, 5)
            if (suiji == 3) {
                click(x - 100 + t, y + d);
                sleep(100);
                click(x - 100 + t, y + d);
                console.error(" 屏幕随机点心")
                sleep(5000);
                click(x + t, y + d);
                console.error("打开评论页面")
                sleep(3500);
                id(biaoq).findOne().click();
                console.error("打开评论页面成功！")
                sleep(5000);
                var suijifasong = random(0, 5)
                console.error("输入评论")
                setText(抖音发送随机评论() + 抖音发送随机表情())
                sleep(2000);
                id(plfsan).findOne().click();
                console.error("评论发送成功！")
                sleep(3000);
                back();
                sleep(2000);
            }
        }
        if (ui.cb2.checked == true) {
            if (suiji == 3) {
                click(x - 100 + t, y + d);
                sleep(100);
                click(x - 100 + t, y + d);

            }
            sleep(5000);
            click(x + t, y + d);
            console.error("打开评论页面")
            sleep(3500);
            id(biaoq).findOne().click();
            console.error("打开评论页面成功！")
            sleep(5000);
            var suijifasong = random(0, 5)
            console.error("输入评论")
            setText(抖音发送随机评论() + 抖音发送随机表情())
            sleep(2000);
            id(plfsan).findOne().click();
            console.error("评论发送成功！")
            sleep(3000);
            back();
        }
        var t = random(0, 5)
        var d = random(0, 5)
        sleep(1000);
        // className("android.support.v4.view.ViewPager").scrollForward()
        sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
        sleep(3000)
        var 总次数 = ui.shurukuang1.getText()
        g = g + 1
        console.error("观看第" + g + "个视频")
        console.error("滑动到下一个视频")
        if (次数 == 1) {
            console.error("观看视频结束")
            console.hide()
            alert("本次养号运行" + 总次数 + "次养号运行结束");
            exit()
        }
    }
};
function _垂直养号() {
    console.show();
    打开抖音()
    var mt = Date.parse(new Date());
    var e = id(pingl).depth("22").findOne().bounds();
    var xp = e.centerX()
    var yp = e.centerY()
    // className("android.support.v4.view.ViewPager").scrollForward()
    sleep(1000);
    while (true) {
    var uuuu= [];
    var uuuu = id(pszyzw).depth("24").find()
    var tthyy = [];
        tthyy = uuuu[1].text();
        console.info("视频文字====》【"+tthyy+"】")
    var ck = 配置.get("xbb3", "") 
    var xh = [];
    xh = ck.split("-");
    var i = 0;
    for (var i = 0; i < xh.length; i++) {
      log("【匹配结果】   =   " + xh[i].indexOf(tthyy));    
        if (tthyy.indexOf(xh[i]) != -1) {
            log("【匹配结果】   =  1");
            console.error("匹配到关键词---【"+xh[i]+"】");
            var sj = random(parseInt(配置.get("xbb5", "")), parseInt(配置.get("xbb6", "")));
            console.info("观看时间：" + sj + "秒");
            for (var i = sj; i > 0; i--) {
                console.info("随机观看视频   倒计时 " + i)
                sleep(1000)
            }
            var sjs1 = random(1, 99);
            if (parseInt(配置.get("xbb8", "")) > sjs1) {
                var t = random(0, 5)
                var d = random(0, 5)
                console.error("喜欢这个作品 点心");
                click(xp - 200 + t, yp + d);
                sleep(100);
                click(xp - 200 + t, yp + d);
                sleep(1000*random(1, 2));
            }
            var sjs2 = random(1, 99);
            if (parseInt(配置.get("xbb9", "")) > sjs2) {
            var t = random(1, 5)
            var d = random(1, 5)
            sleep(1000*random(3, 5));
            click(xp + t, yp + d);
            console.error("打开评论页面")
            sleep(1000*random(3, 5));
            id(biaoq).findOne().click();
            console.error("打开评论页面成功！")
            sleep(1000*random(3, 5));
            var suijifasong = random(0, 5)
            console.error("输入评论")
            setText( 抖音发送随机垂直评论() + 抖音发送随机表情())
            sleep(1000*random(2, 4));
            id(plfsan).findOne().click();
            console.error("评论发送成功！")
            sleep(1000*random(2, 4));
            for (var pllhdc = random(parseInt(配置.get("xbb10", "")), parseInt(配置.get("xbb11", ""))); pllhdc > 0; pllhdc--) {
                sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
                toast("评论滑动浏览");
                console.info("评论滑动浏览");
                sleep(1000*random(2, 4));
                }
            back();
            sleep(1000*random(3, 4));
        }
        var sjs3 = random(1, 99);
        if (parseInt(配置.get("xbb7", "")) > sjs3) {
            sml_move(device.width - 80+random(0, 50), device.height / 2+random(-50, 50), 0+random(30, 60), device.height / 2+random(-50, 50), 500);
            sleep(3000);
            if (id(zygzan).exists()) {
                id(zygzan).findOne().click()
                console.error("已关注")
                sleep(2000);
                back();
            }else{
                back(); 
            }
        }
     };
    }   
    if (Date.parse(new Date()) - mt > 1000 * 60 * parseInt(配置.get("xbb4", ""))) {
        console.error("养号时间达到，养号结束。");
        console.error("养号时间达到，养号结束。");
        console.error("养号时间达到，养号结束。");
        console.error("养号时间达到，养号结束。");
        console.error("养号时间达到，养号结束。");
        -+-
        console.error("养号时间达到，养号结束。");
        return;
    }   
    sleep(1000*random(3, 7));
    sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
    log("滑到下一个视频");    
    }
}
function 打开抖音() {
    if (currentPackage() != "com.ss.android.ugc.aweme") {
        launch("com.ss.android.ugc.aweme");
        console.info("即将打开抖音短视频")
        for (var i = 10; i > 0; i--) {
            console.info("使用提示：本软件开发仅用于交流学习 禁止使用于违法犯罪 否则后果自负！！                                                                                                     已打开抖音短视频，等待15秒    倒计时 " + i)
            sleep(1000)
        }
        console.info("郑重提示：\n 如若您正在使用本软件用于\n非法用途，及不正当行业。\n 请立即停止使用！\n 请立即停止使用！\n我也知道生活不易\n劝君切行切珍惜 ！")
         sleep(5000)
    } else {
        console.info("已经在抖音短视频中，即将开始进行下一步操作！");
        for (var i = 15; i > 0; i--) {
            console.info("本软件开发仅用于交流学习 禁止使用于违法犯罪 否则后果自负！！                                                                                                     已打开抖音短视频，等待15秒    倒计时 " + i)
            sleep(1000)
        }
    }
}
function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by;    
    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
};
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy , zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
        eval("point.push(dx" + i + ")")
    };
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
        xxy.push(xxyy);
    }
    gesture.apply(null, xxy);
};
// // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function 抖音只关注() {
    console.show();
    var lujing = ui.shurukuang10.getText()
    打开抖音()
    sleep(2000);
    _弹窗();
    var e = text("消息").findOne().bounds();
    var x = e.centerX()
    var y = e.centerY()
    console.info("已获取" + x, +y)
    click(x, y);
    for (var 次数 = ui.shurukuang5.getText(); 次数 > 0; 次数--) {
        var lujing = ui.shurukuang10.getText()
        file = open(lujing, "r")
        console.error("读取设备中的数据...")
        var 内容 = file.readline();
        console.info("打开抖音UID为" + 内容 + "的主页")
        sleep(2000);
        file.close();
        var uid = 内容
        openUserPage(uid)
        sleep(5000);
        console.error("进入主页成功")
        read_delete();
        var t = random(0, 5)
        var d = random(0, 5)
        var jg = ui.shurukuang6.getText()
        for (var i = jg; i > 0; i--) {
            console.info("进入主页      等待倒计时  " + i + "秒")
            sleep(1000)
        }
        if (ui.cb5.checked == true) {
            if (id(zygzan).exists()) {
                id(zygzan).findOne().click()
                console.error("已关注")
                sleep(2000);
                back();
            }
        }
        if (ui.cb6.checked == true) {
            console.error("  即将发送私信")
            sleep(2000);
            if (ui.dnicc.checked == true) {
                抖音发私信带昵称()
            } else {
                抖音发私信()
            }
        }
        if (ui.cb7.checked == true) {

            if (id(zygzan).exists()) {
                id(zygzan).findOne().click()
                console.error("已关注")
                sleep(2000)
            }
            console.error("即将发送私信")
            sleep(2000);
            if (ui.dnicc.checked == true) {
                抖音发私信带昵称()
            } else {
                抖音发私信()
            }
        }
        console.info("剩余运行" + 次数 + " 次    即将进入下一个")
        sleep(5000);
    };
};
var fscdjlp = 1
function 发他人粉丝() {
    for (var 次数 = 500; 次数 > 0; 次数--) {
        toast("开始运行私信本页粉丝");
        sleep(5000);
        for (var r = 0; r < 10; r++) {
            var u = [];
                u = id(fsgztx).depth("11").find()
            var e = parseInt(u.length - 1)
            // log(e)
            for (var i = 0; i < e; i++) {
                var tv = u[i];
                if (tv) {
                    // log(tv)
                    var gdfrd = r
                    var ghg = i + 1
                    toast("第" + gdfrd + "页 发送第" + ghg + "次");
                    tr = tv.bounds();
                    click(tr.centerX(), tr.centerY());
                    fscdjlp = fscdjlp + 1
                    sleep(2000)
                    if (ui.dnic.checked == true) {
                        抖音发话术带昵称()
                    } else {
                        抖音发话术()
                    }

                    sleep(1000*ui.shurukuang12.getText())
                }
                var fsslszoo = parseInt(ui.shurukuang29.getText())
                if (fscdjlp > fsslszoo) {
                    toast("聊天话术发送已达到设定数量：" + fsslszoo);
                    alert("聊天话术发送已达到设定数量" + fsslszoo);
                    engines.stopAll()
                }
            }
            sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
            sleep(2500)
        }
    };
};
function 发自己粉丝() {
    console.show();
    打开抖音()
    _弹窗();
    var e = text("我").findOne().bounds();
    var x = e.centerX()
    var y = e.centerY()
    click(x, y);
    var jgt = ui.shurukuang6.getText()
    for (var i = jgt; i > 0; i--) {
        console.info("进入我的主页      等待倒计时  " + i + "秒")
        sleep(1000)
    }
    var e4 = text("粉丝").findOne().bounds();
    var x = e4.centerX()
    var y = e4.centerY()
    console.info("打开粉丝列表")
    click(x, y);
    console.hide()
    sleep(4000);
    while (true) {
        var u = [];
            u = id(fsgztx).depth("11").find()
        var e = parseInt(u.length - 1)
        // log(e)
        for (var i = 0; i < e; i++) {
            var tv5 = u[i];
                tr = tv5.bounds();
                click(tr.centerX(), tr.centerY());
                sleep(2000)
                toast("发送第" + fscdjlp + "次");
                if (ui.dnic.checked == true) {
                    抖音发话术带昵称()
                } else {
                    抖音发话术()
                }
                fscdjlp = fscdjlp + 1
                sleep(2500)           
        }
        var fsslszoo = parseInt(ui.shurukuang29.getText())
        if (fscdjlp > fsslszoo) {
            toast("聊天话术发送已达到设定数量：" + fsslszoo);
            alert("聊天话术发送已达到设定数量" + fsslszoo);
            break;
        }
        sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
        sleep(2500)
    }
};
function 发自己关注() {
    console.show();
    打开抖音()
    _弹窗();
    var e = text("我").findOne().bounds();
    var x = e.centerX()
    var y = e.centerY()
    click(x, y);
    var jgt = ui.shurukuang6.getText()
    for (var i = jgt; i > 0; i--) {
        console.info("进入我的主页      等待倒计时  " + i + "秒")
        sleep(1000)
    }
    var e4 = text("关注").findOne().bounds();
    var x = e4.centerX()
    var y = e4.centerY()
    console.info("打开关注列表")
    click(x, y);
    console.hide()
    sleep(4000);
    while (true) {
        var uzg = [];
            uzg = id(lbgzj).depth("12").find()
        var e = parseInt(uzg.length - 1)
        log(e)
        for (var i = 0; i < e; i++) {
            var tv6 = uzg[i];
                tr7 = tv6.bounds();
                click(tr7.centerX(), tr7.centerY());
                sleep(2000)
                toast("发送第" + fscdjlp + "次");
                if (ui.dnic.checked == true) {
                    抖音发话术带昵称()
                } else {
                    抖音发话术()
                }
                fscdjlp = fscdjlp + 1
                sleep(2500)
        }
        var fsslszoo = parseInt(ui.shurukuang29.getText())
        if (fscdjlp > fsslszoo) {
            toast("发送已达到设定数量：" + fsslszoo);
            alert("发送已达到设定数量" + fsslszoo);
            break;
        }
        sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
        sleep(2500)
    }
};
function 私信回复() {
    console.show();
    打开抖音()
    var e = text("消息").findOne().bounds();
    var x = e.centerX()
    var y = e.centerY()
    console.info("打开消息页面")
    click(x, y);
    console.hide()
    sleep(2500)
    var  stlb = [];
    stlb = id(fszan).find()
    var stledj = parseInt(stlb.length - 1)
    // log(stledj)

    for (var i = 1; i < stledj; i++) {
        var cckk = stlb[i];
        sleep(2500)
        lbzb = cckk.bounds();
        click(lbzb.centerX(), lbzb.centerY());
        sleep(2500)
        back();
    }
    while (true) {
        if (id(wdxx).exists()) {
            toast("有未回复的消息")
            click(x, y);
            sleep(200)
            click(x, y);
            sleep(3000)
            var grxx  = [];
                grxx = id(gerxx).find()
            var xxgs = parseInt(grxx.length)
            // log(xxgs)
            for (var i = 0; i < xxgs; i++) {
                var frf = grxx[i];

                var ghty = frf.bounds();
                sleep(2000)
                click(ghty.centerX(), ghty.centerY());
                sleep(1000)
                消息回复()
            }
        }
    }
}
function 发送全部消息列表() {
    console.show();
    打开抖音()
    sleep(2000);
    var e = text("消息").findOne().bounds();
    var x = e.centerX()
    var y = e.centerY()
    console.info("打开消息页面")
    click(x, y);
    sleep(2000);
    var fscdjlp = 1
    console.hide()
    for (var r = 0; r < 50; r++) {
        sleep(1000);
        var oppol = [];
            oppol = id(xxhfxm).find()
        var eggg = parseInt(oppol.length - 1)
        //  log(eggg)    
        for (var i = 0; i < eggg; i++) {
            sleep(1000)
            var tdtsd = oppol[i];
            var trrr = tdtsd.text();
            //  log(trrr)
            nzzbjj = tdtsd.bounds();
            //  log( nzzbjj)
            sleep(3000)
            click(nzzbjj.centerX(), nzzbjj.centerY());
            fscdjlp = fscdjlp + 1
            sleep(2000)
            if (id("title").exists()) {
                toast("不点击抖音小助手")
                sleep(2000);
                back()
            } else {
                sleep(1000);
                if (ui.dnic.checked == true) {
                    sleep(4000);
                    id(xxsrk).findOne().click()
                    sleep(4000);
                    if (ui.hsxz1.checked == true) {
                        // console.error("输入随机话术1")
                        setText(trrr + " ，" + 抖音发送引流私信一() + 抖音发送随机表情())
                        sleep(4000);
                        desc("发送").findOne().click()
                        // console.error("私信发送第1条")
                    }

                    if (ui.hsxz2.checked == true) {
                        // console.error("输入随机话术2")
                        sleep(4000);
                        setText(抖音发送引流私信二())
                        sleep(4000);
                        desc("发送").findOne().click()
                        // console.error("私信发送第2条")
                    }

                    if (ui.hsxz3.checked == true) {
                        // console.error("输入随机话术3")
                        sleep(4000);
                        setText(抖音发送引流私信三())
                        sleep(4000);
                        desc("发送").findOne().click()
                        // console.error("私信发送第3条")
                    }
                    sleep(3000);
                    console.error("返回主页")
                    back();
                    sleep(2000);
                    back();
                } else {
                    sleep(4000);
                    id(xxsrk).findOne().click()
                    sleep(4000);
                    if (ui.hsxz1.checked == true) {
                        // console.error("输入随机话术1")
                        setText(抖音发送引流私信一() + 抖音发送随机表情())
                        sleep(4000);
                        desc("发送").findOne().click()
                        // console.error("私信发送第1条")
                    }

                    if (ui.hsxz2.checked == true) {
                        // console.error("输入随机话术2")
                        sleep(4000);
                        setText(抖音发送引流私信二())
                        sleep(4000);
                        desc("发送").findOne().click()
                        // console.error("私信发送第2条")
                    }

                    if (ui.hsxz3.checked == true) {
                        // console.error("输入随机话术3")
                        sleep(4000);
                        setText(抖音发送引流私信三())
                        sleep(4000);
                        desc("发送").findOne().click()
                        // console.error("私信发送第3条")
                    }
                    sleep(3000);
                    console.error("返回主页")
                    back();
                    sleep(2000);
                    back();
                }
            }
        }
        var fsslszoo = parseInt(ui.shurukuang29.getText())
        if (fscdjlp > fsslszoo) {
            toast("聊天话术发送已达到设定数量：" + fsslszoo);
            alert("聊天话术发送已达到设定数量" + fsslszoo);
            break;
        }
        sleep(4000);
        sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
    }
}
function read_delete() {
    //删除第一行
    var lujing = ui.shurukuang10.getText()
    var path = lujing; //txt文本路径
    var reg = /^\s+|s+$/g; //匹配无效空白行
    var txt = files.read(path).replace(reg, "").split("\n");
    let ret_text = txt[0];
    if (txt != "") {
        txt.splice(0, 1); //删除
        files.write(path, txt.join("\n"));
        if (ret_text.length > 0) {
            return ret_text.trim();
        };
    } else {
        return "没有号了"
    };
    file.close();
};
var gzsl = 0
var sxsl = 0
var dzsl = 0
function 评论里只关注() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        return;
    }
    sleep(1000)
    console.show();
    打开抖音()
    console.hide()
    threads.start(悬浮显示数)
    sleep(1000);
    className("android.support.v4.view.ViewPager").scrollForward()
    var e1 = id(pingl).depth("22").findOne().bounds();
    var x88 = e1.centerX()
    var y88 = e1.centerY()
    log(x88,y88);
    sleep(4000)
    while (true) {
        var pinglun = [];
        pinglun = id(sppll).find()
        var tv2 = pinglun[1];
        var pinglunzuobiao = tv2.bounds();
        var pinglunliang = tv2.text()
        // log(pinglunliang)
        var spstr = [];
        var spstr = pinglunliang.split("");
        var lll = spstr[spstr.length - 1]
        // log(lll)
        var wan = "w"
        var shul = pinglunliang.replace(/[^\d]/g, '');
        // log(shul)
        var ppplll =parseInt(配置.get("gg009", ""))
        if (shul > ppplll || lll == wan) {
            toast("此视频品论" + pinglunliang + "个多于" + ppplll)
            sleep(2000)
            click(pinglunzuobiao.centerX(), pinglunzuobiao.centerY());
            sleep(4000)
            sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
            for (var r = 0; r < 5; r++) {
                var u = [];
                    u = id(plwz).find();
                var e = parseInt(u.length - 1);
                var tx = [];
                    tx = id(plyhtx).find()
                var xin = [];
                    xin = id(plxin).find()
                for (var i = 1; i < e; i++) {
                    var cc = tx[i];
                    var tv3 = u[i];
                    var dx = xin[i];
                    if (tv3) {
                        var tr = tv3.text();
                        // log(tr)
                        dltx = cc.bounds();
                        // log(dltx)
                        pldxx = dx.bounds();
                        // log(pldxx)
                        var num1 = tr.replace(/[^\d]/g, '');
                        // log(num1)
                        var str = tr;
                        spstr = str.split("");
                        var lgg = spstr[spstr.length - 4] + spstr[spstr.length - 2];
                        // log(lgg)
                        var fs = "刚刚"
                        str = tr;
                        spstr = str.split("");
                        var llll = spstr[spstr.length - 6] + spstr[spstr.length - 4];
                        // log(llll)
                        var fz = "分钟"
                        var dyfzs = parseInt(ui.shurukuang25.getText());
                        // log(dyfzs)
                        if (num1 <= dyfzs && llll == fz || fs == lgg) {
                            if (fs == lgg) {
                                toast("找到刚刚评论的用户");
                            } else {
                                toast("找到" + num1 + "分钟的评论用户");
                            }
                            sleep(1000)
                            click(dltx.centerX(), dltx.centerY());
                            sleep(2500)
                            if (ui.sp2.getSelectedItemPosition() == 2) {
                                xuzngn()
                            } else {
                                var ress = 评论识别性别()
                                if (ress == parseInt(ui.sp2.getSelectedItemPosition(), "")) {
                                    xuzngn()
                                } else {
                                    sleep(2000)
                                    back();
                                }
                            }
                            var gzslz = parseInt(ui.shurukuang26.getText())
                            if (gzsl > gzslz) {
                                toast("关注已达到设定数量" + gzslz);
                                alert("关注已达到设定数量：" + gzslz);
                                // exit();
                            }
                            var sxslz = parseInt(ui.shurukuang27.getText())
                            if (sxsl > sxslz) {
                                toast("私信已达到设定数量" + sxslz);
                                alert("私信已达到设定数量：" + sxslz);
                                //   exit();
                            }
                        } else {
                            toast("没有找到" + dyfzs + "分钟内的评论用户继续查找。。。")
                            // if (num1 > dyfzs || llll != fz) {
                            //     sleep(500)
                            //     break;
                            // }
                        }
                        sleep(1000)
                    }
                }
                sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
                sleep(1000)
            }
            back();
            sleep(2000)
            className("android.support.v4.view.ViewPager").scrollForward()
            sleep(3000)
        } else {
            toast("此视频品论" + shul + "个少于" + ppplll + "继续找热门视频评论！")
            sleep(1000)
            className("android.support.v4.view.ViewPager").scrollForward()
            sleep(3000)
            var suiji = random(0, 5)
            var suijisx = random(0, 15)
            var suijiyh = random(0, 10)
            if (suiji == 5) {
                var t = random(10, 30)
                var d = random(10, 30)
                toast("随机点赞");
                click(W / 2 + t, H / 2 + d);
                sleep(100);
                click(W / 2 + t, H / 2 + d);
                sleep(1000);
            }
            var suijisx = random(0, 15)
            if (suijisx == 10) {
                var e = text("首页").findOne().bounds();
                var x = e.centerX()
                var y = e.centerY()
                toast("刷新视频")
                click(x, y);
            }
            if (suijiyh == 10) {
                console.show();
                console.setPosition(0, 150);
                var yhccs = random(1, 5)
                console.error("本次养号运行" + yhccs + "次");
                for (var 次数 = yhccs; 次数 > 0; 次数--) {
                    var t = random(2, 6)
                    for (var i = 3 * t; i > 0; i--) {
                        console.info("随机观看视频   倒计时 " + i)
                        sleep(1000)
                    }
                    var t = random(0, 5)
                    var d = random(0, 5)
                    var suiji = random(1, 5)
                    if (suiji == 3) {
                        var t = random(10, 30)
                        var d = random(10, 30)
                        console.error("随机点赞")
                        click(W / 2 + t, H / 2 + d);
                        sleep(100);
                        click(W / 2 + t, H / 2 + d);
                        sleep(2000);
                    }
                    sleep(3000)
                    var 总次数 = yhccs
                    console.error("剩余观看第" + 次数 + "个视频")
                    console.error("滑动到下一个视频")
                    className("android.support.v4.view.ViewPager").scrollForward()
                    if (次数 == 1) {
                        console.error("本次养号运行" + 总次数 + "次，养号运行结束");
                    }
                }
                console.hide()
            }
        }
    }
}
function 评论识别性别()  //返回0--男  1女  2 未
{
    if (text("男").exists()) {
        toast("----男----");
        return 0;
    };
    if (text("女").exists()) {
        toast("----女----");
        return 1;
    };
    if (textEndsWith("岁").exists()) {
        var Quyu = textEndsWith("岁").findOne().bounds();
        // log(textEndsWith("岁").findOne().text());
        var point = findColor(captureScreen(), "#ffd84a68", {
            region: [Quyu.left, Quyu.top, Quyu.width(), Quyu.height()],
            threads: 8
        });
        if (point) {
            toast("----女----");
            return 1;
        } else {
            toast("----男----");
            return 0;
        }
    } else {
        toast("----无法判断 男 女----");;
        return 3;
    }
}
function 悬浮显示数() {
    var window = floaty.window(
        <frame gravity="center">
            <text id="text" textSize="15sp" textColor="#f44336" textStyle="bold"    />
        </frame>
    );
    window.exitOnClose();
    window.text.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });
    setInterval(() => {
        //对控件的操作需要在UI线程中执行
        ui.run(function () {
            window.text.setText(dynamicText());
        });
    }, 1000);
    function dynamicText() {
        var date = new Date();
        var str = "当前关注总数：" + gzsl + "\n";
        str += "当前私信总数：" + sxsl + "\n";
        str += "当前点赞总数：" + dzsl
        return str;
    }
}
function xuzngn() {
    if (ui.cb30.checked == true) {
        sleep(1000)
        关注他()
        back();
    }
    if (ui.cb31.checked == true) {
        sleep(2500)
        私信他()
    }
    if (ui.cb32.checked == true) {
        
        sleep(2500)
        关注他()
        back();
        sleep(1000)
        click(pldxx.centerX(), pldxx.centerY());
    }
    if (ui.cb33.checked == true) {
        sleep(2500)
        私信他()
        sleep(1000)
        click(pldxx.centerX(), pldxx.centerY());
    }
    if (ui.cb34.checked == true) {
        sleep(1000)
        关注他()
        私信他()
    }
    if (ui.cb35.checked == true) {
        sleep(2500)
        关注他()
        私信他()
        sleep(1000)
        click(pldxx.centerX(), pldxx.centerY());
    }
    if (ui.cb36.checked == true) {
        sleep(1500)
        back();
        sleep(1500)
        longClick(pldxx.centerX() - 100, pldxx.centerY());
        sleep(2000)
        text("私信回复").findOne().click()
        sleep(1000)
        setText(抖音发送引流私信一() + 抖音发送随机表情())
        sleep(1000)
        text("发送").findOne().click()
        sxsl = sxsl + 1
        sleep(1000)
    }
    if (ui.cb37.checked == true) {
        sleep(1500)
        back();
        sleep(1000)
        click(pldxx.centerX(), pldxx.centerY());
        sleep(1000)
        longClick(pldxx.centerX() - 100, pldxx.centerY());
        sleep(2000)
        text("私信回复").findOne().click()
        sleep(1000)
        setText(抖音发送引流私信一() + 抖音发送随机表情())
        sleep(1000)
        text("发送").findOne().click()
        sxsl = sxsl + 1
        sleep(1000)
    }
    if (ui.cb38.checked == true) {
        back()
        sleep(1000)
        click(pldxx.centerX(), pldxx.centerY());
        dzsl = dzsl + 1
        sleep(2500)
    }
}
function 关注他() {
    if (id(zygzan).exists()) {

        sleep(1000)
        id(zygzan).findOne().click()
        gzsl = gzsl + 1
        toast("已关注！  总关注" + gzsl + "个")
        sleep(3000)
    }
}
function 私信他() {
    sxsl = sxsl + 1
    toast("私信他！  总私信" + gzsl + "个")
    if (ui.dnic.checked == true) {
        抖音发话术带昵称()
    } else {
        抖音发话术()
    }
}
function openUserPage(uid) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "snssdk1128://user/profile/" + uid + "?refer=xjb&gd_label=click_wap_profile_bottom&type=need_follow&needlaunchlog=1",
        packageName: "com.ss.android.ugc.aweme",
    });
}


function 抖音发私信() {
    var eger = id(zysgd).findOne().bounds();
    var x00 = eger.centerX()
    var y00 = eger.centerY()
    click(x00,y00)
    sleep(4000);
    console.error("进入对话页面")
    id(sgdxx).findOne().click()
    sleep(4000);
    id(xxsrk).findOne().click()
    console.error("输入随机招呼")
    sleep(4000);
    if (ui.hsxz93.checked == true) {
        console.error("输入随机话术1")
        setText(抖音发送随机招呼一() + 抖音发送随机表情())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第1条")
    }
    if (ui.hsxz94.checked == true) {
        console.error("输入随机话术2")
        sleep(4000);
        setText(抖音发送随机招呼二())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第2条")
    }

    if (ui.hsxz95.checked == true) {
        console.error("输入随机话术3")
        sleep(4000);
        setText(抖音发送随机招呼三())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第3条")
    }
    sleep(4000);
    console.error("返回首页！")
    back();
    sleep(2000);
    back();
    sleep(2000);
    // back();
    // sleep(2000);
    back();
    sleep(2000);
}
function 抖音发私信带昵称() {
    dync = id(zync).findOne().text();
    var eger = id(zysgd).findOne().bounds();
    var x00 = eger.centerX()
    var y00 = eger.centerY()
    click(x00,y00)
    sleep(4000);
    console.error("进入对话页面")
    id(sgdxx).findOne().click()
    sleep(4000);
    id(xxsrk).findOne().click()
    console.error("输入随机招呼")
    sleep(4000);
    if (ui.hsxz93.checked == true) {
        console.error("输入随机话术1")
        setText(dync + "，" + 抖音发送随机招呼一() + 抖音发送随机表情())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第1条")
    }
    if (ui.hsxz94.checked == true) {
        console.error("输入随机话术2")
        sleep(4000);
        setText(抖音发送随机招呼二())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第2条")
    }

    if (ui.hsxz95.checked == true) {
        console.error("输入随机话术3")
        sleep(4000);
        setText(抖音发送随机招呼三())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第3条")
    }
    sleep(4000);
    console.error("返回首页！")
    back();
    sleep(2000);
    back();
    sleep(2000);
    // back();
    // sleep(2000);
    back();
    sleep(2000);
}
function 抖音发话术() {
    var eger = id(zysgd).findOne().bounds();
    var x00 = eger.centerX()
    var y00 = eger.centerY()
    click(x00,y00)
    sleep(4000);
    id(sgdxx).findOne().click()
    sleep(4000);
    id(xxsrk).findOne().click()
    sleep(4000);
    if (ui.hsxz1.checked == true) {
        console.error("输入随机话术1")
        setText(抖音发送引流私信一() + 抖音发送随机表情())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第1条")
    }

    if (ui.hsxz2.checked == true) {
        console.error("输入随机话术2")
        sleep(4000);
        setText(抖音发送引流私信二())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第2条")
    }

    if (ui.hsxz3.checked == true) {
        console.error("输入随机话术3")
        sleep(4000);
        setText(抖音发送引流私信三())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第3条")
    }
    sleep(3000);
    console.error("返回主页")
    back();
    sleep(2000);
    back();
    sleep(2000);
    back();
    sleep(2000);
}
function 抖音发话术带昵称() {
    dync = id(zync).findOne().text();
    var eger = id(zysgd).findOne().bounds();
    var x00 = eger.centerX()
    var y00 = eger.centerY()
    click(x00,y00)
    sleep(4000);
    id(sgdxx).findOne().click()
    sleep(4000);
    id(xxsrk).findOne().click()
    sleep(4000);
    if (ui.hsxz1.checked == true) {
        console.error("输入随机话术1")
        setText(dync + "，" + 抖音发送引流私信一() + 抖音发送随机表情())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第1条")
    }

    if (ui.hsxz2.checked == true) {
        console.error("输入随机话术2")
        sleep(4000);
        setText(抖音发送引流私信二())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第2条")
    }

    if (ui.hsxz3.checked == true) {
        console.error("输入随机话术3")
        sleep(4000);
        setText(抖音发送引流私信三())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第3条")
    }
    sleep(3000);
    console.error("返回主页")
    back();
    sleep(2000);
    back();
    sleep(2000);
    back();
    sleep(2000);
}
function 消息回复() {
    sleep(4000);
    id(xxsrk).findOne().click()
    sleep(4000);
    if (ui.hsxz1.checked == true) {
        console.error("输入随机话术1")
        setText(抖音发送引流私信一() + 抖音发送随机表情())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第1条")
    }

    if (ui.hsxz2.checked == true) {
        console.error("输入随机话术2")
        sleep(4000);
        setText(抖音发送引流私信二())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第2条")
    }
    if (ui.hsxz3.checked == true) {
        console.error("输入随机话术3")
        sleep(4000);
        setText(抖音发送引流私信三())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第3条")
    }
    sleep(3000);
    console.error("返回主页")
    back();
    sleep(2000);
    back();
}
function 消息回复带昵称() {
    sleep(4000);
    id(xxsrk).findOne().click()
    sleep(4000);
    if (ui.hsxz1.checked == true) {
        console.error("输入随机话术1")
        setText(trrr + 抖音发送引流私信一() + 抖音发送随机表情())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第1条")
    }
    if (ui.hsxz2.checked == true) {
        console.error("输入随机话术2")
        sleep(4000);
        setText(抖音发送引流私信二())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第2条")
    }
    if (ui.hsxz3.checked == true) {
        console.error("输入随机话术3")
        sleep(4000);
        setText(抖音发送引流私信三())
        sleep(4000);
        desc("发送").findOne().click()
        console.error("私信发送第3条")
    }
    sleep(3000);
    console.error("返回主页")
    back();
    sleep(2000);
    back();
}
// function setText() {
//     var r = data.split("");
//     setText(" ")
//     for (var i = 0; i < r.length; i++) {
//         var tvk = r[i];
//         input(tvk);
//         var t = random(5, 15)
//         sleep(t * 100);
//     }
// }
function 抖音发送随机评论() {
    var face = new Array();
    face[0] = ui.shurukuang2.getText()
    face[1] = ui.shurukuang3.getText()
    face[2] = ui.shurukuang4.getText()
    return face[random(0, face.length - 1)]
};

function 抖音发送随机垂直评论() {
    var face = new Array();
    face[0] = 配置.get("xbb20", "")
    face[1] = 配置.get("xbb21", "")
    face[2] = 配置.get("xbb22", "")
    return face[random(0, face.length - 1)]
};

function 抖音发送随机招呼一() {
    var sjhuashu = ui.shurukuang7.text();
    var fg = [];
    fg = sjhuashu.split("-");
    return fg[random(0, fg.length - 1)]
};
function 抖音发送随机招呼二() {
    var sjhuashu = ui.shurukuang8.text();
    var fg = [];
    fg = sjhuashu.split("-");
    return fg[random(0, fg.length - 1)]
};
function 抖音发送随机招呼三() {
    var sjhuashu = ui.shurukuang9.text();
    var fg = [];
    fg = sjhuashu.split("-");
    return fg[random(0, fg.length - 1)]
};
function 抖音发送随机表情() {
    var face = new Array();
    face[0] = "[微笑]"
    face[1] = "[大笑]"
    face[2] = "[色]"
    face[3] = "[调皮]"
    face[4] = "[灵光一闪]"
    face[5] = "[大金牙]"
    face[6] = "[爱慕]"
    face[7] = "[惊呆]"
    face[8] = "[酷拽]"
    face[9] = "[抠鼻]"
    face[10] = "[流泪]"
    face[11] = "[晕]"
    face[12] = "[可爱]"
    face[13] = "[害羞]"
    face[14] = "[机智]"
    face[15] = "[耶]"
    face[16] = "[捂脸]"
    face[17] = "[偷笑]"
    face[18] = "[可怜]"
    face[19] = "[坏笑]"
    face[20] = "[互粉]"
    face[21] = "[求抱抱]"
    face[22] = "[飞吻]"
    face[23] = "[舔屏]"
    face[24] = "[紫薇别走]"
    face[25] = "[吃瓜群众]"
    face[26] = "[委屈]"
    face[27] = "[皱眉]"
    face[28] = "[太阳]"
    face[29] = "[勾引]"
    face[30] = "[咖啡]"
    return face[random(0, face.length - 1)]
};
function 抖音发送引流私信一() {
    var sjhuashu = ui.shurukuang13.text();
    var fg = [];
    fg = sjhuashu.split("-");
    return fg[random(0, fg.length - 1)]
};
function 抖音发送引流私信二() {
    var sjhuashu = ui.shurukuang16.text();
    var fg = [];
    fg = sjhuashu.split("-");
    return fg[random(0, fg.length - 1)]
};
function 抖音发送引流私信三() {
    var sjhuashu = ui.shurukuang19.text();
    var fg = [];
    fg = sjhuashu.split("-");
    return fg[random(0, fg.length - 1)]
};
function 保存配置() {
    storage.put("jihuoma", ui.jihuoma.text());
    storage.put("shurukuang1", ui.shurukuang1.text());
    storage.put("shurukuang2", ui.shurukuang2.text());
    storage.put("shurukuang3", ui.shurukuang3.text());
    storage.put("shurukuang4", ui.shurukuang4.text());
    storage.put("shurukuang5", ui.shurukuang5.text());
    storage.put("shurukuang6", ui.shurukuang6.text());
    storage.put("shurukuang7", ui.shurukuang7.text());
    storage.put("shurukuang8", ui.shurukuang8.text());
    storage.put("shurukuang9", ui.shurukuang9.text());
    storage.put("shurukuang10", ui.shurukuang10.text());
    storage.put("shurukuang12", ui.shurukuang12.text());
    storage.put("shurukuang13", ui.shurukuang13.text());
    storage.put("shurukuang16", ui.shurukuang16.text());
    storage.put("shurukuang19", ui.shurukuang19.text());
    storage.put("shurukuang24", ui.shurukuang24.text());
    storage.put("shurukuang25", ui.shurukuang25.text());
    storage.put("shurukuang26", ui.shurukuang26.text());
    storage.put("shurukuang27", ui.shurukuang27.text());
    storage.put("shurukuang28", ui.shurukuang28.text());
    storage.put("shurukuang29", ui.shurukuang29.text());
    配置.put("xhgl", ui.xhgl.text());
    配置.put("jg", ui.jg.text());
    配置.put("jg1", ui.jg1.text());
    配置.put("gzsl", ui.gzsl.text());
    配置.put("gzjg", ui.gzjg.text());
    配置.put("dgzsl", ui.dgzsl.text());
    配置.put("uid", ui.uid.text());
    配置.put("yhsc", ui.yhsc.text());
    配置.put("性别", ui.性别.getSelectedItemPosition());
    配置.put("dxszxx", ui.dxszxx.text());
    配置.put("xhgl2", ui.xhgl2.text());
    配置.put("jg2", ui.jg2.text());
    配置.put("jg11", ui.jg11.text());
    配置.put("gzsl1", ui.gzsl1.text());
    配置.put("gzjg1", ui.gzjg1.text());
    配置.put("dgzsl1", ui.dgzsl1.text());
    配置.put("性别1", ui.性别1.getSelectedItemPosition());
    配置.put("fsdk", ui.fsdk.getSelectedItemPosition());
    配置.put("xbb3", ui.xbb3.text());
    配置.put("xbb4", ui.xbb4.text());
    配置.put("xbb5", ui.xbb5.text());
    配置.put("xbb6", ui.xbb6.text());
    配置.put("xbb7", ui.xbb7.text());
    配置.put("xbb8", ui.xbb8.text());
    配置.put("xbb9", ui.xbb9.text());
    配置.put("xbb10", ui.xbb10.text());
    配置.put("xbb11", ui.xbb11.text());
    配置.put("xbb20", ui.xbb20.text());
    配置.put("xbb21", ui.xbb21.text());
    配置.put("xbb22", ui.xbb22.text());
    配置.put("gg001", ui.gg001.text());
    配置.put("gg002", ui.gg002.text());
    配置.put("gg003", ui.gg003.text());
    配置.put("gg004", ui.gg004.text());
    配置.put("gg005", ui.gg005.text());
    配置.put("gg006", ui.gg006.text());
    配置.put("gg007", ui.gg007.text());
    配置.put("gg008", ui.gg008.text());
    配置.put("gg009", ui.gg009.text());
    toast("界面配置已保存");
};
function 私信他人粉丝列表() {
        var window = floaty.window(
            <frame>
                <button id="action" text="开始运行" textColor="#FF0000" />
            </frame>
        );
        setInterval(() => { }, 1000);
        var execution = null;
        var x = 0,
            y = 0;
        var windowX, windowY;
        var downTime;
        window.action.setOnTouchListener(function (view, event) {
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    x = event.getRawX();
                    y = event.getRawY();
                    windowX = window.getX();
                    windowY = window.getY();
                    downTime = new Date().getTime();
                    return true;
                case event.ACTION_MOVE:
                    window.setPosition(windowX + (event.getRawX() - x),
                        windowY + (event.getRawY() - y));
                    return true;
                case event.ACTION_UP:
                    if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                        onClick();
                    }
                    return true;
            }
            return true;
        });
        function onClick() {
            if (window.action.getText() == '开始运行') {
                window.action.setText('停止运行');
                threads.start(发他人粉丝)
            } else {
                window.action.setText('开始运行');
            }
        }
}

ui.emitter.on("resume", function () {
    ui.autoService.checked = auto.service != null;
});
function dyzpdx() {
    if (textMatches("作品.+").exists()) {
        var a = textMatches("作品.+").findOne().text();
        var b = textMatches("作品.+").findOne().bounds();
        var ghft = a.replace(/[^\d]/g, '');
        var jsghds="0"
        if (ghft==jsghds){
            console.info("没有作品")
            back()
        }  else {
            console.info("有作品")
        sleep(1500)
        click( b.centerX(), b.centerY()+100);
        sleep(3000)
        click(W / 2, H / 2);
        sleep(100);
        click(W / 2, H / 2);
        sleep(1000);
        back()
            
        }
    }  else {
            log("私密账号")
            back()
    }
    }
var pingl = "a59"       
var dghfpo ="aia"    
var biaoq = "bsq"  
var plfsan = "a5u" 
var zygzan = "dgn"      
var zysgd = "ery"  
var sgdxx = "e4u"
var xxsrk = "csb" 
var zync = "cwe"   
var sppll = "a5a" 
var xihuan = "aib" 
var plwz = "a2m"  
var plyhtx ="ayz" 
var plxin = "bsa"  
var 权限 = true;
function 循环关注() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        return;
    }
    threads.start(function () {
        console.show();
        console.setPosition(0, 40);
        // threads.start(悬浮显示数)
        打开抖音()
        if (_判断是否登录()) {
            while (true) {
                返回首页();
                _养号();
                关注粉丝();
                if (gzsl > ui.gzsl.text()) {
                    log("任务完成");
                    exit();
                }
            }
        }
        else {
            console.warn("脚本结束，请登录后重试");
            exit();
        }
    });
}
function _养号() {
    var mt = Date.parse(new Date());
    while (true) {
        if (descStartsWith("评论").exists()) {
            var sjs = random(1, 100);
            if (parseInt(配置.get("xhgl", "")) > sjs) {
                console.error("喜欢这个作品 点心");
                click(W / 2, H / 2);
                sleep(100);
                click(W / 2, H / 2);
                sleep(1000);
            }
            else {
                ts("不给这个视频点心");
            }
            // swipe(W / 2, H * 4 / 5, W / 2, H / 5, 1000);
            className("android.support.v4.view.ViewPager").scrollForward()
            ts("滑到下一个视频");
            var sj = random(parseInt(配置.get("jg", "")), parseInt(配置.get("jg1", "")));
            ts("观看时间：" + sj + "秒");
            // sleep(sj * 1000);
            for (var i = sj; i > 0; i--) {
                console.info("随机观看视频   倒计时 " + i)
                sleep(1000)
            }
        };
        if (text("编辑资料").exists()) {
            var b = text("首页").findOne().bounds();
            click(b.centerX(), b.centerY());
        };
        if (Date.parse(new Date()) - mt > 1000 * 60 * parseInt(配置.get("yhsc", ""))) {
            ts("养号时间达到，养号结束。");
            return;
        }
        _弹窗();
        sleep(100);
    }

};
function _判断是否登录() {
    while (true) {
        _弹窗()
        if (text("我").exists()) {
            var b = text("我").findOne().bounds();
            click(b.centerX(), b.centerY());
        };
        if (text("编辑资料").exists()) {
            console.log("账号已登录")
            return true;
        };
        if (text("密码登录").exists()) {
            console.log("账号未登录")
            return false;
        };
        if (text("您的收藏在这里").exists()) {
            keys.back();
        };
        sleep(100);
    }
};
function _弹窗() {
    if (text("我知道了").exists()) {
        text("我知道了").findOne().click();
    }
    if (text("允许").exists()) {
        text("允许").findOne().click();
    }
}

function 返回首页() {
    ts("执行返回抖音首页");
    while (true) {
        if (text("推荐").exists()) {
            var a = text("推荐").findOne().bounds();
            if (a.left == device.width / 2) {
                ts("返回首页成功");
                break;
            }
            else if (a.right + 7 > device.width / 2 && a.left < device.width / 2) {
                ts("返回首页成功");
                break;
            } else {
                back();
                sleep(2000);
            }
        }
        else {
            if (text("首页").exists()) {
                var d = text("首页").findOne().bounds();
                click(d.centerX(), d.centerY());
                sleep(1000);
            } else {
                back();
                sleep(2000);
            };
        }
        _弹窗()
        sleep(100);
    }
}
function 随机主页() {
    var fg = [];
    fg = ui.uid.text().split("+");
    return fg[random(0, fg.length - 1)]
};

function openUserPage1(uu) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: uu,
        packageName: "com.ss.android.ugc.aweme",
    });
}
function openUserPage2(pp) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "snssdk1128://user/profile/" + pp + "?refer=xjb&gd_label=click_wap_profile_bottom&type=need_follow&needlaunchlog=1",
        packageName: "com.ss.android.ugc.aweme",
    });
}
function 关注粉丝() //关注粉丝列表中的粉丝，可选男女
{
    var k = 0
    while (true) {     
        if (parseInt(配置.get("fsdk", "")) == 0) {
            console.info("打开指定的主页")
            var pp = 随机主页() 
        openUserPage2(pp)
    }
        if (parseInt(配置.get("fsdk", "")) == 1) {
            console.info("链接解析中...")
            console.info("解析链接UID提取成功！")
            console.info("打开指定的主页")
            var pp = 随机主页()
            var fgu = [];
            fgu = pp.split("！");
            var uu = fgu[1]
            uu = uu.replace(/\s/g, "")
        openUserPage1(uu)
    }

        sleep(4000);
        if (text("粉丝").exists()) {
            var b = text("粉丝").findOne().bounds();
            click(b.centerX(), b.centerY());
            sleep(3000);
        }
        if (textMatches("粉丝.+").exists()) {
            ts("进入粉丝列表");
            break;
        }
        sleep(100)
    }
    log("关注粉丝中...");
    while (true) {
        if (textMatches("粉丝.+").exists()) {
            var uc = text("关注").find();
            //目的是 获取范围
            var fs = className("android.widget.HorizontalScrollView").findOne().bounds();
            sleep(500);
            for (var i = 0; i < uc.length; i++) {
                var v = uc[i].bounds();
                // log("关注范围：" + v);
                //判断是否在 屏幕显示范围
                if (v.left > device.width / 2 && v.top > fs.bottom + 80) {
                    //click(device.width / 4, v.centerY());
                    if (uc[i].parent()) {
                        uc[i].parent().parent().parent().click();
                        sleep(parseInt(配置.get("gzjg", "")) * 1000);
                    }
                    if (textMatches("抖音号.+").exists()) {
                        if (parseInt(配置.get("性别", "")) == 2) {
                            if (ui.dzdygzp2.checked == true) {
                                dyzpdx() 
                            }   
                            back();
                            sleep(2000);
                            k = k + 1;
                            gzsl = gzsl + 1;
                            if (textMatches("抖音号.+").exists()) {
                                back();
                                sleep(2000);
                            }
                            uc[i].click();
                            console.error("已关注" + gzsl + "个-----------")
                            if (k >= parseInt(ui.dgzsl.text())) {
                                log("关注一波完成");
                                return;
                            }
                            sleep(parseInt(配置.get("gzjg", "")) * 1000);
                        } else {
                            var res = 识别性别()
                            if (res == parseInt(配置.get("性别", ""))) {
                                if (ui.dzdygzp2.checked == true) {
                                    dyzpdx() 
                                }                               
                                back();
                                sleep(2000);
                                k = k + 1;
                                gzsl = gzsl + 1;
                                if (textMatches("抖音号.+").exists()) {
                                    back();
                                    sleep(2000);
                                }
                                uc[i].click();
                                console.error("已关注" + gzsl + "个-----------")
                                if (k >= parseInt(ui.dgzsl.text())) {
                                    log("关注一波完成");
                                    return;
                                }
                                sleep(parseInt(配置.get("gzjg", "")) * 1000);
                            }
                            else {
                                back();
                                sleep(2000);
                            };
                        };
                    }
                };
            };
            if (textMatches("粉丝.+").exists()) {
                console.info("滑动下一页");
                // swipe(device.width / 2, device.height - 90, device.width / 2, device.height / 6, 1000);
                sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
                sleep(1000);
            }
            else if (textMatches("抖音号.+").exists()) {
                back();
                sleep(2000);
            }
        }
        else {
            log("不在粉丝页");
            break;
        };
        sleep(100);
        log("执行中");
    };
};
function 识别性别()  //返回0--男  1女  2 未知
{
    if (text("男").exists()) {
        ts("男");
        return 0;
    };
    if (text("女").exists()) {
        ts("女");
        return 1;
    };
    if (textMatches("[0-9]+岁").exists()) {
        var a = textMatches("[0-9]+岁").findOne().bounds();
        if (a) {
            if (a.top + 50 < device.height && a.left <= device.width / 2) {
                var res = findColorEquals(captureScreen(), "#ff06a0b3", a.left, a.top, 50, 50);//男
                if (res) {
                    ts("男");
                    return 0;
                };
                res = findColorEquals(captureScreen(), "#ffd64b66", a.left, a.top, 50, 50);//女
                if (res) {
                    ts("女");
                    return 1;
                };
            }
        };
    };
    ts("性别未知");
    return 3;
}
function ts(text) {
    log(text);
}

function 热门关注() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        return;
    }
    threads.start(function () {
    console.show();
    console.setPosition(0, 40);
    // threads.start(悬浮显示数)
    打开抖音()
    if (_判断是否登录()) {
        返回首页();
        while (true) {
            var suijisx = random(0, 6)
            if (suijisx == 10) {
                var e = text("首页").findOne().bounds();
                var x = e.centerX()
                var y = e.centerY()
                console.error("刷新视频")
                click(x, y);
            }
            sleep(2000);
            className("android.support.v4.view.ViewPager").scrollForward()
            var sj = random(parseInt(配置.get("jg2", "")), parseInt(配置.get("jg11", "")));
            ts("观看时间：" + sj + "秒");
            for (var i = sj; i > 0; i--) {
                console.info("随机观看视频   倒计时 " + i)
                sleep(1000)
            }
            var sjs1 = random(1, 100);
            if (parseInt(配置.get("xhgl2", "")) > sjs1) {
                var t = random(10, 30)
                var d = random(10, 30)
                console.error("喜欢这个作品 点心");
                click(W / 2 + t, H / 2 + d);
                sleep(100);
                click(W / 2 + t, H / 2 + d);
                sleep(2000);
            }
            else {
                ts("不给这个视频点心");
            }
            var xxxhhh = parseInt(配置.get("dxszxx", ""))
            var xihuanid=[];
                xihuanid = id(xihuan).find()
             tyu = xihuanid[1];
            var xihuanidshu = tyu.text();
            var spstr55=[];
            spstr55 = xihuanidshu.split("");
            var lll = spstr55[spstr55.length - 1]
            var wan = "w"
            var shul1 = xihuanidshu.replace(/[^\d]/g, '');
            if (shul1 > xxxhhh || lll == wan) {
                console.error("此视频喜欢" + xihuanidshu + "个多于" + xxxhhh)
                sleep(1000)
                关注粉丝1()
                if (gzsl > ui.gzsl1.text()) {
                    console.error("任务完成!!!!!!");
                    exit();
                }
                返回首页();
            } else {
                console.error("此视频喜欢"+xihuanidshu+"少于" + xxxhhh);
                ts("滑动到下一个视频");
            }
        }
    } else {
        console.warn("脚本结束，请登录后重试");
        exit();
    }
});
}
function 关注粉丝1() { //关注粉丝列表中的粉丝，可选男女
    var k = 0
    sml_move(device.width - 80+random(0, 50), device.height / 2+random(-50, 50), 0+random(30, 60), device.height / 2+random(-50, 50), 500);
    ts("打开个人主页");
    sleep(3000)
    if (text("粉丝").exists()) {
        var b = text("粉丝").findOne().bounds();
        click(b.centerX(), b.centerY());
    }
    if (textMatches("粉丝.+").exists()) {
        ts("进入粉丝列表");
    }
    sleep(100)
    log("关注粉丝中...");
    while (true) {
        sleep(2000)
        if (textMatches("粉丝.+").exists()) {
            var uc = text("关注").find();
            //    log("数量：" + uc.length);

            //目的是 获取范围
            var fs = className("android.widget.HorizontalScrollView").findOne().bounds();
            sleep(500);
            for (var i = 0; i < uc.length; i++) {
                var v = uc[i].bounds();
                // log("关注范围：" + v);
                //判断是否在 屏幕显示范围
                if (v.left > device.width / 2 && v.top > fs.bottom + 80) {
                    //click(device.width / 4, v.centerY());
                    if (uc[i].parent()) {
                        uc[i].parent().parent().parent().click();
                        sleep(parseInt(配置.get("gzjg1", "")) * 1000);
                    }
                    if (textMatches("抖音号.+").exists()) {
                        if (parseInt(配置.get("性别1", "")) == 2) {
                            if (ui.dzdygzp3.checked == true) {
                                dyzpdx() 
                            }   
                            back();
                            sleep(2000);
                            k = k + 1;
                            gzsl = gzsl + 1;
                            if (textMatches("抖音号.+").exists()) {
                                back();
                                sleep(2000);
                            }
                            uc[i].click();
                            console.error("已关注" + gzsl + "个-----------")
                            if (k >= parseInt(ui.dgzsl.text())) {
                                log("关注一波完成");
                                return;
                            }
                            sleep(parseInt(配置.get("gzjg1", "")) * 1000);
                        } else {
                            var res = 识别性别()
                            if (res == parseInt(配置.get("性别1", ""))) {
                                if (ui.dzdygzp3.checked == true) {
                                    dyzpdx() 
                                }   
                                back();
                                sleep(2000);
                                k = k + 1;
                                gzsl = gzsl + 1;
                                if (textMatches("抖音号.+").exists()) {
                                    back();
                                    sleep(2000);
                                }
                                uc[i].click();
                                console.error("已关注" + gzsl + "个-----------")
                                if (k >= parseInt(ui.dgzsl1.text())) {
                                    log("关注一波完成");
                                    return;
                                }
                                sleep(parseInt(配置.get("gzjg1", "")) * 1000);
                            }
                            else {
                                back();
                                sleep(2000);
                            };
                        };
                    }
                };
            };
            if (textMatches("粉丝.+").exists()) {
                console.info("滑动下一页");
                sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
                sleep(1000);
            }
            else if (textMatches("抖音号.+").exists()) {
                back();
                sleep(2000);
            }
        }
        else {
            log("不在粉丝页");
            break;
        };
        sleep(100);
        log("执行中");
    }
}
function urjgkrbnl() { 
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        return;
    }
    while (true) {
        sleep(2000)
        var tx = [];
            tx = id(plyhtx).find()
           var e = parseInt(tx.length - 1);
        var xin = [];
            xin = id(plxin).find()
        for (var i = 1; i < e; i++) {
            var cc = tx[i];
            var dx = xin[i];
            if (cc) {
                dltx = cc.bounds();
                pldxx = dx.bounds();             
                    sleep(1000)
                    click(dltx.centerX(), dltx.centerY());
                    sleep(2500)
                    if (ui.sp2.getSelectedItemPosition() == 2) {
                        xuzngn()
                    } else {
                        var ress1 = 评论识别性别()
                        if (ress1 == parseInt(ui.sp2.getSelectedItemPosition(), "")) {
                            xuzngn()
                        } else {
                            sleep(2000)
                            back();
                        }
                    }
                    var gzslz = parseInt(ui.shurukuang26.getText())
                    if (gzsl > gzslz) {
                        toast("关注已达到设定数量" + gzslz);
                        alert("关注已达到设定数量：" + gzslz);
                        // exit();
                    }
                    var sxslz = parseInt(ui.shurukuang27.getText())
                    if (sxsl > sxslz) {
                        toast("私信已达到设定数量" + sxslz);
                        alert("私信已达到设定数量：" + sxslz);
                        //   exit();
                    }
                sleep(1000)
            }
        }
        toast("滑动到下一页");
        sml_move(W / 2+random(-10, 80), H * 4 / 5+random(-50, 50), W / 2+random(-50, 50), H / 5+random(-50, 50), 500);
        sleep(1000)
    }
}

function 随机点心() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        return;
    }
    console.show();
    打开抖音()
    console.hide()
    threads.start(悬浮显示数1)
    sleep(1000 * random(3, 7));
    sml_move(W / 2 + random(-10, 80), H * 4 / 5 + random(-50, 50), W / 2 + random(-50, 50), H / 5 + random(-50, 50), 500);
    sleep(4000)
    while (true) {
        sleep(2000)
        var pinglun = [];
        pinglun = id(sppll).find()
        var tv2 = pinglun[1];
        var pinglunzuobiao = tv2.bounds();
        var pinglunliang = tv2.text()
        // log(pinglunliang)
        var spstr = [];
        var spstr = pinglunliang.split("");
        var lll = spstr[spstr.length - 1]
        // log(lll)
        var wan = "w"
        var shul = pinglunliang.replace(/[^\d]/g, '');
        // log(shul)
        var ppplllk = parseInt(ui.shurukuang24.getText())
        if (shul > ppplllk || lll == wan) {
            toast("此视频品论" + pinglunliang + "个多于" + ppplllk)
            sleep(2000)
            click(pinglunzuobiao.centerX(), pinglunzuobiao.centerY());
            sleep(4000)
            className("android.support.v7.widget.RecyclerView").scrollForward()
            sleep(2000)
            for (var r = 0; r < parseInt(配置.get("gg002", "")); r++) {
                var u = [];
                u = id(plwz).find();
                var e = parseInt(u.length - 1);
                var xin = [];
                xin = id(plxin).find()
                for (var i = 1; i < e; i++) {
                    var tv3 = u[i];
                    var dx = xin[i];
                    if (tv3) {
                        var tr = tv3.text();
                        // log(tr)
                        pldxx = dx.bounds();
                        // log(pldxx)
                        var num1 = tr.replace(/[^\d]/g, '');
                        // log(num1)
                        spstr = tr.split("");
                        var lgg = spstr[spstr.length - 4] + spstr[spstr.length - 2];
                        // log(lgg)
                        var fs = "刚刚"
                        spstr = tr.split("");
                        var llll = spstr[spstr.length - 6] + spstr[spstr.length - 4];
                        // log(llll)
                        var fz = "分钟"
                        // var xs = "小时"
                        var dyfzs = parseInt(配置.get("gg005", ""));
                        // log(dyfzs)
                        if (num1 <= dyfzs && llll == fz || fs == lgg) {
                            if (fs == lgg) {
                                toast("点赞刚刚评论的用户");
                            }
                            if (llll == fz) {
                                toast("点赞" + num1 + "分钟前的评论的用户");
                            }
                            // if (llll == xs) {
                            //     toast("点赞" + num1 + "小时前的评论的用户");
                            // }
                            sleep(100 * random(1, 2));
                            // click(pldxx.centerX(), pldxx.centerY());
                            // dzsl = dzsl + 1
                            // sleep(100 * random(1, 2));
                            var img1 = captureScreen();
                            //判断在该坐标的颜色是否为灰红色
                            if (images.detectsColor(img1, "#DEDCDC", pldxx.centerX(), pldxx.centerY())) {
                                click(pldxx.centerX(), pldxx.centerY());
                                dzsl = dzsl + 1                           
                            } else {
                                toast("已经是点赞过的了")
                            }
                            sleep(2500)
                            var gzslz = parseInt(配置.get("gg003", ""))
                            if (dzsl > gzslz) {
                                toast("点心已达到设定数量" + gzslz);
                                alert("点心已达到设定数量：" + gzslz);
                                exit();
                            }
                        } else {
                            toast("继续查找近期评论")
                        }
                        sleep(1000 * random(1, 2));
                    }
                }
                className("android.support.v7.widget.RecyclerView").scrollForward()
                sleep(1000)
            }
            back();
            sleep(1000 * random(2, 4));
            sml_move(W / 2 + random(-10, 80), H * 4 / 5 + random(-50, 50), W / 2 + random(-50, 50), H / 5 + random(-50, 50), 500);
            log("滑到下一个视频");
            sleep(3000)
        } else {
            toast("此视频品论" + shul + "个少于" + ppplll + "继续找热门视频评论！")
            sleep(1000)
            sml_move(W / 2 + random(-10, 80), H * 4 / 5 + random(-50, 50), W / 2 + random(-50, 50), H / 5 + random(-50, 50), 500);
            sleep(3000)
            var suiji = random(0, 5)
            var suijisx = random(0, 15)
            if (suiji == 5) {
                var t = random(10, 30)
                var d = random(10, 30)
                toast("随机点赞");
                click(W / 2 + t, H / 2 + d);
                sleep(100);
                click(W / 2 + t, H / 2 + d);
                sleep(1000);
            }
            var suijisx = random(0, 15)
            if (suijisx == 10) {
                var e = text("首页").findOne().bounds();
                var x = e.centerX()
                var y = e.centerY()
                toast("刷新视频")
                click(x, y);
            }

        }
    }
}

var zbx
var zby 
function 指定点心() {
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        return;
    }
    console.show();
    打开抖音()
    console.hide()
    threads.start(悬浮显示数1)
    var pinglun = [];
    pinglun = id(pingl).find()
    var tv2 = pinglun[1];
    var pinglunzuobiao = tv2.bounds();
    zbx =pinglunzuobiao.centerX()
    zby =pinglunzuobiao.centerY()
    log(zbx,zby/2)
    sleep(1000 * random(2, 4));
    while (true) {
        var zbx =pinglunzuobiao.centerX()
        var zby =pinglunzuobiao.centerY()
        // httpString(strurl)
        // log(strurl)
        var suiji = random(1, 3)
        if (suiji == 1) {
            id001 = 配置.get("gg006", "")
            openUsership(id001)
        }       
        if (suiji == 2) {
            id001 = 配置.get("gg007", "")
            openUsership(id001)
        }
        if (suiji == 3) {
            id001 = 配置.get("gg008", "")
            openUsership(id001)
        }
        toast("随机打开指定视频");
        sleep(6000)
        click(zbx, zby/2-50);
        sleep(4000)
        for (var r = 0; r < parseInt(配置.get("gg002", "")); r++) {
            var u = [];
            u = id(plwz).find();
            var e = parseInt(u.length - 1);
            var xin = [];
            xin = id(plxin).find()
            for (var i = 1; i < e; i++) {
                var tv3 = u[i];
                var dx = xin[i];
                if (tv3) {
                    var tr = tv3.text();
                    // log(tr)
                    pldxx = dx.bounds();
                    // log(pldxx)
                    var num1 = tr.replace(/[^\d]/g, '');
                    // log(num1)
                    spstr = tr.split("");
                    var lgg = spstr[spstr.length - 4] + spstr[spstr.length - 2];
                    // log(lgg)
                    var fs = "刚刚"
                    spstr = tr.split("");
                    var llll = spstr[spstr.length - 6] + spstr[spstr.length - 4];
                    // log(llll)
                    var fz = "分钟"
                    // var xs = "小时"
                    var dyfzs = parseInt(配置.get("gg005", ""));
                    // log(dyfzs)
                    if (num1 <= dyfzs && llll == fz || fs == lgg) {
                        if (fs == lgg) {
                            toast("点赞刚刚评论的用户");
                        }
                        if (llll == fz) {
                            toast("点赞" + num1 + "分钟前的评论的用户");
                        }
                        // if (llll == xs) {
                        //     toast("点赞"+num1+"小时前的评论的用户");
                        // } 
                        // sleep(100 * random(1, 2));
                        var img1 = captureScreen();
                        //判断在该坐标的颜色是否为灰红色
                        if (images.detectsColor(img1, "#DEDCDC", pldxx.centerX(), pldxx.centerY())) {
                            click(pldxx.centerX(), pldxx.centerY());
                            dzsl = dzsl + 1                           
                        } else {
                            toast("已经是点赞过的了")
                        }

                        var gzslz = parseInt(配置.get("gg003", ""))
                        if (dzsl > gzslz) {
                            toast("点心已达到设定数量" + gzslz);
                            alert("点心已达到设定数量：" + gzslz);
                            exit();
                        }
                    } else {
                        toast("继续查找近期评论")
                    }
                    sleep(1000 * random(1, 2));
                }
            }
            className("android.support.v7.widget.RecyclerView").scrollForward()
            sleep(1000)
        }
        back();
        sleep(1000 * random(2, 4));
        log("随机切换到下一个指定视频");
        sleep(3000)

    }
}

function 悬浮显示数1() {
    var window = floaty.window(
        <frame gravity="center">
            <text id="text" textSize="15sp" textColor="#f44336" textStyle="bold" />
        </frame>
    );
    window.exitOnClose();
    window.text.click(() => {
        window.setAdjustEnabled(!window.isAdjustEnabled());
    });
    setInterval(() => {
        //对控件的操作需要在UI线程中执行
        ui.run(function () {
            window.text.setText(dynamicText());
        });
    }, 1000);
    function dynamicText() {
        var str = "当前点赞总数：" + dzsl + "\n";
        str += "点赞总数达到：" + 配置.get("gg003", "") + "将停止点赞";
        return str;
    }
}
function openUsership(id001) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: id001,
        packageName: "com.ss.android.ugc.aweme",
    });
}
function 随机链接() {
    var face = new Array();
    face[0] = 配置.get("gg006", "")
    face[1] = 配置.get("gg007", "")
    face[2] = 配置.get("gg008", "")
    return face[random(0, face.length - 1)]
};
// var strurl= 随机链接() 
function httpString(strurl) {
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    //var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;
    //var reg=/(http(s)?\:\/\/)?(www\.)?(\w+\:\d+)?(\/\w+)+\.(swf|gif|jpg|bmp|jpeg)/gi;
    var reg= /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    //var reg= /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
    //v = v.replace(reg, "<a href='$1$2'>$1$2</a>"); //这里的reg就是上面的正则表达式
    //s = s.replace(reg, "$1$2"); //这里的reg就是上面的正则表达式
    strurl = strurl.match(reg);
    console.log(strurl)
    return(strurl)
    
}

// function qq() {
// toast("打开作者QQ主页");
// var Quin = 2770122080
// try {
//     app.startActivity({
//         action: "android.intent.action.VIEW",
//         data: "mqqapi://card/show_pslcard?&uin=" + Quin
//     });
//     toast("打开作者QQ主页");
// } catch (e) {
//     toast("Payment Error");
// }
// }

function alipay() {
    app.startActivity({      
        action: "android.intent.action.VIEW",
              data: "alipayqr://platformapi/startapp?saId=10000007&qrcode=" +
            "HTTPS://QR.ALIPAY.COM/fkx054963ocpwcywz8s6qdb"
    });
}
