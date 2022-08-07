import * as express from "express";
import { createUserController } from "./";

let mockResponse:()=>express.Response;
let mockRequest:()=>express.Request;

describe("#Create user", () => {
    beforeAll(() => {
        mockRequest = (): express.Request => {
            const req = {
                params: {},
                body: {},
                url: {},
                query: {},
                headers: {}
            };
            return req as express.Request;
        };
        mockResponse = (): express.Response => {
            const res: any = {};
            
            res.statusCode = jest.fn().mockReturnValue(res);

            res.status = jest.fn().mockImplementation((code:number):express.Response=>{
                res.statusCode=code
                return res
            });


            res.json = jest.fn().mockReturnValue(res);

            return res as express.Response;
        };
    });
    afterEach(() => {
        // jest.restoreAllMocks()
        jest.clearAllMocks()
    })
    test("should be able to create user", async () => {
        const req = mockRequest()
        const res = mockResponse()

        req.body={
            firstname:'Davi',
            lastname:'Silva',
            password:'123123123123',
            email:'test@gmail.com'
        }

        await createUserController.execute(req, res);
        expect(res.json).toBeCalledWith({
            firstname:'Davi',
            lastname:'Silva',
            password:'123123123123',
            email:'test@gmail.com'
        })
        expect(res.status).toBeCalledWith(200)
        expect(res.statusCode).toBe(200)
        
    });
    test("should not be able to create user without email", async () => {
        const req = mockRequest()
        const res = mockResponse()

        req.body={
            firstname:'Davi',
            lastname:'Silva',
            password:'123123123123',
            email:''
        }

        await createUserController.execute(req, res);

        expect(res.status).toBeCalledWith(500)
        expect(res.statusCode).toBe(500)
        expect(res.json).toBeCalledWith({message:"email is null or undefined"})
        
    });

    test("should not be able to create dublicate user", async () => {
        const req = mockRequest()
        const res = mockResponse()

        req.body={
            firstname:'Davi',
            lastname:'Silva',
            password:'123123123123',
            email:'test@gmail.com'
        }

        await createUserController.execute(req, res);
        await createUserController.execute(req, res);

        expect(res.status).toBeCalledWith(409)
        expect(res.statusCode).toBe(409)
        expect(res.json).toBeCalledWith({message:"The email test@gmail.com associate for this account already exists"})
        
    });

})
    

