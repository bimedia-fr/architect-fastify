export = BridgeLogger;
declare class BridgeLogger {
    constructor(log: any);
    logger: any;
    info(message: any): any;
    error(message: any, trace: any): void;
    warn(message: any): void;
    debug(message: any): void;
    trace(message: any): void;
    fatal(message: any): void;
    child(): BridgeLogger;
}
//# sourceMappingURL=BridgeLogger.d.ts.map