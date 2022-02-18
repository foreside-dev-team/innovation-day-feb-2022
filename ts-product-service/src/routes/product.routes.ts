import { Request, Response, Router } from 'express';
import { ProductHandler } from '../handler/products';

const productsRouter = Router();
const productHandler = new ProductHandler();

productsRouter.get('/', async (request: Request, response: Response): Promise<Response> => {
  const products = await productHandler.get();
  return response.json(products);
});

productsRouter.get('/:id', async (request: Request, response: Response): Promise<Response> => {
  const product = await productHandler.getById(parseInt(request.params.id));
  if(product){
    return response.json(product);

  }else{
    return response.status(404).json({"message": "product not found"});
  }
});

export default productsRouter;
