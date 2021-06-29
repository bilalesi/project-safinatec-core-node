import { FastifyInstance, FastifyRegisterOptions } from "fastify";
import { do_create_mind } from "../Services/MindServices";


interface ICreateMindBody {
    firstname: 'string' ,
    lastname: 'string' ,
    state: 'string' ,
    city: 'string' ,
    phone: 'string' ,
    email: 'string' ,
    website: 'string' ,
    facebook: 'string' ,
    twitter: 'string' ,
    linkedin: 'string' ,
    youtube: 'string' ,
    instagram: 'string' ,
    description: 'string' ,
    link: 'string' ,
    title: 'string' ,
    picture: 'string' ,
    video_link: 'string' ,
    interview: 'string' ,
    is_published: 'boolean',
}
function minds_routes_handlers(server: FastifyInstance, opts: FastifyRegisterOptions<any>, done: any){
    // create new mind
    server.route<{ Body: ICreateMindBody }>({
        method: 'POST',
        url: '/minds/create-mind',
        schema: {
            body: {
                type: 'object',
                required: ['firstname', 'lastname', 'state', 'city', 'email', 'description', 'link',
                     'title', 'picture', 'video_link', 'interview'],
                properties: {
                    firstname: { type: 'string' },
                    lastname: { type: 'string' },
                    state: { type: 'string' },
                    city: { type: 'string' },
                    phone: { type: 'string' },
                    email: { type: 'string' },
                    website: { type: 'string' },
                    facebook: { type: 'string' },
                    twitter: { type: 'string' },
                    linkedin: { type: 'string' },
                    youtube: { type: 'string' },
                    instagram: { type: 'string' },
                    description: { type: 'string' },
                    link: { type: 'string' },
                    title: { type: 'string' },
                    picture: { type: 'string' },
                    video_link: { type: 'string' },
                    interview: { type: 'string' },
                    is_published: { type: 'boolean' }
                }
            },
            response: {
                202: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        email: { type: 'string' },
                        is_published: { type: 'boolean' }
                    }
                },
                404: {
                    type: 'object',
                    properties: {
                        mind: { type: 'boolean' },
                    }
                }
            },
        },
        preHandler: async function(request, reply){
            try {
                console.log('request', request.user)
                await request.jwtVerify();
            } catch (error) {
                reply.send(error);
            }
        },
        handler: async function(request, reply){
            try {
                let { firstname, lastname,  state, city,  phone, email,
                    website, facebook, twitter, linkedin, youtube, 
                    instagram,  description, link, title, picture, 
                    video_link, interview, is_published } = request.body;

                let mind = await do_create_mind(firstname, lastname,  state, city,  phone, email,
                    website, facebook, twitter, linkedin, youtube, 
                    instagram,  description, link, title, picture, 
                    video_link, interview, is_published as any);

                reply.code(202);
                return mind;
            } catch (error) {
                reply.code(404);
                return (error);
            }
        }
    })

    done()
}

export default minds_routes_handlers;