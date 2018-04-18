import './../../css/reset.css';
import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';
// var vConsole = new VConsole();
//图片完全加载成功后，再执行逻辑
window.onload = function () {
    //一开始通过一个假的二维码图片站位，待真的二维码渲染完成了，再替换。
    var qr_url = $('#qr-image-placeholder').data('qrurl');
    var canvas = $('#qr-image-placeholder').qrcode({
        text: qr_url
    }).hide().find('canvas').get(0);
    $('#qr-image').attr('src', canvas.toDataURL('image/png'));
    $('.control').show();

    //站内
    if (help.env.isInNative) {
        var promise = new help.htmlSaveToImage({
            useCORS: true,
            scale: 2
        }).generateImageUrl(document.getElementsByClassName('poster-place')[0]);

        $('.share-opt-wrap').on('click', function () {
            var channel = $(this).data('channel');
            //加载html5 loading
            $('.html5-loading').show();
            promise.then(function (imageUrl) {
                //隐藏html5 loading
                $('.html5-loading').hide();
                ya.share({
                    channel: [channel],
                    imgUrl: imageUrl,
                    type: 'picture'
                }, function (res) {
                    if (res.ret === 0) {
                        //分享成功
                        location.href = '/viplistenday/share/poster/success';
                    } else {
                        //分享失败
                        xm.util.toast('分享失败!');
                    }
                });
            });
        });
    }
    //站外
    if (!help.env.isInNative) {
        $('.overlay').show();
        var promise = new help.htmlSaveToImage({
            useCORS: true,
            scale: 2
        }).generateImage(document.getElementsByClassName('poster-place')[0]);
        promise.then(function (imageUrl) {
            $('.save-image-cover')[0].src = imageUrl;
        });
    }
};