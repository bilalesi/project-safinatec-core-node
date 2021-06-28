import _ from 'lodash';
import { IDurationUnit } from '../../Configuration/Predefined';
interface IEventAddress{
    state: string;
    city: string;
    zip: string | any;
}
interface IDatetime{
    timestamp: number,
    date: Date,
    time: string,
}
interface IDuration{
    counter: number,
    unit: IDurationUnit
}
interface IAgendaItem{
    datetime: string,
    speaker: string,
    overview: string
}
export default class TEvent {
    main_title: string;
    main_picture: string;
    organizer: string;
    address: IEventAddress;
    datetime:IDatetime;
    is_online: boolean;
    event_online_link: string;
    title: string;
    duration: IDuration;
    overview: string;
    map_url: string;
    full_address: string;
    agenda: IAgendaItem[];
    constructor(main_title: string, 
        main_picture: string, 
        organizer: string, address: IEventAddress,
        datetime: IDatetime,
        is_online: boolean,
        event_online_link: string,
        title: string,
        overview: string,
        map_url: string,
        full_address: string,
        agenda: IAgendaItem[],
        duration: IDuration
    ){
        this.address = address;
        this.main_title = main_title;
        this.main_picture = main_picture;
        this.organizer = organizer;
        this.address = address;
        this.datetime = datetime;
        this.is_online = is_online;
        this.event_online_link = event_online_link;
        this.title = title;
        this.duration = duration;
        this.overview = overview;
        this.map_url = map_url;
        this.full_address = full_address;
        this.agenda = agenda;
    }

}