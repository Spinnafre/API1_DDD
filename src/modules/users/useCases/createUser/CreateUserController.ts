import { BaseController } from "../../../../core/infra/BaseController";
import { GenericAppErrors } from "../../../../core/logic/AppError";
import { CreateUserUserCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserDT0";
import { CreateUserErrors } from "./CreateUserErros";

export class CreateUserController extends BaseController {
  private useCase: CreateUserUserCase;
  constructor(useCase: CreateUserUserCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(): Promise<any> {
    const dto: CreateUserDTO = this.req.body;

    try {
      const result = await this.useCase.execute(dto);
      console.log(result)
      if (result.isError) {
        //Irá verificar de qual classe o objeto foi criado
        switch (result.constructor) {
          case CreateUserErrors.UserAlreadyExists:
            return this.conflict(result.getErrorMessage());
          case GenericAppErrors.UnexpectedError:
            return this.serverError(result.getErrorMessage());
          default:
            return this.serverError(result.getErrorMessage());
        }
      }

      return this.ok(dto);
    } catch (error) {
        return this.serverError(error as Error)
    }
  }
}
