import * as express from "express";

import { getUsersController } from ".";
import { createUserController } from "../createUser";

let mockResponse: () => express.Response = (): express.Response => {
  const res: any = {};

  res.statusCode = jest.fn().mockReturnValue(res);

  res.status = jest
    .fn()
    .mockImplementation((code: number): express.Response => {
      res.statusCode = code;
      return res;
    });

  res.json = jest.fn().mockReturnValue(res);

  return res as express.Response;
};
let mockRequest: () => express.Request = (): express.Request => {
  const req = {
    params: {},
    body: {},
    url: {},
    query: {},
    headers: {},
  };
  return req as express.Request;
};

let res: express.Response | any;
let req: express.Request | any;

describe("#Create user", () => {
  beforeAll(async () => {
    req = mockRequest();
    res = mockResponse();

    req.body = {
      firstname: "Davi",
      lastname: "Silva",
      password: "123123123123",
      email: "test@gmail.com",
    };

    await createUserController.execute(req, res);

    req.body = {
      firstname: "Test",
      lastname: "Double",
      password: "123123123123",
      email: "test2@gmail.com",
    };

    await createUserController.execute(req, res);
  });
  beforeEach(async () => {
    req = mockRequest();
    res = mockResponse();
  });
  afterEach(() => {
    // jest.restoreAllMocks()
    jest.clearAllMocks();
  });
  test("should be able to list all users", async () => {
    await getUsersController.execute(req, res);

    expect(res.json).toBeCalledWith([
      {
        firstname: "Davi",
        lastname: "Silva",
        email: "test@gmail.com",
        username: undefined,
        profilePicture: undefined,
      },
      {
        firstname: "Test",
        lastname: "Double",
        email: "test2@gmail.com",
        username: undefined,
        profilePicture: undefined,
      },
    ]);
    expect(res.status).toBeCalledWith(200);
    expect(res.statusCode).toBe(200);
  });
});
