export class Identifier<T>{
    private _value:T

    constructor(id:T){
        this._value=id
    }

    public equals(id:Identifier<T>):boolean{
        //Forem tipos de identificados diferentes então não poderá comparar
        if(!(id instanceof this.constructor)){
            return false
        }
        return id.toValue() === this._value
    }

    public toString():string{
        return String(this._value)
    }

    public toValue():T{
        return this._value
    }
}