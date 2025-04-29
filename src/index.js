const socklisten = require('unix-listen');
const listen = require('listen-interface');
const { v4: uuidv4 } = require('uuid');

module.exports = async function (options, imports, register) {
    options.server = options.server || {};
    options.server.genReqId = options.server.genReqId || (() => uuidv4());

    const fastify = require('fastify')(Object.assign({}, {
        logger: false
    }, options.server));

    async function configurePlugins(fastify, plugins) {
        const keys = Object.keys(plugins);
        for(const name of keys) {
            await fastify.register(require(name), plugins[name] || {});
        };
    }

    /**
     * listen
     * @param {Fastify} fastify server
     * @returns undefined
     */
    function doListen(app, fastify) {
        function notifyError(err) {
            if(err) {
                app.emit('error', err);
            }
        }

        if (options.socket) {
            return socklisten(fastify, options.socket, notifyError);
        }
        if (options['interface']) {
            return listen(fastify, options, notifyError);
        }
        fastify.listen(options);
    }

    imports.hub.on('ready', (app) => {
        doListen(app, fastify);
    });

    try {
        await configurePlugins(fastify, options.plugins || {});
        register(null, {
            onDestroy: function (callback) {
                fastify.close(callback);
            },
            rest: fastify
        });
    } catch (error) {
        register(error);
    }
};

module.exports.provides = ['rest'];
module.exports.consumes = ['hub'];
