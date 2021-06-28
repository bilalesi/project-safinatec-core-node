import credentials_generator from 'password-generator';
import IUserRepository, { IUserCreated } from "../../Core/Repository/IUserRepository";
import User, { IMUser } from "../Models/User";
import UserAdapter from '../Adapaters/UserAdapter';
import { UserRolesPicker, IUserRoles } from "../../Configuration/Predefined";
import TUser from "../../Core/Entity/TUser";

export default class UserRepositoryPort implements IUserRepository{
    async gather_user(id: string): Promise<IMUser | undefined>{
        let user: IMUser = await User.findById(id).lean();
        if(user)
            return user;
        else 
            return undefined;
    }

    async create_admin_user(firstname: string, lastname: string, phone: string, 
        email: string, state: string, city: string, password: string, 
        zip?: string, line1?: string, line2?: string 
    ): Promise<string | boolean>{
        try{
            let user = UserAdapter.create(firstname, lastname, email, phone, state, city, UserRolesPicker.specialist_admin as IUserRoles, password, zip, line1, line2)
            if(user){
                let new_admin_user = new User({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    address: {
                        state: user.address.state,
                        city: user.address.city,
                        zip: user.address.zip,
                        line1: user.address.line1,
                        line2: user.address.line2,
                    }
                })
                await new_admin_user.save();
                return new_admin_user._id;
            }
            return false;
        }catch(error){
            return false;
        }
    }

    async create_rolled_user(firstname: string, lastname: string, phone: string, 
        email: string, state: string, city: string, role: IUserRoles,
        zip?: string, line1?: string, line2?: string 
    ): Promise<IUserCreated | null>{
        try{
            let password = credentials_generator(12, false);
            console.log('passowrd: ', password);
            let user = UserAdapter.create(firstname, lastname, email, phone,
                 state, city, role, undefined, zip, line1, line2)
                 console.log('user pass: ', user);
            if(user){
                let new_rolled_user = new User({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    phone: user.phone,
                    password: password,
                    address: {
                        state: user.address.state,
                        city: user.address.city,
                        zip: user.address.zip,
                        line1: user.address.line1,
                        line2: user.address.line2,
                    },
                    configuration: {
                        role: role,
                    }
                })
                new_rolled_user =  await new_rolled_user.save();
                if(new_rolled_user){
                    console.log("new_rolled_user", new_rolled_user);
                    return {
                        id: new_rolled_user._id,
                        role: new_rolled_user.configuration.role as IUserRoles,
                    }
                }
                return null;
            }
            return null;
        }catch(error){
            console.error('create_rolled_user', error);
            return error;
        }
    }

    async change_role_user(user: string, role: IUserRoles): Promise<object | boolean>{
        try {
            let updated_user = await User.findByIdAndUpdate(user, {
                $set: { 'configuration.role': role }
            }, { new: true });
            if(!updated_user) return false;
            return{
                user: updated_user._id,
                role: updated_user.configuration.role,
            }
        } catch (error) {
            console.error('change_role_user', error);
            return false
        }
    }
    
    async gather_application_users(): Promise<TUser[] | boolean>{
        try {
            let users: Array<IMUser> = await User.find({}).lean();
            let adapted_users = users.map(user => UserAdapter.create(user.firstname, user.lastname, user.email, user.phone, user.address.state, 
                user.address.city, user.configuration.role as IUserRoles ))
            return adapted_users;
        } catch (error) {
            console.error('gather_application_users', error);
            return false;
        }
    }

    async update_specific_user(user: string, new_modification: Partial<IMUser>){
        try {
            const update_user = await User.findByIdAndUpdate(user, {
                $set: {
                    ...new_modification
                }
            }, { new: true });
            return update_user?._id;
        } catch (error) {
            console.error('update_specific_user', error);
            return false;
        }
    }
    async check_user_credentials(email: string, password: string): Promise<IMUser | undefined>{
        try {
            let user: IMUser | null = await User.findOne({ email });
            if(!user) return undefined;
            else if(!user.is_valid_password(password))  return undefined;
            else return user;
        } catch (error) {
            console.error('check_user_credentials', error);
            return undefined;
        }
    }
    async check_user_existence(email: string): Promise<boolean>{
        try {
            const user = await User.findOne({ email }).lean();
            if(user) return true;
            return false;
        } catch (error) {
            return false;
        }
    }
}