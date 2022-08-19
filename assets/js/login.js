$(function() {
    $('.goRegBox').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('.goLoginBox').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })
    var form = layui.form;
    form.verify({
        pwd: [
            /^[\Sa-z0-9_-]{6,18}$/, '密码必须6到18位，且不能出现空格'
        ],
        repwd: function(value) {
            console.log(value);
            var pwd = $('.reg-box [name=password]').val();
            if (pwd !== value)
                return '两次密码不一样'
        }
    });
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $(".reg-box [name=username]").val(),
            password: $(".reg-box [name=password]").val()
        };
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data,
            success(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                $('.goLoginBox').click();
            }
        })
    });
    $("#form_login").on('submit', function(e) {
        e.preventDefault();
        var data = $(this).serialize();
        // console.log(data);
        $.ajax({
            type: 'post',
            url: "/api/login",
            data,
            success(res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })


})