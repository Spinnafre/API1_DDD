import { MockAfterUserCreated } from './mocks/subscriber/mockAfterUserCreated';
import { UniqueIdv4 } from './../../UniqueIdV4';
import { DomainEvents } from './../DomainEvents';
import * as sinon from 'sinon'
import { UserMock } from './mocks/domain/userMock';

let user: UserMock | null
let spy

describe('User Domain Events', () => {
    beforeEach(() => {
        user = null
        DomainEvents.clearHandlers()
        DomainEvents.clearAggregates()
    })
    afterEach(()=>{
        spy = null
    })

    test('should be able to add aggregates roots in Domain Event Aggregates when user is created', () => {

        user = UserMock.create({
            name: 'test',
            username: 'spin',
            age: 19,
        })

        expect(DomainEvents['aggregatesMap'].length).toBe(1)
    });

    test('should be able to register handler to domain events',()=>{
        const cb=()=>{
            console.log('Testing use case')
        }
        const subscriber= new MockAfterUserCreated(cb)
        subscriber.setupSubscription()

        expect(Reflect.has(DomainEvents['handlerMap'],'UserCreatedEventMock')).toBeTruthy()
        expect(Reflect.has(DomainEvents['handlerMap'],'UserDeletedEventMock')).toBeTruthy()
    });

    test('There should be exactly one handler subscribed to the UserCreatedEvent',()=>{
        const cb=()=>{
            console.log('Testing use case')
        }
        const subscriber= new MockAfterUserCreated(cb)
        subscriber.setupSubscription()
        expect(DomainEvents['handlerMap']['UserCreatedEventMock'].length).toBe(1)
    });

    test('There should be exactly one handler subscribed to the UserDeletedEvent',()=>{
        const cb=()=>{
            console.log('Testing use case')
        }
        const subscriber= new MockAfterUserCreated(cb)
        subscriber.setupSubscription()
        expect(DomainEvents['handlerMap']['UserDeletedEventMock'].length).toBe(1)
    });


    test('Should call the handlers when the event is dispatched after marking the aggregate root',()=>{
        const addAggregateSpy = sinon.spy(DomainEvents,'addAggregate')
        const registerHandlerSpy = sinon.spy(DomainEvents,'registerHandler')
        const dispatchEventSpy = sinon.spy(DomainEvents,'dispatchEvent')
        
        user = UserMock.create({
            name: 'test',
            username: 'spin',
            age: 19,
        })

        const cb=()=>{
            console.log('Testing use case')
        }

        const subscriber= new MockAfterUserCreated(cb)
        subscriber.setupSubscription()

        DomainEvents.dispatchAggregateEvents(user)
        
        expect(registerHandlerSpy.callCount).toBe(2)
        expect(addAggregateSpy.calledWith(user)).toBeTruthy()
        expect(addAggregateSpy.calledOnce).toBeTruthy()
        expect(dispatchEventSpy.calledOnce).toBeTruthy()
    });

    test.todo('Should only add the domain event to the')
});