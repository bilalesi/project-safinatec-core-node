    require('dotenv').config();
import fastify from "fastify";
import compression from 'fastify-compress';
import cors from 'fastify-cors';
import csrf from 'fastify-csrf';
import helmet from 'fastify-helmet';
import fa_cookie from 'fastify-cookie';
import swagger from 'fastify-swagger';
import swagger_configuration from '../Configuration/swagger_configuration';
import jwt from 'fastify-jwt';
import connect_persistence from './Database';


let server = fastify({ logger: { prettyPrint: true } });
server.register(fa_cookie);
server.register(csrf);
server.register(compression);
server.register(cors, {
    origin: '*',
    
});
server.register(helmet);
server.register(swagger, swagger_configuration);

let $secret: string = (process.env.AUTHENTICATION_SECRET as string);
console.log('$secret: ', $secret);
server.register(jwt, { 
    secret: $secret,
});

server.register(require('./Routes/UserRoutes'), { prefix: 'api/v1'});


let $port: string = (process.env.PORT as string);
export default async function start_server(){
    try {
        await connect_persistence();
        await server.listen($port);
        console.info("✅ ✅  Server Up and Running 🆙")
        // server.log.info({}, "✅ Server Up and Running 🆙");
    } catch (error) {
        server.log.error(error, '⛔️ Server down, no listining ⛔️');
        process.exit(1);
    }
}
