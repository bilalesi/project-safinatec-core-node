
import IUserRepository from '../Repository/IUserRepository';
import { IMUser } from '../../Infrastructure/Models/User';
import { IUserRoles } from '../../Configuration/Predefined';


export interface IAuthenticatedUser {
    id: string,
    fullname: string,
    email: string,
    phone: string,
    role: IUserRoles,
}
export default class UserAuthenticate{
    UserRepository: IUserRepository;


    constructor(UserRepository: IUserRepository){
        this.UserRepository = UserRepository;
    }

    async execute(email: string, password: string): Promise<IAuthenticatedUser | undefined>{
        try {
            const user: IMUser | undefined  = await this.UserRepository.check_user_credentials(email, password);
            if(user){
                return {
                    id: user?._id,
                    fullname: user?.fullname,
                    email: user?.email,
                    phone: user?.phone,
                    role: user?.configuration?.role as IUserRoles,
                }
            }
            return undefined;
        } catch (error) {
            console.error('UserAuthenticate', error);
            return undefined;
        }
    }

}