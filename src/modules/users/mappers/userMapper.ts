import { UniqueIdv4 } from './../../../core/domain/UniqueIdV4';
import { UserPassword } from './../domain/userPassword';
import { UserEmail } from './../domain/userEmail';
import { User } from './../domain/user';

interface IPersistence{
    user_id:string
    user_email:string
    user_password:string
    first_name:string
    last_name:string
    is_email:boolean
    username:string,
    user_img:string|undefined
}

export class UserMap{
    public static toPersistence(props:User):IPersistence{
        return{
            user_id:props.id.toString(),
            user_email:props.email.value,
            user_password:props.password.getPassword(),
            first_name:props.firstName,
            last_name:props.lastname,
            is_email:props.isEmailVerified,
            username: props.username,
            user_img:props.profilePicture
        }
    }

    public toDomain(props:IPersistence):User{
        const userEmail= UserEmail.create(props.user_email)

        const userPassword= UserPassword.create({
            value:props.user_password,
            hashed:true
        })

        const id= new UniqueIdv4(props.user_id)

        const user= User.create({
            email:userEmail.getValue(),
            password:userPassword.getValue(),
            firstName:props.first_name,
            lastName:props.last_name,
            isEmailVerified:props.is_email,
            username:props.username,
            profilePicture:props.user_img
        },id)

        return user.getValue()
    }
}