import { DealCard } from "./deal";

export interface CreateProposal {
    description : string,
    price : string,
    dealId : number,
    userId : number
}

export interface ProposalDetails {
    id: number;
    description: string;
    price: string;
    datePublish: string;
    status: number;
    dealId: number;
    deal: DealCard;
    userId: number;
    user: any;
}