var host = 'http://10.4.52.32:8000';

$(function () {
    FastClick.attach(document.body);
});

$("#uploaderInput").change(function () {
    console.log($(this));
    // alert('ok');
})

$(document).on("click", "#imageType", function () {
    $.actions({
        title: "选择操作",
        onClose: function () {
            console.log("close");
        },
        actions: [{
                text: "拍照",
                className: "color-primary",
                onClick: function () {
                    $.alert("打开相机")
                }
            },
            {
                text: "从本地相册中选取",
                className: "color-warning",
                onClick: function () {
                    setTimeout(function () {
                        // $("#uploaderInput").trigger("click");
                        $("#uploader-1").click();
                    }, 200);
                }
            }
        ]
    });
});

new Uploader({
    trigger: '#uploader-1',
    action: host ? host + '/upload' : '/upload',
    data: {
        "type": "file"
    },
    progress: function (progressObj) {
        // console.log('loaded', progressObj.loaded);
        // console.log('loaded', progressObj.total);
        console.log('progress', arguments[3]);
    }
}).success(function (data) {
    alert(JSON.stringify(data));
});
