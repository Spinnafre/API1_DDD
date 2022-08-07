import { User } from './../domain/user';
import { IRepository } from "../../../core/infra/Repository";
import { UserEmail } from '../domain/userEmail';

export interface IUserRepository extends IRepository<User>{
    save(item: User): Promise<User>
    exists(props:User): Promise<boolean>
    findByUsername(username:string):Promise<User|undefined>
    findByEmail(email:UserEmail):Promise<User|undefined>
    findById(id:string):Promise<User|undefined>
    getAllUsers():Promise<Array<User>>
    deleteById(id:string):Promise<void>
}
//Implementation using whatever ORM or libs
export class UserRepo implements IUserRepository {
    constructor(){}

    public async deleteById(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async findByUsername(username: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async save(item: User): Promise<User> {
        throw new Error("Method not implemented.");
    }

    public async exists(item:User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    public async findById(id: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    public async findByEmail():Promise<User>{
        throw new Error("Method not implemented.");
    }

    public async getAllUsers():Promise<Array<User>>{
        throw new Error("Method not implemented.");
    }

}