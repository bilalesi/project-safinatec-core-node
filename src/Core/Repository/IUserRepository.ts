import { IUserRoles } from "../../Configuration/Predefined";
import { IMUser } from "../../Infrastructure/Models/User";
import TUser from "../Entity/TUser";


export interface IUserCreated{
    id: string,
    role: IUserRoles,
}
interface IUserRepository{
    create_rolled_user(firstname: string, lastname: string, phone: string, email: string, state: string, city: string, role: IUserRoles, zip?: string, line1?: string, line2?: string): Promise<IUserCreated | null>;
    create_admin_user(firstname: string, lastname: string, phone: string, email: string, state: string, city: string, password: string, zip?: string, line1?: string, line2?: string): Promise<string | boolean>;
    gather_user(id: string): Promise<IMUser | undefined>;
    gather_application_users(): Promise<TUser[] | boolean>;
    update_specific_user(user: string, new_modification: object): Promise<string>;
    change_role_user(user: string, role: IUserRoles): Promise<object | boolean>;
    check_user_credentials(email: string, passowrd: string): Promise<IMUser | undefined>;
    check_user_existence(email: string): Promise<boolean>;
}

export default IUserRepository;