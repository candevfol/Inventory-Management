import { jest } from "@jest/globals";

jest.unstable_mockModule("express-validator", () => ({
  validationResult: jest.fn()
}));

jest.unstable_mockModule("../repository/Product.Repository.js", () => ({
  createProductModel: jest.fn(),
  getProductFromId: jest.fn(),
  deletProductById: jest.fn(),
  updateProductById: jest.fn(),
  getAllProductsBelowThreshold: jest.fn()
}));

const controller = await import("../controller/Products.Controller.js");
const repo = await import("../repository/Product.Repository.js");
const expressValidator = await import("express-validator");

describe("Products Controller", () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn(), send: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test("updateProduct - should return 400 if quantity goes below 0", async () => {
    expressValidator.validationResult.mockReturnValue({ errors: [] });
    req.params.id = "123";
    req.body = { change: -20 };
    repo.getProductFromId.mockResolvedValue({ _id: "123", quantity: 5 });

    await controller.updateProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ messgae: "Product quantity can't go below 0" });
  });

  test("updateProduct - should return 200 if quantity doesnot go below 0", async () => {
    expressValidator.validationResult.mockReturnValue({ errors: [] });
    req.params.id = "123";
    req.body = { change: -20 };
    repo.getProductFromId.mockResolvedValue({ _id: "123", quantity: 25 });
    repo.updateProductById.mockResolvedValue({ _id: "123", quantity: 5 });

    await controller.updateProduct(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Product updated successfully", data: { _id: "123", quantity: 5 } });
  });


});
