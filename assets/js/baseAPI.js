$(function() {
    $.ajaxPrefilter(function(options) {
        // console.log(options);
        options.url = "http://127.0.0.1" + options.url;

        if (options.url.includes('/my/') || options.url.includes('/article/') || options.url.includes('/admin/')) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        };

        options.complete = function(res) {
            if (res.responseJSON.status == 1 && res.responseJSON.message == '错误的token') {
                localStorage.removeItem('错误的token');
                location.href = '/login.html';
            };
        }
    });


})