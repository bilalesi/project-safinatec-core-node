import { IUserRoles } from '../../Configuration/Predefined';
import IUserRepository, { IUserCreated } from '../Repository/IUserRepository';


export default class CreateUser{
    UserRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.UserRepository = userRepository;
    }

    async execute(firstname: string, lastname: string, email: string, phone: string, 
            role: IUserRoles, state: string, city: string, 
        ): Promise<IUserCreated | null>{
            let is_user_exist = await this.UserRepository.check_user_existence(email);
            if(is_user_exist) return null;
            let user = await this.UserRepository.create_rolled_user(firstname, lastname, phone,
                email, state, city, role);
            if(user) return {
                id: user.id,
                role: user.role,
            }
            else return null;
    }
}