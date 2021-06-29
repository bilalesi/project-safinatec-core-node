import { IMMind } from '../../Infrastructure/Models/Mind';
import IMindRepository  from '../Repository/IMindRepository';


export default class CreateMind{
    MindRepository: IMindRepository;

    constructor(mindRepository: IMindRepository){
        this.MindRepository = mindRepository;
    }

    async execute(firstname: string, lastname: string,  state: string, city: string,  phone: string, email: string,
        website: string, facebook: string, twitter: string, linkedin: string, youtube: string, 
        instagram: string,  description: string, link: string, title: string, picture: string, 
        video_link: string, interview: string, is_published?: boolean): Promise<IMMind  | null>{
            let mind = await this.MindRepository.create_mind(
                firstname, lastname,  state, city,  phone, email,
            website, facebook, twitter, linkedin, youtube, 
            instagram,  description, link, title, picture, 
            video_link, interview, is_published
            );
            if(!mind) return null;
            return  mind;
    }
}