import { RouteShorthandOptions } from 'fastify';
import { IUserRoles } from "../../Configuration/Predefined";
import UserRepositoryPort from '../Ports/UserRepositoryPort';
import UserAuthenticate, { IAuthenticatedUser } from '../../Core/Usecases/user_authenticate';
import CreateUser from '../../Core/Usecases/create_user';
import moment from 'moment';
import { IUserCreated } from '../../Core/Repository/IUserRepository';


interface IAutheticationPayload{
    exp: number,
    iss: string,
    user: string,
    aud: string,
    role: IUserRoles
}

async function do_generate_payload_authenticate(email: string, password: string){
    try {
        const userRepositoryPortInstance = new UserRepositoryPort();
        const userAuthenticate = new UserAuthenticate(userRepositoryPortInstance);
        const user_match: IAuthenticatedUser | undefined = await userAuthenticate.execute(email, password);
        console.log('do_generate_payload_authenticate', user_match)
        if(user_match){
            const payload: IAutheticationPayload = {
                iss: 'safinatec.com',
                aud: 'administration',
                exp: moment().add(1, 'days').endOf('days').unix(),
                user: user_match?.id,
                role: user_match?.role,
            }
            return payload;
        }
        return null;
    } catch (error) {   
        console.error('do_generate_payload_authenticate', error);
        return null;
    }
}

async function do_create_user(firstname: string, lastname: string, email: string, phone: string, role: IUserRoles, state: string, city: string){
    try{
        const userRepositoryPortInstance = new UserRepositoryPort();
        const userCreate = new CreateUser(userRepositoryPortInstance);
        const user: IUserCreated | null = await userCreate.execute(firstname, lastname, email, phone, role, state, city);
        return user;
    }catch(error){
        console.error('do_create_user', error);
        return null;
    }
}

async function do_gather_user_profile(id: string){
    try {
        const userRepositoryPortInstance = new UserRepositoryPort();
        let user = await userRepositoryPortInstance.gather_user(id);
        return user;
    } catch (error) {
        console.error('do_gather_user_profile', error);
        return null;
    }
}
export {
    do_generate_payload_authenticate,
    do_create_user,
    do_gather_user_profile
}

