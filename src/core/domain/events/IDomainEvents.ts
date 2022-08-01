import { UniqueIdv4 } from './../UniqueIdV4';
export interface IDomainEvents{
    date:Date,
    value:any,
    getAggregateId():UniqueIdv4
}