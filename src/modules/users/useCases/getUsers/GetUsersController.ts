import { User } from './../../domain/user';
import { UsersDT0 } from './UsersDT0';
import { GetUsersUseCase } from './getUsersUseCase';
import { BaseController } from "../../../../core/infra/BaseController";

export class GetUsersController extends BaseController{
    private useCase:GetUsersUseCase

    constructor(useCase:GetUsersUseCase){
        super()
        this.useCase=useCase
    }

    public async executeImpl(): Promise<any> {
        const result= await this.useCase.execute()

        if(result.isError){
            const error=result.getErrorMessage()
            return this.serverError(error)
        }
        const users=result.getValue() as User[]

        const usersToDto: UsersDT0=users.map((user)=>{
            return{
                username:user.username,
                firstname:user.firstName,
                lastname:user.lastname,
                email:user.email.value,
                profilePicture:user.profilePicture,  
            }
        })

        return this.ok(usersToDto)
    }

}