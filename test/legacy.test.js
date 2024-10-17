const assert = require('assert');
// eslint-disable-next-line n/no-unpublished-require
const architect = require('architect');
// eslint-disable-next-line n/no-unpublished-require
const { request } = require('undici');
const config = require('./_config/legacyApiConfig');
const architectConfig = Object.keys(config).map((name) => (config[name].packagePath = name, config[name]));
let architectApp = null;

/* eslint-disable no-undef */
/* eslint-disable no-console */
describe('architect-fastify legacy test server', async () => {
    before((done) => {
        // Mount test api
        architect.createApp(architect.resolveConfig(architectConfig, __dirname) , async (err, app) => {
            if(err) {
                console.log(err);
                throw err;
            }

            architectApp = app;
            let log = app.getService('log').getLogger('app');
            let rest = app.getService('rest');

            rest.setErrorHandler(function (err, request, reply) {
                log.error('FastifyErrorHandler', err.message, err.stack);
                reply.status(500).send({ statusCode: 500, message: 'Internal Server Error' });
            });

            process.on('uncaughtException', e => {
                console.error('uncaughtException', e.message, e.stack);
                log.error('uncaughtException', e.message, e.stack);
                app.destroy();
                process.nextTick(() => { process.exit(-1); });
            });

            process.on('unhandledRejection', e => {
                console.error('unhandledRejection', e.message, e.stack);
                log.error('unhandledRejection', e.message, e.stack);
                app.destroy();
                process.nextTick(() => { process.exit(-1); });
            });

            // arrêts demandés
            process.on('SIGINT', () => {
                log.info('application stopped');
                app.destroy();
                process.nextTick(() => { process.exit(-1); });
            });

            process.on('SIGUSR2', () => {
                log.info('application stopped');
                app.destroy();
                process.nextTick(() => { process.exit(-1); });
            });
            log.info('application started');

            done();
        });
    });
    after((done) => {
        if(architectApp) {
            architectApp.destroy();
            done();
        }
    });
    describe('middleware support', async () => {
        it('should handle old use middlewares', async () => {
            const {
                statusCode,
                body
            } = await request('http://localhost:8002/get/middleware', {
                headers: { 'user-agent': 'undici' }
            });
            const data = await body.json();
            assert.deepStrictEqual(statusCode, 200);
            assert.deepStrictEqual(data, { result: 'OK' });
        });
    });
});
