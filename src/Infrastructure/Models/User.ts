import { Schema, model, Document, Model } from 'mongoose';
import { RoleLevel, UserRoles, UserRolesPicker } from '../../Configuration/Predefined'
import bcrypt from 'bcrypt';

export interface IMUser extends Document{
    firstname: string,
    lastname: string,
    fullname: string,
    email: string,
    phone: string,
    password: string,
    address: {
        state: string, 
        city: string,
        zip: number,
        line1: string,
        line2: string
    },
    configuration: {
        role: string,
        level: string[]
        password_resetted: boolean
    },
    analytics: {
        connection_attempts: number,
        last_connection: number,
    },
    is_valid_password: (password: string) => boolean,
}
const UserSchema: Schema = new Schema({
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
        role: { type: String, enum: UserRoles, default:  UserRolesPicker.specialist_admin },
        level: { type: [String], enum: RoleLevel, default: RoleLevel },
        password_resetted: { type: Boolean, default: false },
    },
    analytics: {
        connection_attempts: Number,
        last_connection: Number,
    }
}, {
    timestamps: true,
})


UserSchema.virtual('fullname').get(function(this: IMUser){
    return `${this.firstname} ${this.lastname}`
})

function crypt_password(password: string) {
    const salt = bcrypt.genSaltSync(parseInt(process.env.CRYPT_SALT_ROUNDS as string, 10));
    return bcrypt.hashSync(password, salt)
}

UserSchema.pre<IMUser>('save', function(next){
    const user = this;
    user.email = user.email.toLowerCase();
    if(!user.isModified('password')) return next();
    user.password = crypt_password(user.password);
    next();
})

UserSchema.methods.is_valid_password =  function(password: string){
    const user = <IMUser>this;
    return bcrypt.compareSync(password, user.password);
}

const User: Model<IMUser> = model("user", UserSchema);
export default User;