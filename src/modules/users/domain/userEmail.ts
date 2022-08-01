import { Guard } from './../../../core/logic/Guard';
import { Result } from './../../../core/logic/Result';
import { ValueObject } from "../../../core/domain/ValueObject";


interface UserEmailProps{
    value:string
}

export class UserEmail extends ValueObject<UserEmailProps>{
    private constructor(props:UserEmailProps){
        super(props)
    }
    
    get value():string{
        return this.props.value
    }

    public static create(email:string):Result<UserEmail>{
        const propsEmail=Guard.againstNullOrUndefined(email,'email')
        if(!propsEmail.succeeded){
            return Result.error<UserEmail>(propsEmail.message)
        }
        return Result.success<UserEmail>(new UserEmail({
            value:email
        }))
    }
}