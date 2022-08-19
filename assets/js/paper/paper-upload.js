$(() => {
    $("#updatePaper").on('click', function(e) {
        e.preventDefault();
        var fileObj = document.querySelector('#file').files[0]
        var form = new FormData();
        form.append('file', fileObj);
        if (!fileObj) return layui.layer.msg('请选择文件')
        updatePaper(form, 'paperupload')
    })
    $('#changePaper').on('click', function(e) {
        e.preventDefault();
        var fileObj = document.querySelector('#file').files[0]
        var form = new FormData();
        form.append('file', fileObj);
        if (!fileObj) return layui.layer.msg('请选择文件')
        updatePaper(form, 'paperchange')

    })

    function updatePaper(data, choice) {
        $.ajax({
            type: 'post',
            url: '/article/student/' + choice,
            data,
            contentType: false,
            processData: false,
            success(res) {
                console.log(res);
                if (res.status != 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
            }
        })
    }
})