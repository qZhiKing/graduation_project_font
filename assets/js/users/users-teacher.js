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
            url: '/admin/userall' + `/${q.department}` + `/${q.gender}` + `/${q.pagenum}` + `/${q.pagesize}`,
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
    // 编辑
    $('tbody').on('click', '.btn-edit', function(e) {
        e.preventDefault()
        const userID = $(this).parent('td').siblings('.userID').html()
            // console.log($(this).parent('td').siblings('.userID').html());
        var indexAdd = null;
        indexAdd = layui.layer.open({
            type: 1,
            area: ['500px', '480px'],
            title: '修改成绩',
            content: $('#updateMessage').html()
        })
        getStudent(userID)
        $('#update').on('submit', function(e) {
            e.preventDefault()
            const data = {
                userID: $('[name=userID]').val(),
                username: $('[name=username]').val(),
                department: $('.layui-input-block [name=department]').val(),
                gender: $('.layui-input-block [name=gender]').val(),
                eb: $('[name=eb]').val(),
                email: $('[name=email]').val(),
            }
            $.ajax({
                type: 'post',
                url: '/my/userinfo',
                data,
                success(res) {
                    if (res.status != 0) {
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    layui.layer.close(indexAdd)
                    initTable()
                }
            })
        })
        $("#btnReset").on('click', function(e) {
            e.preventDefault();
            getStudent(userID);
        });

        function getStudent(userID) {
            $.ajax({
                type: 'get',
                url: '/admin/message/' + userID,
                success(res) {
                    if (res.status != 0) return layui.layer.msg(res.message)
                    layui.form.val('form-edit', res.data)
                }
            })
        }
    })


    //删除
    $('tbody').on('click', '.btn-delete', function(e) {
        e.preventDefault()
        const userID = $(this).parent('td').siblings('.userID').html()
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function(index) {
            if (index) {
                $.ajax({
                    type: 'post',
                    url: '/admin/delete',
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

    layui.form.verify({
        score(value) {
            var val = parseInt(value)
            if (val < 0 || val > 100) {
                return '成绩必须0-100之间'
            }
        },
        userID: [
            /^[\S0-9]{10}$/, '教职工号格式不正确'
        ],
    });
})