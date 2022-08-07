import { IUseCaseError } from './../../../core/logic/UseCaseError';
import { Guard } from './../../../core/logic/Guard';
import { Result } from '../../../core/logic/Result';
import * as bcrypt from 'bcrypt-nodejs';
import { ValueObject } from '../../../core/domain/ValueObject';

interface UserPasswordProps {
    value: string,
    hashed?: boolean
}

//Value Object
export class UserPassword extends ValueObject<UserPasswordProps>{
    private constructor(props: UserPasswordProps) {
        super(props)
    }

    public getPassword():string{
        return this.props.value
    }
    public comparePassword(plainTextPassword: string) {
        //Se o meu password já está encriptografado
        // então compara usando bcrypt, caso contrário irá 
        // comparar o texto puro
        let hashed: string
        if (this.isHashedPassword()) {
            hashed = this.props.value
            return this.bcryptCompare(plainTextPassword, hashed)
        }
        return this.props.value === plainTextPassword
    }

    private hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => 
            bcrypt.hash(password, '', null,(err, hash) => {
                if (err) return reject(err)
                return resolve(hash)
            })
            
        )
    }

    private bcryptCompare(plainText: string, hashed: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainText, hashed, (err, result) => {
                if (err) return reject(err)
                return resolve(result)
            })
        })
    }

    public getHashValue(): Promise<string> {
        return new Promise((resolve, reject) => {
            if (this.isHashedPassword()) {
                return resolve(this.props.value)
            }
            return resolve(this.hashPassword(this.props.value))
        })
    }

    public isHashedPassword(): boolean | undefined {
        return this.props.hashed
    }

    public static isAppropriateLength(value: string): boolean {
        return value.length >= 8
    }

    public static create(props: UserPasswordProps):Result<UserPassword> {
        const propsPassword= Guard.againstNullOrUndefined(props.value,'password')
        if (!propsPassword.succeeded) {
            return Result.error<UserPassword>(propsPassword.message)
        }
        
        const propsHashed= Guard.againstNullOrUndefined(props.hashed,'hashed')
        if (!propsHashed.succeeded) {
            //Só vai conseguir comparar passwords se ele não estiver encriptografado
            if (!UserPassword.isAppropriateLength(props.value)) {
                return Result.error<UserPassword>("Password doesnt meet criteria [1 uppercase, 1 lowercase, one digit or symbol and 8 chars min].") 
            }
        }

        return Result.success<UserPassword>(new UserPassword({
            value: props.value,
            hashed: !!props.hashed === true
        }))
    }


}