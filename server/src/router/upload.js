// 上传文件路由

import _ from 'lodash';
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');

module.exports = function(app) {
    app.post('/upload', function (req, res) {
        // console.log('req.headers', req.headers);
        console.log('__dirname', __dirname)
        var form = new formidable.IncomingForm();
        var uploadDir = app.get('uploadDir');
        console.log('uploadDir', uploadDir);
        form.uploadDir = uploadDir;
        form.parse(req, function (err, fields, files) {
            if (err) {

            }
            console.log('fields', fields); // 表单传递的input数据
            console.log('files', files); // 上传文件数据
            _.each(files, function (file) {
                console.log('path', file.path);
                console.log('name', file.name);
                var oldname = file.path;
                var newname = oldname + '_' + file.name;
                fs.renameSync(oldname, newname, function (err) {
                    if (err) console.log(err);
                    console.log('修改成功');
                });
            });
            res.json({
                'status': 'ok'
            });
        });
    });
}
