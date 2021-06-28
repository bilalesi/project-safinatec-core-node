"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Consultant = new mongoose_1.Schema({
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
});
exports.default = mongoose_1.model("consultant", Consultant);
//# sourceMappingURL=Consultant.js.map