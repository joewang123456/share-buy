// import './../../css/reset.css';
// import './../../css/common.scss';
import 'expose-loader?libraryName!./../../lib/help.js';
$(document).ready(function () {
    //海报加载完成后开始截图海报，否则截取不完整
    $('.poster-image').load(function () {
        //生成二维码
        var qr_url = $('#qr-image').data('qrurl');
        var canvas = $('#qr-image-placeholder').qrcode({
            text: qr_url
        }).hide().find('canvas').get(0);
        $('#qr-image').attr('src', canvas.toDataURL('image/jpg'));
        $('.control').show();

        //在生成二维码之后，生成海报截图
        var promise = new help.htmlSaveToImage({}).generateCard(document.getElementsByClassName('poster-place')[0]);
        promise.then(function (imageUrl) {
            if (help.env.inweixin) {//在微信里，截图保存
                $('.poster-save-image')[0].src = imageUrl;
                $('.save-image-cover')[0].src = imageUrl;
                $('.overlay').show();
            } else {//在站内，分享朋友圈或微信
                $('.share-opt-wrap').on('click', function () {
                    var channel = $(this).data('channel');
                    ya.share({
                        channel: [channel],
                        imgUrl: imageUrl
                    }, function (res) {
                        if (res.ret === 0) {
                            //分享成功
                            location.href = '';
                        } else {
                            //分享失败
                            xm.util.toast('分享失败!');
                        }
                    });
                });
            }
        });
    });
});