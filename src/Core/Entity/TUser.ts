import _ from 'lodash';
import { IRoleLevel, IUserRoles, UserRoles } from '../../Configuration/Predefined'

interface IUserAddress{
    state: string;
    city: string;
    zip?: string;
    line1?: string;
    line2?: string;
}
interface IUserConfiguration {
    role: IUserRoles,
    level?: IRoleLevel,
    password_resetted?: string,
}
export default class TUser {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password?: string;
    address: IUserAddress;
    configuration: IUserConfiguration;

    constructor(
        firstname: string, 
        lastname: string, 
        email: string, 
        phone: string, 
        state: string,
        city: string,
        role: IUserRoles, 
        password?: string, 
        zip?: string,
        line1?: string,
        line2?: string,
    ){
        if(this.is_valid_name(firstname))
            this.firstname = firstname;
        else throw new Error('invlaid name');

        if(this.is_valid_name(lastname))
            this.lastname = lastname;
        else throw new Error('invlaid name');

        if(this.is_valid_mail(email))
            this.email = email;
        else throw new Error('invalid email');

        if(this.ise_valid_phone(phone))
            this.phone = phone;
        else throw new Error('invlaid phone');

        if(this.is_valid_password(password))
            this.password = password;
        else throw new Error('invlaid password');

        this.address= {
            state, city,
            zip, line1, line2,
        }
        this.configuration= {
            role
        }
    }

    is_valid_name(name: string){
        if(typeof name !== 'string' || _.isEmpty(name)) return false;
        return true;
    }
    ise_valid_phone(phone: string){
        if(!/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phone)) return false;
        return true;
    }
    is_valid_mail(mail: string){
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail))
            return false;
        return true;
    }

    is_valid_password(psw: string | undefined){
        if(psw && !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(psw))
            return false;
        else if(psw && /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(psw))
            return true;
        else return true;
    }
    is_role_exist(role: IUserRoles){
        if(!UserRoles.includes(role)) return false;
        return true;
    }
}