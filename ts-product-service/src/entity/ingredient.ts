import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { Product } from "./product";

@Entity()
export class Ingredient extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Product)
    @JoinTable()
    product: Product[];

}