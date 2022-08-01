import { UniqueIdv4 } from './../../../../core/domain/UniqueIdV4';
import { User } from './../user';
import { IDomainEvents } from './../../../../core/domain/events/IDomainEvents';

export class UserCreatedEvent implements IDomainEvents{
    public date: Date;
    public value: User;

    constructor(value:User){
        this.date=new Date()
        this.value=value
    }
    getAggregateId(): UniqueIdv4 {
        return this.value.id
    }
    
}