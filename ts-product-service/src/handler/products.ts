import { Connection, createConnection, getConnection } from "typeorm";
import { Product } from "../entity/product"

export class ProductHandler {
    connection: Connection;

    getDBConnection = async () => {
        if (!this.connection) {
            this.connection = await createConnection();
        }
        return this.connection;
    }

    get = async () => {
        const connection = await this.getDBConnection()
        const productRepository = connection.getRepository(Product);
        return await productRepository.find({ relations: ['ingredients'] });
    }

    getById = async (id: number) => {
        console.log("getting product with id:", id);
        const connection = await this.getDBConnection()
        const productRepository = connection.getRepository(Product);
        return await productRepository.findOne({ where: { id }, relations: ['ingredients'] });
    }
}
