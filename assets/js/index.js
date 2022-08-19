 $(function() {
     getUserInfo();
     //封装函数 获取用户的信息

     //实现退出功能
     $("#quit").on('click', function() {
         layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function(index) {
             console.log(index);
             if (index == 1) {
                 location.href = ('/login.html')
                 localStorage.removeItem('token');
             }
             layer.close(index)
         });
     })
 })

 function getUserInfo() {
     $.ajax({
         type: 'get',
         url: '/my/userinfo',
         success(res) {
             //  console.log(res);
             if (res.status != 0) return layui.layer.msg(res.message);
             //调用函数来渲染头像和欢迎文字信息，传入data数据
             renderAvatar(res.data)
         }
     })
 }
 //封装函数用来渲染头像
 function renderAvatar(data) {
     var name = data.username || data.userID;
     $("#welcome").html(`欢迎 ${name}`);
     if (data.user_pic != null) {
         //如果通过ajax请求返回的信息中用户的头像不为null，就设置为默认的头像，让文本头像隐藏
         $(".layui-nav-img").prop("src", data.user_pic).show();
         $(".text-avatar").hide()
     } else {
         //返回的信息为空，就让文本头像显示，
         $(".layui-nav-img").hide();
         //设置文本头像内容为用户名的第一字母并且大写
         var text = name[0].toUpperCase()
         $(".text-avatar").html(text).show();
     }
 }