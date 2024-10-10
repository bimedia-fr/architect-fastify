const modules = {};

modules['architect-access-log'] = {
    fmt: ':Xip - :userID ":method :url :protocol/:httpVersion" :statusCode :contentLength ":referer" ":userAgent" - :delta',
    userID: function(req) {
        return req.bimId + ' ' + (req.auth && req.auth.data && req.auth.data.storeId || '');
    },
    filters: []
};

modules['architect-log4js'] = {
    request: {
        property: function(req) {
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

modules['../src/index'] = {
    host: '0.0.0.0',
    port: 8001
};

modules['./api'] = {};

module.exports = modules;
