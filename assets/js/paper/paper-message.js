  $(() => {
      layui.form.verify({
          userID(value) {
              if (value.length >= 8 && value.length <= 11) {
                  return '登录号必须是8-11位'
              }
          }
      });
      initUserInfo();

      function initUserInfo() {
          $.ajax({
              type: 'get',
              url: '/my/userinfo',
              success(res) {
                  //   console.log(res.data);
                  if (res.status !== 0) {
                      return layui.layer.msg(res.massage)
                  }
                  layui.form.val('initUserInfo', res.data)
              }
          })
      };
      $("#btnReset").on('click', function(e) {
          e.preventDefault();
          initUserInfo();
      });
      $(".layui-form").on('submit', function(e) {
          e.preventDefault();
          //   console.log($(this).serialize());
          $.ajax({
              type: 'post',
              url: '/my/userinfo',
              data: $(this).serialize(),
              success(res) {
                  if (res.status !== 0) {
                      return layui.layer.msg(res.message)
                  }
                  initUserInfo();
                  layui.layer.msg(res.message)
                  window.parent.getUserInfo();
              }
          })
      })
  })