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
exports.do_gather_user_profile = exports.do_create_user = exports.do_generate_payload_authenticate = void 0;
const UserRepositoryPort_1 = __importDefault(require("../Ports/UserRepositoryPort"));
const user_authenticate_1 = __importDefault(require("../../Core/Usecases/user_authenticate"));
const create_user_1 = __importDefault(require("../../Core/Usecases/create_user"));
const moment_1 = __importDefault(require("moment"));
function do_generate_payload_authenticate(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepositoryPortInstance = new UserRepositoryPort_1.default();
            const userAuthenticate = new user_authenticate_1.default(userRepositoryPortInstance);
            const user_match = yield userAuthenticate.execute(email, password);
            console.log('do_generate_payload_authenticate', user_match);
            if (user_match) {
                const payload = {
                    iss: 'safinatec.com',
                    aud: 'administration',
                    exp: moment_1.default().add(1, 'days').endOf('days').unix(),
                    user: user_match === null || user_match === void 0 ? void 0 : user_match.id,
                    role: user_match === null || user_match === void 0 ? void 0 : user_match.role,
                };
                return payload;
            }
            return null;
        }
        catch (error) {
            console.error('do_generate_payload_authenticate', error);
            return null;
        }
    });
}
exports.do_generate_payload_authenticate = do_generate_payload_authenticate;
function do_create_user(firstname, lastname, email, phone, role, state, city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepositoryPortInstance = new UserRepositoryPort_1.default();
            const userCreate = new create_user_1.default(userRepositoryPortInstance);
            const user = yield userCreate.execute(firstname, lastname, email, phone, role, state, city);
            return user;
        }
        catch (error) {
            console.error('do_create_user', error);
            return null;
        }
    });
}
exports.do_create_user = do_create_user;
function do_gather_user_profile(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userRepositoryPortInstance = new UserRepositoryPort_1.default();
            let user = yield userRepositoryPortInstance.gather_user(id);
            return user;
        }
        catch (error) {
            console.error('do_gather_user_profile', error);
            return null;
        }
    });
}
exports.do_gather_user_profile = do_gather_user_profile;
//# sourceMappingURL=Authentication.js.map