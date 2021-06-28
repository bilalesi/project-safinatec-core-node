import { Schema, model } from 'mongoose';


const Consultant: Schema =  new Schema({

    firstname: String, 
    lastname: String,
    picture: String,
    expertise_domain: String,
    diplomat_bag: [String],
    address: {
        state: String,
        city: String,
    },
    contact: {
        phone: String,
        email: String,
        facebook: String,
        twitter: String,
        linkedin: String,
        youtube: String,
        instagram: String,
    },
    overview: {
        description: String,
        link: String,
    },
    interview: String,
}, { 
    timestamps: true
})


export default model("consultant", Consultant);