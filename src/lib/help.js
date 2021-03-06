; (function (window) {
    window.help = window.help || {};
    var ua = navigator.userAgent;
    //环境
    var env = {
        isInNative: (() => {
            var ua = navigator.userAgent;
            return /iting/i.test(ua);
        })(),
        isInWeixin: (() => {
            var ua = navigator.userAgent;
            return /MicroMessenger/i.test(ua);
        })(),
        isInTest: location.origin.indexOf('.test.ximalaya.com') !== -1,
    }

    if (env.isInWeixin) {
        var apiList = [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareQZone',
          'onMenuShareWeibo',
        ]
        getWxConfig(location.href, apiList)
      }

      
    function getWxConfig(authUrl, apiList) {
        var url =
          '/x-thirdparty-web/weixinJssdk/config?signatureUrl=' +
          encodeURIComponent(authUrl) +
          '&thirdpartyId=17'
        $.ajax({
          url: url,
          dataType: 'json',
          cache: false,
          success: function(result) {
            var script = document.createElement('script')
    
            result.jsApiList = apiList
            script.innerHTML = 'wx.config(' + JSON.stringify(result) + ');'
    
            document.head.appendChild(script)
          },
        })
      }

    //常量
    var constant = {
        tokenLabel: env.isInTest ? '4&_token' : '1&_token',
        mSiteOrigin: 'm' + (env.isInTest ? '.test' : '') + '.ximalaya.com',
        uploadServer: 'http://upload' + (env.isInTest ? '.test' : '') + '.ximalaya.com/dtres/picture/upload',
    }

    /**
     * 类似路由函数，根据页面的路径执行不同的回调函数
    * @param  {Regexp}   regexp   匹配页面pathname的正则
    * @param  {Function} callback 匹配当前pathname的页面js代码
    */
    var route = function (regexp, callback) {
        var path = window.location.pathname;
        if (regexp && regexp.test(path)) {
            callback();
        }
    }

    //获取cookie中名称为key的值
    function getCookie(key) {
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
        var arr = document.cookie.match(reg);
        if (!arr) {
            return null;
        }
        return arr[2];
    };

    /**************将html生成图片对象，同时将图片上传到服务器，同时通过overlay展示出来************************ */
    /**
     * 
     * @param {*} options 
     */
    var htmlSaveToImage = function (options) {
        this.options = options;
    }

    /**
     * 根据element，生成图片，并且上传
     * @param {*} element 
     */
    htmlSaveToImage.prototype.generateImageUrl = function (element) {
        return this._sequentialize([this._htmlToCanvas, this._canvasToBlob, this._uploadImage], element);
    }

    htmlSaveToImage.prototype.generateImage = function (element) {
        return this._sequentialize([this._htmlToCanvas, this._canvasToImage], element);
    }

    function scaleCanvas(canvas, width, height) {
        var w = canvas.width,
            h = canvas.height;
        if (width == undefined) {
            width = w;
        }
        if (height == undefined) {
            height = h;
        }

        var retCanvas = document.createElement('canvas');
        var retCtx = retCanvas.getContext('2d');
        retCanvas.width = width;
        retCanvas.height = height;
        retCtx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);
        return retCanvas;
    }

    function getDataURL(canvas, type, width, height) {
        canvas = scaleCanvas(canvas, width, height);
        return canvas.toDataURL(type);
    }

    htmlSaveToImage.prototype._canvasToImage = function (canvas) {
        var img = getDataURL(canvas, 'png', canvas.width, canvas.height);
        return new Promise(function (resolve, reject) {
            resolve(img);
        });
    }

    /**
     * 函数组合
     * @param {*} promiseFactories 
     * @param {*} initialParam 
     */
    htmlSaveToImage.prototype._sequentialize = function (promiseFactories, initialParam) {
        var chain = new Promise(function (resolve, reject) {
            resolve(initialParam);
        });
        var _this = this;
        return promiseFactories.reduce(function (pre, next) {
            return pre.then(next.bind(_this));
        }, chain)
    }

    /**
     * 生成element元素的canvas
     * @param {*} element 
     */
    htmlSaveToImage.prototype._htmlToCanvas = function (element) {
        return html2canvas(element, this.options);
    }

    /**
     * canvas转换成Blob
     * @param {*} canvas 
     */
    htmlSaveToImage.prototype._canvasToBlob = function (canvas) {
        return new Promise(function (resolve, reject) {
            canvas.toBlob(function (blob) {
                resolve(blob)
            })
        });
    }

    /**
     * 将blob生成图片并且上传到服务器，同时返回图片url
     * @param {*} blob 
     */
    htmlSaveToImage.prototype._uploadImage = function (blob) {
        //图片上传服务器地址
        var token = encodeURIComponent(getCookie(constant.tokenLabel))
        var formData = new FormData();
        formData.append('file', blob, 'file.png');
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: constant.uploadServer + '?token=' + token,
                type: 'POST',
                dataType: 'JSON',
                data: formData,
                processData: false,
                contentType: false,
            }).done(function (res) {
                var data;
                if (res.ret == 0) {
                    data = res.data
                    resolve(data[0].url)
                } else {
                    reject(res)
                }
            }).fail(function (xhr) {
                reject(xhr)
            })
        });
    }
    /**************结束************************************* */

    /*******************时间倒计时*************************** */
    /**
     * 时间倒计时
     */
    var leftTimeCacul = function () {
        this.timeId = 0;
    }

    //将单位数数字转换成双位数9-09
    leftTimeCacul.prototype._checkTime = function (i) {
        if (i < 10) {
            i = "0" + i;
        } return i;
    }
    //计时器
    //startTime,endTime:ms
    leftTimeCacul.prototype.startCaculate = function (startTime, endTime, tip, container) {
        var clientInitTime = new Date().getTime();
        var timeDist = endTime - startTime;
        var _this = this;
        this.timeId = setInterval(function () {
            try {
                _this._showTime.call(_this, timeDist, clientInitTime, tip, container);
            } catch (e) {
                clearInterval(this.timeId);
            };
        }, 1000);
    }

    leftTimeCacul.prototype._showTime = function (timeDist, clientInitTime, tip, container) {
        var date = parseInt(timeDist - (new Date().getTime() - clientInitTime)) / 1000; //得出的为秒数；
        if (date <= 0) {
            container.innerHTML = "倒计时已经结束";
            clearInterval(this.timeId);
            return;
        }
        if (date !== date) {
            new Throw();
        }
        var day = parseInt(date / 60 / 60 / 24);
        var hour = parseInt(date / 60 / 60 % 24);
        var minute = parseInt(date / 60 % 60);
        var second = parseInt(date % 60);
        hour = this._checkTime(hour);
        minute = this._checkTime(minute);
        second = this._checkTime(second);
        var leftTime = day + "天" + hour + "时" + minute + "分" + second + "秒";
        container.innerHTML = tip + leftTime;
    }
    /*******************结束*************************** */

    var preventDefault = function (event) {
        event = event || window.event;
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }

    help.env = env;
    help.constant = constant;
    help.route = route;
    help.htmlSaveToImage = htmlSaveToImage;
    help.leftTimeCacul = leftTimeCacul;
    help.preventDefault = preventDefault;
})(window);