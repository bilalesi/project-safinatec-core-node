import _ from 'lodash';
import { IDurationUnit } from '../../Configuration/Predefined';
interface IMindContact{
    phone: string,
    email: string,
    website?: string,
    facebook?: string,
    twitter?: string,
    linkedin?: string,
    youtube?: string,
    instagram?: string,
}
interface IMindOverview{
    description: string,
    link: string,
}
interface IMindAddress{
    state: string,
    city: string,
}
export default class TEvent {
    firstname: string;
    lastName: string;
    address: IMindAddress;
    contact: IMindContact;
    overview: IMindOverview;
    title: string;
    picture: string;
    video_link?: string;
    interview: string;
    constructor(
        firstname: string,
        lastName: string,
        state: string, city: string,
        overview_description: string,
        overview_link: string,
        title: string,
        picture: string,
        video_link: string,
        interview  : string,
        phone: string,
        email: string,
        website: string,
        facebook: string,
        twitter: string,
        linkedin: string,
        youtube: string,
        instagram: string,
    ){
        this.firstname = firstname;
        this.lastName = lastName;
        this.address = {
            state: state, 
            city: city
        };
        this.contact = {
            phone,
            email,
            website,
            facebook,
            twitter,
            linkedin,
            youtube,
            instagram,
        };
        this.overview = {
            description: overview_description,
            link: overview_link,
        };
        this.title = title;
        this.picture = picture;
        this.video_link = video_link;
        this.interview = interview;
    }

}