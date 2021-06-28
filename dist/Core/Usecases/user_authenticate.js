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
class UserAuthenticate {
    constructor(UserRepository) {
        this.UserRepository = UserRepository;
    }
    execute(email, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.UserRepository.check_user_credentials(email, password);
                if (user) {
                    return {
                        id: user === null || user === void 0 ? void 0 : user._id,
                        fullname: user === null || user === void 0 ? void 0 : user.fullname,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        phone: user === null || user === void 0 ? void 0 : user.phone,
                        role: (_a = user === null || user === void 0 ? void 0 : user.configuration) === null || _a === void 0 ? void 0 : _a.role,
                    };
                }
                return undefined;
            }
            catch (error) {
                console.error('UserAuthenticate', error);
                return undefined;
            }
        });
    }
}
exports.default = UserAuthenticate;
//# sourceMappingURL=user_authenticate.js.map