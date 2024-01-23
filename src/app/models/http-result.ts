import { DealCard } from "./deal";

export interface DealCardsHttpResult {
    deals: DealCard[],
    total: number
}