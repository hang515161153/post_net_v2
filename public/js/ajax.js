/**********************************封装一个ajax来进行前后交互*******************************************/
var ajax = {
    createXmlHttpRequest: function () {
        var xhr = null;
        try {
            xhr = new XMLHttpRequest();
        } catch (e) {
            try {
                xhr = new ActiveXObject("Msxm12.XMLHTTP");
            } catch (e) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        return xhr;
    },
    /*
     method:get/post
     url:后台地址
     callback:回调函数
     dataPost:数据：post:{"":"","":""}/get:?name='ys'&&age=12
     */
    judgeXmlHttpRequest: function (method, url, callback, dataPost) {
        var xhr = this.createXmlHttpRequest();
        if (xhr) {
            var resData = undefined;
            xhr.open(method, url, true);
            if (method === 'post') {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(dataPost);
            } else {

                xhr.send(null);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resData = xhr.responseText;
                    callback(resData);
                }
            }
        }
    }
};