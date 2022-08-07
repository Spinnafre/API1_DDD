import { Result } from './../../../../core/logic/Result';
import { IUserRepository } from './../../repos/userRepo';
import { IUseCase } from "../../../../core/domain/UseCase";
import { DeleteUserErrors } from './DeleteUserErrors';
import { GenericAppErrors } from '../../../../core/logic/AppError';


type IRequest = string

type IResponse = any | DeleteUserErrors.UserNotExists

export class DeleteUserUseCase implements IUseCase<IRequest, IResponse>{
    private repository: IUserRepository

    constructor(repository: IUserRepository) {
        this.repository = repository
    }

    async execute(id: IRequest): Promise<any> {
        if (!id) {
            return DeleteUserErrors.EmptyOrNullId.create()
        }

        try {
            const user = await this.repository.findById(id)

            if (!user) {
                return DeleteUserErrors.UserNotExists.create(id)
            }

            return Result.success(user)
        } catch (error) {
            return GenericAppErrors.UnexpectedError.create(error as Error)
        }

    }
}