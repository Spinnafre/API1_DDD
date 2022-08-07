import express from 'express'
import cors from 'cors'
import { v1Router } from './api/v1.routes'
import { userRouter } from '../../modules/users/infra/http/routes'

const app=express()

app.use(cors({
    origin:'*'
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//Routes
app.use('/api/v1',v1Router)

export{
    app
}