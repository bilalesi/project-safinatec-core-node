
import IMindRepository from '../../Core/Repository/IMindRepository';
import MindRepositoryPort from '../Ports/MindRepositoryPort';
import CreateUser from '../../Core/Usecases/create_user';
import CreateMind from '../../Core/Usecases/create_mind';


const do_create_mind = async (firstname: string, lastname: string,  state: string, city: string,  phone: string, email: string,
    website: string, facebook: string, twitter: string, linkedin: string, youtube: string, 
    instagram: string,  description: string, link: string, title: string, picture: string, 
    video_link: string, interview: string, is_published?: boolean) => {

        try {
            const mindRepositoryInstance = new MindRepositoryPort();
            const createMind = new CreateMind(mindRepositoryInstance);
            let mind = await  createMind.execute(firstname, lastname,  state, city,  phone, email,
                website, facebook, twitter, linkedin, youtube, 
                instagram,  description, link, title, picture, 
                video_link, interview, is_published);

            return mind;
        } catch (error) {
            console.error('do_create_mind', error);
            return null;
        }
}


export {
    do_create_mind,
}