import { IUseCaseError } from './UseCaseError';
import { Result } from './Result';


export namespace GenericAppErrors{
    export class UnexpectedError extends Result<IUseCaseError>{
        constructor(message:any){
            super(false,{
                message:`An unexpected error occurred`,
                error:message
            })
        }  
        public static create(message:any):UnexpectedError {
            return new UnexpectedError(message)
        } 
    }
}