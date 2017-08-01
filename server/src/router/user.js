/**
 * [测试分页查询]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
import _ from 'lodash';
import pingData from '../testData/paging.js'

module.exports = function (app) {
    app.get('/user', function (req, res) {
        console.log('get user query', req.query);
        // console.log('get user params', req.params);
        setTimeout(function () {
            // res.json(401, pingData.paging)
            res.json(pingData.paging)
        }, 2000)
    })
}
