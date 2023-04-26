import { isBoom } from '@hapi/boom';
import { Server } from '@hapi/hapi';
import Joi = require('joi');
import ErrorHandler from './exceptions/hapi-error-handler';
import PokemonApp from './handler/pokemon.handler';

const init = async () => {

  const server = new Server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async function (_request, h) {
      try {
        const pokemon = await new PokemonApp().listAll();
        return h.response(pokemon);
      } catch (err) {
        throw err;
      }
    },
    options: {
      validate: {
        headers: Joi.object({
          'x-api-key': Joi.string().required()
        }).options({ allowUnknown: true }),
        failAction: (_res, _h, err) => {
          throw err
        }
      }
    },
  });

  server.route(
    {
      method: 'GET',
      path: '/{id}',
      handler: async function (request, h) {
        try {
          const pokemon = await new PokemonApp().get(request.params.id);
          return h.response(pokemon);
        } catch (error) {
          throw error;
        }
      },
      options: {
        validate: {
          headers: Joi.object({
            'x-api-key': Joi.string().required()
          }).options({ allowUnknown: true }),
          failAction: (_res, _h, err) => {
            throw err
          }
        }
      },
    }
  )

  await server.start();
  console.log('Server running on %s', server.info.uri);

  server.ext('onPreResponse', (req, reply) => {
    if (isBoom(req.response)) {
      throw new ErrorHandler().handler(req.response);
    }
    return reply.continue
  });
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();