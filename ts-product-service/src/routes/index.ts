import { Router } from 'express';
import productsRouter from './product.routes';

const routes = Router();

routes.use('/products', productsRouter);

export default routes;
