import { BaseController } from "../../../../core/infra/BaseController";
import { DeleteUserErrors } from "./DeleteUserErrors";
import { DeleteUserUseCase } from "./DeleteUserUseCase";

type UserId={
    id:string
}

export class DeleUserController extends BaseController{
    private useCase:DeleteUserUseCase

    constructor(useCase:DeleteUserUseCase){
        super()
        this.useCase=useCase
    }

    public async executeImpl(): Promise<any> {
        const {id}=this.req.params as UserId

        try {
            const result= await this.useCase.execute(id)

            if(result.isError){
                switch (result.constructor){
                    case DeleteUserErrors.UserNotExists:
                        return this.notAuthorized()
                    default:
                        return this.serverError(result.gerErrorMessage())
                }
            }

            return this.ok(result.getValue())
            
            
        } catch (error) {
            return this.serverError(error as Error)
        }
    }

}