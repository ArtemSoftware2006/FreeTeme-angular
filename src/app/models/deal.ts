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
    description : string,
    minPrice : number,
    maxPrice : number,
    location : string,
    approximateDate : Date,
    datePublication: Date,
    categories: any,
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
    categoryId : number
}