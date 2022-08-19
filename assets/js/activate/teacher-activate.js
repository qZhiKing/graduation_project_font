   $(function() {

       var q = {
           pagenum: 1, // 页码值，默认请求第一页的数据
           pagesize: 4, // 每页显示几条数据，默认每页显示5条
           department: '所有', // 文章分类的 Id
           gender: '所有' // 文章的发布状态
       }
       initTable()

       function initTable() {

           $.ajax({
               type: 'get',
               url: '/admin/teacher/activate' + `/${q.department}` + `/${q.gender}` + `/${q.pagenum}` + `/${q.pagesize}`,
               success(res) {
                   if (res.status != 0) {
                       return layui.layer.msg(res.message)
                   }
                   var htmlStr = template('tpl-table', res)
                   $('tbody').html(htmlStr)
                   layui.form.render()
                   renderPage(res.total)
               }
           })
       }

       $("#form-search").on('submit', function(e) {
               e.preventDefault();
               var department = $('[name=department]').val();
               var gender = $('[name=gender]').val();
               q.department = department;
               q.gender = gender;
               initTable();
           })
           //分页
       function renderPage(total) {
           layui.laypage.render({
               elem: 'pageBox', // 分页容器的 Id
               count: total, // 总数据条数
               limit: q.pagesize, // 每页显示几条数据
               curr: q.pagenum, // 设置默认被选中的分页
               layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
               limits: [2, 4, 6, 8],
               // 分页发生切换的时候，触发 jump 回调
               jump: function(obj, first) {

                   // 把最新的页码值，赋值到 q 这个查询参数对象中
                   q.pagenum = obj.curr
                       // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                   q.pagesize = obj.limit
                       // 根据最新的 q 获取对应的数据列表，并渲染表格
                       // initTable()
                   if (!first) {
                       initTable()
                   }
               }
           })
       }

       $('tbody').on('click', '.btn-activate', function(e) {
           e.preventDefault()
           const userID = $(this).parent('td').siblings('.userID').html()
           layer.confirm('确定激活?', { icon: 3, title: '提示' }, function(index) {
               if (index) {
                   $.ajax({
                       type: 'post',
                       url: '/admin/activate',
                       data: {
                           userID
                       },
                       success(res) {
                           if (res.status != 0) return layui.layer.msg(res.message)
                           layui.layer.msg(res.message)
                           initTable()
                       }
                   })
               }
               layer.close(index);
           });
       })
   })