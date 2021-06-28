"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Mind = new mongoose_1.Schema({
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
exports.default = mongoose_1.model('mind', Mind);
//# sourceMappingURL=Mind.js.map