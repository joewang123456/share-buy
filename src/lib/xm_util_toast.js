!function (t) { window.xm = window.xm || {}, xm.util = xm.util || {}; var i = function (i, e) { var o = t("#mToast"), n = t.extend({ timeout: 3e3, transitionTime: 800, cls: "mtoast" }, e); o.size() > 0 && (clearTimeout(o.data("timer")), o.remove()), o = t('<div id="mToast" class="' + n.cls + '" style="position: fixed;bottom: 50px;left: 30px;right: 30px;text-align: center;"><span style="display: inline-block;box-sizing: border-box;background-color: rgba(0,0,0,.7);color: #fff;padding: 5px 8px;max-width: 100%;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">' + i + "</span></div>"), t("body").append(o), o.fadeIn(n.transitionTime), o.data("timer", setTimeout(function () { o.fadeOut(n.transitionTime, function () { o.remove() }) }, n.timeout)) }; xm.util.toast = i }($);