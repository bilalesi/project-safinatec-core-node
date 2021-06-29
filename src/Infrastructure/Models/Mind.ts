import { Schema, model, Document, Model } from 'mongoose';

export interface IMMind extends Document{
    firstname: string,
    lastname: string,
    address: {
        state: string,
        city: string,
    },
    contact: {
        phone: string,
        email: string,
        website: string,
        facebook: string,
        twitter: string,
        linkedin: string,
        youtube: string,
        instagram: string,
    },
    overview: {
        description: string,
        link: string,
    },
    title: string,
    picture: string,
    video_link: string,
    interview: string,
    is_published: boolean
}

const MindSchema: Schema = new Schema({
    firstname: String,
    lastname: String,
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
    is_published: Boolean
}, { 
    timestamps: true 
});


const Mind: Model<IMMind> = model("mind", MindSchema);

export default Mind;