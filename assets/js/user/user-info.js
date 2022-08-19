  $(() => {
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
                  if (res.data.userID.length == 11) {
                      $('[name=eb]').parents('.layui-form-item').hide()
                      layui.form.val('initUserInfo', res.data)
                  } else if (res.data.userID.length == 10) {
                      $('[name=major]').parents('.layui-form-item').hide()
                      layui.form.val('initUserInfo', res.data)
                  } else if (res.data.userID.length == 9) {
                      $('[name=eb]').parents('.layui-form-item').hide()
                      $('[name=major]').parents('.layui-form-item').hide()
                      $('[name=department]').parents('.layui-form-item').hide()
                      layui.form.val('initUserInfo', res.data)
                  }
              }
          })
      };
      $("#btnReset").on('click', function(e) {
          e.preventDefault();
          initUserInfo();
      });
      $(".layui-form").on('submit', function(e) {
          e.preventDefault();
          if ($('[name=userID]').val().length == 11) {
              data = {
                  id: $('[name=id]').val(),
                  userID: $('[name=userID]').val(),
                  username: $('[name=username').val(),
                  department: $('[name=department]').val(),
                  major: $('[name=major]').val(),
                  email: $('[name=email]').val(),
                  gender: $('[name=gender]').val()
              }
              update(data)
          } else if ($('[name=userID]').val().length == 10) {
              data = {
                  id: $('[name=id]').val(),
                  userID: $('[name=userID]').val(),
                  username: $('[name=username').val(),
                  department: $('[name=department]').val(),
                  eb: $('[name=eb]').val(),
                  email: $('[name=email]').val(),
                  gender: $('[name=gender]').val()
              }
              update(data)
          } else if ($('[name=userID]').val().length == 9) {
              data = {
                  id: $('[name=id]').val(),
                  userID: $('[name=userID]').val(),
                  username: $('[name=username').val(),
                  email: $('[name=email]').val(),
                  gender: $('[name=gender]').val()
              }
              update(data)
          }

          function update(data) {
              $.ajax({
                  type: 'post',
                  url: '/my/userinfo',
                  data: data,
                  success(res) {
                      if (res.status !== 0) {
                          return layui.layer.msg(res.message)
                      }
                      initUserInfo();
                      layui.layer.msg(res.message)
                      window.parent.getUserInfo();
                  }
              })
          }
      })
  })