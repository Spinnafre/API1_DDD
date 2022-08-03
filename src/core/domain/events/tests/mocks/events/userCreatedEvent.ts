
import { UniqueIdv4 } from '../../../../UniqueIdV4';
import { UserMock } from '../domain/userMock';
import { IDomainEvents } from './../../../IDomainEvents';

export class UserCreatedEventMock implements IDomainEvents{
    public date: Date;
    public value: any;

    constructor(value:UserMock){
        this.date=new Date()
        this.value=value
    }
    getAggregateId(): UniqueIdv4 {
        throw new Error('Method not implemented.');
    }

}