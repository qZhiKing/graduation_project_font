$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $('#btnChooseImage').on('click', function() {
        $('#file').click()
    });
    var reader;
    $("#file").on("change", function(e) {

        var files = e.target.files;
        if (files.length == 0) {
            return layui.layer.msg('请选择图片');
        }
        var file = files[0];
        var imgURL = URL.createObjectURL(file);
        //另一种方法将图片
        // var reader = new FileReader();
        // reader.readAsDataURL(file);
        // reader.onload = function() {
        //     $image.cropper('destroy').attr('src', reader.result).cropper(options);

        // };
        $image.cropper('destroy').attr('src', imgURL).cropper(options);
    });
    $("#btnSure").on('click', function() {
        var dataURL = $image.cropper('getCroppedCanvas', {
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        // console.log(dataURL);
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success(res) {
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                window.parent.getUserInfo()

            }
        })
    })

})