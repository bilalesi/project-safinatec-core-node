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
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_1 = require("../Services/Authentication");
function user_routes_handlers(server, opts, done) {
    server.get('/', function (request, reply) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('bilal');
            reply.send('bilal');
            return reply;
        });
    });
    // user sign in
    server.route({
        method: 'POST',
        url: '/user/signin',
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            response: {
                202: {
                    type: 'object',
                    properties: {
                        token: { type: 'string' },
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        email: { type: 'string' },
                        phone: { type: 'string' },
                        role: { type: 'string' },
                        state: { type: 'string' },
                        city: { type: 'string' },
                        initial_security_check: { type: 'boolean' },
                    }
                },
                307: {
                    type: 'object',
                    properties: {
                        use_authenticated: { type: 'boolean' },
                        must_redirect_reset_credentials: { type: 'boolean' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        no_token: { type: 'string' },
                    }
                }
            },
        },
        handler: function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let user = request.body;
                    let payload = yield Authentication_1.do_generate_payload_authenticate(user.email, user.password);
                    if (payload) {
                        let _user = yield Authentication_1.do_gather_user_profile(payload.user);
                        console.log('____user: ', _user);
                        if (!(_user === null || _user === void 0 ? void 0 : _user.configuration.password_resetted)) {
                            reply.code(307);
                            return ({
                                use_authenticated: true,
                                must_redirect_reset_credentials: true,
                            });
                        }
                        if (_user) {
                            console.log('_user: ', _user);
                            let token = this.jwt.sign(payload);
                            reply.code(202);
                            return (Object.assign(Object.assign({ token }, _user), { state: _user.address.state, city: _user.address.city, role: _user.configuration.role, initial_security_check: _user.configuration.password_resetted }));
                        }
                    }
                    else {
                        reply.code(404);
                        return ({ no_token: 'no token' });
                    }
                }
                catch (error) {
                    return (error);
                }
            });
        }
    });
    // create user
    server.route({
        method: 'POST',
        url: '/user/create',
        schema: {
            body: {
                type: 'object',
                required: ['email', 'firstname', 'lastname', 'phone', 'state', 'city', 'role'],
                properties: {
                    firstname: { type: 'string' },
                    lastname: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    role: { type: 'string' },
                    state: { type: 'string' },
                    city: { type: 'string' },
                }
            },
            response: {
                202: {
                    type: 'object',
                    properties: {
                        is_created: { type: 'boolean' },
                        id: { type: 'string' },
                        role: { type: 'string' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        is_created: { type: 'boolean' }
                    }
                }
            }
        },
        handler: function (request, reply) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    let { city, email, firstname, lastname, phone, role, state } = request.body;
                    let user = yield Authentication_1.do_create_user(firstname, lastname, email, phone, role, state, city);
                    if (user) {
                        reply.code(202);
                        return ({
                            is_created: true,
                            id: user.id,
                            role: user.role,
                        });
                    }
                    reply.code(404);
                    return ({ is_created: false });
                }
                catch (error) {
                    return error;
                }
            });
        }
    });
    done();
}
exports.default = user_routes_handlers;
//# sourceMappingURL=UserRoutes.js.map