"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_generator_1 = __importDefault(require("password-generator"));
const User_1 = __importDefault(require("../Models/User"));
const UserAdapter_1 = __importDefault(require("../Adapaters/UserAdapter"));
const Predefined_1 = require("../../Configuration/Predefined");
class UserRepositoryPort {
    gather_user(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield User_1.default.findById(id).lean();
            if (user)
                return user;
            else
                return undefined;
        });
    }
    create_admin_user(firstname, lastname, phone, email, state, city, password, zip, line1, line2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = UserAdapter_1.default.create(firstname, lastname, email, phone, state, city, Predefined_1.UserRolesPicker.specialist_admin, password, zip, line1, line2);
                if (user) {
                    let new_admin_user = new User_1.default({
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
                    });
                    yield new_admin_user.save();
                    return new_admin_user._id;
                }
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
    create_rolled_user(firstname, lastname, phone, email, state, city, role, zip, line1, line2) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let password = password_generator_1.default(12, false);
                console.log('passowrd: ', password);
                let user = UserAdapter_1.default.create(firstname, lastname, email, phone, state, city, role, undefined, zip, line1, line2);
                console.log('user pass: ', user);
                if (user) {
                    let new_rolled_user = new User_1.default({
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
                    });
                    new_rolled_user = yield new_rolled_user.save();
                    if (new_rolled_user) {
                        console.log("new_rolled_user", new_rolled_user);
                        return {
                            id: new_rolled_user._id,
                            role: new_rolled_user.configuration.role,
                        };
                    }
                    return null;
                }
                return null;
            }
            catch (error) {
                console.error('create_rolled_user', error);
                return error;
            }
        });
    }
    change_role_user(user, role) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let updated_user = yield User_1.default.findByIdAndUpdate(user, {
                    $set: { 'configuration.role': role }
                }, { new: true });
                if (!updated_user)
                    return false;
                return {
                    user: updated_user._id,
                    role: updated_user.configuration.role,
                };
            }
            catch (error) {
                console.error('change_role_user', error);
                return false;
            }
        });
    }
    gather_application_users() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield User_1.default.find({}).lean();
                let adapted_users = users.map(user => UserAdapter_1.default.create(user.firstname, user.lastname, user.email, user.phone, user.address.state, user.address.city, user.configuration.role));
                return adapted_users;
            }
            catch (error) {
                console.error('gather_application_users', error);
                return false;
            }
        });
    }
    update_specific_user(user, new_modification) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const update_user = yield User_1.default.findByIdAndUpdate(user, {
                    $set: Object.assign({}, new_modification)
                }, { new: true });
                return update_user === null || update_user === void 0 ? void 0 : update_user._id;
            }
            catch (error) {
                console.error('update_specific_user', error);
                return false;
            }
        });
    }
    check_user_credentials(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield User_1.default.findOne({ email });
                if (!user)
                    return undefined;
                else if (!user.is_valid_password(password))
                    return undefined;
                else
                    return user;
            }
            catch (error) {
                console.error('check_user_credentials', error);
                return undefined;
            }
        });
    }
    check_user_existence(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({ email }).lean();
                if (user)
                    return true;
                return false;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.default = UserRepositoryPort;
//# sourceMappingURL=UserRepositoryPort.js.map