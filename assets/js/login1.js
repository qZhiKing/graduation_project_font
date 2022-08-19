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
        userID: [
            /^[\S0-9]{9,11}$/, '学号/教职号/管理员号格式不正确'
        ],
        pwd: [
            /^[\Sa-z0-9]{6,18}$/, '密码必须6到18位只能有数字字母，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('#form-updatePwd [name=newPwd]').val();
            if (pwd !== value)
                return '两次密码不一样'
        },
        repwd2: function(value) {
            var pwd = $('#form_reg [name=password]').val();
            if (pwd !== value)
                return '两次密码不一样'
        }
    });
    $('.forgetPwd').on('click', () => {
        var indexAdd = null;
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '340px'],
            title: '找回密码',
            content: $('#updatePwd').html()
        })
        $("#form-updatePwd").on('submit', (e) => {
            console.log(1);
            e.preventDefault()
            var data = {
                userID: $('#form-updatePwd [name=userID]').val(),
                newPwd: $('#form-updatePwd [name=newPwd').val(),
                email: $('#form-updatePwd [name=email').val()
            }
            $.ajax({
                type: 'post',
                url: '/api/forgetpwd',
                data,
                success(res) {
                    if (res.status != 0) return layer.msg(res.message);
                    layer.close(indexAdd)
                    layer.msg(res.message);
                }
            })
        })
    })
    var layer = layui.layer;
    $("#form_reg").on('submit', function(e) {
        e.preventDefault();
        var data = {
            userID: $(".reg-box [name=userID]").val(),
            password: $(".reg-box [name=password]").val(),
            email: $(".reg-box [name=email]").val()
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
        var data = {
            userID: $(".login-box [name=userID]").val(),
            password: $(".login-box [name=password]").val()
        };
        $.ajax({
            type: 'post',
            url: "/api/login",
            data,
            success(res) {
                if (res.status != 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.tokenStr)
                if (data.userID.length == 9) {
                    location.href = '/indexAdmin.html'
                } else if (data.userID.length == 11) {
                    location.href = '/indexStudent.html'
                } else if (data.userID.length == 10) {
                    location.href = '/indexTeacher.html'
                }
            }
        })
    })


})