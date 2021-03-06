import Glue, { Manifest } from 'glue';
import Path from 'path';
import handlebars from 'handlebars';
import { Server, Request } from 'hapi';

const createServer = async function createServer(
  config: Manifest,
  env: string,
) {
  try {
    const server: Server = await Glue.compose(
      config,
      { relativeTo: Path.resolve(`${__dirname}/plugins`) },
    );

    server.views({
      engines: {
        html: handlebars,
      },
      path: `${__dirname}/`,
      layoutPath: `${__dirname}/views/layout`,
      layout: 'default',
    });

    server.state('takeoff-auth', (server.settings.app as any).cookieSettings);

    // If in the development environment we want to check all request and response types
    // if (env === 'development') {
    //   server.ext('onRequest', (__req, reply) => {
    //     server.log(['debug', 'request'], 'Incoming request', Date.now());
    //     return reply.continue();
    //   });
    //   server.on('response', () => {
    //      server.log(['debug', 'request'], 'Request finished', Date.now());
    //   });
    // }

    return server;
  } catch (e) {
    throw e;
  }
};

export = createServer;
