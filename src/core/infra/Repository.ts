export interface IRepository<T>{
    save(item:T):Promise<T>,
    exists(item:T):Promise<boolean>
    delete?():Promise<void>
}