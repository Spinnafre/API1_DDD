import { UserDeletedEventMock } from './../events/userDeletedEvent';
import { UserCreatedEventMock } from './../events/userCreatedEvent';
import { DomainEvents } from './../../../DomainEvents';
import { IDomainEvents } from './../../../IDomainEvents';
import { IHandle } from './../../../IHandle';

type UseCaseMock=(data?:any)=>void 

export class MockAfterUserCreated implements IHandle{
    private _useCase:(data?:any)=>void 

    constructor(useCase:UseCaseMock){
        this._useCase=useCase
    }

    setupSubscription(): void {
        DomainEvents.registerHandler(UserCreatedEventMock.name,this.onUserCreatedHandler)
        DomainEvents.registerHandler(UserDeletedEventMock.name,this.onUserDeletedHandler)
    }

    public onUserCreatedHandler(event:IDomainEvents){
        console.log(`${event.date.toLocaleDateString('pt-BR')} - [onUserCreatedHandler] - User name:  ${event.value.name}`)
    }
    
    public onUserDeletedHandler(event:IDomainEvents){
        console.log(`${event.date.toLocaleDateString('pt-BR')} - [onUserDeletedHandler] - User name: ${event.value.name}`)
    }

}