import { Result } from './../../../../core/logic/Result';
import { UserEmail } from './../userEmail';
import { User } from '../user';
import { UserPassword } from '../userPassword';

import * as sinon from 'sinon'

describe('User Domain', function () {
    test('Should Be Able create User', () => {

        const userEmail= UserEmail.create('test@gmail.com')
        const userPassword= UserPassword.create({
            value:'12345678',
            hashed:false
        }) 

        // const spyAddDomain= sinon.spy(User,'')

        const user = User.create({
            email: userEmail.getValue(),
            firstName: 'davi',
            lastName: 'Silva',
            username: 'spin',
            isEmailVerified: false,
            password: userPassword.getValue(),
            profilePicture: 'http://test.com.br'
        })

        const data= user.getValue()

        expect(user).toBeInstanceOf(Result)
        expect(data).toBeInstanceOf(User)
        expect(data).toHaveProperty('id')

    })

    test('should be able create  user password', async () => {
        const password=UserPassword.create({
            value:'123456789',
            hashed:false
        })

        const value= password.getValue()

        expect(value?.getPassword()).toBe('123456789')
        expect(value?.isHashedPassword()).toBe(false)
    });

    test('should be able get hash password', async () => {
        const password=UserPassword.create({
            value:'123456789',
            hashed:false
        })
        const value=password.getValue()
        const spy=sinon.spy(value,value?.getHashValue.name)
        const hash= await value?.getHashValue()
        expect(spy.calledOnce).toBe(true)
        expect(hash?.length).toBeGreaterThan(8)
        expect(value).toHaveProperty('props')
    });
    
})