import * as express from 'express'

export abstract class BaseController{
    protected req:express.Request
    protected res:express.Response

    protected abstract executeImpl():Promise<void|any>

    public async execute(req:express.Request,res:express.Response):Promise<void|any>{
        this.req=req
        this.res=res

        return await this.executeImpl()
    }

    public static responseJson(res:express.Response,status:number,message:Error|string){
        return res.status(status).json({message})
    }
    
    protected ok(dto?:any){
        if(dto){
            return this.res.status(200).json(dto)
        }else{
            return this.res.sendStatus(200)
        }
    }

    protected notAuthorized(message?:string){
        return BaseController.responseJson(this.res,401,message?message:'unauthorized')
    }

    protected clientError(message:string){
        return BaseController.responseJson(this.res,400,message)
    }

    protected serverError(message:Error|string){
        return BaseController.responseJson(this.res,500,message.toString())
    }

    protected conflict(message:Error|string){
        return BaseController.responseJson(this.res,409,message)
    }
}