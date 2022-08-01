import { Result } from './../../../core/logic/Result';
import { Guard } from './../../../core/logic/Guard';
import { UniqueIdv4 } from './../../../core/domain/UniqueIdV4';
import { UserEmail } from './userEmail';
import { UserPassword } from './userPassword';
import { AggregateRoot } from '../../../core/domain/Aggregate';
import { UserCreatedEvent } from './events/userCreatedEvent';


interface UserProps{
    username:string,
    firstName:string,
    lastName:string,
    email:UserEmail,
    password:UserPassword,
    profilePicture?:string,
    isEmailVerified:boolean
}

export class User extends AggregateRoot<UserProps>{

    constructor(props:UserProps,id?:UniqueIdv4){
        super(props,id)
    }

    get id():UniqueIdv4{
        return this._id
    }
    get firstName():string{
        return this.props.firstName
    }
    get lastname():string{
        return this.props.lastName
    }
    get email():UserEmail{
        return this.props.email
    }
    get password():UserPassword{
        return this.props.password
    }
    get profilePicture():string|undefined{
        return this.props.profilePicture
    }
    get isEmailVerified():boolean{
        return this.props.isEmailVerified
    }

    set username(username:string){
        this.props.username=username
    }

    public static create(props:UserProps,id?:UniqueIdv4):Result<User>{
        //Inputs que irá validar primeiro
        const userInputs=[
            {argument:props.email,argumentName:"email"},
            {argument:props.firstName,argumentName:"first name"},
            {argument:props.lastName,argumentName:"last name"},
            {argument:props.password,argumentName:"password"},
        ]

        const hasInvalidInput= Guard.againstNullOrUndefinedBulk(userInputs)

        if(!hasInvalidInput.succeeded){
            return Result.error<User>(hasInvalidInput.message)
        }
        //Tiver ID então será edição, caso contrário irá ser cadastro
        const user=new User({
            ...props,
            username:props.username?props.username:''
        },id)

        //Quando for criado um usuário irá registrar um evento 
        if(!id){
            user.addDomainEvent(new UserCreatedEvent(user))
        }

        return Result.success<User>(user)
    }
    
}