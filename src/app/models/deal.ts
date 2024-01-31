import { Category } from "./category"
import { UserCard } from "./user"

export interface Deal {
    id : number,
    title : string,
    description : string,
    minPrice : string,
    maxPrice : string,
    location : string,
    approximateDate : Date,
    status : number
} 

export interface DealCard extends Deal{
    views : number,
    alreadyResponded : boolean,
    datePublication: string,
    categories: Category[],
    creatorUserId: number
}

export interface DealDetails extends Deal {
    alreadyResponded : boolean,
    views :  number,
    datePublication : string,
    categories : Category[],
    creatorUser : UserCard
}


export interface DealCreate {
    title : string,
    userId : number,
    description : string,
    minPrice : number,
    maxPrice : number,
    location : string,
    approximateDate : Date,
    categoryIds : number[]
}

export function convertToDealCard(dealDetails: DealDetails[]): DealCard[] {
    return dealDetails.map(detail => ({
        status : detail.status,
        alreadyResponded : detail.alreadyResponded,
        id: detail.id,
        title: detail.title,
        views : detail.views,
        description: detail.description,
        minPrice: detail.minPrice,
        maxPrice: detail.maxPrice,
        location: detail.location,
        approximateDate: detail.approximateDate,
        datePublication: detail.datePublication,
        categories: detail.categories, 
        creatorUserId: detail.creatorUser.id 
    }));
}