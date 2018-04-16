// import './../../css/reset.css';
// import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';
import 'expose-loader?libraryName!./../../lib/canvas-to-blob.min.js';
// var vConsole = new VConsole();

$(document).ready(function () {
    //加载二维码图片
    var qr_url = $('#qr-image-placeholder').data('qrurl');
    var canvas = $('#qr-image-placeholder').qrcode({
        text: qr_url
    }).hide().find('canvas').get(0);
    $('#qr-image').attr('src', canvas.toDataURL('image/png'));
    $('.control').show();

    if (help.env.isInNative) {
        $('.share-banner.weixin').hide();
        $('.share-banner.native').show();
    } else {
        $('.share-banner.native').hide();
        $('.share-banner.weixin').show();
    }

    //在生成二维码之后，生成海报截图
    new help.htmlSaveToImage({ scale: 1 }).generateCard(document.getElementsByClassName('poster-place')[0]).then(function (imageUrl) {
        if (help.env.isInNative) {//在站内，分享朋友圈或微信
            $('.share-opt-wrap').on('click', function () {
                var channel = $(this).data('channel');
                ya.share({
                    channel: [channel],
                    imgUrl: imageUrl,
                    type: 'picture'
                }, function (res) {
                    if (res.ret === 0) {
                        //分享成功
                        // location.href = '';
                        xm.util.toast('分享成功!');
                    } else {
                        //分享失败
                        xm.util.toast('分享失败!');
                    }
                });
            });

        } else {//在微信里，长按截图保存
            $('.poster-save-image')[0].src = imageUrl;
            $('.save-image-cover')[0].src = imageUrl;
            $('.overlay').show();
        }
    });
});