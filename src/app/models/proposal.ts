export interface CreateProposal {
    description : string,
    price : number,
    dealId : number,
    userId : number
}

export interface ProposalDetails {
    id: number;
    description: string;
    price: number;
    datePublish: string;
    status: number;
    dealId: number;
    deal: null;
    userId: number;
    user: any;
}