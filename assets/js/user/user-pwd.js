$(() => {
    //验证密码的格式
    layui.form.verify({
        pwd: [
            /^[0-9a-zA-Z-_.?]{6,18}/, '请输入6-18位字符的密码'
        ],
        samePwd: function(value) {
            if (value == $("#oldPwd").val()) {
                return "新密码不能和旧密码相同!"
            }
        },
        repwd: function(value) {
            console.log($('#newPwd').val());
            console.log(value);
            //判断两个密码框的value值是否一样
            if ($('#newPwd').val() != value) {
                return '两个密码不一样'
            }
        }
    });
    //提交表单发送Ajax请求
    $('.layui-form').on('submit', function(e) {
        e.preventDefault();
        // var data = {
        //     oldPwd: $("#oldPwd").val(),
        //     newPwd: $("#newPwd").val()
        // };
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message);
                //密码修改成功后清空input框
                // $("#btnReset").click();
                //箭头函数中的this指向箭头函数外部环境，reset是DOM元素的方法先要将JQ元素转换成DOM元素
                $(this)[0].reset();
                window.parent.location.href = '/login.html'
            }
        })
    })
})