/**
 * [测试分页查询]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
import _ from 'lodash';
import pingData from '../testData/paging.js'

module.exports = function (app) {
    app.post('/paging', function (req, res) {
        console.log('paging body data', req.body);
        console.log('paging', pingData);
        res.json({
            testData: pingData.paging,
            total: pingData.paging.length
        });
    });
}
