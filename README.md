# architect-fastify 

Expose Fastify server *rest* as an Architect plugin.

### Installation

```sh
npm install --save architect-fastify
```

### Config Format

```js
{
  packagePath: 'architect-fastify',
  interface: process.env.IFACE, // Or host: process.env.IP
  port: process.env.PORT,
  server: { /* Fastify server option here */ },
  // optionnal pluggins
  plugins: {
    @fastify/middie: {
      hook: onRequest
    }
  }
}
```

### Usage

Boot [Architect](https://github.com/c9/architect):

```js
const path = require('path');
const architect = require('architect');

const configPath = path.join(__dirname, 'config.js');
const config = architect.loadConfig(configPath);

architect.createApp(config, (err, app) => {
    if (err) {
        throw err;
    }
    console.log('App ready');
});
```

Configure Architect with `config.js`:

```js
module.exports = [{
    packagePath: 'architect-fastify',
    port: process.env.PORT,
    host: process.env.IP
}, './routes'];
```

And register your routes in `./routes/index.js`:

```js
module.exports = function setup(options, imports, register) {
    const rest = imports.rest;

    // Register routes
    rest.get('/catalogue', async (req, reply) => {
        reply.send({ message: 'Hello, world' });
    });

    register();
};

// Consume rest plugin
module.exports.consumes = ['rest'];
```

### Options

* `port`: TCP port to listen to.
* `host`: Host to listen to.
* `socket`: Unix socket to listen to.
* `interface`: Network interface name to listen to (must match `os.networkInterfaces`).
* `plugins`: A hash containing either a [Fastify plugin](https://www.fastify.io/docs/latest/Reference/Plugins/) or a function that returns a plugin.
