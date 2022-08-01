import { UniqueIdv4 } from './UniqueIdV4';

const isEntity=(v:any):v is Entity<any>=>{
    return v instanceof Entity
}

export abstract class Entity<T>{
    protected _id:UniqueIdv4
    protected readonly props:T
    constructor(props:T,id?:UniqueIdv4){
        this._id=id ? id : new UniqueIdv4()
        this.props=props
    }

    public equals (object?:Entity<T>):boolean{
        if(object === null || object === undefined){
            return false
        }
        if(!isEntity(object)){
            return false
        }
        if(object === this){
            return true
        }
        return this._id.equals( object._id)
    }
}

