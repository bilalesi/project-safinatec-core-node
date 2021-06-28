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
Object.defineProperty(exports, "__esModule", { value: true });
class CreateUser {
    constructor(userRepository) {
        this.UserRepository = userRepository;
    }
    execute(firstname, lastname, email, phone, role, state, city) {
        return __awaiter(this, void 0, void 0, function* () {
            let is_user_exist = yield this.UserRepository.check_user_existence(email);
            if (is_user_exist)
                return null;
            let user = yield this.UserRepository.create_rolled_user(firstname, lastname, phone, email, state, city, role);
            if (user)
                return {
                    id: user.id,
                    role: user.role,
                };
            else
                return null;
        });
    }
}
exports.default = CreateUser;
//# sourceMappingURL=create_user.js.map