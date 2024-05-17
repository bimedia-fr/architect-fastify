class BridgeLogger {
    logger;
    constructor(log) {
        this.logger = log;
    }

    info(message) {
        if(message.req) {
            return;
        }
        if(message.res) {
            const req = message.res.raw.req;
            return this.logger.info(
                req.socket.remoteAddress, '-', 
                message.res.request.id, '-',
                '"' + req.method+ ' ' + req.url + ' HTTP/' + req.httpVersion + '" ' + message.res.raw.statusCode, '-',
                '"' + (req.headers.referer || '-') + '"', '"' + (req.headers['user-agent'] || '-') + '"', '-',
                ~~message.responseTime
            );
        }
        this.logger.info(message);
    }

    error(message, trace) {
        this.logger.error(`${message} -> (${trace || 'trace not provided !'})`);
    }

    warn(message) {
        this.logger.warn(message);
    }

    debug(message, context) {
        this.logger.debug(message);
    }

    trace(message, context) {
        this.logger.trace(message);
    }

    fatal(message, context) {
        this.logger.fatal(message);
    }

    child() {
        return new BridgeLogger(this.logger);
    }
}

module.exports = BridgeLogger;