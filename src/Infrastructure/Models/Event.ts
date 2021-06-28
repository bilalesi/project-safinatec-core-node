import { Schema, model, Types } from 'mongoose';
import { DurationUnit, DurationUnitPicker } from '../../Configuration/Predefined';


const Event: Schema = new Schema({
    creator: { type: Types.ObjectId, ref: 'users' },
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
        unit: { type: String, enum: DurationUnit, default: DurationUnitPicker.days },
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
})

export default model("event", Event);
