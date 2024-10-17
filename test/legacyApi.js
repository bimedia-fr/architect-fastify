module.exports = function setup(options, imports, register) {
    let rest = imports.rest;
    let log = imports.log.getLogger('api');

    // ! Multi mid not supported
    rest.use(function (req, res, next) {
        log.info('Old middleware access');
        req.oldMiddleware = true;
        next();
    });

    rest.get('/get/middleware', async (req, res) => {
        // ! Access by req.raw
        // res.send(200, { result: 'OK' }); is not working !
        if(req.raw.oldMiddleware) {
            res.send({ result: 'OK' });
        }
        else {
            res.code(500).send({ result: 'KO' });
        }
    });

    register();
};

module.exports.consumes = ['rest', 'log'];
