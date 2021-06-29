
import { IMMind } from "../../Infrastructure/Models/Mind";



interface IMindRepository{
   gather_all_minds(): Promise<Array<IMMind> | null>;
   gather_specific_mind(id: string): Promise<IMMind | null>;
   create_mind(firstname: string, lastname: string,  state: string, city: string,  phone: string, email: string,
    website: string, facebook: string, twitter: string, linkedin: string, youtube: string, 
    instagram: string,  description: string, link: string, title: string, picture: string, 
    video_link: string, interview: string, is_published?: boolean): Promise<IMMind | null>;
}


export default IMindRepository;