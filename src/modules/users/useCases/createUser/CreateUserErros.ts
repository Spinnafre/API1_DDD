import { IUseCaseError } from './../../../../core/logic/UseCaseError';
import { Result } from './../../../../core/logic/Result';

export namespace CreateUserErrors{
    export class UserAlreadyExists extends Result<IUseCaseError>{
        constructor(email:string){
            super(false,`The email ${email} associate for this account already exists`)
        }

        public static create(email:string):UserAlreadyExists{
            return new UserAlreadyExists(email)
        }
    }
    //...
}