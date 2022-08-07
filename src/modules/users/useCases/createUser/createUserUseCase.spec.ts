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
        jest.restoreAllMocks()
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

        const result=await createUserController.execute(req, res);
        expect(res.statusCode).toBe(200)
    });
});
