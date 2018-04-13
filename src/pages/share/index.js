import './../../css/reset.css';
import './../../css/common.scss'
import { setTimeout } from 'timers';
import $ from 'expose-loader?$!jquery';
import wx from 'expose-loader?wx!./../../lib/weixin.js';
import 'expose-loader?libraryName!./../../lib/ya.js';
import 'expose-loader?libraryName!./../../lib/help.js';

$(document).ready(function () {
    if (help.env.inweixin) {
        //生成海报截图
        setTimeout(() => {
            new help.htmlSaveToImage({}).generateCard(document.getElementsByClassName('poster-place')[0]).then((url) => {
                $('.poster-save-image')[0].src = url;
                $('.save-image-cover')[0].src = url;
                $('.overlay').show();
            });
        }, 100);
    } else {
        //分享操作
        $('.share-opt-wrap.friend').on('click', function () {
            alert();
        });
    }
});