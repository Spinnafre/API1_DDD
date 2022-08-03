import { UserCreatedEventMock } from './../events/userCreatedEvent';
import { UniqueIdv4 } from './../../../../UniqueIdV4';
import { AggregateRoot } from "../../../../Aggregate";
import { UserDeletedEventMock } from '../events/userDeletedEvent';

interface IUserMockProps{
    name:string,
    username:string,
    age:number
}

export class UserMock extends AggregateRoot<IUserMockProps>{

    private constructor(props:IUserMockProps,id?:UniqueIdv4){
        super(props,id)
    }

    public get name():string{
        return this.props.name
    }

    public static create(props:IUserMockProps,id?:UniqueIdv4):UserMock{
        const user= new UserMock(props,id)
        
        user.addDomainEvent(new UserCreatedEventMock(user))

        return user
    }

    public delete():void{
        this.addDomainEvent(new UserDeletedEventMock(this))
    }
}