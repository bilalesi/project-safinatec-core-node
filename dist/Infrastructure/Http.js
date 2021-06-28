"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const fastify_1 = __importDefault(require("fastify"));
const fastify_compress_1 = __importDefault(require("fastify-compress"));
const fastify_cors_1 = __importDefault(require("fastify-cors"));
const fastify_csrf_1 = __importDefault(require("fastify-csrf"));
const fastify_helmet_1 = __importDefault(require("fastify-helmet"));
const fastify_cookie_1 = __importDefault(require("fastify-cookie"));
const fastify_swagger_1 = __importDefault(require("fastify-swagger"));
const swagger_configuration_1 = __importDefault(require("../Configuration/swagger_configuration"));
const fastify_jwt_1 = __importDefault(require("fastify-jwt"));
const Database_1 = __importDefault(require("./Database"));
let server = fastify_1.default({ logger: { prettyPrint: true } });
server.register(fastify_cookie_1.default);
server.register(fastify_csrf_1.default);
server.register(fastify_compress_1.default);
server.register(fastify_cors_1.default, {
    origin: '*',
});
server.register(fastify_helmet_1.default);
server.register(fastify_swagger_1.default, swagger_configuration_1.default);
let $secret = process.env.AUTHENTICATION_SECRET;
console.log('$secret: ', $secret);
server.register(fastify_jwt_1.default, {
    secret: $secret,
});
server.register(require('./Routes/UserRoutes'), { prefix: 'api/v1' });
let $port = process.env.PORT;
function start_server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield Database_1.default();
            yield server.listen($port);
            console.info("✅ ✅  Server Up and Running 🆙");
            // server.log.info({}, "✅ Server Up and Running 🆙");
        }
        catch (error) {
            server.log.error(error, '⛔️ Server down, no listining ⛔️');
            process.exit(1);
        }
    });
}
exports.default = start_server;
//# sourceMappingURL=Http.js.map