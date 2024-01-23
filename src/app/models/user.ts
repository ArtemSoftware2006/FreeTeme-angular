import { Category } from "./category";

export interface User {
    id: number;
    role : string;
    login: string;
    email : string;
}

export interface LoginModel {
    login : string,
    password : string
}

export interface RegisterModel {
    login : string,
    password : string,
    passwordConfirm : string,
    email : string
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
    categories : Category[];
}

export interface UserCard {
    id : number;
    login : string;
    isVIP : boolean;
    description : string;
    avatar : any;
    categories : any;
}

export interface UserUpdateProfileRequest {
    id : number;
    firstName : string;
    secondName : string;
    lastName : string;
    phoneNumber : string;
    description : string;
    categoryIds : number[];
}

export interface UserUpdateProfile {
    id : number;
    firstName : string;
    secondName : string;
    lastName : string;
    phoneNumber : string;
    description : string;
    categories : Category[];
}