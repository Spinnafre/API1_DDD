interface IGuardResult{
    succeeded:boolean,
    message?:string
}

interface IProps{
    argument:any,
    argumentName:string
}

export class Guard{
    public static againstNullOrUndefined(argument:any,argumentName:string):IGuardResult{
        if(argument === null || argument===undefined){
            return {
                succeeded:false,
                message:`${argumentName} is null or undefined`
            }
        }
        return {
            succeeded:true
        }
    }
    //Validar vários inputs
    public static againstNullOrUndefinedBulk(args:Array<IProps>):IGuardResult{
        for(const {argument,argumentName} of args){
            const result=Guard.againstNullOrUndefined(argument,argumentName)
            if(!result.succeeded){
                return result
            }
        }
        return {succeeded:true}
    }
}