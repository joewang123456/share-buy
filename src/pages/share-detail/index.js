import './../../css/reset.css';
import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';
$(document).ready(function () {
    //活动计时器
    new help.leftTimeCacul()._start('2018/04/24,24:00:00', '离特惠结束：', document.getElementsByClassName('show-time')[0]);
    $('.opt-button').on('click', function (event) {
        var opt = $(this).data('opt');
        if (opt === 'buy') {//购买
            //站内判断登录，登陆后在跳转购买页
            if (help.env.isInNative) {
                //阻止默认跳转
                help.preventDefault(event);
                if (!$('body').data('is-login')) {//未登录
                    ya.login(function () {
                        location.reload();
                    });
                } else {//已经登录，直接购买
                    location.href = '/viplistenday/vip/pay';
                }
            } else {//站外直接跳转到购买，登录校验服务端处理
                location.href = '/viplistenday/vip/pay';
            }
        }
    });
});