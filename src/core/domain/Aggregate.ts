import { UniqueIdv4 } from './UniqueIdV4';
import { DomainEvents } from './events/DomainEvents';
import { IDomainEvents } from './events/IDomainEvents';
import { Entity } from "./Entity";

export abstract class AggregateRoot<T> extends Entity<T>{
    private _domainEvents:IDomainEvents[]=[]

    get id():UniqueIdv4{
        return this._id
    }

    get domainEvents():IDomainEvents[]{
        return this._domainEvents
    }

    public addDomainEvent(domainEvent:IDomainEvents){
        this._domainEvents.push(domainEvent)
        //Registra do Event Dispatcher
        DomainEvents.addAggregate(this)

        this.logEventAdded(domainEvent)

    }

    public clearEvents(){
        this._domainEvents=[]
    }

    private logEventAdded(domainEvent:IDomainEvents){
        console.log(`The ${domainEvent.constructor.name} has been added to aggregate root ${this.constructor.name}`)
    }

}