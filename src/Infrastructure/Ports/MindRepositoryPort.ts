import Mind, { IMMind } from '../Models/Mind';
import IMindRepository from '../../Core/Repository/IMindRepository';
import TMind from '../../Core/Entity/TMind';


export default class MindRepositoryPort implements IMindRepository{
    async gather_all_minds(): Promise<IMMind[]  | null>{
        try {
            let minds = await Mind.find({}).lean<Array<IMMind>>();
            return minds;
        } catch (error) { 
            return null
        }
    }
    async gather_specific_mind(id: string): Promise<IMMind | null>{
        try {
            let mind = await Mind.findById(id).lean<IMMind>();
            return mind;
        } catch (error) {
            return null
        }
    }
    async create_mind(firstname: string, lastname: string,  state: string, city: string,  phone: string, email: string,
        website: string, facebook: string, twitter: string, linkedin: string, youtube: string, 
        instagram: string,  description: string, link: string, title: string, picture: string, 
        video_link: string, interview: string, is_published: boolean): Promise<IMMind  | null>{
            try {
                let t_new_mind = new TMind(firstname, lastname, state, city, description, link, title, picture, 
                    video_link, interview, phone, email, website, facebook, twitter, linkedin, youtube , instagram);

                
                let new_mind = new Mind({
                    firstname: t_new_mind.firstname,
                    lastname: t_new_mind.lastname,
                    address: t_new_mind.address,
                    contact: t_new_mind.contact,
                    overview: t_new_mind.overview,
                    title: t_new_mind.title,
                    picture: t_new_mind.picture,
                    video_link: t_new_mind.video_link,
                    interview: t_new_mind.interview,
                    is_published: t_new_mind.is_published
                })

                await new_mind.save();
                return new_mind;
            } catch (error) {
                console.error('create_mind', error);
                return null;
            }
    }
}