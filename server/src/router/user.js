/**
 * [测试分页查询]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
import _ from 'lodash';
import pingData from '../testData/paging.js'

module.exports = function (app) {
    app.get('/user', function (req, res) {
        console.log('user body data', req.body);
        setTimeout(function () {
            res.json(pingData.paging)
        }, 2000)
    })
}
