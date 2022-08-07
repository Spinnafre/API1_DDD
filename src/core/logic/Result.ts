export class Result<T>{
    public isSuccess:boolean
    public isError:boolean
    private error:T|string
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

    public getErrorMessage():T{
        return this.error as T
    }

    public static success<U>(value?:U):Result<U>{
        return new Result<U>(true,null,value)
    }

    public static error<U>(message:any):Result<U>{
        return new Result<U>(false,message)
    }

    //Mapear os resultados retornando o primeiro que achar error
    public static combine(results:Array<Result<any>>):Result<any>{
        for(const result of results){
            if(result.isError) return result
        }
        return Result.success()
    }
}