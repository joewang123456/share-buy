import './../../css/reset.css';
import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';
// var vConsole = new VConsole();
//图片完全加载成功后，再执行逻辑

xmLog('pv.create', {
    item: '分享赚钱海报页',
});

window.onload = function () {
    //获取缓存图片
    var cacheImgUrl = $('.poster-image').data('cache-image');
    if(cacheImgUrl){//存在缓存图片
        if (help.env.isInNative) {//在站内
            //隐藏分享按钮
            ya.onShare(false);
            $('.share-opt-wrap').on('click', function () {
                var channel = $(this).data('channel');
                ya.share({
                    channel: [channel],
                    imgUrl: cacheImgUrl,
                    type: 'picture'
                }, function (res) {
                    if (res.ret === 0) {
                        //分享成功埋点
                        xmLog('pv.send','event',{
                            srcModule: '备用方案',
                            serviceId: 'share',
                            item: '423活动页',
                            shareType: channel
                        });
                        //分享成功
                        location.href = '/viplistenday/share/poster/success';
                    } else {
                        //分享失败
                        xm.util.toast('分享失败!');
                    }
                });

                xmLog('pv.send','event',{
                    srcPage: '423活动页',
                    srcModule: '分享赚钱海报',
                    serviceId: 'activityPageClick',
                    item: 'button',
                    itemId: channel,
                    siteType: 'onPage',
                    srcPageId: location.href,
                });
            });
        }else{//在站外
            $('.save-image-cover')[0].src = cacheImgUrl;
        }
    }else{
        //一开始通过一个假的二维码图片站位，待真的二维码渲染完成了，再替换。
        var qr_url = $('#qr-image-placeholder').data('qrurl');
        var canvas = $('#qr-image-placeholder').qrcode({
            text: qr_url
        }).hide().find('canvas').get(0);
        $('#qr-image').attr('src', canvas.toDataURL('image/png'));
        $('.control').show();

        //站内
        if (help.env.isInNative) {
            //隐藏分享按钮
            ya.onShare(false);
            var promise = new help.htmlSaveToImage({
                useCORS: true,
                scale: 2,
                backgroundColor:'#482318',
                scrollX:0,
                scrollY:0
            }).generateImageUrl(document.getElementsByClassName('poster-place')[0]);

            $('.share-opt-wrap').on('click', function () {
                var channel = $(this).data('channel');
                //加载html5 loading
                $('.html5-loading').show();
                promise.then(function (imageUrl) {
                    //隐藏html5 loading
                    $('.html5-loading').hide();
                    //分享操作
                    ya.share({
                        channel: [channel],
                        imgUrl: imageUrl,
                        type: 'picture'
                    }, function (res) {
                        if (res.ret === 0) {
                            //分享成功埋点
                            xmLog('pv.send','event',{
                                srcModule: '备用方案',
                                serviceId: 'share',
                                item: '423活动页',
                                shareType: channel
                            });
                            //分享成功
                            location.href = '/viplistenday/share/poster/success';
                        } else {
                            //分享失败
                            xm.util.toast('分享失败!');
                        }
                    });
                    //上传图片到缓存服务器中
                    $.ajax({
                        url:'/viplistenday/poster/cache',
                        type:'post',
                        dataType: 'JSON',
                        data:{posterUrl:imageUrl},
                        success:function(data){
                            //上传到服务器成功
                            if(data.status === 200){
                                console.log(data);
                            }else{
                                //上传失败
                                console.log(data);
                            }
                        },
                        error:function(err){
                            console.log(err);
                        }
                    });
                }).catch(function(err){
                    $('.html5-loading').hide();
                    var msg = '分享图片上传失败!';
                    if(typeof err === 'object' && err.msg){
                        var msg = err.msg;
                    }
                    xm.util.toast(msg);
                });

                xmLog('pv.send','event',{
                    srcPage: '423活动页',
                    srcModule: '分享赚钱海报',
                    serviceId: 'activityPageClick',
                    item: 'button',
                    itemId: channel,
                    siteType: 'onPage',
                    srcPageId: location.href,
                });
            });
        }else{//站外
            var promise = new help.htmlSaveToImage({
                useCORS: true,
                scale: 2,
                backgroundColor:'#482318',
                scrollX:0,
                scrollY:0
            }).generateImage(document.getElementsByClassName('poster-place')[0]);
            promise.then(function (imageUrl) {
                $('.save-image-cover')[0].src = imageUrl;
            });
        }
    }
    
    //微信内分享
    if (help.env.isInWeixin) {
        var shareData = window._shareData;
        wx.ready(function() {
        wx.onMenuShareAppMessage(shareData)
        wx.onMenuShareTimeline(shareData)
        wx.onMenuShareQQ(shareData)
        wx.onMenuShareQZone(shareData)
        wx.onMenuShareWeibo(shareData)
        });
    }
};