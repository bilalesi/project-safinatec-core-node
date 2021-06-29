import { do_generate_payload_authenticate, 
    do_create_user, do_gather_user_profile 
} from '../Services/Authentication';

import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { IUserRoles } from '../../Configuration/Predefined';

interface IAuthenticateBody {
    email: string,
    password: string
}
interface IJwtPayload{
    iss: string,
    aud: string,
    exp: number,
    user: string,
    role: string,
    iat: number
}
interface ICreateUserBody {
    firstname: string, 
    lastname: string,
    email: string, 
    phone: string, 
    role: IUserRoles, 
    state: string, 
    city: string
}

function user_routes_handlers(server: FastifyInstance, opts: FastifyRegisterOptions<any>, done: any){
    server.get('/', async function(request, reply){
        console.log('bilal');
        reply.send('bilal')
        return reply;
    })
    // user sign in
    server.route<{ Body: IAuthenticateBody }>({
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
                200: {
                    type: 'object',
                    properties: {
                        use_authenticated:  { type: 'boolean' },
                        must_redirect_reset_credentials:  { type: 'boolean' }
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
        handler: async function(request, reply){
            try {
                let user: { email: string, password: string } = request.body;
                let payload = await do_generate_payload_authenticate(user.email, user.password);
                if(payload){
                    let _user = await do_gather_user_profile(payload.user);
                    console.log('____user: ', _user)
                    // if(!_user?.configuration.password_resetted){
                    //     reply.code(200);
                    //     return ({
                    //         use_authenticated: true,
                    //         must_redirect_reset_credentials: true,
                    //     })
                    // }
                    if(_user){
                        console.log('_user: ', _user);
                        let token = this.jwt.sign(payload);
                        reply.code(202);
                        return ({ 
                            token,
                            ..._user,
                            state: _user.address.state,
                            city: _user.address.city,
                            role: _user.configuration.role,
                            initial_security_check: _user.configuration.password_resetted,
                        });
                    }
                }
                else {
                    reply.code(404);
                    return ({ no_token: 'no token' });
                }
            } catch (error) {
                return (error);
            }
        }
    })

    // create user
    server.route<{Body: ICreateUserBody}>({
        method: 'POST',
        url: '/user/create',
        schema: {
            body: {
                type: 'object',
                required: ['email', 'firstname', 'lastname', 'phone', 'state', 'city', 'role' ],
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
        handler: async function(request, reply){
            try {
                let { city, email, firstname, lastname, phone, role, state } = request.body;
                let user = await do_create_user(firstname, lastname, email, phone, role, state, city);
                if(user){
                    reply.code(202)
                    return ({
                        is_created: true,
                        id: user.id,
                        role: user.role,
                    })
                }
                reply.code(404);
                return ({ is_created: false });
            } catch (error) {
                return error;
            }
        }
    })

    // get profile 
    server.route<{Body: ICreateUserBody}>({
        method: 'GET',
        url: '/user/profile',
        schema: {
            response: {
                202: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        configuration: {
                            role: { type: 'string' },
                            password_resetted: { type: 'boolean' },
                        },
                        firstname: { type: 'string' },
                        lastname: { type: 'string' },
                        email: { type: 'string' },
                        phone: { type: 'string' },
                        address: {
                            state: { type: 'string' },
                            city: { type: 'string' },
                        },
                        updatedAt: { type: 'string' },
                    }
                },
            }
        },
        preHandler: async function(request, reply, next){
            try {
                return await request.jwtVerify();
            } catch (error) {
                return error
            }
        },
        handler: async function(request, reply){
            try {
                let { user: userId } = <IJwtPayload>request.user;
                let user = await do_gather_user_profile(userId);
                if(user){
                    reply.code(202);
                    return user;
                }
                reply.code(404)
                let err =  new Error();
                err.message= 'User not found';
                throw err;
            } catch (error) {
                return error;
            }
        }
    })

    done()
}



export default user_routes_handlers;