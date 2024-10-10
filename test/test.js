const assert = require('assert');
const architect = require('architect');
const { request } = require('undici');
const config = require('./_config/apiConfig');
const architectConfig = Object.keys(config).map((name) => (config[name].packagePath = name, config[name]));
let architectApp = null;

describe('architect-fastify', async () => {
    before((done) => {
        // Mount test api
        architect.createApp(architect.resolveConfig(architectConfig, __dirname), async(err, app) => {
            if(err) {
                console.log(err);
                throw err;
            }

            architectApp = app;
            let log = app.getService('log').getLogger('app');
            let rest = app.getService('rest');
            rest.setErrorHandler(function (e) {
                log.error('uncaughtException', e.message, e.stack);
                console.error('uncaughtException', e.stack);
                app.destroy();
                throw e;
            });

            process.on('uncaughtException', e => {
                console.error('uncaughtException', e.message, e.stack);
                log.error('uncaughtException', e.message, e.stack);
                // eslint-disable-next-line no-process-exit
                app.destroy();
                process.nextTick(() => { process.exit(-1); });
            });
        
            process.on('unhandledRejection', e => {
                console.error('unhandledRejection', e.message, e.stack);
                log.error('unhandledRejection', e.message, e.stack);
                // eslint-disable-next-line no-process-exit
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
    describe('api verbs', async () => {
        it('should respond to basic get', async () => {
            const {
                statusCode,
                headers,
                trailers,
                body
            } = await request('http://localhost:8001/get/ok');
            const data = await body.json();
            assert.deepStrictEqual(statusCode, 200);
            assert.deepStrictEqual(data, { result: 'OK' });
        });
    });
});
