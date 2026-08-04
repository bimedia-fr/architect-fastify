export = _exports;
/**
 * @typedef {import('fastify')} Fastify
 * @typedef {import('fastify').FastifyInstance} FastifyInstance
 * @typedef {import('fastify').FastifyInstance} rest
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
declare function _exports(options: ModuleOptions, imports: {
    hub: EventEmitter;
}, register: Function): Promise<void>;
declare namespace _exports {
    export var provides: string[];
}
declare namespace _exports {
    export var consumes: string[];
}
import { EventEmitter } from 'stream';
export type Fastify = import('fastify');
export type FastifyInstance = import('fastify').FastifyInstance;
export type rest = import('fastify').FastifyInstance;
export type ModuleOptions = {
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
    server: import('fastify').FastifyServerOptions;
    /**
     * fastify plugins with configurations to load
     */
    plugins: any;
};
export type ModuleExport = {
    rest: FastifyInstance;
    /**
     * ():void} onDestroy
     */
    : Function;
};
//# sourceMappingURL=index.d.ts.map