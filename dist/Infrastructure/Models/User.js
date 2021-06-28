"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Predefined_1 = require("../../Configuration/Predefined");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    password: String,
    address: {
        state: String,
        city: String,
        zip: Number,
        line1: String,
        line2: String
    },
    configuration: {
        role: { type: String, enum: Predefined_1.UserRoles, default: Predefined_1.UserRolesPicker.specialist_admin },
        level: { type: [String], enum: Predefined_1.RoleLevel, default: Predefined_1.RoleLevel },
        password_resetted: { type: Boolean, default: false },
    },
    analytics: {
        connection_attempts: Number,
        last_connection: Number,
    }
}, {
    timestamps: true,
});
UserSchema.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`;
});
function crypt_password(password) {
    const salt = bcrypt_1.default.genSaltSync(parseInt(process.env.CRYPT_SALT_ROUNDS, 10));
    return bcrypt_1.default.hashSync(password, salt);
}
UserSchema.pre('save', function (next) {
    const user = this;
    user.email = user.email.toLowerCase();
    if (!user.isModified('password'))
        return next();
    user.password = crypt_password(user.password);
    next();
});
UserSchema.methods.is_valid_password = function (password) {
    const user = this;
    return bcrypt_1.default.compareSync(password, user.password);
};
const User = mongoose_1.model("user", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map