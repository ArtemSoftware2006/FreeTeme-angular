import { Category } from "./category"

export interface Deal {
    id : number,
    title : string,
    description : string,
    minPrice : number,
    maxPrice : number,
    location : string,
    approximateDate : Date
} 

export interface DealCard {
    id : number,
    title : string,
    views :  number,
    description : string,
    minPrice : number,
    maxPrice : number,
    location : string,
    approximateDate : Date,
    datePublication: Date,
    categories: Category[],
    creatorUserId: number
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

export interface DealDetails {
    id : number,
    views :  number,
    title : string,
    description : string,
    datePublication : Date,
    minPrice : number,
    maxPrice : number,
    approximateDate : Date,
    location : string,
    status : number,
    categories : Category[],
    creatorUser : any
}

export function convertToDealCard(dealDetails: DealDetails[]): DealCard[] {
    return dealDetails.map(detail => ({
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