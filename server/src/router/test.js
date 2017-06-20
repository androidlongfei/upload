
module.exports = function(app) {
    app.post('/test', function (req, res) {
        console.log('/test')
        res.json({
            'ok': 'ok'
        });
    });

    app.post('/testPost', function (req, res) {
        console.log('testPost body data', req.body);
        res.json(req.body);
    });
}
