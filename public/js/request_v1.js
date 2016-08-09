function inputCode() {
    var code = document.getElementById("code");
    var submit = document.getElementById("submit");
    var transformCode = document.getElementById("transformCode");
    var errorTip = document.getElementById("errorTip");
    var type = document.getElementsByTagName("input");
    submit.onclick = function () {
        if (code.value === "" || code.value === null) {
            errorTip.innerHTML = '请输入code！';
        } else {
            for (let exist of type) {
                if (exist.checked) {
                    ajax.judgeXmlHttpRequest('get', 'http://127.0.0.1:3000/' + exist.title + '?code=' + code.value, function (data) {
                        var Data = JSON.parse(data);
                        if (Data.success === false) {
                            errorTip.innerHTML = 'Your '+ exist.title +' not a right code！';
                            transformCode.innerHTML = '';
                        } else {
                            transformCode.innerHTML = Data.value;
                        }
                    });
                }
            }
        }
    };
    code.onclick = function () {
        errorTip.innerHTML = '';
    };
    for (let exist of type) {
        exist.onclick = function () {
            code.value = '';
            errorTip.innerHTML = '';
        }
    }
}
window.onload = function () {
    inputCode();
};
