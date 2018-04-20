import './../../css/reset.css';
import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';

xmLog('pv.create', {
    item: '分享赚钱海报页（站外打开）',
});

$(document).ready(function () {
    //活动计时器
    var statrTime = ($('.show-time').data('start') - 0);
    var endTime = ($('.show-time').data('end') - 0);
    new help.leftTimeCacul().startCaculate(statrTime, endTime, '离特惠结束：', document.getElementsByClassName('show-time')[0]);
    $('.opt-button').on('click', function (event) {
        var opt = $(this).data('opt');
        if (opt === 'buy') {//购买
            //站内判断登录，登陆后在跳转购买页
            if (help.env.isInNative) {
                //阻止默认跳转
                event.preventDefault();
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

    //分享海报站外打开
    if(!help.env.isInNative){
        xmLog('pv.send','event',{
            serviceId: 'activityView',
            item: '423活动页',
            itemId: location.href,
            siteType: 'offPage',
        });

        //分享赚钱海报页（站外）-点击底部按钮
        $('.opt-button').on('click',function(){
            var opt = $(this).data('opt');
            //站外埋点
            xmLog('pv.send','event',{
                srcPage: '423活动页',
                srcModule: '分享赚钱海报',
                serviceId: 'activityPageClick',
                item: 'button',
                itemId: opt==='buy'?'立即购买':'查看会员特权',
                siteType: 'offPage',
                srcPageId: location.href,
            });
        });
    }
});