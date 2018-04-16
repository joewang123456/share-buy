// import './../../css/reset.css';
// import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';
$(document).ready(function () {

    //活动计时器
    new help.leftTimeCacul()._start('2018/04/24,24:00:00', '离特惠结束：', document.getElementsByClassName('show-time')[0]);

    $('.opt-button').on('click', function (e) {
        var opt = $(this).data('opt');
        if (opt === 'buy') {
            //登录判断
            if (!$('body').data('is-login')) {//未登录
                //未登录情况下，禁止跳转到支付页
                e = e || window.event;
                if (e && e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }
                // 登录页
                if (help.env.isInNative) {//native
                    ya.login(function () {
                        location.reload();
                    });
                } else {//微信内
                    location.href = '/login?fromUri=' + encodeURIComponent(location.href);
                }
            } else {//已经登录
                $.ajax({
                    url: '/viplistenday/vip/buy/url',
                    type: 'get',
                    success: function (data) {//
                        //获取url
                        var url = data.url;
                        location.href = url;
                    },
                    error: function () {

                    }
                });
            }
        }
    });
});