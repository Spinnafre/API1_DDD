import { Result } from '../../../../core/logic/Result';
import { UserPassword } from '../../domain/userPassword';
import { CreateUserDTO } from './CreateUserDT0';
import { IUseCase } from '../../../../core/domain/UseCase';
import { CreateUserErrors } from './CreateUserErros';
import { UserEmail } from '../../domain/userEmail';
import { User } from '../../domain/user';
import { GenericAppErrors } from '../../../../core/logic/AppError';
import { IUserRepository } from '../../repos/userRepo';

type Response=
    any|
    void|
    CreateUserErrors.UserAlreadyExists|
    GenericAppErrors.UnexpectedError

export class CreateUserUserCase implements IUseCase<CreateUserDTO,Response>{
    private readonly userRepo:IUserRepository

    constructor(userRepo:IUserRepository){
        this.userRepo= userRepo
    }
    
    async execute(request: CreateUserDTO): Promise< Response > {
        const userEmail=UserEmail.create(request.email)

        const userPassword=UserPassword.create({
            value:request.password,
            hashed:false
        })

        const combinedResult= Result.combine([userEmail,userPassword])

        //Email ou password foram declarados errado
        if(combinedResult.isError){
            return combinedResult as Response
        }

        const userOrError=User.create({
            email:userEmail.getValue(),
            password:userPassword.getValue(),
            firstName:request.firstname,
            lastName:request.lastname,
            isEmailVerified:true
        })

        if(userOrError.isError){
            return userOrError
        }

        const user:User= userOrError.getValue()

        const alreadyExists=await this.userRepo.findByEmail(user.email)

        if(!!alreadyExists){
            return CreateUserErrors.UserAlreadyExists.create(user.email.value) as Response
        }

        try {
            await this.userRepo.save(user)
        } catch (error) {
            return GenericAppErrors.UnexpectedError.create(error) as Response
        }

        return userOrError
        
    }

}