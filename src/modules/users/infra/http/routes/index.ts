import {Router} from 'express'
import { createUserController } from '../../../useCases/createUser'

const userRouter= Router()

userRouter.post('/',(req,res)=>createUserController.execute(req,res))

export{
    userRouter
}