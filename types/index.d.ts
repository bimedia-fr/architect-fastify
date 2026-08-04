export = plugin;
import { EventEmitter } from 'stream';
export type Fastify = typeof import('fastify').default;
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
    onDestroy: (callback?: () => void) => void;
};
declare function plugin(options: ModuleOptions, imports: {
    hub: EventEmitter;
}, register: (err: Error | null, result: ModuleExport | null) => void): Promise<void>;
declare namespace plugin {
    var provides: string[];
    var consumes: string[];
}
//# sourceMappingURL=index.d.ts.map