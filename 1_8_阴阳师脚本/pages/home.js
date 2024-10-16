<frame>
    <vertical>
        {/* 脚本公告配置区域 */}
        <card cardCornerRadius='15dp' margin='10dp' cardElevation='15dp' padding='5dp'>
            <vertical>
                <text gravity='center' text='{{o_pagesJson.style.notice.title}}' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{o_pagesJson.style.background}}'></text>
                <text padding='8dp' text='{{o_pagesJson.style.notice.content}}'></text>
            </vertical>
        </card>
        {/* 脚本功能UI配置区域 */}
        <card cardCornerRadius='15dp' margin='10 0 10 10' cardElevation='15dp' padding='5dp'>
            <vertical>
                <text gravity='center' text='脚本功能' w='*' h='auto' textSize='18sp' textColor='#ffffff' padding='10dp' bg='{{o_pagesJson.style.background}}'></text>
                <vertical padding='8dp'>
                    <horizontal>
                        <text text='分辨率：'></text>
                        <spinner w='*' id='bh_fenbianlv' entries='1920*1080|1280*720'></spinner>
                    </horizontal>
                    <horizontal>
                        <text text='任务：'></text>
                        <spinner w='*' id='bh_renwu' entries='斗技(斗技界面运行)|妖气(自行在游戏选择要刷的式神)|御魂(1-10层)'></spinner>
                    </horizontal>
                    <horizontal>
                        <text text='代肝次数：'></text>
                        <input inputType='number' w='*' hint='单位/次' id='bh_num'></input>
                    </horizontal>
                    <horizontal>
                        <text text='全局延迟：'></text>
                        <input inputType='number' w='*' hint='单位/秒' id='bh_delay'></input>
                    </horizontal>
                </vertical>
            </vertical>
        </card>
    </vertical>
</frame>


