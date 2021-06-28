import { Schema, model } from 'mongoose';


const Mind: Schema = new Schema({
    firstname: String,
    lastName: String,
    address: {
        state: String,
        city: String,
    },
    contact: {
        phone: String,
        email: String,
        website: String,
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
    title: String,
    picture: String,
    video_link: String,
    interview: String,
}, { 
    timestamps: true 
});


export default model('mind', Mind);