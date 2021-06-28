"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TUser_1 = __importDefault(require("../../Core/Entity/TUser"));
class UserAdapter {
    static create(firstname, lastname, email, phone, state, city, role, password, zip, line1, line2) {
        return new TUser_1.default(firstname, lastname, email, phone, state, city, role, password, zip, line1, line2);
    }
}
exports.default = UserAdapter;
//# sourceMappingURL=UserAdapter.js.map