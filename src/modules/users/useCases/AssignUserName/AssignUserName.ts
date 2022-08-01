import { IUserRepository } from './../../repos/userRepo';
import { IUseCase } from './../../../../core/domain/UseCase';

type IResponse=Promise<any>
type IRequest=any

export class AssignUserName implements IUseCase<IRequest,IResponse>{
    private repo:IUserRepository
    constructor(repo:IUserRepository){
        this.repo=repo
    }
    async execute(request?: any): Promise<IResponse> {
        const username= `${request.firstName} ${request.lastName}`
        //Do anyting using repository from User
        console.log(`Sucesso ao atribuir nome do usuário ${username} ao usuário ${request.id}`)
    }

}