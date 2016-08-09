'use strict';
window.onload = function (b) {
    $("#submit").click(function () {
        if ($('#code').val() === '' || $('#code').val() === null) {
            $("#errorTip").text('请输入code！');
        } else {
            $('input[type=radio]').each(function () {
                if ($(this).is(":checked")) {
                    $.get("/" + this.title, {code: $('#code').val()})
                        .done(function (data) {
                            console.log(arguments);
                            responseData(data);
                        })
                }
            })
        }
    });

    $("#code").click(function () {
        $("#errorTip").text('');
        $("#transformCode").text('');
    });
    $('input[type=radio]').each(function () {
        $(this).click(function () {
            $("#errorTip").text('');
            $("#code").val("");
            $("#transformCode").text('');
        })
    });

    function responseData(data) {
        let code = $('#code').val();
        if (data.success === false) {
            $("#errorTip").text('your code not right!');
        } else {
            $("#transformCode").text(data.value);
            insterElement(code, data.value);
        }
    }

    function insterElement(code, transformCode) {
        const historyLi =   $('.historyUl li:eq(2)');
        $('#historyUl').append('<li>' + code + '</li><li>' + transformCode + '</li>');
        if ($('.historyUl li').length > 8) {
            historyLi.remove();
            historyLi.remove();
        }
    }
    let obj= {
        a: 123,
        b: 234,
        c:function b() {
            return 1;
        }
    };
        alert(obj.c);

};