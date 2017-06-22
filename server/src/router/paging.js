/**
 * [测试分页查询]
 * @param  {[type]} app [description]
 * @return {[type]}     [description]
 */
import _ from 'lodash';

let testData = [{
        title: 'hello',
        number: 1
    },
    {
        title: 'hello',
        number: 2
    },
    {
        title: 'hello',
        number: 3
    }
];

module.exports = function (app) {
    app.post('/paging', function (req, res) {
        console.log('paging body data', req.body);
        res.json({
            testData: testData,
            total: testData.length
        });
    });
}
