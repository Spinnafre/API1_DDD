import { UserRepositoryInMemory } from './tests/UserRepositoryInMemory';
import { UserRepo } from './userRepo';

const userRepo=new UserRepo()
const userRepoInMemory=new UserRepositoryInMemory()

export {
    userRepo,
    userRepoInMemory
}