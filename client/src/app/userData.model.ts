export interface UserData {
    avatar_url: string;
    bio: string;  
    username: string;
    name: string;
    location: string;
    titles: string[];
    'favorite-language': string;
    'total-stars': number;  
    'highest-starred': number;
    'public-repos': number;
    'perfect-repos': number;
    followers: number;
    following: number;
    [key: string]: string | number | string[]; //Allows typescript to validate my keys in my profile component
};

export const defaultData: UserData = {
    avatar_url: '',
    bio: '',
    username: '',
    name: '',
    location: '',
    titles: [],
    'favorite-language': '',
    'total-stars': 0,  
    'highest-starred': 0,
    'public-repos': 0,
    'perfect-repos': 0,
    followers: 0,
    following: 0,
};