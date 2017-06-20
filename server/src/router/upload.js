// 上传文件路由
import _ from 'lodash';
var formidable = require('formidable');
var path = require('path');
var fs = require('fs');
const async = require('async');

module.exports = function (app) {
    app.post('/upload', function (req, res) {
        // console.log('req.headers', req.headers);
        async.waterfall([
            function (cb) {
                console.log('__dirname', __dirname)
                var form = new formidable.IncomingForm();
                var uploadDir = app.get('uploadDir');
                console.log('uploadDir', uploadDir);
                form.uploadDir = uploadDir;
                form.parse(req, function (err, fields, files) {
                    if (err) {

                    }
                    // console.log('fields', fields); // 表单传递的input数据
                    // console.log('files', files); // 上传文件数据
                    let resImgs = []
                    _.each(files, function (file) {
                        console.log('path', file.path);
                        console.log('name', file.name);
                        console.log('type', file.type);
                        let fileSuffix = file.type.split('/')[1]
                        let oldname = file.path;
                        let newname = `${oldname}.${fileSuffix}`
                        console.log('newname', newname)
                        fs.rename(oldname, newname, function (err) {
                            if (err) console.log(err);
                            console.log('修改成功');
                            let resImg = {};
                            resImg.path = `http://10.4.52.32:8000:${uploadDir}/${newname}`
                            resImgs.push(resImg)
                            cb(null, resImgs)
                            // if (files.length === resImg.length) {
                            //     cb(null, resImgs)
                            // }
                        });
                    });
                })
            }
        ], function (err, result) {
            if (err) {

            }
            let data = {}
            data.resImgs = result
            console.log('res data', data)
            res.json(data);
        })
    });
}
