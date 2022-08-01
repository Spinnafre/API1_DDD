export class Result<T>{
    private isSuccess:boolean
    private isError:boolean
    private error:string
    private value:T

    constructor(isSuccess:boolean,error:T|any,value?:T){
        
        //Erros de criação da classe
        if(error && isSuccess){
            throw new Error('Invalid Operation: A result cannot be successful and contain an error')
        }
        
        if(!error && !isSuccess){
            throw new Error('Invalid Operation: A result cannot be failure and not contain an error')
        }

        this.isSuccess=isSuccess
        this.isError=!this.isSuccess
        this.error=error
        this.value=value as T

        Object.freeze(this)
    }

    public getValue():T{
        if(!this.isSuccess){
            throw new Error("Can't get the value of an error result")
        }
        return this.value
    }

    public getErrorMessage():string{
        return this.error as string
    }

    public static success<U>(value:U):Result<U>{
        return new Result<U>(true,null,value)
    }

    public static error<U>(message:any):Result<U>{
        return new Result<U>(false,message)
    }
}