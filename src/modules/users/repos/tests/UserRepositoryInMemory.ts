import { UserMap } from './../../mappers/userMapper';
import { IUserRepository } from './../userRepo';
import { User } from './../../domain/user';
import { FakeRepository } from '../../../../core/tests/FakeRepository';
import { UserEmail } from '../../domain/userEmail';

//Also responsible for using Mappers 
export class UserRepositoryInMemory  extends FakeRepository<User> implements IUserRepository{
    
    constructor(){
        super()
    }

    public async findByUsername(username: string): Promise<User|undefined> {
        return this._items.find((item)=>item.username===username) 
    }

    public async findByEmail(email: UserEmail): Promise<User|undefined> {
        return this._items.find((item)=> item.email.equals(email))
    }

    public async findById(id: string): Promise<User|undefined> {
        return this._items.find((item)=>item.id.toString() === id)
    }

    public async getAllUsers():Promise<Array<User>>{
        return this._items
    }

    async save(item: User): Promise<User> {
        const alreadyExists= await this.exists(item)
        if(!alreadyExists){
            this._items.push(item)
        }
        return item
    }

    public async deleteById(id: string): Promise<void> {
        const index= this._items.findIndex((item)=>item.id.toString()===id)
        if(index !== -1){
            this._items.splice(index,1)
        }
    }

    async exists(props:User): Promise<boolean> {
        return this._items.some((item)=>this.compareItem(item,props))
    }

    protected compareItem(item: User, el: User): boolean {
        return item.id.equals(el.id)
    }

}