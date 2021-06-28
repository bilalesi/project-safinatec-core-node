"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Predefined_1 = require("../../Configuration/Predefined");
class TUser {
    constructor(firstname, lastname, email, phone, state, city, role, password, zip, line1, line2) {
        if (this.is_valid_name(firstname))
            this.firstname = firstname;
        else
            throw new Error('invlaid name');
        if (this.is_valid_name(lastname))
            this.lastname = lastname;
        else
            throw new Error('invlaid name');
        if (this.is_valid_mail(email))
            this.email = email;
        else
            throw new Error('invalid email');
        if (this.ise_valid_phone(phone))
            this.phone = phone;
        else
            throw new Error('invlaid phone');
        if (this.is_valid_password(password))
            this.password = password;
        else
            throw new Error('invlaid password');
        this.address = {
            state, city,
            zip, line1, line2,
        };
        this.configuration = {
            role
        };
    }
    is_valid_name(name) {
        if (typeof name !== 'string' || lodash_1.default.isEmpty(name))
            return false;
        return true;
    }
    ise_valid_phone(phone) {
        if (!/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(phone))
            return false;
        return true;
    }
    is_valid_mail(mail) {
        if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail))
            return false;
        return true;
    }
    is_valid_password(psw) {
        if (psw && !/(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(psw))
            return false;
        else if (psw && /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,}/.test(psw))
            return true;
        else
            return true;
    }
    is_role_exist(role) {
        if (!Predefined_1.UserRoles.includes(role))
            return false;
        return true;
    }
}
exports.default = TUser;
//# sourceMappingURL=TUser.js.map