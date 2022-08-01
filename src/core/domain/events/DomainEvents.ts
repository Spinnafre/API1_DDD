import { UniqueIdv4 } from './../UniqueIdV4';
import { AggregateRoot } from './../Aggregate';
import { IDomainEvents } from './IDomainEvents';

interface IHandleMap{
    [index:string]:Array<(event:IDomainEvents)=>void>
}

//Events Dispatcher
export class DomainEvents{
    /*
        {
            "eventClassName":[fn(event),...]
        }
    */
    private static  handlerMap:IHandleMap={}
    /*
        [AggregateRoot,...]
    */
    private static aggregatesMap:Array<AggregateRoot<any>>=[]

    public static registerHandler(eventClassName:string,cb:(event:IDomainEvents)=>void):void{
        const hasHandler=DomainEvents.handlerMap.hasOwnProperty(eventClassName)
        if(!hasHandler){
            DomainEvents.handlerMap[eventClassName]=[]
        }
        DomainEvents.handlerMap[eventClassName].push(cb)
    }

    public static addAggregate(aggregate:AggregateRoot<any>):void{
        const alreadyExists= !!DomainEvents.findAggregateById(aggregate.id)
        if(!alreadyExists){
            DomainEvents.aggregatesMap.push(aggregate)
        }
    }

    public static removeAggregate(aggregate:AggregateRoot<any>):void{
        const index=DomainEvents.aggregatesMap.findIndex((item)=>item.equals(aggregate))
        DomainEvents.aggregatesMap.splice(index,1)
    }

    public static clearHandlers():void{
        DomainEvents.handlerMap={}
    }

    public static clearAggregates():void{
        DomainEvents.aggregatesMap=[]
    }

    public static findAggregateById(id:UniqueIdv4):AggregateRoot<any>|null{
        let found:AggregateRoot<any>|null=null
        for(let aggregate of DomainEvents.aggregatesMap){
            if(aggregate.id===id){
                found=aggregate
            }
        }
        return found
    }

    public static dispatchAggregateEvents(aggregate:AggregateRoot<any>):void{
        aggregate.domainEvents.forEach((event:IDomainEvents)=>this.dispatchEvent(event))
    }

    public static dispatchEventsForAggregate(id:UniqueIdv4):void{
        const aggregate=DomainEvents.findAggregateById(id)
        if(aggregate){
            DomainEvents.dispatchAggregateEvents(aggregate)
            aggregate.clearEvents()
            DomainEvents.removeAggregate(aggregate)
        }
    }

    public static dispatchEvent(event:IDomainEvents):void{
        const hashHandler= Reflect.has(DomainEvents.handlerMap,event.constructor.name)
        if(hashHandler){
            let handlers=DomainEvents.handlerMap[event.constructor.name]
            for(let handler of handlers){
                handler(event)
            }

        }
    }
}