import { CreateUserUserCase } from './CreateUserUseCase';
import { CreateUserController } from './CreateUserController';
import { userRepoInMemory } from '../../repos';


const createUserUseCase= new CreateUserUserCase(userRepoInMemory)
const createUserController= new CreateUserController(createUserUseCase)

export {
    createUserController
}