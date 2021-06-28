"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TEvent {
    constructor(firstname, lastName, state, city, overview_description, overview_link, title, picture, video_link, interview, phone, email, website, facebook, twitter, linkedin, youtube, instagram) {
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
exports.default = TEvent;
//# sourceMappingURL=TMind.js.map