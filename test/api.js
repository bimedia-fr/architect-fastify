module.exports = function setup(options, imports, register) {
    let rest = imports.rest;
    // let log = imports.log.getLogger('api');

    rest.get('/get/ok', async () => {
        return { result: 'OK' };
    });

    rest.get('/get/ok-send', async (req, res) => {
        res.send({ result: 'OK' });
    });

    rest.get('/get/throw', async () => {
        throw new Error('Oups');
    });

    register();
};

module.exports.consumes = ['rest', 'log'];
