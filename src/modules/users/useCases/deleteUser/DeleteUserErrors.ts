import { IUseCaseError } from './../../../../core/logic/UseCaseError';
import { Result } from './../../../../core/logic/Result';

export namespace DeleteUserErrors{
    export class UserNotExists extends Result<IUseCaseError>{
        constructor(id:string){
            super(false,`User with Id ${id} not exists`)
        }

        public static create(id:string):UserNotExists {
            return new UserNotExists(id)
        }
    }
    export class EmptyOrNullId extends Result<IUseCaseError>{
        constructor(){
            super(false,`Propertie Id is required`)
        }

        public static create():UserNotExists {
            return new EmptyOrNullId()
        }
    }
    export class NotAuthorized extends Result<IUseCaseError>{
        constructor(id:string){
            super(false,{
                error:'Not authorized',
                message:`Need to be logged in`
            })
        }

        public static create(id:string):UserNotExists {
            return new UserNotExists(id)
        }
    }
}