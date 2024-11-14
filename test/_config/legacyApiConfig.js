const modules = {};

modules['../src/index'] = {
    host: '0.0.0.0',
    port: 8002,
    plugins: {
        '@fastify/middie': {
            hook: 'preParsing'
        }
    }
};

modules['architect-fastify-access-log'] = {
    fmt: ':Xip - :userID ":method :url :protocol/:httpVersion" :statusCode :contentLength ":referer" ":userAgent" - :delta',
    userID: function () {
        return 'UserID';
    },
    filters: []
};

modules['architect-log4js'] = {
    request: {
        property: function (req) {
            return req.bimId;
        }
    },
    config: {
        appenders: {
            out: {
                type: 'stdout'
            }
        },
        categories: {
            default: {
                appenders: ['out'],
                level: 'debug'
            }
        }
    }
};

modules['./legacyApi'] = {};

module.exports = modules;
