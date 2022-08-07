import { userRepoInMemory } from '../../repos';
import { GetUsersController } from './getUsersController';
import { GetUsersUseCase } from './getUsersUseCase';


const getUsersUseCase= new GetUsersUseCase(userRepoInMemory)
const getUsersController= new GetUsersController(getUsersUseCase)

export{
    getUsersController
}