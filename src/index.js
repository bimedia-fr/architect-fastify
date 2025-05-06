const socklisten = require('unix-listen');
const listen = require('listen-interface');
const { v4: uuidv4 } = require('uuid');
const Fastify = require('fastify');
const { EventEmitter } = require('stream');

/**
 * @typedef {import('fastify')} Fastify
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {Error} error
 */

/**
 * @typedef {Object} ModuleOptions
 * @property {String} packagePath fastify module path
 * @property {Number} port port to listen on
 * @property {String} interface system interface to use
 * @property {String} socket socket to use
 * @property {import('fastify').FastifyServerOptions} server fastify configuration
 * @property {Object} plugins fastify plugins with configurations to load
 */

/**
 * @typedef {Object} ModuleExport
 * @property {FastifyInstance} rest
 * @property {function():void} onDestroy
 */

/**
 * @param {ModuleOptions} options 
 * @param {{ hub: EventEmitter; }} imports 
 * @param  {function (Error|null, ModuleExport|null):void}  register 
 */
module.exports = async function (options, imports, register) {
    options.server = options.server || {};
    options.server.genReqId = options.server.genReqId || (() => uuidv4());

    const fastify = Fastify(Object.assign({}, {
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
     * @param {FastifyInstance} fastify server instance
     * @returns undefined
     */
    function doListen(app, fastify) {
        function notifyError(err) {
            if(err) {
                app.emit('error', err);
            }
        }

        if(options.socket) {
            return socklisten(fastify, options.socket, notifyError);
        }
        if(options.interface) {
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
        if(error instanceof Error) {
            register(error, null);
        } else {
            register(new Error('Error'), null);
        }
    }
};

module.exports.provides = ['rest'];
module.exports.consumes = ['hub'];
