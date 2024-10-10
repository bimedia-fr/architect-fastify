module.exports = function setup(options, imports, register) {
    let rest = imports.rest;

    rest.get('/get/ok', function (req, res) {
        res.send({ result: 'OK' });
    });

    register();
};

module.exports.consumes = ['rest', 'log'];