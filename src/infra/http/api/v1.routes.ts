import {Router} from 'express'
import { userRouter } from '../../../modules/users/infra/http/routes'


const v1Router= Router()

//All routes here
v1Router.use('/user',userRouter)


export{
    v1Router
}