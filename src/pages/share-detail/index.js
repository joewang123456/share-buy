import 'expose-loader?libraryName!./../../lib/help.js';
$(document).ready(function () {
    //登录判断
    if (!$('body').data('is-login')) {//未登录
        // 登录页
        if (help.env.isInNative) {
            ya.login(function () {
                location.reload();
            });
        } else {
            location.href = '/login?fromUri=' + encodeURIComponent(location.href);
        }
    } else {
        //活动计时器
        new help.leftTimeCacul()._start('2018/04/15,24:00:00', '离特惠结束：', document.getElementsByClassName('show-time')[0]);
    }
});