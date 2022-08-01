import { IHandle } from './../../../core/domain/events/IHandle';
import { AssignUserName } from './../useCases/AssignUserName/AssignUserName';
import { UserCreatedEvent } from './../domain/events/userCreatedEvent';
import { DomainEvents } from './../../../core/domain/events/DomainEvents';


export class AfterUserCreated implements IHandle{
    private _useCase:AssignUserName
    //Ao realizar
    constructor(useCase:AssignUserName){
        //Quando o usuário for criado, o que irá ter que fazer?
        this._useCase=useCase
    }
    //Registra no DomainEvents o Handler
    public setupSubscription(){
        //Registra o handler com o mesmo nome do evento
        DomainEvents.registerHandler(UserCreatedEvent.name,this.onUserCreatedEvent.bind(this))
    }

    //handler
    private onUserCreatedEvent(event:UserCreatedEvent):void{
        console.log(`${event.date.toLocaleString('pt-BR')} - [${UserCreatedEvent.name}] - Usuário ${event.value.firstName} foi criado`)
    }
}