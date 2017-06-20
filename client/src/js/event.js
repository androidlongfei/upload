// var host = 'http://localhost:8000';
var host = 'http://192.168.0.107:8000';

// var host = null;

new Uploader({
  trigger: '#uploader-1',
  action: host ? host + '/upload' : '/upload',
  data: {
    "type": "file"
  },
  progress: function(progressObj) {
    // console.log('loaded', progressObj.loaded);
    // console.log('loaded', progressObj.total);
    console.log('progress', arguments[3]);
  }
}).success(function(data) {
  alert(JSON.stringify(data));
});

var uploader = new Uploader({
  trigger: '#uploader-2',
  action: host ? host + '/upload' : '/upload',
}).change(function(filename) {
  $('#upload-2-text').text(filename);
}).success(function(data) {
  alert(JSON.stringify(data));
});
$('#submit-2').click(function() {
  uploader.submit();
  return false;
});

new Uploader({
  trigger: '#uploader-3',
  accept: 'image/*',
  action: host ? host + '/upload' : '/upload',
}).success(function(data) {
  alert(data);
});

var uploaderCanBeDisabled = new Uploader({
  trigger: '#uploader-4',
  action: host ? host + '/upload' : '/upload',
}).change(function(filename) {
  $('#upload-4-text').text(filename);
}).success(function(data) {
  alert(data);
});
$('#disable').click(function() {
  var txt = $(this).html();
  uploaderCanBeDisabled[txt === 'Disable' ? 'disable' : 'enable']();
  $(this).html(txt === 'Disable' ? 'Enable' : 'Disable');
  return false;
});

$('#submit-4').click(function() {
  uploaderCanBeDisabled.submit();
  return false;
});

$('#postJson').click(function() {
  var test = {};
  test.name = '张三';
  test.age = 20;
  test.sex = '女';
  jqueryPostObjParam({
    url: host ? host + '/testPost' : '/testPost',
    data: test,
    successCallback: function(sucessData) {
      console.log('sucessData', sucessData);
      alert('success', JSON.stringify(sucessData));
    },
    errorCallback: function(errorData) {
      console.log('errorData', errorData);
      alert('success', JSON.stringify(errorData));
    }
  });
});

$('#test').click(function() {
  jqueryPostObjParam({
    url: host ? host + '/test' : '/test',
    data: {
      test: 'hello,world'
    },
    successCallback: function(sucessData) {
      console.log('sucessData', sucessData);
      alert('success', JSON.stringify(sucessData));
    },
    errorCallback: function(errorData) {
      console.log('errorData', errorData);
      alert('failed', JSON.stringify(errorData));
    }
  });
});

//选择文件之后直接上传
function onselectimage() {
  var xmlHttpReq = null;
  //IE浏览器使用ActiveX
  if (window.ActiveXObject) {
    xmlHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
  }
  //其它浏览器使用window的子对象XMLHttpRequest
  else if (window.XMLHttpRequest) {
    xmlHttpReq = new XMLHttpRequest();
  }
  var filenode = document.getElementById("file");


  if (xmlHttpReq !== null) {
    //设置回调，当请求的状态发生变化时，就会被调用
    xmlHttpReq.onreadystatechange = function() {
      //等待上传结果
      if (xmlHttpReq.readyState == 1) {
        // filenode.parentNode.style.backgroundImage = "url('/images/bigloader.gif')";
      }
      //上传成功，返回的文件名，设置到div的背景中
      if (xmlHttpReq.readyState == 4 && xmlHttpReq.status == 200) {
        // filenode.parentNode.style.backgroundImage = "url('/upload/" + xmlHttpReq.responseText + "')";
        alert('success');
      }
    }
    //构造form数据
    var form = new FormData();
    form.append("file", filenode.files[0]);

    var url = host ? host + '/upload' : '/upload';

    //设置请求（没有真正打开），true：表示异步
    xmlHttpReq.open("POST", url, true);
    //不要缓存
    //xmlHttpReq.setRequestHeader("If-Modified-Since", "0");
    //提交请求
    xmlHttpReq.send(form);
    //清除掉，否则下一次选择同样的文件就进入不到onchange函数中了
    filenode.value = null;
  }
}

const ss = 122;

console.log(`${ss}`);
