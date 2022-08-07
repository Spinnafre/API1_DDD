import { Result } from './../../../../core/logic/Result';
import { User } from './../../domain/user';
import { IUserRepository } from './../../repos/userRepo';
import { IUseCase } from "../../../../core/domain/UseCase";
import { GenericAppErrors } from '../../../../core/logic/AppError';

type Response= Result<Array<User>> | GenericAppErrors.UnexpectedError

export class GetUsersUseCase implements IUseCase<void,Response>{
    private repository:IUserRepository

    constructor(repository:IUserRepository){
        this.repository=repository
    }

    public async execute(): Promise<Response> {
        try {
            const users=await this.repository.getAllUsers()
            return Result.success<Array<User>>(users) 
        } catch (error) {
            return GenericAppErrors.UnexpectedError.create(error as Error)
        }
    }

}