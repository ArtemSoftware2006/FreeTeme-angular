import { Category } from "./category"

export interface Deal {
    id : number,
    // В нескольких интерфейсах повторяется набор полей, как вариант - вынести в отдельный интерфейс
    // и наследовать от него. Так, в случае изменения, изменится только один интерфейс, а не несколько
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
    title : string,
    description : string,
    datePublication : Date,
    minPrice : number,
    maxPrice : number,
    approximateDate : Date,
    location : string,
    status : number,
    categories : any,
    creatorUser : any
}
