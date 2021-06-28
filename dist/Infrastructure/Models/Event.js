"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Predefined_1 = require("../../Configuration/Predefined");
const Event = new mongoose_1.Schema({
    creator: { type: mongoose_1.Types.ObjectId, ref: 'users' },
    main_title: String,
    main_picture: String,
    organizer: String,
    address: {
        state: String,
        city: String,
        zip: Number,
    },
    datetime: {
        timestamp: Number,
        date: Date,
        time: String,
    },
    is_online: Boolean,
    event_online_link: String,
    title: String,
    duration: {
        counter: Number,
        unit: { type: String, enum: Predefined_1.DurationUnit, default: Predefined_1.DurationUnitPicker.days },
    },
    overview: String,
    map_url: String,
    full_address: String,
    agenda: [{
            datetime: String,
            speaker: String,
            overview: String
        }],
    event_pictures: [String],
    is_published: Boolean,
}, {
    timestamps: true
});
exports.default = mongoose_1.model("event", Event);
//# sourceMappingURL=Event.js.map