declare namespace _exports {
    export { Fastify, FastifyInstance, error, ModuleOptions, ModuleExport };
}
declare function _exports(options: ModuleOptions, imports: {
    hub: EventEmitter;
}, register: (arg0: Error | null, arg1: ModuleExport | null) => void): Promise<void>;
declare namespace _exports {
    let provides: string[];
    let consumes: string[];
}
export = _exports;
type Fastify = typeof Fastify;
type FastifyInstance = import("fastify").FastifyInstance;
type error = Error;
type ModuleOptions = {
    /**
     * fastify module path
     */
    packagePath: string;
    /**
     * port to listen on
     */
    port: number;
    /**
     * system interface to use
     */
    interface: string;
    /**
     * socket to use
     */
    socket: string;
    /**
     * fastify configuration
     */
    server: import("fastify").FastifyServerOptions;
    /**
     * fastify plugins with configurations to load
     */
    plugins: any;
};
type ModuleExport = {
    rest: FastifyInstance;
    onDestroy: () => void;
};
import { EventEmitter } from "events";
import Fastify = require("fastify");
//# sourceMappingURL=index.d.ts.map