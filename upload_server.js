var express = require('express');
var app = express();
var fs = require('fs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var cors = require('cors');
var formidable = require('formidable');
var multiparty = require('multiparty');
var _ = require('lodash')

app.use(cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
  extended: true
})); // for parsing application/x-www-form-urlencoded


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

app.post('/test', function(req, res) {

  console.log('/test')
  res.json({
    'ok': 'ok'
  });
});

app.post('/testPost', function(req, res) {
  console.log('testPost body data', req.body);
  res.json(req.body);
});

app.get('/upload', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'upload.html'));
});

app.post('/upload', function(req, res) {

  // console.log('req.headers', req.headers);

  var form = new formidable.IncomingForm();
  var uploadDir = path.join(__dirname, 'public', 'download');
  console.log('uploadDir', uploadDir);
  form.uploadDir = uploadDir;
  form.parse(req, function(err, fields, files) {
    console.log('fields', fields); //表单传递的input数据
    console.log('files', files); //上传文件数据
    _.each(files, function(file) {
      console.log('path', file.path);
      console.log('name', file.name);
      var oldname = file.path;
      var newname = file.name === 'blob' ? oldname + '.xml' : oldname + "." + file.name.split('.')[1];
      fs.renameSync(oldname, newname, function(err) {
        if (err) console.log(err);
        console.log('修改成功');
      });
    });
    res.json({
      'status': 'ok'
    });
  });
});


console.log('View demo at http://localhost:8000/demo.html');

app.listen(8000);
