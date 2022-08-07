import {Router} from 'express'
import { getUsersController } from '../../../useCases/getUsers';
import { createUserController } from '../../../useCases/createUser'

const userRouter= Router()

userRouter.post('/',(req,res)=>createUserController.execute(req,res))
// userRouter.delete('/',(req,res)=>createUserController.execute(req,res))
// userRouter.get('/:id',(req,res)=>createUserController.execute(req,res))
userRouter.get('/',(req,res)=>getUsersController.execute(req,res))

export{
    userRouter
}