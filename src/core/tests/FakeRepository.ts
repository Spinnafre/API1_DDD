export abstract class FakeRepository<T>{
    protected _items:Array<T>

    constructor(){
        this._items=[]
    }

    public addItem(item:T):void{
        const exists= this._items.some((el)=>this.compareItem(item,el))
        if(!exists){
            this._items.push(item)
        }
    }

    public removeItem(item:T):void{
        this._items.filter((el)=>this.compareItem(item,el))
    }

    protected abstract compareItem(item:T,el:T):boolean
}