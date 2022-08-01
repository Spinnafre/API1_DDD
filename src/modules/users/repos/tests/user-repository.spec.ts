import { UserId } from './../../domain/userId';
import { UniqueIdv4 } from './../../../../core/domain/UniqueIdV4';
import { UserPassword } from './../../domain/userPassword';
import { UserEmail } from '../../domain/userEmail';
import { User } from './../../domain/user';
import { UserRepositoryInMemory } from './UserRepositoryInMemory';

let repo:UserRepositoryInMemory

describe('Fakere user Repository', () => { 

    beforeEach(()=>{
        repo=null
    })

    it('should be able to save a user', async() => {
        repo= new UserRepositoryInMemory()

        const userEmail= UserEmail.create('test@gmail.com')
        const userPassword= UserPassword.create({
            value:'12345678',
            hashed:false
        })

        const user= User.create({
            email:userEmail.getValue(),
            firstName:'testing',
            isEmailVerified:false,
            lastName:'tester',
            password:userPassword.getValue(),
            username:'',
            profilePicture:'asdsda'
        })

        const resp=await repo.save(user.getValue())

        expect(repo['_items'].length).toBeGreaterThan(0)
        expect(resp).toBeInstanceOf(User)

    });

    it('should be able to find a user by email', async() => {
        repo= new UserRepositoryInMemory()

        const userEmail= UserEmail.create('test@gmail.com')
        const userPassword= UserPassword.create({
            value:'12345678',
            hashed:false
        })

        const user= User.create({
            email:userEmail.getValue(),
            firstName:'testing',
            isEmailVerified:false,
            lastName:'tester',
            password:userPassword.getValue(),
            username:'',
            profilePicture:'asdsda'
        })

        await repo.save(user.getValue())

        const email= UserEmail.create('test@gmail.com')

        const value=await repo.findByEmail(email.getValue())

        expect(value?.email).toEqual(userEmail.getValue())
        expect(value?.password).toEqual(userPassword.getValue())
        expect(value?.firstName).toBe('testing')
        expect(value?.lastname).toBe('tester')

    });

    it('should be able to find a user by id', async() => {
        repo= new UserRepositoryInMemory()

        const userEmail= UserEmail.create('test@gmail.com')
        const userPassword= UserPassword.create({
            value:'12345678',
            hashed:false
        })
        const userId= new UniqueIdv4()

        const user= User.create({
            email:userEmail.getValue(),
            firstName:'testing',
            isEmailVerified:false,
            lastName:'tester',
            password:userPassword.getValue(),
            username:'',
            profilePicture:'asdsda'
        },userId)

        await repo.save(user.getValue())

        const value=await repo.findById(userId.toValue())

        expect(value?.email).toEqual(userEmail.getValue())
        expect(value?.password).toEqual(userPassword.getValue())
        expect(value?.firstName).toBe('testing')
        expect(value?.lastname).toBe('tester')

    });
 })