import TUser from "../../Core/Entity/TUser";
import { IUserRoles } from "../../Configuration/Predefined";

export default class UserAdapter{
    static create(firstname: string, lastname: string , email: string, phone: string,  
        state: string, city: string,  role: IUserRoles, password?: string, zip?: string, line1?: string , line2?: string, ){
        return new TUser(firstname, lastname, email, phone, state, city, role, password,  zip, line1, line2)
    }
}