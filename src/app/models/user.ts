export interface IUser {
    id: number;
    role : string;
    login: string;
    email : string;
}

export interface UserProfile {
    login : string;
    firstName : string;
    secondName : string;
    lastName : string;
    email : string;
    isVIP : boolean;
    balance : number;
    phoneNumber : string;
    description : string;
    
}

export interface UserCard {
    id : number;
    login : string;
    isVIP : boolean;
    description : string;
    categories : any;
}